App.models.Ad = Backbone.Model.extend({
		// idAd: _.uniqueId,
		defaults: {
			// adId: _.uniqueId(),
			price: 0,
			img: 'img/noImage.jpg',
			publication: true, 
			description: '',
			name: ''
		},
		validate: function(attrs, options) {
		    if (attrs.price < 0) {
		      return "цена не может быть отрицательной";
		    }
		    if(!isFinite(attrs.price)){
		    	 return "цена должна быть числом";
		    }
		    if(!attrs.name){
		    	return "задайте имя";
		    }
		}
	});
	//пользователь 
	App.models.User = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("user"),
		defaults: {
			role: 'user'
		}
	})

	//коллекция пользователей
	App.collections.Users = Backbone.Collection.extend({
		model: App.models.User,
		userSearch: function(user){
			var length = this.models.length;
			for(var i = 0; i < length; i++){
				if(this.models[i].get('name') == user.name){
					if(this.models[i].get('password') == user.password){
						return this.models[i];
					}
					else{
						return false;
					}
				}
			}
			return false;
		
		}

	})

	//коллекция объявлений
	App.collections.Ads = Backbone.Collection.extend({
		model: App.models.Ad,
		 localStorage: new Backbone.LocalStorage("app")

	});
	
	//категория
	App.models.Category = Backbone.Model.extend({
		defaults: {
			// idCategory: _.uniqueId,
			name: ''
		}
	});

	//коллекция категорий
	App.collections.categories = Backbone.Collection.extend({
		model: App.models.Category
	});
