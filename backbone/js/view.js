// вид одного объявления
	App.views.Ad = Backbone.View.extend({
		tagName: 'div',
		className: 'ad',
		template:  _.template($('#adTemplate').html()),
		templateExtra: _.template($('#templateExtra').html()),
		events: {
			'click .edit' : 'openForm',
			'click .delete' :'destroy',
			'click' : 'console1'
		},
		initialize: function(){
			this.render();
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		render: function(){
			if(currentUser){
				// console.log(this.)
				if(currentUser.get('role') == 'admin' || currentUser.get('id') == this.model.get('userID')){

				this.$el.html( this.templateExtra( this.model.toJSON() ) );
				}
				else{
				this.$el.html( this.template( this.model.toJSON() ) );
				}
			}
			
			else{
				this.$el.html( this.template( this.model.toJSON() ) );
			}
			
			return this;
		},
		console1: function(){
			console.log(this.model)
		},
		openForm: function(){
			editAdView.model = this.model;
			editAdView.render();
		},
		destroy: function(){
			this.model.destroy();
		},
		remove: function(){
			this.$el.remove(); 
		}
	})

	//форма редактирования
	App.views.editAd = Backbone.View.extend({
		el: $('#edit'),
		events: {
			'submit form[name="edit-form"]' : 'edit',
			'submit form[name="add-form"]' : 'add'
		},
		
		initialize: function(){

			// this.render();
			// this.model.on('change', this.render, this);

		},
		render: function(){

			this.reset();
			this.$el.modal('show');
			if(this.model){
				$('#edit form').attr('name', 'edit-form');
				$('#name').val(this.model.get('name'));
				$('#price').val(this.model.get('price'));
				$('#description').val(this.model.get('description'));
				$('#category').val(this.model.get('categoryID'));
			}
			return this;
		},
		edit: function(event){
			event.preventDefault();
			if(this.validateForm()){
				this.save();
				this.reset();
				this.$el.modal('hide');
			}
		},
		add: function(event){
			event.preventDefault();
			if(this.validateForm()){
				this.model = new App.models.Ad();
				this.collection.add(this.model);
				this.save();
				this.model.save({userID: currentUser.id})
				this.reset();
				$('#edit').modal('hide');
			}
		},
		save: function(){
			this.model.save({'name': $('#name').val(), 'price': $('#price').val(), 'description': $('#description').val()});
			if($('#category').val()){
				this.model.save({'categoryID' : $('#category').val()});
			}
			if( $('#photo').val() ){
				reader.readAsDataURL($('#photo').prop('files')[0]);
				console.log('no' + reader)
				var that = this;
				reader.onload = function(event) {
					var dataUrl = event.target.result;
		    		var photo = event.target.result;
		    		// that.model.set('img', photo);
		    		that.model.save('img', photo);
				}	
			}
		},
		validateForm: function(name, price, description){
			var flag = 0;

			if(!$('#name').val()){
				$('#name').parent().addClass('has-error');
			 	flag++;
			}
			else{
				$('#name').parent().removeClass('has-error');
			}

			if(!isFinite($('#price').val())){
			 	$('#price').parent().addClass('has-error');
			 	flag++;
			}
			else{
			 	$('#price').parent().removeClass('has-error');
			}

			if(!$('#description').val()){
			 	$('#description').parent().addClass('has-error');
			 	flag++;
			}
			else{
			 	$('#description').parent().removeClass('has-error');
			}

			if(!flag){
				return true;
			}
			else{
				return false;
			}
		},
		reset: function(){
			$('#name').val('');
			$('#photo').val('');
			$('#price').val('');
			$('#description').val('');
			$('#category').val('');
			$('#edit .form-group').removeClass('has-error');
		}
	})

	//вид коллекции объявлений
	App.views.Ads = Backbone.View.extend({
		el: $('.content'),

		initialize: function(){
			this.collection.fetch();
			this.render()
			this.collection.on('add', this.addOne, this);
			this.collection.on('reset', this.render, this);
		},
		render: function(){
		
			// console.log(this.collection)
			this.$el.html('');
			this.collection.each(this.addOne, this);
	  		return this;
		},
		addOne: function(ad){
			var adView = new App.views.Ad({model: ad});
			this.$el.prepend(adView.render().el);
		}
	});

	App.views.category = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click' : 'search'
		},
		search: function(){
			$('.categories li').removeClass('active');
			this.$el.addClass('active');
			var newCollection = new App.collections.Ads();
			if( this.model.get('id') == -1){
				newCollection = collection;
			}
			else{
				var length = collection.length;
				for(var i = 0; i < length; i++){
					if(collection.models[i].get('categoryID') == this.model.get('id')){
						newCollection.add(collection.models[i]);
					}
				}
			}
			console.log(collectionView)
			collectionView.collection = newCollection;
			collectionView.render();
		},

		initialize: function(){
			this.render();
			if(this.model.get('id') == -1){
				this.$el.addClass('active');
			}
		},
		render: function(){
			this.$el.html(this.model.get('name'));
			return this;
		}
	});

	App.views.categories = Backbone.View.extend({
		el: $('.categories'),
		initialize: function(){
			this.render();
		},
		render: function(){
			this.collection.each(this.addOne, this);
	  		return this;
		},
		addOne: function(category){
			var categoryView = new App.views.category({model: category});
			this.$el.append(categoryView.render().el);
		}
	});

	// App.views.app = Backbone.View.extend({
	// 	el: $('.page-container'),

	// 	initialize: function(){

	// 	},
	// 	render: function(){
	// 		if()
	// 	}
	// });

App.views.user = Backbone.View.extend({
	el: $('header'),
	initialize: function(){
		this.collection.on('add', this.addUser, this);
		currentUser = this.model;
		this.render();
		return this;
	},
	events: {
		'click #signout' : 'signout',
		'click #signin-button' : 'openSignInForm',
		'click #signup-button' : 'openSignUpForm',
		'submit form[name="signin-form"]' : 'signin',
		'submit form[name="signup-form"]' : 'signup'
	},
	render: function(){
		// this.$el.html('');

		if(this.model){
			$('.userinfo').removeClass('none');
			$('.authorization').addClass('none');
			$('.username').html(this.model.get('name'));
			$('#add-button').removeClass('none');
		}
		else{
			$('.userinfo').addClass('none');
			$('.authorization').removeClass('none');
			$('#add-button').addClass('none');
		}
		return this;
	},
	signout: function(){
		this.model = null;
		currentUser = null;
		localStorage.removeItem('currentUser');
		this.render();
		collectionView.render();
	},
	openSignInForm: function(){
		$('#signin form').attr('name','signin-form');
		$('#signin').modal('show');
		$('.proofPass').addClass('none');

	},
	openSignUpForm: function(){
		$('#signin form').attr('name','signup-form');
		$('.proofPass').removeClass('none');
		$('#signin').modal('show');
	},
	signin: function(event){
		event.preventDefault();
		if(this.validateForm()){
			var name = $('#login').val();
			var password = $('#pass').val();
			var user = this.collection.userSearch({name: name, password: password});
			if(user){
				this.model = user;
				currentUser = user;
				localStorage.setItem('currentUser', JSON.stringify(currentUser.attributes));
				this.render();
				
			}
			$('#signin').modal('hide');
			this.resetForm();
			collectionView.render();
		}
		
	},
	signup: function(event){
		event.preventDefault();
		// this.validateForm();
		var name = $('#login').val();
		if(this.validateForm()){
			if($('#pass').val() == $('#proofPass').val()){
				var password = $('#pass').val();
				var user = new App.models.User({id: _.uniqueId(), name: name, password: password });
				this.model = user;
				this.collection.add(user);
				this.model = user;
				currentUser = user;
				localStorage.setItem('currentUser', JSON.stringify(currentUser.attributes));
				this.render();
				$('#signin').modal('hide');
				this.resetForm();
				collectionView.render();
			}
			else{
				$('#proofPass').parent().addClass('has-error');
			}
		}
	},
	validateForm: function(){
		var flag = 0;
		if(!$.trim($('#login').val())){
			$('#login').parent().addClass('has-error');
			flag++;
		}
		else{
			$('#login').parent().removeClass('has-error');
		}
		if(!$.trim($('#pass').val())){
			$('#pass').parent().addClass('has-error');
			flag++;
		}
		else{
			$('#pass').parent().removeClass('has-error');
		}
		if(!$.trim($('#proofPass').val()) && !$('.proofPass').hasClass('none')){
			$('#proofPass').parent().addClass('has-error');
			flag++;
		}
		else{
			$('#proofPass').parent().removeClass('has-error');
		}
		if(!flag){
			return true;
		}
		else{
			return false;
		}
	},
	resetForm: function(){
		$('#login').val('').parent().removeClass('has-error');
		$('#pass').val('').parent().removeClass('has-error');
		$('#proofPass').val('').parent().removeClass('has-error');
	},
	addUser: function(){
		var users = localStorage.getItem('userCollection');
		if(users){
			var user = this.model.attributes;
			var users = JSON.parse(users);
			users.push(user);
			localStorage.setItem('userCollection', JSON.stringify(users));
			
		}
	}
})