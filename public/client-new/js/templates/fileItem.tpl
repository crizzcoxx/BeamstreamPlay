{{#ifequal fileType "image"}}
<li   data-rock="{{data.rocks}}" data-date-created="{{data.dateCreated}}" class="item" >
			<div class="image-wrapper hovereffect"  id="{{data.id.id}}">
				<div class="hover-div">
					<img class="filmedia-picture" src="{{data.mediaUrl}}">
					<div class="hover-text">
						<div class="comment-wrapper"> 
							<a href="#imagelist" class="image-list" style="text-decoration: none">
								<div id="media-{{id.id}}" >
								<h4 id="name-{{images.id.id}}">{{#if data.name}}{{data.name}}{{else}}Image Name{{/if}}</h4>
								<div class="description-info">
								<div class="description-left">
									<p class="doc-description " id="description-{{data.id.id}}" >{{#if data.description}}{{data.description}}{{else}}Image Description{{/if}}</p>
								</div>
							</a>
							<div id="{{data.id.id}}" class="comment-wrapper2">
								<a href="#" class="tag-icon" data-original-title="Search by Users"></a>   
								<a href="#" class="hand-icon rock-medias"></a>
								<a href="#" class="message-icon"></a>   
							 	<a href="#" class="share-icon"></a>
							</div>
						</div>
					</div>
					<h5 class="imgtitle" id="{{data.id.id}}">
						<span><img src="images/title-plus.png"></span> Title & Description
					</h5>    
					<div class="dateinfo">
						<span class="state">{{data.access.name}}</span>
						<span class="date">{{data.dateCreated}}</span>
					</div>
				</div>
			</div>
			</div>
			<div class="comment-wrapper1"> <a class="common-icon camera" href="#"></a>
				<ul id="{{data.id.id}}-activities" class="comment-list">
					<li><a class="eye-icon" href="#">0</a></li>
					<li><a class="hand-icon" href="#">0</a></li>
					<li><a class="message-icon" href="#">0</a></li>
				</ul>
			</div>
		</li>
{{/ifequal}}
{{#ifequal fileType "video"}}
	<li data-rock="{{data.rocks}}" data-date-created="{{data.dateCreated}}" class="item" >
			<div class="image-wrapper hovereffect">
			<div class="hover-div">
				<img class="filmedia-picture" src="{{data.frameURL}}">
				<div class="hover-text">               
					<div class="comment-wrapper">                               
						<a href="#videos" class="video-list" style="text-decoration: none">
							<div id="media-{{data.id.id}}">
							<h4 id="name-{{data.id.id}}">{{#if data.name}}{{data.name}}{{else}}Video Name {{/if}}</h4>
							<div class="description-info">
							<div class="description-left">
								<p id="description-{{data.id.id}}" class="doc-description ">{{#if data.description}} {{data.description}}{{else}}Video Description{{/if}}</p>
							</div>
						</a>
						<div id="{{data.id.id}}" class="comment-wrapper2">
							<a href="#" class="tag-icon" data-original-title="Search by Users"></a>   
							<a href="#" class="hand-icon rock-medias"></a>
							<a href="#" class="message-icon"></a>    
							<a href="#" class="share-icon"></a>
						</div>
					</div>
				</div>
					<h5 class="videotitle" id="{{data.id.id}}">
						<span><img src="images/title-plus.png"></span> Title & Description
					</h5>          
					<div class="dateinfo">
						<span class="state">{{data.access.name}}</span>
						<span class="date">{{data.dateCreated}}</span>
					</div>
				</div>
			</div>
			</div>
			<div class="comment-wrapper1"> <a class="common-icon video" href="#"></a>
				<ul id="{{data.id.id}}-activities" class="comment-list">
					<li><a class="eye-icon" href="#">0</a></li>
					<li><a class="hand-icon" href="#">{{data.rocks}}</a></li>
					<li><a class="message-icon" href="#">0</a></li>
				</ul>
			</div>
		</li>
{{/ifequal}}
{{#ifequal fileType "documents"}}
	<li data-groups="["recent"]" data-date-created="{{data.creationDate}}" class="item" >
			<div class="image-wrapper hovereffect" id="{{data.id.id}}">
		 		<div class="hover-div">
			 		<img class="cover-picture" src="/beamstream-new/images/textimage.png ">
					<div class="hover-text">              
						<div class="comment-wrapper">                               
							<a href="#docs"  class="document-list" style="text-decoration: none">
							 	<div id="media-{{data.id.id}}" >
							 	<h4 id="name-{{data.id.id}}">{{#if data.documentName}}{{data.documentName}}{{else}}Document Name{{/if}}</h4>
								<div class="description-info">
								<div class="description-left">
									<p id="description-{{data.id.id}}" class="doc-description ">{{#if data.documentDescription}}{{data.documentDescription}}{{else}}Document Description{{/if}}</p>
								</div>
							</a>
							<div id="{{data.id.id}}" class="comment-wrapper2">
								<a href="#" class="tag-icon" data-original-title="Search by Users">
								</a>   	
								<a href="#" class="hand-icon rock_docs"></a>
								<a href="#" class="message-icon"></a>
								<a href="#" class="share-icon"></a>
							</div>
						</div>
					</div>
					<h5 class="doctitle" id="{{data.id.id}}">
						<span><img src="/beamstream-new/images/title-plus.png"></span> Title & Description
					</h5>          
					<div class="dateinfo">
						<span class="state">{{data.documentAccess.name}}</span>
						<span class="date">{{data.creationDate}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="comment-wrapper1"> <a class="common-icon data" href="#"></a>
			<ul id="{{data.id.id}}-activities" class="comment-list">
			<li><a class="eye-icon" href="#">0</a></li>
			<li><a class="hand-icon" href="#">{{data.documentRocks}}</a></li>
			<li><a class="message-icon" href="#">0</a></li>
			</ul>
		</div>
		</li>
{{/ifequal}}
{{#ifequal fileType "pdf"}}
	<li data-groups="["oldest"]" data-date-created="{{data.creationDate}}" class="item" >
			<div class="image-wrapper hovereffect" id="{{data.id.id}}">
		 		<div class="hover-div">
			 		<img class="cover-picture" src="{{data.previewImageUrl}}">
					<div class="hover-text">              
						<div class="comment-wrapper">                               
							<a href="#pdfFiles" class="pdf-list" style="text-decoration: none">
							 	<div id="media-{{data.id.id}}" >
							 	<h4 id="name-{{data.id.id}}">{{#if data.documentName}}{{data.documentName}}{{else}}Document Name{{/if}}</h4>
								<div class="description-info">
								<div class="description-left">
									<p id="description-{{data.id.id}}" class="doc-description ">{{#if data.documentDescription}}{{data.documentDescription}}{{else}}Document Description{{/if}}</p>
								</div>
							</a>
							<div id="{{data.id.id}}" class="comment-wrapper2">
								<a href="#" class="tag-icon" data-original-title="Search by Users">
								</a>   	
								<a href="#" class="hand-icon rock_docs"></a>
								<a href="#" class="message-icon"></a>
								<a href="#" class="share-icon"></a>
							</div>
						</div>
					</div>
					<h5 class="doctitle" id="{{data.id.id}}">
						<span><img src="/beamstream-new/images/title-plus.png"></span> Title & Description
					</h5>          
					<div class="dateinfo">
						<span class="state">{{data.documentAccess.name}}</span>
						<span class="date">{{data.creationDate}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="comment-wrapper1"> <a class="common-icon data" href="#"></a>
			<ul id="{{data.id.id}}-activities" class="comment-list">
			<li><a class="eye-icon" href="#">0</a></li>
			<li><a class="hand-icon" href="#">{{data.documentRocks}}</a></li>
			<li><a class="message-icon" href="#">0</a></li>
			</ul>
		</div>
		</li>
{{/ifequal}}
{{#ifequal fileType "ppt"}}
	<li data-groups="["oldest"]" data-date-created="{{data.creationDate}}" class="item" >
			<div class="image-wrapper hovereffect" id="{{data.id.id}}">
		 		<div class="hover-div">
			 		<img class="cover-picture" src="/beamstream-new/images/presentations_image.png">
					<div class="hover-text">              
						<div class="comment-wrapper">                               
							<a href="#presentations" class="ppt-list" style="text-decoration: none">
							 	<div id="media-{{data.id.id}}" >
							 	<h4 id="name-{{data.id.id}}">{{#if data.documentName}}{{data.documentName}}{{else}}Doscument Name{{/if}}</h4>
								<div class="description-info">
								<div class="description-left">
									<p id="description-{{data.id.id}}" class="doc-description ">{{#if data.documentDescription}}{{data.documentDescription}}{{else}} Document Description{{/if}}</p>
								</div>
							</a>
							<div id="{{data.id.id}}" class="comment-wrapper2">
								<a href="#" class="tag-icon" data-original-title="Search by Users">
								</a>   	
								<a href="#" class="hand-icon rock_docs"></a>
								<a href="#" class="message-icon"></a>
								<a href="#" class="share-icon"></a>
							</div>
						</div>
					</div>
					<h5 class="doctitle" id="{{data.id.id}}">
						<span><img src="/beamstream-new/images/title-plus.png"></span> Title & Description
					</h5>          
					<div class="dateinfo">
						<span class="state">{{data.documentAccess.name}}</span>
						<span class="date">{{data.creationDate}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="comment-wrapper1"> <a class="common-icon data" href="#"></a>
			<ul id="{{documents.id.id}}-activities" class="comment-list">
			<li><a class="eye-icon" href="#">0</a></li>
			<li><a class="hand-icon" href="#">{{pdfFiles.documentRocks}}</a></li>
			<li><a class="message-icon" href="#">0</a></li>
			</ul>
		</div>
		</li>
{{/ifequal}}