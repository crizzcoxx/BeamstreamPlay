BS.FilesMediaView = Backbone.View.extend({

	events: {
                "click a#file-type" : "showFilesTypes",
                "click ul.file-type li a" : "hideList",
                "click '.nav a" : "addActive",
                "click #gdoc_uploadbutton" : "uploadFile",
                "click .doctitle" : "editDocTitle",
                "click .imgtitle" : "editImgTitle",
                "click .videotitle" : "editVideoTitle",
                "mouseenter #uploadmedia_dr":"uploadMediadwn",
                "mouseleave #dropdownnew":"uploadMediaup",
                "click #links_dr":"linksMenuList",
                "click #links_uploadbutton":"linkupload",
                "click #docs_dr":"docsMenuList",  
                "click #googledocs_mycomp":"showFileForm",
                "click #googledocs_dr":"googleDocs",
                "click #importfrmlink_dr": "importFromLink",                
                "click #video_dr":"videoMenuList",
                "click #youtube_dr":"youtubeMenu",
                "click #video_uploadbutton":"videoUpload",
                "click #audio_dr":"audioMenuList",               
                "click #vialink_dr":"audioVialink",
                "click #audio_uploadbutton":"audioUpload",
                "click #presentations_dr":"presentationMenuList",
                "click #presvialink_dr":"presentationVialink",
                "click #press_uploadbutton":"presentationUpload",
                "click #docfrmcomputer_uploadbutton": "saveMyFile",
                'change #doc-from-computer' :'displayImage',
                'click #docfrmcomputer_closePopup': "hidePopUpBlock"
                
           //   "click #select_dr":"selectboxdwn",
          //    "blur #select_dr":"selectboxup"
//              "click #profile-images":"listProfileImages",
//              "click .google_doc" : "showDocPopup",
//              "click .filter-options li a" : "filterDocs"
 
	      
	 },
	
    initialize:function () {       
     	 	       
        console.log('Initializing Files and Media  View');       
        this.source = $("#tpl-files-media").html();
        this.template = Handlebars.compile(this.source);
	    this.pictres();	
        this.videos();   
        this.docsList();
        this.audio();  
//        this.spreadsheet();  
        this.presentation();  
        this.pdffiles();  
//        this.links(); 
     //   this.template= _.template($("#tpl-files-media").html());

        
    },

    render:function (eventName) {
    	
        $(this.el).html(this.template);
        return this;
    },
    
    /**
     * show file types
     */
    showFilesTypes :function(eventName){
    	
    	eventName.preventDefault();
    	$('.file-type').slideDown();
    	
    },
    
    /**
     * hide file types
     */
    hideList : function(eventName){
    	
    	eventName.preventDefault();
    	$('.file-type').slideUp();
    	
    },
    //TODO
    addActive : function(eventName){
		 var id = eventName.target;
		 var $this = $(id);
		console.log( $this);
	     if (!$this.is('.dropdown-toggle')) {
	         $this
	             .closest('ul')
	             .find('li').removeClass('active').end()
	             .end()
	             .closest('li').addClass('active');
	     }
	 },
         
      /*
        * Author:Cuckoo Anna on 09July2012
        * For Uploading docs
        * docType can be one of "GoogleDocs", "YoutubeVideo", "Other".
        * docAccess can be one of "Private", "Public", "Restricted", "Stream".
      */  
     uploadFile : function()
     {
        /* post the documents details */
       
         var documentModel = new BS.Document();
         if($("#gdoc-url").val().length != 0){
         documentModel.set({
                docName : $("#gdoc-name").val(),
                docURL : $("#gdoc-url").val(),  
                docAccess: 'Public',
                docType: 'GoogleDocs',
                docDescription: $("#gdoc-description").val()
          });
            
          var documentData = JSON.stringify(documentModel);
              var self = this;
                      $.ajax({
                    type : 'POST',
                    url : BS.docUpload,
                    data : {
                            data : documentData
                            },
                    dataType : "json",
                    success : function(data) {
                        if(data.status == 'Failure')
                            alert("Failed.Please try again");
                        else
                            {
                            alert("Doc Uploaded Successfully");
                                self.docsList(); 
                                console.log("Doc Uploaded Successfully");
                            }
                        }           
            });
         }
       $("#dropdownnew").find('ul').hide(250); 
        },
      
        docsList : function()
        {  
            var i = 1;
            var self = this;
            BS.user.fetch({ success:function(e) {

                /* get profile images for user */
              $.ajax({
                        type : 'GET',
                        url :  BS.getAllDocs,
//                        data : {
//                           'userId': e.attributes.id.id
//                                },
                        dataType : "json",
                        success : function(docs) {
                            if(docs.length != 0)  {
                              _.each(docs, function(doc) {
                        var datVal =  self.formatDateVal(doc.creationDate);                      
                           var content ='<div class="image-wrapper hovereffect google_doc" id="'+doc.id.id+'">'
                                        +'<input type="hidden" id="id-'+doc.id.id+'" value="'+doc.documentURL+'">'
                                        +'<div class="hover-div"><img src="images/docs_image.png"/><div class="hover-text"><div class="comment-wrapper comment-wrapper2">'
                                        +'<a href="#" class="tag-icon" data-original-title="Search by Users"></a><a href="#" class="hand-icon"></a>'
                                        +'<a href="#" class="message-icon"></a><a href="#" class="share-icon"></a></div><a href="#googledocs" style="text-decoration: none">'
                                        +'<div id="media-'+doc.id.id+'" ><h4> '+doc.documentName+'</h4> <p class="google_doc doc-description" id="'+doc.id.id+'" >'
                                         +'<input type="hidden" id="id-'+doc.id.id+'" value="'+doc.documentURL+'">'
                                        +''+doc.documentDescription+' </p> </div></a>'
                                        +'<h5 class="doctitle" id="'+doc.id.id+'"> Title & Description</h5><span>State</span><span class="date">'+datVal+'</span> '
                                        +'</div></div></div><div class="comment-wrapper comment-wrapper1"> <a class="common-icon data" href="#">'
                                        +'<span class="right-arrow"></span></a><ul class="comment-list"><li><a class="eye-icon" href="#"></a></li>'
                                        +'<li><a class="hand-icon" href="#">'+doc.documentRocks+'</a></li><li><a class="message-icon" href="#"></a></li></ul></div>'; 
                        $('#coverdocs').html(content);                     
                       
                        });
                        }
                        }
               });

            }});

           // $('#content').html(BS.listDocsView.el);
        },
        
         /*
         *Edit the document title 
         */
        editDocTitle :function(eventName){  
            var docId = eventName.currentTarget.id;             // id to get corresponding docs   
            var docUrl = $('input#id-'+docId).val(); 
           
           $.ajax({
                        type : 'POST',
                        url :  BS.getOneDocs,
                        data : {
                                documentId: docId  
                                },
                        dataType : "json",
                        success : function(docs) {           
            var datas = {
                        "id" : docId,
                        "url" : docUrl,
                        "type" : 'Docs',
                        "title" : docs[0].documentName,
                        "description" :docs[0].documentDescription
			  }
            BS.mediaeditview = new  BS.MediaEditView();
            BS.mediaeditview.render(datas);
            $('#gdocedit').html(BS.mediaeditview.el);            
              }
                });          
            },
        
        /*
         *function to show pictures in filesmediaview
         */
        
        
         pictres : function()
        {  
            var self = this;
            var arraypictures = new Array();
            var content='';
            var coverpicture;           
            BS.user.fetch({ success:function(e) {
                /* get images for user */
              $.ajax({
                        type : 'GET',
                        url :  BS.allProfileImages,
                        data : {
                                'userId': e.attributes.id.id
                                },
                        dataType : "json",
                        success : function(docs) {
                            if(docs.length != 0)
                            {
                                arraypictures=docs;
                                coverpicture=arraypictures[arraypictures.length-1];
                               
                                content= '<div class="image-wrapper hovereffect"> <div class="hover-div"><img class="filmdeapicture" width="210px" height="141px" src="'+coverpicture+'"><div class="hover-text">'               
                               +'<div class="comment-wrapper comment-wrapper2">'
                               +'<a href="#" class="tag-icon" data-original-title="Search by Users"></a><a href="#" class="hand-icon"></a>'
                                +'<a href="#" class="message-icon"></a><a href="#" class="share-icon"></a></div><a href="#imagelist" style="text-decoration: none"><h4> Image Name</h4>'                            
                                +'<p class="doc-description">Description of image</p></a>'
                                +'<h5 class="imgtitle"> Title & Description</h5>'          
                                +'<span>State</span>'
                                +' <span class="date">datVal</span>' 
                                +'</div></div></div>'
                                +'<div class="comment-wrapper comment-wrapper1"> <a class="common-icon camera" href="#"><span class="right-arrow"></span></a>'
                                +'<ul class="comment-list">'
                                +'<li><a class="eye-icon" href="#">87</a></li>'
                                +'<li><a class="hand-icon" href="#">5</a></li>'
                                +'<li><a class="message-icon" href="#">10</a></li>'
                                +'</ul>'
                                +'</div>';
                                       
                                       
                                 $('#coverimage').html(content);           
                            }
                        }
               });

            }});

           // $('#content').html(BS.listDocsView.el);
        },
        
            /*Edit the document title
            * 
            */ 
         editImgTitle :function(eventName){  
//          var docId = eventName.currentTarget.id;             // id to get corresponding docs   
            var datas = {
				"type" : 'Image',
				"title" : 'Title of the image',
                                "description" :'description of the image'
			  }
            BS.mediaeditview = new  BS.MediaEditView();
            BS.mediaeditview.render(datas);
            $('#gdocedit').html(BS.mediaeditview.el);
            },
        
        /*
         *function to show pictures in filesmediaview
         */
        videos:function(){
            var self = this;
            var arrayvideos = new Array();
            var content='';
            var coverpicture; 
            BS.user.fetch({ success:function(e) {
                /* get videos for user */
              $.ajax({
                        type : 'GET',
                        url : BS.allProfileVideos,
//                        data : {
//                           'userId': e.attributes.id.id
//                                },
                        dataType : "json",

                        success : function(videos) { 
                        	
                            if(videos.length != 0)
                            {
                                arraypictures=videos;
                                coverpicture=arraypictures[arraypictures.length-1];
                                 
                                content= '<div class="image-wrapper hovereffect"><div class="hover-div"><img class="videoimage" src="'+coverpicture.frameURL+'"/><div class="hover-text">'
                                            +'<div class="comment-wrapper comment-wrapper2">'
                                            +'<a href="#" class="tag-icon" data-original-title="Search by Users"></a>'
                                            +'<a href="#" class="hand-icon"></a>'
                                            +'<a href="#" class="message-icon"></a>'
                                            +'<a href="#" class="share-icon"></a></div>'
                                            +'<a id="profile-videos" style="text-decoration: none" href="#videos"><h4> Image Name</h4>'       
                                            +'<p class="doc-description">Description of Video  </p></a>'
                                            +'<h5 class="videotitle"> Title & Description</h5>'          
                                            +'<span>State</span>'
                                            +' <span class="date">datVal</span>' 
                                            +'</div></div></div><div class="comment-wrapper comment-wrapper1"> <a class="common-icon video" href="#"><span class="right-arrow"></span></a>'
                                            +'<ul class="comment-list">'
                                            +'<li><a class="eye-icon" href="#">87</a></li>'
                                            +'<li><a class="hand-icon" href="#">5</a></li>'
                                            +'<li><a class="message-icon" href="#">10</a></li></ul></div>';
                                 $('#covervideo').html(content);           
                            }
                        }
               });

            }});
        },
        
        /*Edit the Video title
            * 
            */  
        editVideoTitle :function(eventName){  
//          var docId = eventName.currentTarget.id;             // id to get corresponding docs   
            var datas = {
				"type" : 'Video',
				"title" : 'My first video',
                                "description" :'This is my first video and very nice'
			  }
            BS.mediaeditview = new  BS.MediaEditView();
            BS.mediaeditview.render(datas);
            $('#gdocedit').html(BS.mediaeditview.el);
            },
        
        /**
         * Function for show audio
         * 
         */
        audio :function(eventName){
//            $('.coveraud').html('content');
            var self = this;
            $.ajax({
                        type : 'GET',
                        url :  BS.getaudioFilesOfAUser,
                        dataType : "json",
                        success : function(data) {
//                            if(docs.length != 0)  {
                              _.each(data, function(audio) {
                                   var datVal =  self.formatDateVal(audio.creationDate);     
                                  var content ='<div class="image-wrapper hovereffect google_doc">'                                     
                                        +'<div class="hover-div"><img src="images/audio_image.png"/><div class="hover-text"><div class="comment-wrapper comment-wrapper2">'
                                        +'<a href="#" class="tag-icon" data-original-title="Search by Users"></a><a href="#" class="hand-icon"></a>'
                                        +'<a href="#" class="message-icon"></a><a href="#" class="share-icon"></a></div><a href="#audioview" style="text-decoration: none">'
                                        +'<h4> '+audio.documentName+'</h4> <p class="doc-description">'                
                                        +''+audio.documentDescription+' </p></a>'
                                        +'<h5 class="audiotitle" id="'+audio.id.id+'"> Title & Description</h5><span>State</span><span class="date">'+datVal+'</span> '
                                        +'</div></div></div><div class="comment-wrapper comment-wrapper1"> <a class="common-icon music" href="#">'
                                        +'<span class="right-arrow"></span></a><ul class="comment-list"><li><a class="eye-icon" href="#"></a></li>'
                                        +'<li><a class="hand-icon" href="#">5</a></li><li><a class="message-icon" href="#"></a></li></ul></div>'; 
                         
                               $('#coveraudio').html(content); 
                               
                              });
//                        }
                        }
               });
            
                                 
        },
        
         /**
         * Function for show spreadsheet
         * 
         */
        spreadsheet :function(eventName){
             content= '<div class="hover-div"><img src="images/video_image.png"/><div class="hover-text"><div class="image-wrapper"><a id="profile-videos" href="#videos"><img src="images/image2.jpg"></a>'
                        +'</div></div><div class="comment-wrapper comment-wrapper1"> <a class="common-icon video" href="#"><span class="right-arrow"></span></a>'
                        +'<ul class="comment-list">'
                        +'<li><a class="eye-icon" href="#">87</a></li>'
                        +'<li><a class="hand-icon" href="#">5</a></li>'
                        +'<li><a class="message-icon" href="#">10</a></li></ul></div>';
                        $('#coverspreadsheet').html('content');  
        },
        
         /**
         * Function for show presentation
         * 
         */
        presentation :function(eventName){
 
            
            //            $('.coveraud').html('content');
            var self = this;
            $.ajax({
                        type : 'GET',
                        url :  BS.getAllPPTFilesForAUser,
                        dataType : "json",
                        success : function(ppts) {
//                            if(docs.length != 0)  {
                              _.each(ppts, function(ppt) {
                                   var datVal =  self.formatDateVal(ppt.creationDate);     
                                  var content ='<div class="image-wrapper hovereffect google_doc">'                                     
                                        +'<div class="hover-div"><img src="images/presentations_image.png"/><div class="hover-text"><div class="comment-wrapper comment-wrapper2">'
                                        +'<a href="#" class="tag-icon" data-original-title="Search by Users"></a><a href="#" class="hand-icon"></a>'
                                        +'<a href="#" class="message-icon"></a><a href="#" class="share-icon"></a></div><a href="#presentationview" style="text-decoration: none">'
                                        +'<h4> '+ppt.documentName+'</h4> <p class="doc-description">'                
                                        +''+ppt.documentDescription+' </p></a>'
                                        +'<h5 class="audiotitle" id="'+ppt.id.id+'"> Title & Description</h5><span>State</span><span class="date">'+datVal+'</span> '
                                        +'</div></div></div><div class="comment-wrapper comment-wrapper1"> <a class="common-icon presentation" href="#">'
                                        +'<span class="right-arrow"></span></a><ul class="comment-list"><li><a class="eye-icon" href="#"></a></li>'
                                        +'<li><a class="hand-icon" href="#">5</a></li><li><a class="message-icon" href="#"></a></li></ul></div>'; 
                         
                               $('#coverpresentation').html(content); 
                               
                              });
//                        }
                        }
               });
            
        },
        
         /**
         * Function for show pdffiles
         * 
         */
        pdffiles :function(eventName){
            
            
               var self = this;
            $.ajax({
                        type : 'GET',
                        url :  BS.getAllPDFFilesForAUser,
                        dataType : "json",
                        success : function(pdfs) {
//                            if(docs.length != 0)  {
                              _.each(pdfs, function(pdf) {
                                   var datVal =  self.formatDateVal(pdf.creationDate);     
                                  var content ='<div class="image-wrapper hovereffect google_doc">'                                     
                                        +'<div class="hover-div"><img src="images/pdp_image.png"/><div class="hover-text"><div class="comment-wrapper comment-wrapper2">'
                                        +'<a href="#" class="tag-icon" data-original-title="Search by Users"></a><a href="#" class="hand-icon"></a>'
                                        +'<a href="#" class="message-icon"></a><a href="#" class="share-icon"></a></div><a href="#pdflistview" style="text-decoration: none">'
                                        +'<h4> '+pdf.documentName+'</h4> <p class="doc-description">'                
                                        +''+pdf.documentDescription+' </p></a>'
                                        +'<h5 class="audiotitle" id="'+pdf.id.id+'"> Title & Description</h5><span>State</span><span class="date">'+datVal+'</span> '
                                        +'</div></div></div><div class="comment-wrapper comment-wrapper1"> <a class="common-icon pdf" href="#">'
                                        +'<span class="right-arrow"></span></a><ul class="comment-list"><li><a class="eye-icon" href="#"></a></li>'
                                        +'<li><a class="hand-icon" href="#">5</a></li><li><a class="message-icon" href="#"></a></li></ul></div>'; 
                         
                               $('#coverpdf').html(content); 
                               
                              });
//                        }
                        }
               });
            
            
            
        },
        
         /**
         * Function for show links
         * 
         */
        links :function(eventName){
             content= '<div class="hover-div"><img src="images/video_image.png"/><div class="hover-text"><div class="image-wrapper"><a id="profile-videos" href="#videos"><img src="images/image2.jpg"></a>'
                        +'</div></div><div class="comment-wrapper comment-wrapper1"> <a class="common-icon video" href="#"><span class="right-arrow"></span></a>'
                        +'<ul class="comment-list">'
                        +'<li><a class="eye-icon" href="#">87</a></li>'
                        +'<li><a class="hand-icon" href="#">5</a></li>'
                        +'<li><a class="message-icon" href="#">10</a></li></ul></div>';
                        $('#coverlink').html(content);  
        },
                
        /*
         * Format date and returns 
         */
        formatDateVal: function(dateVal)
        {
            var m_names = new Array("January", "February", "March", 
            "April", "May", "June", "July", "August", "September", 
            "October", "November", "December");
                            var d = new Date(dateVal);
                            var curr_date = d.getDate();
                            var curr_month = d.getMonth() + 1; //Months are zero based
                            var curr_year = d.getFullYear();
                            return curr_date + " " + m_names[curr_month] + ", " + curr_year;
        },
        
        /**
         * 
         * Function for uploadmedia 
         *  (slide down menu)
         * 
         */
        uploadMediadwn :function(eventName){
            eventName.preventDefault();
            if(!$('#uploadmediachild_dr').is(":visible") ) 
            $("#uploadmediachild_dr").show("slide", { direction: "up" }, 10);
        },
        
        /* Function for uploadmedia 
         * (childmenu from Links)
         */
        linksMenuList:function(eventName){
            eventName.preventDefault();
            $("#childtwo_dr").find('ul').hide(200);
            $("#childthree_dr").find('ul').hide(200);
            $("#childfour_dr").find('ul').hide(200);
            $("#childfive_dr").find('ul').hide(200);
            $("#linksmenu_dr").animate({width: 'toggle'},120);
                 var i='';
                 var content='';       
             $.ajax({
                        type : 'GET',
			url : BS.allStreamsForAUser,
			dataType : "json",
			success : function(options) {
								content+='<option>Save to Class</option>'
                             _.each(options, function(option) {
	                              content+= '<option>'+option.streamName+'</option>';
	                              i++;
                              });
							  content+='<option>Profile</option>'
									   +'<option>My Docs</option>';             
                              $('#link-class-list').html(content); 
                              }
					
					  
		 });
                 
            },
            
        
        /*
         * Function for uploadmedia 
         * (linksupload button)
         *
         */
        linkupload: function(eventName){
            eventName.preventDefault();
            $("#dropdownnew").find('ul').hide(250); 
        },
        
        /*
         * Function for uploadmedia 
         * (childmenu from papers and docs)
         */
        docsMenuList:function(eventName){
            eventName.preventDefault();
            $("#childone_dr").find('ul').hide(100);
            $("#childthree_dr").find('ul').hide(200);
            $("#childfour_dr").find('ul').hide(200);
            $("#childfive_dr").find('ul').hide(200);
            $("#docsmenu_dr").animate({width: 'toggle'},150);
        },
        
        /*
         * Function for uploadmedia 
         * (childmenu from googledocs)
         */
         showFileForm:function(eventName){
            eventName.preventDefault();
            $("#childtwo_two_dr").find('ul').hide(200);
            $("#dooclinkchild_dr").animate({width: 'toggle'},130);
        },
        
        
        /*
         * Function for uploadmedia 
         * (childmenu from googledocs)
         */
         googleDocs:function(eventName){
            eventName.preventDefault();
            console.log("test");
            $("#childtwo_one_dr").find('ul').hide(200);
            $("#googledocschild_dr").animate({width: 'toggle'},130);
        },
        
        /*
         * Function for uploadmedia 
         * (childmenu from Import from link )
         */
        importFromLink:function(eventName){
            eventName.preventDefault();
            $("#frmlinkchild_dr").animate({width: 'toggle'},150);
            var i='';
            var content=''; 
            $.ajax({
			type : 'GET',
			url : BS.allStreamsForAUser,
			dataType : "json",
                        success : function(options) {
                        	 content+='<option>Save to Class</option>'
                             _.each(options, function(option) {
	                              content+= '<option>'+option.streamName+'</option>';
	                              i++;
                              });
                        	  content+='<option>Profile</option>'
								   +'<option>My Docs</option>';
                              $('#doc-class-list').html(content); 
                              }
					
					  
		 });
            
        },
               
         /*
         *Function for uploadmedia 
         * (childmenu from video)
         */
        videoMenuList:function(eventName){
            eventName.preventDefault();
            $("#childone_dr").find('ul').hide(200);
            $("#childtwo_dr").find('ul').hide(200);
            $("#childfour_dr").find('ul').hide(200);
            $("#childfive_dr").find('ul').hide(200);
            $("#videomenu_dr").animate({width: 'toggle'},130);
        },
        
         /*
         *Function for uploadmedia 
         * (childmenu from youtube)
         */
        youtubeMenu:function(eventName){
            eventName.preventDefault();
            $("#youtubechild_dr").animate({width: 'toggle'},350);
            var i='';
            var content=''; 
            $.ajax({
			type : 'GET',
			url : BS.allStreamsForAUser,
			dataType : "json",
			success : function(options) {
				            content+='<option>Save to Class</option>'
                            _.each(options, function(option) {
	                             content+= '<option>'+option.streamName+'</option>';
	                             i++;
                             });
				            content+='<option>Profile</option>'
								   +'<option>My Docs</option>';
                            $('#video-class-list').html(content);
                         }		  
		 });
        },
        
        /*
         *Function for uploadmedia 
         * (childmenu from youtube and upload video)
         */
        videoUpload:function(eventName){
            eventName.preventDefault();
            $("#dropdownnew").find('ul').hide(250); 
        },
        
        /*
         *Function for uploadmedia 
         * (childmenu from audio)
         */
        
        audioMenuList:function(eventName){
            eventName.preventDefault();
            $("#childone_dr").find('ul').hide(200);
            $("#childtwo_dr").find('ul').hide(200);
            $("#childthree_dr").find('ul').hide(200);
            $("#childfive_dr").find('ul').hide(200);
            $("#audiomenu_dr").animate({width: 'toggle'},150);
        },
        
        /*
         *Function for uploadmedia 
         * (childmenu from audio vialink)
         */
        audioVialink:function(eventName){
            eventName.preventDefault();
            $("#vialinkchild_dr").animate({width: 'toggle'},350); 
            var i='';
            var content=''; 
            $.ajax({
                    type : 'GET',
                    url : BS.allStreamsForAUser,
                    dataType : "json",
                    success : function(options) {
                        	content+='<option>Save to Class</option>'
                            _.each(options, function(option) {
                                 content+= '<option>'+option.streamName+'</option>';
                                 i++;
                              });
                        	  content+='<option>Profile</option>'
								+'<option>My Docs</option>';
                              $('#audio-class-list').html(content); 
                              }	  
		 });
        },
        
         /*
         * Function for uploadmedia 
         * (upload button to upload audio)
         */
        audioUpload:function(eventName){
            eventName.preventDefault();
            $("#dropdownnew").find('ul').hide(200); 
        },
    
        /*
         * Function for uploadmedia 
         * (childmenu from presentation)
         *
         */
        presentationMenuList:function(eventName){
            eventName.preventDefault();
            $("#childone_dr").find('ul').hide(200);
            $("#childtwo_dr").find('ul').hide(200);
            $("#childfour_dr").find('ul').hide(200);
            $("#childthree_dr").find('ul').hide(200);
            $("#presentationmenu_dr").animate({width: 'toggle'},150);
        },
        
         /*
         * Function for uploadmedia 
         * (childmenu from presentation vialink)
         *
         */
        presentationVialink:function(eventName){
            eventName.preventDefault();
            $("#presvialinkchild_dr").animate({width: 'toggle'},350);
            var i='';
            var content=''; 
            $.ajax({
			type : 'GET',
			url : BS.allStreamsForAUser,
			dataType : "json",
			success : function(options) {
							  content+='<option>Save to Class</option>'
                              _.each(options, function(option) {
                                 content+= '<option>'+option.streamName+'</option>';
                              i++;
                              });
                              content+='<option>Profile</option>'
									+'<option>My Docs</option>';
                              $('#presentation-class-list').html(content); 
                              }	  
		 });
        },
        
         /*
         * Function for uploadmedia 
         * (upload button to upload presentation)
         *
         */
        presentationUpload:function(eventName){
            eventName.preventDefault();
            $("#dropdownnew").find('ul').hide(250); 
        },
    
        /**
         * For uploadmedia menu
         *  for slide up
         */
        uploadMediaup :function(eventName){
             eventName.preventDefault();
             if(!$('.fixingmenu_dr').is(":visible") ) 
             $("#uploadmediachild_dr").hide("slide", { direction: "up" }, 10); 
        },
        
        /**
         * Edited By Aswathy @TODO
         * For Doc popups
         */
        showDocPopup :function(eventName){
 
        	var docId = eventName.currentTarget.id;
        	var docUrl = $('input#id-'+docId).val();
    		newwindow=window.open(docUrl,'','height=550,width=1100,top=100,left=250');
        	 
        },
        /**
         * filter docs.. and prevent default action
         */
        filterDocs :function (eventName){
        	 eventName.preventDefault();
        },
        
        /*
         * Save docs from My computer
         */
         saveMyFile: function(eventName)
         {
                eventName.preventDefault();
                 var self = this;
                var status = true;
                var data;
                data = new FormData();
                data.append('docData', this.image);  
                
                document.getElementById('loader-message').innerHTML="<img src='images/loading.gif'>";
                
                /* post profile page details */
                $.ajax({
                    type: 'POST',
                    data: data,
                    url: BS.uploaddocFrmComputer,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType : "json",
                    success: function(data){
                        if(data.status == "Success") 
                            {
                                document.getElementById('loader-message').innerHTML = data.message;
                                self.docsList();
                                self.audio();
                                self.presentation();
                                $("#dooclinkchild_dr").hide(200);
                            }
                    }
                });
         },
         
             /**
     * display profile photo
     */
    
    displayImage:function (e) {
    	 var self = this;;
    	 file = e.target.files[0];
    	 
    	
         var reader = new FileReader();
      
        	 /* capture the file informations */
             reader.onload = (function(f){
            	 
            	 self.image = file;
            	
            })(file);
             
            // read the image file as data URL
            reader.readAsDataURL(file);
         
    },
    
    hidePopUpBlock: function()
    {
            $("#dooclinkchild_dr").find('ul').hide(100);
            $("#docsmenu_dr").find('ul').hide(200);
            $("#childtwo_dr").find('ul').hide(200);
            $("#uploadmediachild_dr").find('ul').hide(200);
    }
});

