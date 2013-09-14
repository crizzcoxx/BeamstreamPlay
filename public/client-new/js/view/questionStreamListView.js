define([
	'baseView', 
	'text!templates/questionStreamList.tpl', 
	'view/questionStreamItemView'
], 
function(BaseView, questionStreamListTPL, QuestionStreamItemView){
	var QuestionStreamListView = BaseView.extend({
		objName: 'questionStreamListView',

		events: {

		},

		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);
			
			var that = this;
			this.collection.on('reset', function(){
				console.log('currentQuestionStream collection was changed')
				that.render();
			});

			this.compiledTemplate = Handlebars.compile(questionStreamListTPL);

		},

		addChildViews: function() {
			var that = this;
			this.collection.map(function(question){
				var itemView = new QuestionStreamItemView({model: question});
				//itemView.setElement(that.$el.find('.questionStreamItems'));
				itemView.render();
				that.$el.find('.questionStreamItems').append(itemView.el);
				console.log('question model', question);
			});
		},

		render: function(){
			this.$el.html(this.compiledTemplate);

			console.log('question stream list collection', this.collection);
			this.addChildViews();
			return this;
		}
		
	});

	return QuestionStreamListView;
});