BS.verifyEmailView = Backbone.View.extend({

	events: {
		 "click #no-schoolmail" : "addSchoolEmail",
		 "click #register" : "registration",
		 "change #iam" : "changeEmailText"
	 },
	
    initialize:function () {
    	
        console.log('Verify your email');
        this.template= _.template($("#tpl-verify-email").html());
        $("#email-verify").validate();
        
    },

    render:function (eventName) {
    	 
        $(this.el).html(this.template());
        return this;
    },
    
    /**
     * add school mail 
     */
    addSchoolEmail:function (eventName) {
    	
    	var  checked = $('#schoolmail').attr('checked');
    	if(checked == "checked")
    	{
    		$('#row-line').show();
    		$('#schoolmail-info').show();
    	}
    	else
    	{
    		$('#schoolmail-info').hide();
    		$('#row-line').hide();
    	}
    },
     
   
    /**
     * verify email 
     */
    registration:function (eventName) {
    	
    	eventName.preventDefault();
    	/* validate select box */
		valiadateSelect($('#iam'));
		
    	$('#send-mail-loader').css("display","block");
    	var validate = $("#email-verify").valid();
    	if(validate == true)
	    {
    		if($('#iam').val() == "")
    		{
    			$('#display_message').fadeIn("medium").delay(2000).fadeOut('slow');
        		$('.error-msg').html("Please select I'm field");
    		}
    		else
    		{
		    	var mailDetails = this.getdata();
		    	/* post email verification details */
				$.ajax({
					type : 'POST',
					url : BS.verifyEmail,
					data : {
						data : mailDetails
					},
					dataType : "json",
					success : function(data) {
						if(data.status == "Success") 
		   			    {
								$('#send-mail-loader').css("display","none");
							    $('.forgot-pass').hide();
								var source = $("#tpl-verify-popup").html();
								var template = Handlebars.compile(source);
								$("#school-popup").html(template);
		   			     }
						 else if(data.status == "Failure")
						 {
							 $('#send-mail-loader').css("display","none");
							 $('#display_message').fadeIn("medium").delay(2000).fadeOut('slow');
				        	 $('.error-msg').html("Email is already taken");
							 $('.forgot-pass').show();
						 }
						 else
						 {
							 console.log("Error");
						 }
					}
			     });
    		}
	    }
    	else
    	{
    		$('#send-mail-loader').css("display","none");
    		$('#display_message').fadeIn("medium").delay(2000).fadeOut('slow');
        	$('.error-msg').html("Only use emails that are assosiated with schools and organozations");
    	}
    },
    
    /**
     * get form data 
     */
    getdata:function(){
    	
    	var iam = $("#iam").val();
    	var wEmail =$('#email').val();
    	var emailModel = new BS.EmailVerification();
    	emailModel.set({
    		
    		iam :  iam,
    		email : wEmail,
			 
		});
    	var mailDetails = JSON.stringify(emailModel);
    	return mailDetails;
    },
    
    /**
     * change Email title depending on I'm field
     */
    changeEmailText :function(eventName){
    	var id = eventName.target.id;
  	    var dat='#'+id;
  	    var iam = $('#iam').val();
  	     
  	    // if select "Professional"  change Email to  "Work email"
  	    if(iam == 2)
  	    {
  	    	$('#email-label').html('Work email'+ "  <img src='images/star.png' />");
  	    	$('#email').attr("placeholder","Corporate mail");
  	    	
  	    }
  	    // if select "Student" or "Educator" change Email to  "School email"
  	    else if(iam == 0 || iam == 1)
  	    {
  	    	$('#email-label').html('School email'+ "  <img src='images/star.png' />");
  	    	$('#email').attr("placeholder","School email");
  	    }
  	    else  
  	    {
  	    	$('#email-label').html('Email ');
  	    }
    }
    
});