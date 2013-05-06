package models

import org.scalatest.FunSuite
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import com.sun.org.apache.xalan.internal.xsltc.compiler.ForEach
import org.scalatest.BeforeAndAfter
import com.mongodb.casbah.commons.MongoDBObject
import org.bson.types.ObjectId
import java.text.DateFormat
import java.util.Date

@RunWith(classOf[JUnitRunner])
class QuestionTest extends FunSuite with BeforeAndAfter {
  val formatter: DateFormat = new java.text.SimpleDateFormat("dd-MM-yyyy")

  val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "", "NeelS", "", Option("Neel"), "", "", "", "", "", None, List(), List(), List(), List(), List(), None)
  val stream = Stream(new ObjectId, "Beamstream stream", StreamType.Class, user.id, List(user.id), true, List())

  before {
    UserDAO.remove(MongoDBObject("firstName" -> ".*".r))
    QuestionDAO.remove(MongoDBObject("questionBody" -> ".*".r))
    StreamDAO.remove(MongoDBObject("name" -> ".*".r))
    User.createUser(user)
    Stream.createStream(stream)
  }

  test("Create a Question & remove a Question") {
    val question = Question(new ObjectId, "How Was the Class ?", user.id, QuestionAccess.Public, stream.id, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
    val questionId = Question.addQuestion(question)
    assert((Question.findQuestionById(questionId.get).get.questionBody) === "How Was the Class ?")
    val anotherQuestion = Question(new ObjectId, "How Was the Day ?", user.id, QuestionAccess.Public, stream.id, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
    val anotherQuestionId = Question.addQuestion(anotherQuestion)
    assert((Question.findQuestionById(anotherQuestionId.get).get.questionBody) === "How Was the Day ?")
    // Remove A Question
    Question.removeQuestion(anotherQuestion)
    assert((Question.findQuestionById(anotherQuestionId.get) === None))
  }

  test("Get All Questions") {
    val question = Question(new ObjectId, "How Was the Class ?", user.id, QuestionAccess.Public, stream.id, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
    val questionId = Question.addQuestion(question)
    val anotherQuestion = Question(new ObjectId, "How Was the Day ?", user.id, QuestionAccess.Public, stream.id, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
    val anotherQuestionId = Question.addQuestion(anotherQuestion)
    assert(Question.getAllQuestions(List(anotherQuestionId.get, questionId.get)).size === 2)
  }
  //
  //  test("Find Question By Id") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    var stream = Stream(new ObjectId, "al1pha", StreamType.Class, userId, List(userId), true, List("Tag1", "Tag2"))
  //    val streamId = Stream.createStream(stream)
  //    val question = new Question(new ObjectId, "How Was the Class ?", userId, QuestionAccess.Public, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val questionId = Question.addQuestion(question)
  //    val anotherQuestion = new Question(new ObjectId, "How Was the Day ?", userId, QuestionAccess.Public, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val anotherQuestionId = Question.addQuestion(anotherQuestion)
  //    assert(Question.findQuestionById(anotherQuestionId).size === 1)
  //  }
  //
  //  test("Rocking The Question And Getting The Rockers") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    var stream = Stream(new ObjectId, "al1pha", StreamType.Class, userId, List(userId), true, List("Tag1", "Tag2"))
  //    val streamId = Stream.createStream(stream)
  //    val question = new Question(new ObjectId, "How Was the Class ?", userId, QuestionAccess.Public, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val questionId = Question.addQuestion(question)
  //    Question.rockTheQuestion(questionId, userId)
  //    assert(Question.rockersNameOfAQuestion(questionId) === List("Neel"))
  //    assert(Question.rockersNameOfAQuestion(questionId).size === 1)
  //  }
  //
  //  test("Privacy Of The Question(For A Class , For A School)") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    var stream = Stream(new ObjectId, "al1pha", StreamType.Class, userId, List(userId), true, List("Tag1", "Tag2"))
  //    val streamId = Stream.createStream(stream)
  //    val question = new Question(new ObjectId, "How Was the Class ?", userId, QuestionAccess.PrivateToClass, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val questionId = Question.addQuestion(question)
  //    val anotherQuestion = new Question(new ObjectId, "How Was the Day ?", userId, QuestionAccess.PrivateToSchool, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val anotherQuestionId = Question.addQuestion(anotherQuestion)
  //    val yetAnotherQuestion = new Question(new ObjectId, "How Was the Day ?", userId, QuestionAccess.PrivateToSchool, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val yetAnotherQuestionId = Question.addQuestion(yetAnotherQuestion)
  //    assert(Question.getAllPrivateToAClassQuestionForAUser(userId).size == 1)
  //    assert(Question.getAllPrivateToASchoolQuestionForAUser(userId).size == 2)
  //  }
  //
  //  test("Delete The Question") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    var stream = Stream(new ObjectId, "al1pha", StreamType.Class, userId, List(userId), true, List("Tag1", "Tag2"))
  //    val streamId = Stream.createStream(stream)
  //    val question = new Question(new ObjectId, "How Was the Class ?", new ObjectId, QuestionAccess.PrivateToClass, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val questionId = Question.addQuestion(question)
  //    val anotherQuestion = new Question(new ObjectId, "How Was the Day ?", userId, QuestionAccess.PrivateToSchool, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val anotherQuestionId = Question.addQuestion(anotherQuestion)
  //    assert(Question.deleteQuestionPermanently(questionId, userId) === false) //User Who Deletes The Question Is Not The Creator Of Question So Not Authorized To delete
  //    assert(Question.deleteQuestionPermanently(anotherQuestionId, userId) === true) //User Who Deletes The Question Is  The Creator Of Question So  Authorized To delete
  //  }
  //
  //  test("Follow The Question") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    var stream = Stream(new ObjectId, "al1pha", StreamType.Class, userId, List(userId), true, List("Tag1", "Tag2"))
  //    val streamId = Stream.createStream(stream)
  //    val question = new Question(new ObjectId, "How Was the Class ?", userId, QuestionAccess.PrivateToClass, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val questionId = Question.addQuestion(question)
  //    assert(Question.findQuestionById(questionId).head.followers.size === 0)
  //    Question.followQuestion(userId, questionId)
  //    assert(Question.findQuestionById(questionId).head.followers.size === 1)
  //  }
  //
  //  test("Add Comment To Question") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    var stream = Stream(new ObjectId, "al1pha", StreamType.Class, userId, List(userId), true, List("Tag1", "Tag2"))
  //    val streamId = Stream.createStream(stream)
  //    val question = new Question(new ObjectId, "How Was the Class ?", userId, QuestionAccess.PrivateToClass, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val questionId = Question.addQuestion(question)
  //    assert(Question.findQuestionById(questionId).head.comments.size === 0)
  //    val comment = new Comment(new ObjectId, "Comment1", new Date, userId, user.firstName, user.lastName, 0, List(userId))
  //    val commentId = Comment.createComment(comment)
  //    Question.addCommentToQuestion(commentId, questionId)
  //    assert(Question.findQuestionById(questionId).head.comments.size === 1)
  //  }
  //  test("Add Poll To Question") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    var stream = Stream(new ObjectId, "al1pha", StreamType.Class, userId, List(userId), true, List("Tag1", "Tag2"))
  //    val streamId = Stream.createStream(stream)
  //    val question = new Question(new ObjectId, "How Was the Class ?", userId, QuestionAccess.PrivateToClass, streamId, "Neel", "Sachdeva", new Date, List(), List(), List(), List())
  //    val questionId = Question.addQuestion(question)
  //    assert(Question.findQuestionById(questionId).head.pollOptions === None)
  //    val option = OptionOfQuestion(new ObjectId, "Poll1", List(userId))
  //    val pollId = OptionOfQuestionDAO.insert(option)
  //    Question.addPollToQuestion(pollId.get, questionId)
  //    assert(Question.findQuestionById(questionId).head.pollOptions.size === 1)
  //  }
  //  test("Vote A Option Of A Question") {
  //    val user = User(new ObjectId, UserType.Professional, "neel@knoldus.com", "Neel", "Sachdeva", "", "Neil", "Neel", "Knoldus", "", "", List(), List(), List(), List(), List(), List())
  //    val userId = User.createUser(user)
  //    val option = OptionOfQuestion(new ObjectId, "Poll1", List())
  //    val pollId = OptionOfQuestionDAO.insert(option)
  //    assert(QuestionPolling.findOptionOfAQuestionById(pollId.get).get.voters.size===0)
  //    QuestionPolling.voteTheOptionOfAQuestion(pollId.get, userId)
  //    assert(QuestionPolling.findOptionOfAQuestionById(pollId.get).get.voters.size===1)
  //  }
  //
  after {
    UserDAO.remove(MongoDBObject("firstName" -> ".*".r))
    QuestionDAO.remove(MongoDBObject("questionBody" -> ".*".r))
    StreamDAO.remove(MongoDBObject("name" -> ".*".r))
  }
}