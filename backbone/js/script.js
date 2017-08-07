(function(){
	// window.App = {
	// 	models: {},
	// 	views: {},
	// 	collections: {}
	// }

	//объявление
	// App.models.Ad = Backbone.Model.extend({

	// 	defaults: {
	// 		// adId: _.uniqueId(),
	// 		price: 0,
	// 		img: 'img/noImage.jpg',
	// 		publication: true, 
	// 		description: '',
	// 		name: ''
	// 	} ,
	// 	validate: function(attrs, options) {
	// 	    if (attrs.price < 0) {
	// 	      return "цена не может быть отрицательной";
	// 	    }
	// 	    if(!isFinite(attr.price)){
	// 	    	 return "цена должна быть числом";
	// 	    }
	// 	    if(!attr.name){
	// 	    	return "задайте имя";
	// 	    }
	// 	}
	// });
	// //пользователь 
	// App.models.User = Backbone.Model.extend({
	// 	defaults: {
	// 		userId: _.uniqueId()
	// 	}
	// })
	// App.collections.Users = Backbone.Collection.extend({model: App.models.User})
	// //коллекция объявлений
	// App.collections.Ads = Backbone.Collection.extend({
	// 	model: App.models.Ad
	// });

	// // вид одного объявления
	// App.views.Ad = Backbone.View.extend({
	// 	tagName: 'div',
	// 	className: 'ad',
	// 	template:  _.template($('#adTemplate').html()),
	// 	events: {
	// 		'click .edit' : 'openForm',
	// 		'click .delete' :'destroy'
	// 	},
	// 	initialize: function(){
	// 		this.render();
	// 		this.model.on('change', this.render, this);
	// 		this.model.on('destroy', this.remove, this);
	// 	},
	// 	render: function(){
	// 		this.$el.html( this.template( this.model.toJSON() ) );
	// 		return this;
	// 	},
	// 	openForm: function(){
	// 		editAdView.model = this.model;

	// 		editAdView.render();
	// 	},
	// 	destroy: function(){
	// 		this.model.destroy();
	// 	},
	// 	remove: function(){
	// 		this.$el.remove(); 
	// 	}
	// })

	// //форма редактирования
	// App.views.editAd = Backbone.View.extend({
	// 	el: $('#edit'),
	// 	events: {
	// 		'submit form[name="edit-form"]' : 'edit',
	// 		'submit form[name="add-form"]' : 'add'
	// 	},
		
	// 	initialize: function(){
	// 		// this.render();
	// 		// this.model.on('change', this.render, this);

	// 	},
	// 	render: function(){
	// 		this.reset();
	// 		this.$el.modal('show');
	// 		if(this.model){
	// 			$('#edit form').attr('name', 'edit-form');
	// 			$('#name').val(this.model.get('name'));
	// 			$('#price').val(this.model.get('price'));
	// 			$('#description').val(this.model.get('description'));
	// 		}
	// 		return this;
	// 	},
	// 	edit: function(event){
	// 		event.preventDefault();
	// 		if(this.validateForm()){
	// 			this.save();
	// 			this.reset();
	// 			this.$el.modal('hide');
	// 		}
	// 	},
	// 	add: function(event){
	// 		event.preventDefault();
	// 		if(this.validateForm()){
	// 			this.model = new App.models.Ad();
	// 			this.save();
	// 			this.collection.add(this.model);
	// 			this.reset();
	// 			$('#edit').modal('hide');
	// 		}
	// 	},
	// 	save: function(){
	// 		this.model.set('name', $('#name').val());
	// 		this.model.set('price', $('#price').val());
	// 		this.model.set('description', $('#description').val());
	// 	},
	// 	validateForm: function(name, price, description){
	// 		var flag = 0;

	// 		if(!$('#name').val()){
	// 			$('#name').parent().addClass('has-error');
	// 		 	flag++;
	// 		}
	// 		else{
	// 			$('#name').parent().removeClass('has-error');
	// 		}

	// 		if(!isFinite($('#price').val())){
	// 		 	$('#price').parent().addClass('has-error');
	// 		 	flag++;
	// 		}
	// 		else{
	// 		 	$('#price').parent().removeClass('has-error');
	// 		}

	// 		if(!$('#description').val()){
	// 		 	$('#description').parent().addClass('has-error');
	// 		 	flag++;
	// 		}
	// 		else{
	// 		 	$('#description').parent().removeClass('has-error');
	// 		}

	// 		if(!flag){
	// 			return true;
	// 		}
	// 		else{
	// 			return false;
	// 		}
	// 	},
	// 	reset: function(){
	// 		$('#name').val('');
	// 		$('#price').val('');
	// 		$('#description').val('');
	// 		$('#edit .form-group').removeClass('has-error');
	// 	}
	// })

	// //вид коллекции объявлений
	// App.views.Ads = Backbone.View.extend({
	// 	el: $('.content'),
	// 	// tagName: 'div',
	// 	// className: 'content',
	// 	initialize: function(){
	// 		this.render()
	// 		this.collection.on('add', this.addOne, this);
	// 	},
	// 	render: function(){
	// 		this.collection.each(this.addOne, this);
	//   		return this;
	// 	},
	// 	addOne: function(ad){
	// 		var adView = new App.views.Ad({model: ad});
	// 		this.$el.prepend(adView.render().el);
	// 	}
	// });

	// App.models.Category = Backbone.Model.extend({
	// 	defaults: {
	// 		idCategory: _.uniqueId,
	// 		name: ''

	// 	}
	// });

	// App.collections.categories = Backbone.Collection.extend({
	// 	model: App.models.Category
	// });

	// App.views.category = Backbone.View.extend({
	// 	tagName: 'li',
	// 	events: {
	// 		'click' : 'search'
	// 	},
	// 	search: function(id){
			
	// 		console.log(collection.filter(function(ad){
	// 			return true;
	// 		}))

	// 	},

	// 	initialize: function(){
	// 		this.render();
	// 	},
	// 	render: function(){
	// 		this.$el.html(this.model.get('name'));
	// 		return this;
	// 	}
	// });

	// App.views.categories = Backbone.View.extend({
	// 	el: $('.categories'),
	// 	initialize: function(){
	// 		this.render();
	// 	},

	// 	render: function(){
	// 		this.collection.each(this.addOne, this);
	//   		return this;
	// 	},
	// 	addOne: function(category){
	// 		var categoryView = new App.views.category({model: category});
	// 		this.$el.append(categoryView.render().el);
	// 	}
	// });

	$('#add-button').click(function(){
		$('#edit form').attr('name', 'add-form');
		editAdView.model = null;
		editAdView.render();
		
	});
}());

	var collection = new App.collections.Ads([{name: 'name1', description: 's'}, {name: 'name2', description: 'f'}, {name: 'name3', description: 'f'}])
	var collectionView = new App.views.Ads({collection: collection})
	// $(document.body).prepend(collectionView.render().el);
	var editAdView = new App.views.editAd({collection: collection});

var category1 = new App.models.Category({name: 'категория 1'});
var category2 = new App.models.Category({name: 'категория 2'});
var collectionCategiries = new App.collections.categories([category1, category2]);
var b = new App.views.categories({collection: collectionCategiries});

//переключение между видами
$('.buttons').click(function(event){
		var list = event.target.parentNode.children;
		var length = list.length;
		for(var i = 0; i < length; i++){
			list[i].classList.remove('active');
		}
		event.target.classList.add('active');

		var id = event.target.getAttribute('data-id');
		var content = document.querySelector('.content');
		$('.content').removeClass('column-4');
		$('.content').removeClass('column-2');
		$('.content').removeClass('column-1');

		switch(id){
			case '1': $('.content').addClass('column-4');
					countAds = 8;
					break;
			
			case '2': $('.content').addClass('column-2');
				countAds = 16;
				break;
			
			case '3':
				$('.content').addClass('column-1');
				countAds = 8;
				break;
		}

})
