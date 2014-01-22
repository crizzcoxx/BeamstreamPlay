function startChat(userId) {
	var oldChatSocket = new WebSocket('ws://localhost:9000/chat')
	var oldId = randomString(8);
	$(".chatbox_own")
			.append(
					"<div id="
							+ oldId
							+ ">"
							+ '<div class="chatbox-header">'

							+ '<h1 class="friend"></h1>'

							+ '<div class="exit"></div>'

							+ '<div class="addfriends-btn"><a href="#"></a></div>'
							+ '</div>'

							+ '<div class="chatbox-body">'
							+ '<div class="chatbox-content">'

							+ '<div class="chat-feed" id="main">'
							+ '<div id="messages"></div>'
							+ '</div>'

							+ '</div>'

							+ '<div class="left-border"></div>'
							+ '<div class="right-border"></div>'
							+ '</div>'
							+ '<div class="chatbox-footer">'
							+ '<div class="my-avatar"></div>'
							+ '<textarea id="talk" name="styled-textarea" class="message" placeholder="Type message here...">'
							+ '</textarea>'
							+ '<p>Press enter to submit message</p>' + '</div>'
							+ '</div>');
	$("#" + oldId).css("display", "none");
	var oldSendMessage = function() {
		oldChatSocket.send(JSON.stringify({
			text : $("#" + oldId + " " + "textarea#talk").val()
		}))
		$("div#" + oldId + " " + "textarea#talk").val('')
	}

	var setNameOfUser = true;
	var oldReceiveEvent = function(event) {
		var data = JSON.parse(event.data)
		$(".chatbox_own").css("display", "block");
		$("#" + oldId).css("display", "block");
		$(".chatbox_own").css("position", "fixed");
		$(".chatbox_own").css("bottom", "0");
		if (setNameOfUser == true) {
			startChat();
			$("#" + oldId + " " + "div.chatbox-header h1.friend").text(
					data.user);
			setNameOfUser = false;
		}
		if (data.error) {
			oldChatSocket.close()
			$("#onError span").text(data.error)
			$("#onError").show()
			return

			

		}

		if (data.kind == "quit") {
			$("#" + oldId).remove();
			oldChatSocket.close();
			return

			

		}
		// Create the message element
		var el = $('<div class="message"><span></span><p></p></div>')
		$("span", el).text(data.user)
		$("p", el).text(data.message)
		$(el).addClass(data.kind)
		$("#" + oldId + " " + "div#messages").append(el)

	}

	var newHandleReturnKey = function(e) {
		if (e.charCode == 13 || e.keyCode == 13) {
			e.preventDefault()
			oldSendMessage()
		}
	}

	$("#" + oldId + " " + "textarea#talk").keypress(newHandleReturnKey)

	oldChatSocket.onmessage = oldReceiveEvent
	$("#" + oldId + " " + "div.chatbox-header div.exit").click(function() {
		$("#" + oldId).remove();
		oldChatSocket.close();
	});
}

function popit(userId, toWhom, name, profileImageUrl) {
	var newChatSocket = new WebSocket('ws://localhost:9000/startChat/' + userId
			+ "/" + toWhom)
	var itsId = randomString(8);
	$(".chatbox")
			.append(
					"<div id="
							+ itsId
							+ ">"
							+ '<div class="chatbox-header">'

							+ '<h1 class="friend"></h1>'

							+ '<div class="exit"></div>'

							+ '<div class="addfriends-btn"><a href="#"></a></div>'
							+ '</div>'

							+ '<div class="chatbox-body">'
							+ '<div class="chatbox-content">'

							+ '<div class="chat-feed" id="main">'
							+ '<div id="messages"></div>'
							+ '</div>'

							+ '</div>'

							+ '<div class="left-border"></div>'
							+ '<div class="right-border"></div>'
							+ '</div>'
							+ '<div class="chatbox-footer">'
							+ '<div class="my-avatar"></div>'
							+ '<textarea id="talk" name="styled-textarea" class="message" placeholder="Type message here...">'
							+ '</textarea>'
							+ '<p>Press enter to submit message</p>' + '</div>'
							+ '</div>');
	$("div#" + itsId + " " + "h1.friend").text(name);
	$(".chatbox").css("display", "block");
	var newSendMessage = function() {
		newChatSocket.send(JSON.stringify({
			text : $("#" + itsId + " " + "textarea#talk").val()
		}))
		$("div#" + itsId + " " + "textarea#talk").val('')
	}

	var newReceiveEvent = function(event) {
		var data = JSON.parse(event.data)
		if (data.error) {
			newChatSocket.close()
			$("#onError span").text(data.error)
			$("#onError").show()
			return

			

		}
		if (data.kind == "quit") {
			$("#" + itsId).remove();
			newChatSocket.close();
			return

			

		}

		// Create the message element
		var el = $('<div class="message"><span></span><p></p></div>')
		$("span", el).text(data.user)
		$("p", el).text(data.message)
		$(el).addClass(data.kind)
		$("#" + itsId + " " + "div#messages").append(el)

	}

	var newHandleReturnKey = function(e) {
		if (e.charCode == 13 || e.keyCode == 13) {
			e.preventDefault()
			newSendMessage()
		}
	}
	$("#" + itsId + " " + "textarea#talk").keypress(newHandleReturnKey)

	newChatSocket.onmessage = newReceiveEvent

	$("#" + itsId + " " + "div.chatbox-header div.exit").click(function() {
		$("#" + itsId).remove();
		newChatSocket.close();
	});

}