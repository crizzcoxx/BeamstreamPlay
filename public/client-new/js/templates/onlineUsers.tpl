<!-- 	* BeamStream
		*
		* Author                : Aswathy P.R (aswathy@toobler.com)
		* Company               : Toobler
		* Email:                : info@toobler.com
		* Web site              : http://www.toobler.com
		* Created               : 28/February/2013
		* Description           : Templates for online user widget
		* ==============================================================================================
		* Change History:
		* ----------------------------------------------------------------------------------------------
		* Sl.No.  Date   Author   Description
		* -
  -->
{{#each .}}
			<div class="chat-box" >
			    <div class="chat-window">
			        <div id="chat-status" class="chat-open"><span class="online-count">Online  (0)</span> <span class="chat-show"></span></div>
			        <div id="user-online" class="scroll-block chat-view">
			            <ul id="onlinechatbox">

	            		<li id="me" class="online"> <a href="#" class"active"><img src="" width="30" height="28"> <span>Me</span> <span class="online-chat"></span></a></li>
		            	 
			           
			            </ul>
			    	</div>
			    </div>
			</div>

{{/each}}