        /***
        * BeamStream
        *
        * Author                : Cuckoo Anna (cuckoo@toobler.com)
        * Company               : Toobler
        * Email:                : info@toobler.com
        * Web site              : http://www.toobler.com
        * Created               : 17/January/2013
        * Description           : Backbone view for registration
        * ==============================================================================================
        * Change History:
        * ----------------------------------------------------------------------------------------------
        * Sl.No.  Date   Author   Description
        * ----------------------------------------------------------------------------------------------
        *
        * 
        */
	BS.SignUpView = Backbone.View.extend({
	
            events : {
                "click #registeration":"register",
                "click .menu-pic":"getValue",
                "focusout .home_reg":"valdation"
                },
                
            initialize : function() {		
                console.log('Initializing Basic Registration View');
                this.source = $("#tpl-userregistration_home").html();

                this.template = Handlebars.compile(this.source);              
                this.model.on("error", this.onerror,this);                

		},
		
            render : function(eventName) {			
                $(this.el).html(this.template);
                return this;	
		},
                
                /**
                * Method to register the details (save the details to backend)
                */
            register: function(eventName){
                eventName.preventDefault();
                var password= $('#userpassword').val();
                var confirmPassword =  $('#confirmpassword').val();                

                if(password===confirmPassword ){                        //validation :- compare the password and confirmPassword
                 var tes = this.model.set({
                        
                        iam:$('input#usertype').val(),
                        mailid:$('#mailid').val(),
                        userpassword:password,
                        confirmpassword:confirmPassword
                        
                        });
                        console.log(" -"+tes)
//                        if(tes !=false){
                        if(tes)
                            this.model.save(); 

                        BS.AppRouter.navigate("registration", {trigger: true});
                             
//                    }
                      

                    }
                else{
                    console.log(" 'confirmPassword' is not match with 'Password' ")
                    }
                var regDetails = JSON.stringify( this.model);
                console.log("modeo -"+regDetails);

                },
                
                /**
                * Method to set the value of "i am"
                */
            getValue:function(eventName){
                eventName.preventDefault();
                $("#usertype").val(eventName.currentTarget.id);
                },
                
                /**
                * Method for validation (validation done in out of focus of the field)
                */
            valdation:function(eventName){
                eventName.preventDefault();
                var id=eventName.currentTarget.id
                var value=$('#'+id).val();   
                
                var map = {};                  //create json variable
                map[id] = value;

//
//                this.model.validate(id:) ;
                this.model.set(map);

                
                var regDetails = JSON.stringify( this.model);
                console.log("modeo -"+regDetails);
                      
                },
                
            onerror: function( model, error ) {

//                        _.each( error, function( fieldName ) {
////
//                       console.log(fieldName.name);
////
//                            });
                if (error){
                console.log(error); }
            
                }
	});
