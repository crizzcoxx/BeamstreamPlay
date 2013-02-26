package controllers
import org.bson.types.ObjectId
import org.neo4j.graphdb.Node
import models.ProfileImageProviderCache
import models.ResulttoSent
import models.User
import models.User
import models.UserMedia
import net.liftweb.json.Serialization.read
import net.liftweb.json.Serialization.write
import net.liftweb.json.DefaultFormats
import net.liftweb.json.parse
import play.api.data.Forms._
import play.api.libs.json.JsValue
import play.api.libs.json.Json
import play.api.mvc._
import play.api.mvc.Controller
import play.api.mvc.Response
import play.api._
import play.libs._
import play.mvc.Http.Request
import utils._
import utils.SocialGraphEmbeddedNeo4j
import play.api.cache.Cache
import play.api.Play.current
import utils.onlineUserCache
import net.liftweb.json.{ parse, DefaultFormats }
import net.liftweb.json.Serialization.{ read, write }
import models.UserType

object SocialController extends Controller {
  implicit val formats = DefaultFormats
  /**
   * Authenticate users for Janrain Engage. (RA)
   * http://developers.janrain.com/documentation/api/auth_info/
   *
   * Returns a JSON of user profile information
   */
  def authenticateUser = Action { implicit request =>
    try {

      val tokenList = request.body.asFormUrlEncoded.get.values.toList(0)
      val token = tokenList(0)
      val apiKey = Play.current.configuration.getString("janrain_apiKey").get
      val URL = "https://rpxnow.com/api/v2/auth_info"
      val promise = WS.url(URL).setQueryParameter("format", "json").setQueryParameter("token", token).setQueryParameter("apiKey", apiKey).get
      val res = promise.get
      val body = res.getBody
      val json = Json.parse(body)
      val providerName = (json \ "profile" \ "providerName").asOpt[String].get

      if (providerName == "Facebook") { println(json); Ok("From Facebook") }
      else if (providerName == "Twitter") { println(json); Ok("From Twitter") }
      else if (providerName == "Google") {
        val verifiedEmail = (json \ "profile" \ "verifiedEmail").asOpt[String].get
        val userToCreate = new User(new ObjectId, UserType.Professional, verifiedEmail, "", "", "", "", None, "", "", "", "", "", Option(providerName), List(), List(), List(), List(), List())
        val IdOfUserCreted = User.createUser(userToCreate)
        Ok(views.html.registration(IdOfUserCreted.toString, Option(json.toString)))
      } else if (providerName == "LinkedIn") { println(json); Ok("From LinkedIn") }
      else { Ok("Other") }
      //    identifier match {
      //      case Some(id) => {
      //        Ok(body).as("application/json").withSession(
      //          session + ("social_identifier" -> id))
      //      }
      //      case None => {
      //        Ok(body).as("application/json")
      //      }
      //    }
    } catch {
      case ex => Ok(write("Something wrong happend")).as("application/json")
    }
  }

  /**
   * Get a list of all the social contacts related to the user.
   * http://developers.janrain.com/documentation/api/get_contacts/
   *
   * Returns a JSON of user contact information
   */
  def getContacts = Action { implicit request =>
    session.get("social_identifier").map { identifier =>
      val apiKey = Play.current.configuration.getString("janrain_apiKey").get
      val URL = "https://rpxnow.com/api/v2/get_contacts"

      val promise = WS.url(URL).setQueryParameter("format", "json").setQueryParameter("identifier", identifier).setQueryParameter("apiKey", apiKey).get
      val res = promise.get
      val body = res.getBody
      Ok(body).as("application/json")
    }.getOrElse {
      Unauthorized("You are not an authorized user!");
    }
  }
}
