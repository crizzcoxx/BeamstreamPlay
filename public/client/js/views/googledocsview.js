BS.GoogleDocsView = Backbone.View.extend({
        events:{
                "click a#file-type" : "showFilesTypes",
                "click ul.file-type li a" : "hideList",
                "click '.nav a" : "addActive",
                "click #gdoc_uploadbutton" : "uploadFile",
//              "click #profile-images":"listProfileImages",
                "click .google_doc" : "showDocPopup",
                "click .filter-options li a" : "filterDocs",
                "click .doctitle" : "editDocTitle",
                "click #prevslid" : "previous",
                "click #nextslid" : "next",
                "click .rock_docs" : "rocksDocuments",
                "click .message-icon" : "commentDocuments"
 	    },
                 
        initialize:function() {
            console.log("google docs view is loded");
            var type = "files";
            this.docsList();   
            this.source = $("#tpl-docsview").html();
            this.template = Handlebars.compile(this.source);
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
             
        addActive : function(eventName){
            var id = eventName.target;
            var $this = $(id);
            if (!$this.is('.dropdown-toggle')) {
            	$this
	            	.closest('ul')
		            .find('li').removeClass('active').end()
		            .end()
		            .closest('li').addClass('active');
            }
        },
         
        /* post the documents details */
        uploadFile : function(){
        	
            var documentModel = new BS.Document();
            documentModel.set({
            docName : $("#gdoc-name").val(),
            docURL : $("#gdoc-url").val(),
            docAccess: 'Public',
            docType: 'GoogleDocs ',
            docDescription: 'testing g docs'
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
                }
                }           
                });
         },
            
        /*
         *   To list the documents in the view        
         *
         */           
        docsList : function(eventName)
        {    
            //  eventName.preventDefault();              
            var i = 1;
            var j=1;
            var self = this;
            BS.user.fetch({ success:function(e) {
                    
                /* get profile images for user */
            $.ajax({
                type : 'POST',
                url :  BS.getAllDocs,
                data : {
                'userId': e.attributes.id.id
                },
                dataType : "json",
                success : function(docs) {
                   var content = '';

            
                $('#grid').html("");    
                _.each(docs, function(doc) {  
                    
                	var datVal =  self.formatDateVal(doc.creationDate);
                	var datas = {
						 	 "doc" : doc,
						 	 "datVal" :datVal,
						 	 "docCount" : i
					}
                	
                	var source = $("#tpl-single-bucket").html();
				    var template = Handlebars.compile(source);
				    $('#grid').append(template(datas));         
                                           
//                        content +='<li id="file-docs-'+i+'" data-key="['+datVal+']"> <div class="image-wrapper hovereffect" >' 
//                        
//                                +' <div class="hover-div"><img src="images/docs_image.png"/><div class="hover-text"> '  //code for hover over effect
//                            
//                                +'<div id="'+doc.id.id+'" class="comment-wrapper comment-wrapper2">'
//                                +' <a href="#" class="tag-icon" data-original-title="Search by Users"></a>'
//                                +'<a href="#" class="hand-icon" ></a>'
//                                +'<a href="#" class="message-icon"></a>'
//                                +'<a href="#" class="share-icon"></a>'
//                                +'</div>'
//                                +'<div id="media-'+doc.id.id+'" ><h4> '+doc.name+'</h4>'
//                                +' <p class="google_doc doc-description" id="'+doc.id.id+'" >'
//                                +'<input type="hidden" id="id-'+doc.id.id+'" value="'+doc.url+'">'
//                                +''+doc.description+' </p> </div>'
//                                +'<h5 class="doctitle" id="'+doc.id.id+'"> Title & Description</h5>'           //'id' to edit the title and description
//                                +'<span>State</span>'
//                                +' <span class="date">'+datVal+'</span>' 
//                                +'</div> </div></div>'                                                       //two closing <div> for hover over effect
//                                +'<div class="comment-wrapper comment-wrapper1"> '
//                                +' <a class="common-icon data" href="#">'
//                                +'<span class="right-arrow"></span>'
//                                +' </a>'
//                                +'<ul id="'+doc.id.id+'-activities" class="comment-list">'
//                                +'<li><a class="eye-icon" href="#"></a></li>'
//                                +'  <li><a class="hand-icon" href="#"></a></li>'
//                                +'   <li><a class="message-icon" href="#"></a></li>'
//                                +' </ul>'
//                                +'</div> </li>'; 
                      i++;
                     });  
                
//                  $('#grid').html(content);
                    self.pagination();                                       
                }

               });
             }});
            },
            
            /*
            * pagination for docsview
            *
            */
            pagination: function(){
                    var show_per_page = 16;                                     //number of <li> listed in the page
                    var number_of_items = $('#grid').children().size();  
                    var number_of_pages = Math.ceil(number_of_items/show_per_page);  
                    var navigation_count='';
                    $('#current_page').val(0);  
                    $('#show_per_page').val(show_per_page);  
                    var navigation_Prev = '<div class="previous_link" ></div>';  
                    var current_link = 0;  
                    while(number_of_pages > current_link){  
                        navigation_count += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';  
                        current_link++;  
                    }  
                    var navigation_next = '<div class="next_link" ></div>';  
                    $('#prevslid').html(navigation_Prev);                       //previous slider icon
                    $('#page_navigation-count').html(navigation_count);  
                    $('#nextslid').html(navigation_next);                       //next slider icon   
                    $('#page_navigation-count .page_link:first').addClass('active_page');  

                    $('#grid').children().css('display', 'none');  

                    $('#grid').children().slice(0, show_per_page).css('display', 'block');  
            },
            
            /*
            * Part of pagination and is used to show previous page
            *
            */
           previous: function (){  
               new_page = parseInt($('#current_page').val()) - 1;  
                    if($('.active_page').prev('.page_link').length==true){  
                        this.go_to_page(new_page);  
                    }  
  
            },  
            
            /*
            * Part of pagination and is used to show next page
            *
            */
            next:function (){  
                new_page = parseInt($('#current_page').val()) + 1;  
                if($('.active_page').next('.page_link').length==true){  
                    console.log("inside if");
                    this.go_to_page(new_page);  
                }  
            },
            
         /*
         * Part of pagination and is used to page setting
          *
            */
          go_to_page:function (page_num){  
                var show_per_page = parseInt($('#show_per_page').val());  

                start_from = page_num * show_per_page;  

                end_on = start_from + show_per_page;  

                $('#grid').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');  

                   $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');  

                $('#current_page').val(page_num);  
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
         * Edited By Aswathy @TODO
         * For Doc popups
         */
        showDocPopup :function(eventName){
            
            var docId = eventName.currentTarget.id;
            var docUrl = $('input#id-'+docId).val();  
//            console.log(docUrl);
//            newwindow=window.open(docUrl,'','height=500,width=500');    
            BS.gdocpopupview = new BS.GdocPopupView();
            BS.gdocpopupview.render(docUrl);
            
            $('#gdocedit').html(BS.gdocpopupview.el);
            
            
        },
            
        /**
         * filter docs.. and prevent default action
         */
        filterDocs :function (eventName){
            eventName.preventDefault();
         },
            
        /*Edit the document title
         * 
         */  
        editDocTitle :function(eventName){  
          var docId = eventName.currentTarget.id;             // id to get corresponding docs   
          var docUrl = $('input#id-'+docId).val(); 
          var datas = {
                                 "id" : docId,
                                 "url" : docUrl,
				"type" : 'Docs',
				"title" : 'Title of the doc',
                                "description" :'description of the doc'
			  }
            BS.mediaeditview = new  BS.MediaEditView();
            BS.mediaeditview.render(datas);
            $('#gdocedit').html(BS.mediaeditview.el);
       },
       
       /**
        * Rocks Google docs
        */
       rocksDocuments:function(eventName){
    	   
	    	 eventName.preventDefault();
	  		 var element = eventName.target.parentElement;
	  		 var docId =$(element).attr('id');
	  		 // post documentId and get Rockcount 
	  		 $.ajax({
	               type: 'POST',
	               url:BS.rockDocs,
	               data:{
	            	   documentId:docId
	               },
	               dataType:"json",
	               success:function(data){
	              	 
	              	// display the rocks count  
	            	$('#'+docId+'-activities li a.hand-icon').html(data);
	   
	               }
	            });
       },
       /**
        * comments google documents
        */
       
       commentDocuments :function(eventName){
    	   eventName.preventDefault();
    	   console.log("45");
       }
})





