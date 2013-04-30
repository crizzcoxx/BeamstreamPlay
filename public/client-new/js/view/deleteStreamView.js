/***
* BeamStream
*
* Author                : Aswathy@toobler.com(aswathy@toobler.com)
* Company               : Toobler
* Email:                : info@toobler.com
* Web site              : http://www.toobler.com
* Created               : 30/April/2013
* Description           : Backbone view for delete stream action
* ==============================================================================================
* Change History:
* ----------------------------------------------------------------------------------------------
* Sl.No.  Date   Author   Description
* ----------------------------------------------------------------------------------------------
*
* 
*/


define(['view/formView',
        'model/stream',], function(FormView, StreamModel){
	var DeleteStreamView;
	DeleteStreamView = FormView.extend({
		objName: 'DeleteStreamView',
		
		events:{
            'click #cancel': 'cancel',
            'click #Ok' : 'confirm'
		},

		onAfterInit: function(){	
            this.data.reset();
                       
        },

        /**
        * cancel the delet action
        */
        cancel: function(e){
            e.preventDefault();
            $('#deleteStream').modal("hide");
        },

        /**
        * Confirm the delete action 
        */
        confirm: function(e){
            e.preventDefault();
            var deleteStream =false,removeAccess =false;
            var value = $('input[name=deleteAction]:checked').val();
            if(value)
            {
                if(value == "all")
                {
                    deleteStream =true;
                }
                if(value == "my")
                {
                    removeAccess = true;
                }
                var streamId =$('#detele-streamId').val();
                 
                var result=confirm("Are you sure ?");
                if(result == true)
                {

                    var stream = new StreamModel();
                    stream.urlRoot = '/remove/stream';

                    stream.save({id : streamId ,deleteStream: deleteStream,removeAccess:removeAccess},{
                        success : function(model, response) {
                        
                            if(response.status == "Success")
                            {
                                alert(data.message);
                                $('#deleteStream').modal("hide");
                                
                            }
                        
                        },
                        error : function(model, response) {
                            console.log("error");
                        }

                    });

                }
               
            }
            else
            {
                alert("please select one option");
            }

        }
        
       
 
	})
	return DeleteStreamView;
});
