package controllers

import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.net.URL
import java.util.Arrays
import org.bson.types.ObjectId
import com.google.api.client.googleapis.auth.oauth2.GoogleBrowserClientRequestUrl
import javax.net.ssl.HttpsURLConnection
import models.SocialToken
import play.api.mvc.Action
import play.api.mvc.Controller
import utils.GoogleDocsUploadUtility
import play.api.i18n.Messages
import play.api.Play
import models.Message._
import models.Type
import models.Access
import models.User
import java.util.Date
import models.Question
import models.Document._
import models.DocType
import net.liftweb.json.Serialization.{ read, write }
import models.PreviewImage
import utils.PasswordHashingUtil
import play.api.mvc.AnyContent
import play.api.Logger
import play.api.cache.Cache
import play.api.Play.current
import models.Document

object GoogleDocsUploadUtilityController extends Controller {

  implicit val formats = net.liftweb.json.DefaultFormats

  val redirectURI = Play.current.configuration.getString("GoogleRedirectUI").get
  val GoogleClientId = Play.current.configuration.getString("GoogleClientId").get
  val GoogleClientSecret = Play.current.configuration.getString("GoogleClientSecret").get

  def authenticateToGoogle(action: String): Action[AnyContent] = Action { implicit request =>

    val userId = request.session.get("userId")
    val tokenInfo = SocialToken.findSocialTokenObject(new ObjectId(userId.get))
    tokenInfo match {
      case None =>
        val urlToRedirect = new GoogleBrowserClientRequestUrl(GoogleClientId, redirectURI, Arrays.asList("https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/drive")).set("access_type", "offline").set("response_type", "code").build()
        Ok(urlToRedirect).withSession(request.session + ("action" -> action))
      case Some(tokenInfo) =>
        val newAccessToken = GoogleDocsUploadUtility.getNewAccessToken(tokenInfo.refreshToken)
        if (newAccessToken == "Not Found") {
          SocialToken.deleteSocialToken(tokenInfo.id)
          val urlToRedirect = new GoogleBrowserClientRequestUrl(GoogleClientId, redirectURI, Arrays.asList("https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/drive")).set("access_type", "offline").set("response_type", "code").build()
          Ok(urlToRedirect).withSession(request.session + ("action" -> action))
        } else {
          if (tokenInfo.tokenFlag) {
            SocialToken.updateTokenFlag(new ObjectId(request.session.get("userId").get), false)
            action match {
              case "show" =>
                val files = GoogleDocsUploadUtility.getAllDocumentsFromGoogleDocs(newAccessToken, true)
                Ok(write(files)).as("application/json")
              case "upload" =>
                Ok.withSession(request.session + ("accessToken" -> newAccessToken))
              case "document" =>
                val result = GoogleDocsUploadUtility.createANewGoogleDocument(newAccessToken, "application/vnd.google-apps.document")
                Ok(write(result)).as("application/json")
              case "spreadsheet" =>
                val result = GoogleDocsUploadUtility.createANewGoogleDocument(newAccessToken, "application/vnd.google-apps.spreadsheet")
                Ok(write(result)).as("application/json")
              case "presentation" =>
                val result = GoogleDocsUploadUtility.createANewGoogleDocument(newAccessToken, "application/vnd.google-apps.presentation")
                Ok(write(result)).as("application/json")
              /*else if (action == "addPreviewImageUrl") {
              println("111111111111111111")
              val files = GoogleDocsUploadUtility.getAllDocumentsFromGoogleDocs(newAccessToken)
              files.foreach(f => updateMessageImageUrl(updatePreviewImageUrl(f._1, f._5), f._5))
              Ok
            }*/ case _ =>
                Ok
            }
          } else {
            if (action.length() == 44) {
              val result = GoogleDocsUploadUtility.deleteAGoogleDocument(newAccessToken, action)
              Ok
            } else if (action == "addPreviewImageUrl") {
              val filesFromCache = Cache.get(userId.get)
              if (filesFromCache.isEmpty) {
                val files = GoogleDocsUploadUtility.getAllDocumentsFromGoogleDocs(newAccessToken, false)
                val docURLsToFind = Document.getAllGoogleDocumentsForAUser(new ObjectId(userId.get)) map {
                  case doc =>
                    doc.documentURL
                }
                val filesToUse = docURLsToFind map { case docURL => files.filter(f => f._2 == docURL) }
                Cache.set(userId.get, "himanshu", 60 * 2)
                if (!filesToUse.isEmpty) {
                  if (!filesToUse(0).isEmpty) {
                    for (f <- filesToUse) {
                      //if (GoogleDocsUploadUtility.canMakeGoogleDocPublic(newAccessToken, f._2)) {
                      val fileURL = f(0)._2.split("/")
                      if (fileURL.length >= 8) {
                        val fileId = fileURL(7)
                        if (GoogleDocsUploadUtility.isThumbnailNull(newAccessToken, f(0)._5))
                          deleteMessageImageUrl(deletePreviewImageUrl(f(0)._2))
                        else
                          updateMessageImageUrl(updatePreviewImageUrl(f(0)._2, f(0)._5), f(0)._5)
                      }
                      //}
                    }
                  }
                }
              }
              //TODO Remove it before pushing it on Production
              //              else {
              //                for (f <- filesFromCache.get) {
              //                  if (GoogleDocsUploadUtility.canMakeGoogleDocPublic(newAccessToken, f._2)) { 
              //                  updateMessageImageUrl(updatePreviewImageUrl(f._1, f._5), f._5)
              //}
              //                }
              Ok
            } else {
              val urlToRedirect = new GoogleBrowserClientRequestUrl(GoogleClientId, redirectURI, Arrays.asList("https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/drive")).set("access_type", "offline").set("response_type", "code").build()
              Ok(urlToRedirect).withSession(request.session + ("action" -> action))
            }
          }
        }
    }

  }

  /**
   * Google Oauth2 accessing code and exchanging it for Access & Refresh Token
   */
  def googleDriveAuthentication: Action[AnyContent] = Action { implicit request =>
    try {
      val code = request.queryString("code").toList(0)
      val url = "https://accounts.google.com/o/oauth2/token"
      val obj = new URL(url)
      val con = obj.openConnection().asInstanceOf[HttpsURLConnection]

      con.setRequestMethod("POST");
      con.setRequestProperty("User-Agent", USER_AGENT);
      con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

      val urlParameters = "code=" + code + "&client_id=" + GoogleClientId + "&client_secret=" + GoogleClientSecret + "&redirect_uri=" + redirectURI + "&grant_type=authorization_code&Content-Type=application/x-www-form-urlencoded";
      con.setDoOutput(true)
      val wr = new DataOutputStream(con.getOutputStream)
      wr.writeBytes(urlParameters)
      wr.flush
      wr.close
      val refreshTokenFound = SocialToken.findSocialTokenObject(new ObjectId(request.session.get("userId").get))
      refreshTokenFound match {
        case None =>
          val in = new BufferedReader(
            new InputStreamReader(con.getInputStream))
          val response = new StringBuffer

          while (in.readLine != null) {
            response.append(in.readLine)
          }
          in.close
          val nullExpr = "null".r
          val dataString = nullExpr.replaceAllIn(response.toString, "")
          val dataList = dataString.split(",").toList
          val tokenValues = dataList map {
            case info => net.liftweb.json.parse("{" + info + "}")
          }
          val accessToken = (tokenValues(0) \ "access_token").extract[String]
          val refreshToken = (tokenValues(2) \ "refresh_token").extract[String]
          SocialToken.addToken(SocialToken(new ObjectId(request.session.get("userId").get), refreshToken, true))
          val action = request.session.get("action").get
          Ok(views.html.stream(action))

        case Some(refreshToken) =>
          SocialToken.updateTokenFlag(new ObjectId(request.session.get("userId").get), true)
          val action = request.session.get("action").get
          Ok(views.html.stream(action))
      }
    } catch {
      case ex: Exception =>
        Logger.error("This error occurred while Authenticating Google Drive :- ", ex)
        Ok(views.html.stream("failure")) //BadRequest("Authentication Failed")
    }
  }

  /**
   * @Deprecated
   */
  def accessToken: Action[AnyContent] = Action { implicit request =>
    val access_Token = request.queryString("access_token").toList(0)
    request.session + ("access_token" -> access_Token)
    Ok.withSession(request.session + ("accessToken" -> access_Token))
  }
  /**
   * Uploading File To Google
   */
  def uploadToGoogleDrive: Action[play.api.mvc.MultipartFormData[play.api.libs.Files.TemporaryFile]] = Action(parse.multipartFormData) { request =>
    //    println("GoogleDocsUploadUtilityController uploadToGoogleDrive " + request.body.file("picture"))
    request.body.file("picture").map { file =>
      val contentType = file.contentType
      val fileName = file.filename
      val FileReceived: java.io.File = file.ref.file.asInstanceOf[java.io.File]
      val accessToken = request.session.get("accessToken").get
      val googleFileUrl = GoogleDocsUploadUtility.uploadToGoogleDrive(accessToken, FileReceived, fileName, contentType.get)
    }
    Redirect("/stream")
  }

}
