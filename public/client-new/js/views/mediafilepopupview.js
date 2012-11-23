BS.MediaFilePopupView = Backbone.View.extend({
 events: {	
		"click #popup-close" : "close"              
	 },
    
    initialize: function(){
        console.log("doc popup");
        this.source = $("#mediafiles-popup-tpl").html();
        this.template = Handlebars.compile(this.source);
        
        },
    
        /**
        * render gdocs edit screen
        */
        render:function (datas) {
            $(this.el).html(this.template(datas));
            return this;
    
        },
        
       /**
        * function to close the gdocs edit screen
        */
        close:function(eventName){
            eventName.preventDefault(); 
            $('#gdocedit').children().detach(); 
        }
        
 })