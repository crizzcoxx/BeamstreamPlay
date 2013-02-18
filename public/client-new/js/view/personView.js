define(['view/formView'], function(FormView){
	var PersonView;
	PersonView = FormView.extend({
		objName: 'PersonView',
		events : {
			'click #save' : 'SaveData',
			'click #singleFieldValidation' : 'validateSingleField',
			'click #setField' : 'setSingleField'
			
		},
		
		onAfterInit: function(){
			
			this.data.reset();
		},
		/**
		 * save form data
		 */
		SaveData: function(){
//			dataToSave.isValid(true)
//			console.log(this.getModel());
//			this.data.models[0].set({'san':'te3454'});
			this.saveForm();
//			console.log(this.data.models[0].get('san'));
		},
		
		/**
		 * @TODO how to validate single field ?
		 */
		validateSingleField: function(){
			alert("validate Single Field");
		},
		
		/**
		 * @TODO how to set an attribute to model
		 * like http://documentcloud.github.com/backbone/#Model-set
		 */
		setSingleField: function(){
			alert("set Single Attribute To Model");
		}
	})
	return PersonView;
});