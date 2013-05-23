<!-- 	* BeamStream
		*
		* Author                : Aswathy P.R (aswathy@toobler.com)
		* Company               : Toobler
		* Email:                : info@toobler.com
		* Web site              : http://www.toobler.com
		* Created               : 15/March/2013
		* Description           : Templates Discussion page messages
		* ==============================================================================================
		* Change History:
		* ----------------------------------------------------------------------------------------------
		* Sl.No.  Date   Author   Description
		* -
  -->


<div id= "{{data.message.id.id}}" class="ask-outer follow-container" name ="{{data.message.userId.id}}">
            <div class="ask-content">
              <div class="follw-left">
               
                  <div  class="ask-img"><img id="{{data.message.id.id}}-img" src="{{#if data.profilePic}}{{data.profilePic}}{{else}}/beamstream-new/images/profile-upload.png{{/if}}"></div>

                  
					{{#ifequal data.followerOfMessagePoster false}}
               		   <a href="#" id="{{data.message.userId.id}}" class="follow-button follow-user" data-value="follow">follow</a>
					{{else}}
						<a href="#" id="{{data.message.userId.id}}" class="follow-button follow-user" data-value="unfollow">unfollow</a>
					{{/ifequal}}
                  
              </div>
              <div  class="ask-info">
                <div class="ask-comment">
                  <div class="follow-names">
                    <ul class="follow-name-left ">
                      <li><span id="{{data.message.userId.id}}" >@{{data.message.firstNameofMsgPoster}} {{data.message.lastNameofMsgPoster}} </span> -  {{data.message.timeCreated}}  -  {{data.message.messageAccess.name}}</li>
                    </ul>
                    <div class="follow-right">
                    	{{#ifequal data.followed false}}
	                    	<a id="{{data.message.id.id}}-follow" href="#" class="follow-button follow-message" data-value="follow">follow
	                    	</a>
	                    {{else}}
	                    	<a id="{{data.message.id.id}}-follow" href="#" class="follow-button follow-message" data-value="unfollow">unfollow
	                    	</a>
                     	{{/ifequal}}
                    </div>
                  </div>
                  <p id="{{data.message.id.id}}-id" >{{data.message.messageBody}}</p>
                  
                  
                   <!-- start doc section -->
                   
                   {{#ifequal contentType "docs"}}
		                  <div id="Docs" class="doc">
		                  
		                  <div class="item">  
						  <div    name="single-doc">
						 <div class="image-wrapper hovereffect" >
						  <div class="hover-div">
						   <div class="doc-image">
						   		
		                  		{{#if commenImage}}
		                 			 <img  src="{{previewImage}}" class="cover-picture" /> <h3 class="common-doctext" >{{extension}}</h3>
		                 		{{else}}
		                 			<img  src="{{data.message.anyPreviewImageUrl}}" class="cover-picture" /> 
		                         {{/if}}
		                  	</div>
						    <div class="hover-text">               
						     <div class="comment-wrapper" id="{{data.message.docIdIfAny.id}}">                                
						     <div id="media-{{data.message.docIdIfAny.id}}">
						      <h4 id="name-{{data.message.docIdIfAny.id}}" >{{#if data.docName}}{{data.docName}}{{else}}No Document Name{{/if}}</h4>                                
						      <div  class="description-info "><div name={{type}}  class="description-left mediapopup drag-rectangle" id="{{data.message.docIdIfAny.id}}">
						        <input type="hidden" id="id-{{data.message.docIdIfAny.id}}"  value="{{data.message.messageBody}}">      
						        <p class="doc-description" id="description-{{data.message.docIdIfAny.id}}" >{{#if data.docDescription}}{{data.docDescription}}{{else}}No Document Description..{{/if}}</p>
						      </div>
						      <div id="{{data.message.docIdIfAny.id}}" class="comment-wrapper2">
						      <a href="#" class="tag-icon" data-original-title="Search by Users"></a><a href="#" class="hand-icon rock_documents"></a>
						      <a href="#" class="message-icon"></a><a href="#" class="share-icon"></a>
						      </div></div></div>
								
							      <div class="edit-title-div">
								 {{#ifequal loggedUserId data.message.userId.id }}
						     	 	<h5 class="editMediaTitle"   id="{{data.message.docIdIfAny.id}}"><span><img src="/beamstream-new/images/title-plus.png"></span>Edit Title & Description</h5>
								  {{/ifequal}}
		                    	  </div>
								
						     <div class="dateinfo"><span class="state">{{data.message.messageAccess.name}}</span><span class="date">{{datVal}}</span></div>
						    </div>
						   </div>
						  </div>
						 </div>
						
						   <div id="{{data.message.docIdIfAny.id}}-docRockers-list" class="docRockers_popup"></div>
						   </div>  
						</div> 
		
		                   
		                  </div>



	                 	<!-- shows the documents contents in a frame -->
						<div id="document-{{data.message.docIdIfAny.id}}" style="top: 50% !important; Z-index:9999" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-header">
						  		<a class="close" data-dismiss="modal">×</a>
							</div>
							<div class="modal-body" style="max-height:none !important;"> 

							<h4>{{data.docName}}</h4>
						  		<p>
								  	<iframe id ="iframe-{{data.message.docIdIfAny.id}}" src="" scrolling="NO"  width="963" height="500" style="border: none">
										<p>Your browser does not support iframes.</p>
									</iframe> 
								</p>	
							</div>
						</div>



		                  
                  {{/ifequal}}
                   <!-- End doc section -->
                  
                  
                  <!-- start Image / video section -->
                  
                  {{#ifequal contentType "media"}}
	                  <div id="Docs" class="doc">
	                  
	                  <div  class="item">  
						  <div id="{{data.message.docIdIfAny.id}}"   name="single-doc">
						<div class="image-wrapper hovereffect" >
						  <div class="hover-div"><img class="filmedia-picture" src="{{data.message.anyPreviewImageUrl}}">
						    <div class="hover-text">               
						     <div class="comment-wrapper" id="{{data.message.docIdIfAny.id}}">                                
						     <div id="media-{{data.message.docIdIfAny.id}}">
						      <h4 id="name-{{data.message.docIdIfAny.id}}" >{{#if data.docName}}{{data.docName}}{{else}}No Media Name{{/if}}</h4>                                
						      <div class="description-info">      
						         <div class="gallery"></div>
						         
						         <!-- image preview -->
						         {{#ifequal data.message.messageType.name "Image"}}
								    <div class="gallery">
							           <a href="{{data.message.anyPreviewImageUrl}}" style="text-decoration: none" rel="prettyPhoto[gallery2]">
							              <div class="description-left photo-popup">   
							              <p class="google_doc doc-description" id="description-{{data.message.docIdIfAny.id}}"><input type="hidden" id="id-{{data.message.docIdIfAny.id}}" value="doc.url">{{#if data.docDescription}}{{data.docDescription}}{{else}}No Media Description{{/if}}</p>
								        </div>
							           </a>
								   </div>  
							   {{/ifequal}} 
							   
							   <!-- Video preview -->
					           {{#ifequal data.message.messageType.name "Video"}}  
			            		 <div class="gallery hrtxt">
					           		<a href="{{data.message.messageBody}}" style="text-decoration: none" rel="prettyPhoto[gallery1]">
					              		<div class="description-left photo-popup">   
					              			<p class="google_doc doc-description" id="description-{{data.message.docIdIfAny.id}}"><input type="hidden" id="id-{{data.message.docIdIfAny.id}}" value="doc.url">{{#if data.docDescription}}{{data.docDescription}}{{else}}No Media Description{{/if}}</p>
						   				 </div>
					          		 </a>
								 </div> 
						       {{/ifequal}} 
						    
						      <div id="{{data.message.docIdIfAny.id}}" class="comment-wrapper2">
						      <a href="#" class="tag-icon" data-original-title="Search by Users"></a><a href="#" class="hand-icon rock_media"></a>
						      <a href="#" class="message-icon"></a><a href="#" class="share-icon"></a>
						      </div></div></div>
						      
						      <div class="edit-title-div">
								{{#ifequal loggedUserId data.message.userId.id }}
						      		<h5 class="editMediaTitle" id="{{data.message.docIdIfAny.id}}"><span><img src="beamstream-new/images/title-plus.png"></span>Edit Title & Description</h5>
						        {{/ifequal}}
						      </div>        
						     <div class="dateinfo"><span class="state">{{data.message.messageAccess.name}}</span><span class="date">{{datVal}}</span></div>
						    </div>
						   </div>
						  </div>
						</div>  
						
						</div>
					</div>
	
	                  </div>
	                  
	               {{/ifequal}}
                  <!-- End Image / video section -->
                  
                  
                  
                  
                  <div class="follow-bottom">
                    <ul class="follow-name-left show-all-block">
                   	  <li>
                        	<a href="#" id="{{data.message.id.id}}-msgRockCount"  {{#ifequal data.rocked false}} class="rocks-message uprocks-message" {{else}} class="rocks-message downrocks-message" {{/ifequal}} >
                        		<span>{{data.message.rocks}}</span>
                        	</a>
                    	</li>
                      <li><a class="rock-message" href="#">Rock</a></li>
                      <li ><a class="add-comment" href="#"> Comment</a></li>
                      <li><a class="comment-icon" href="#"></a></li>
                      <li><a id="" href="#" class="delete_msg drag-rectangle" data-original-title="Flag this"></a></li>
                    </ul>
                    
                  </div>
                  <div id="{{data.message.id.id}}-addComments" class="follow-comment">
					<textarea id="{{data.message.id.id}}-msgComment" class="add-message-comment" rows="" cols="" placeholder="Add Comments.." onfocus="this.placeholder = ''" onblur="this.placeholder = 'Add Comments..'" ></textarea>
				 </div>
				 <a id="{{data.message.id.id}}" href="#" data-original-title="Delete" href="#" class="delete_post drag-rectangle" ></a>
                </div>
                <div class="answer-info">
                  <div class="answer-conatiner">
                    <div class="button-block">
                      <ul class="follow-name-left show-all-block">
                        
                        <a class="btn grey-buttons who-rocked-it" href="#">Who Rocked It?</a><a class="btn grey-buttons show-all-comments" href="#"> <span id="{{data.message.id.id}}-totalComment" >{{data.comments.length}}</span> Comments</a>
						<a id="{{data.message.id.id}}-show-hide" class="btn grey-buttons  show-all" href="#">Show All</a>
                      </ul>
                       
                      </div>
                      <div id="{{data.message.id.id}}-allComments" class="comment-wrapper commentList" >
                      
                      {{#each data.comments}}
                      
                       <div class="answer-description"  id="{{comment.id.id}}">
                        <div class="follw-left">          
                            <div class="ask-img"><img id="{{comment.id.id}}-image" src="{{#if profilePic}}{{profilePic}}{{else}}/beamstream-new/images/profile-upload.png{{/if}}"></div>                      
                        </div>
                        <div class="answer-description-info">
                          <div class="follow-names">
                            <ul class="follow-name-left show-all-block">
                              <li><span>@{{comment.firstNameofCommentPoster}} {{comment.lastNameofCommentPoster}} </span> -  {{comment.timeCreated}}  -  Public</li>
                              <li ><a href="#" class="rock-comments" >Rock</a></li>
                              <li class="rocks-small"><a id="{{comment.id.id}}-mrockCount" href="#">{{comment.rocks}}</a></li>
                              <li><a class="comment-icon" href="#"></a></li>
                                 
                            </ul>
                          </div>
                          <p>{{comment.commentBody}}</p>
                          <a id="{{comment.id.id}}" href="#" data-username={{comment.userId.id}} data-original-title="Delete" class="delete_comment drag-rectangle" ></a>
                        </div>
                        <div class="clear"></div>
                      </div>
                      
                      
                      {{/each}}


                      
                      </div>
					  <div id="{{data.message.id.id}}-newCommentList" class="comment-wrapper" style="display: none;">
                      </div>
                       <div id="{{data.message.id.id}}-msgRockers" class="comment-wrapper" style="display: none;">

                       	{{#each data.rockersNames}}
                      
                       <div class="answer-description" >
                        <div class="follw-left">          
                                     
                        </div>
                        <div class="answer-description-info">
                          <div class="follow-names">
                            <ul class="follow-name-left show-all-block">
                              <li><span>@{{.}}  </span> </li>
                              
                            </ul>
                          </div>
                        </div>
                        <div class="clear"></div>
                      </div>
                      
                      {{/each}}

                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clear"></div>

          </div>
          
          
          
          
          
          