// вид одного объявления
	App.views.Ad = Backbone.View.extend({
		tagName: 'div',
		className: 'ad',
		template:  _.template($('#adTemplate').html()),
		events: {
			'click .edit' : 'openForm',
			'click .delete' :'destroy'
		},
		initialize: function(){
			this.render();
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
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
				this.save();
				this.collection.add(this.model);
				this.reset();
				$('#edit').modal('hide');
			}
		},
		save: function(){
			this.model.set('name', $('#name').val());
			this.model.set('price', $('#price').val());
			this.model.set('description', $('#description').val());
			if( $('#photo').val() ){
				reader.readAsDataURL($('#photo').prop('files')[0]);
				console.log('no' + reader)
				var that = this;
				reader.onload = function(event) {
					console.log('yes' + reader)
		    		var dataUrl = event.target.result;
		    		var photo = event.target.result;
		    		that.model.set('img', photo);

				}	
			}
			console.log(reader)
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
			$('#price').val('');
			$('#description').val('');
			$('#edit .form-group').removeClass('has-error');
		}
	})

	//вид коллекции объявлений
	App.views.Ads = Backbone.View.extend({
		el: $('.content'),
		
		initialize: function(){
			this.render()
			this.collection.on('add', this.addOne, this);
			this.collection.on('reset', this.render, this);
		},
		render: function(){
			console.log(this.collection)
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
					if(collection.models[i].get('categoryId') == this.model.get('id')){
						newCollection.add(collection.models[i]);
					}
				}
			}
			
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
			console.log(this.collection.models[0])
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

	App.views.app = Backbone.View.extend({});

