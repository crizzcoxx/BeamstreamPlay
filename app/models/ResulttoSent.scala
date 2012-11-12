package models
import java.io.InputStream


/*
 * JSON format for response 
 * @purpose :  Success or failure
 */
case class ResulttoSent(status: String,
  message: String)
  
  case class DocResulttoSent(docId: String,
  docUrl: String)

//Resultant Class Details
case class ClassWithNoOfUsers(usersMap:Map[String, Int] , classToReturn:Class)  
case class SchoolResultsToSend(schools:List[UserSchool],resultToSend:ResulttoSent) 


