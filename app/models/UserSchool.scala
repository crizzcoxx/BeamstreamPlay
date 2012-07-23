package models

import com.novus.salat._
import com.novus.salat.global._
import com.novus.salat.annotations._
import com.novus.salat.dao._
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoConnection
import org.joda.time.DateTime
import org.bson.types.ObjectId
import utils.MongoHQConfig
import java.util.Date
import java.text.DateFormat
import net.liftweb.json.{ parse, DefaultFormats }
import net.liftweb.json.Serialization.{ read, write }

case class UserSchool(@Key("_id") id: ObjectId, schoolName: String, assosiatedSchoolId: ObjectId, year: Year.Value, degree: Degree.Value, major: String,
  graduated: Graduated.Value, graduationDate: Option[Date], degreeExpected: Option[DegreeExpected.Value], otherDegree: String, classes: List[Class])

object UserSchool {

  implicit val formats = DefaultFormats

  /*
   * Add a class to a school
   */
  def addClasstoSchool(schoolId: ObjectId, classList: List[Class]) {
    val school = UserSchoolDAO.find(MongoDBObject("_id" -> schoolId)).toList(0)
    UserSchoolDAO.update(MongoDBObject("_id" -> schoolId), school.copy(classes = (school.classes ++ classList)), false, false, new WriteConcern)
  }

  /*
   * Get UserSchoolById
   */

  def getUserSchoolById(userSchoolId: ObjectId): UserSchool = {
    val userSchool = UserSchoolDAO.find(MongoDBObject("_id" -> userSchoolId)).toList(0)
    userSchool

  }

  /*
    * Method for creating a school (For SchoolAutopoulate thing)
    */
  def createSchool(schools: List[UserSchool]) {
    for (school <- schools) {
      val userSchoolId = UserSchoolDAO.insert(school)
      val userSchoolObtained = UserSchool.getUserSchoolById(userSchoolId.get)
      println(userSchoolObtained + "I am the User School")

      val schoolsInDatabase = UserSchool.isSchoolinDatabaseAlready(userSchoolObtained.assosiatedSchoolId)

      if (schoolsInDatabase.size == 0) {
        //Creates a new School and set the proper schoolId in the inserted school
        val schoolIdForUpdatingUserSchool = School.addNewSchool(new School(new ObjectId, school.schoolName))
        UserSchool.updateUserSchoolWithOriginalSchoolId(userSchoolId.get, schoolIdForUpdatingUserSchool)
      } else {
        println("School Already Exist")
      }
    }
  }

  /*
   * Removes a school
   */
  def removeSchool(school: UserSchool) {
    UserSchoolDAO.remove(school)

  }

  /*
   * Find a school by name
   */

  def findSchoolsByName(name: String): List[UserSchool] = {
    val regexp = (""".*""" + name + """.*""").r
    for (school <- UserSchoolDAO.find(MongoDBObject("schoolName" -> regexp)).toList) yield school
  }

  /*
   * Find a school by Id
   */

  def findSchoolsById(schoolId: ObjectId): String = {
    val schoolName = UserSchoolDAO.find(MongoDBObject("_id" -> schoolId)).toList(0).schoolName
    schoolName
  }

  /*
   * Get all school for a user
   */
  def getAllSchoolforAUser(userId: ObjectId): List[ObjectId] = {
    val user = UserDAO.find(MongoDBObject("_id" -> userId)).toList(0)
    user.schoolId

  }

  /*
   * Update User School(For SchoolAutopoulate thing)
   */
  def updateUserSchoolWithOriginalSchoolId(userSchoolToUpdate: ObjectId, originalSchoolId: ObjectId) {
    val userSchool = UserSchoolDAO.find(MongoDBObject("_id" -> userSchoolToUpdate)).toList(0)
    UserSchoolDAO.update(MongoDBObject("_id" -> userSchoolToUpdate), userSchool.copy(assosiatedSchoolId = originalSchoolId), false, false, new WriteConcern)
  }

  /*
   * is School already in database
   */

  def isSchoolinDatabaseAlready(schoolId: ObjectId): List[School] = {
    val schoolsInDatabase = SchoolDAO.find(MongoDBObject("_id" -> schoolId)).toList
    schoolsInDatabase
  }

  /*
   * get all schools List
   */

  def getAllSchools(schoolsIdList: List[ObjectId]): List[UserSchool] = {
    var schoolList: List[UserSchool] = List()
    for (schoolId <- schoolsIdList) {
      val schoolObtained = UserSchoolDAO.find(MongoDBObject("_id" -> schoolId)).toList
      schoolList ++= schoolObtained
    }
    schoolList
  }
}

object Year extends Enumeration {

  val Freshman = Value(0, "Freshman")
  val Sophomore = Value(1, "Sophomore")
  val Junior = Value(2, "Junior")
  val Senior = Value(3, "Senior")
  val Graduated_Masters = Value(4, "Graduated(Master's)")
  val Graduated_Phd = Value(5, "Graduated(Phd)")
  val Other = Value(6, "Other")
}

object DegreeExpected extends Enumeration {
  val Winter2012 = Value(0, "Winter 2012")
  val Summer2013 = Value(1, "Summer 2013")
  val Winter2013 = Value(2, "Winter 2013")
  val Summer2014 = Value(3, "Summer 2014")
  val Winter2014 = Value(4, "Winter 2014")
  val Summer2015 = Value(5, "Summer 2015")
  val Winter2015 = Value(6, "Winter 2015")
  val NoDegreeExpected = Value(7, "No Degree Expected")
}

object Degree extends Enumeration {
  val Bachelors = Value(0, "Bachelor's")
  val Masters = Value(1, "Master's")
  val Assosiates = Value(2, "Assosiates(AA)")
  val Doctorate = Value(3, "Doctorate(Phd)")
  val Other = Value(4, "Other")

}

object Graduated extends Enumeration {
  val Yes = Value(0, "yes")
  val No = Value(1, "no")
  val StillAttending = Value(2, "attending")

}

object UserSchoolDAO extends SalatDAO[UserSchool, ObjectId](collection = MongoHQConfig.mongoDB("userschool"))