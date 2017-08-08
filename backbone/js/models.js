App.models.Ad = Backbone.Model.extend({

		defaults: {
			// adId: _.uniqueId(),
			price: 0,
			img: 'img/noImage.jpg',
			publication: true, 
			description: '',
			name: ''

		} ,
		validate: function(attrs, options) {
		    if (attrs.price < 0) {
		      return "цена не может быть отрицательной";
		    }
		    if(!isFinite(attr.price)){
		    	 return "цена должна быть числом";
		    }
		    if(!attr.name){
		    	return "задайте имя";
		    }
		}
	});
	//пользователь 
	App.models.User = Backbone.Model.extend({
		defaults: {
			userId: _.uniqueId()
		}
	})
	App.collections.Users = Backbone.Collection.extend({model: App.models.User})
	//коллекция объявлений
	App.collections.Ads = Backbone.Collection.extend({
		model: App.models.Ad
	});

	App.models.Category = Backbone.Model.extend({
		defaults: {
			idCategory: _.uniqueId,
			name: ''

		}
	});

	App.collections.categories = Backbone.Collection.extend({
		model: App.models.Category
	});
