$.get('../json/categories.json', function(data){
	localStorage.setItem('categories', JSON.stringify(data));
	var category = $('#category');
	var navigation = $('.navigation ul');
	for(var i = 0; i < data.length; i++){
		category.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
		// navigation.append('<li data-bind="click:tab" id="' + data[i].id + '">' +   data[i].name +'</li>')

	}
	$('#category option[value = "-1"]').prop('disabled', true);


});

$.get('../json/users.json', function(data){
	localStorage.setItem('users', JSON.stringify(data));
	// localStorage.setItem('currentUser', JSON.stringify(data[0]));
});

//  $.get('../json/ads.json', function(data){
// 	localStorage.setItem('ads', JSON.stringify(data));
// });

var Ad = function(obj){
	this.id = ko.observable(obj.id);
	this.name = ko.observable(obj.name);
	this.categoryID = ko.observable(obj.categoryID);
	this.userID = ko.observable(obj.userID);
	this.price = ko.observable(obj.price) || 0;
	this.description = ko.observable(obj.description) || '';
	this.img = ko.observable(obj.img) || 'img/noImage.jpg';
}
// var ads = [];
// if(localStorage.getItem('ads')){
// 	ads = ko.observableArray(JSON.parse(localStorage.getItem('ads')));
// 	console.log(JSON.parse(localStorage.getItem('ads')))
// }

// var viewModel = {
	
// 	ads:  function(){
// 		if(localStorage.getItem('ads')){
// 			var adsArray = JSON.parse(localStorage.getItem('ads'));
// 			var ads = ko.observableArray();
// 			for(var i = 0; i < adsArray.length; i++){
// 				ads.push(new Ad(adsArray[i]));
// 			}
// 		}
// 		else{
// 			var ads = ko.observableArray([]);
// 		}
// 		return ads
// 	}(),
// 	currentUser: ko.observable(JSON.parse(localStorage.getItem('currentUser')) || null),
// 	openEditForm: function(){
		
// 	},
// 	deleteAd: function(ad){
// 		// ads.remove(this);
// 		console.log(this)
// 		console.log(ad);
// 	}
	
// }
var ViewModel = function(){
	var that  = this;
	//массив объявлений
	this.ads =  function(){
		if(localStorage.getItem('ads')){
			var adsArray = JSON.parse(localStorage.getItem('ads'));
			var ads = ko.observableArray();
			for(var i = 0; i < adsArray.length; i++){
				ads.push(new Ad(adsArray[i]));
			}
		}
		else{
			var ads = ko.observableArray([]);
		}
		return ads
	}();
	this.categories = function(){
		if(localStorage.getItem('categories')){
			var categories = ko.observableArray(JSON.parse(localStorage.getItem('categories')));
		}
		else{
			var categories = ko.observableArray([]);
		}
		return categories;
	};

	//переключение категории
	this.tab = function(){
		var self = this;
		console.log(self.id)
		console.log(that.ads.removeAll(function(item) {
			// return item.categoryID() !== self.id 
return true;
		}
			))
		// console.log(that.ads())
	};	

	//текущий пользователь
	this.currentUser = ko.observable(JSON.parse(localStorage.getItem('currentUser')) || null);

	//временный пользователь
	// this.temporaryUser = {
	// 	name: ko.observable(''),
	// }
	//открытие формы редактирования
	this.openEditForm =  function(){

		that.currentAd(this);
	};
	//открытие формы добавления
	this.openAddForm = function(){
		that.currentAd(null);
		console.log('open')
	};
	//сохранение ads в localStorage
	this.save = function(){
		localStorage.setItem('ads', ko.toJSON(that.ads))
	};
	//удаление объявления
	this.deleteAd =  function(ad){
		that.ads.remove(this);
		that.save();
	};
	//выбранное объявление
	this.currentAd = ko.observable({});
	this.signout = function(){
		that.currentUser(null);
	};
	//вход 
	this.signIn = function(){
		var login = $('form[name="signin"] [name = "login"]').val();
		var password =  $('form[name="signin"] [name = "password"]').val();
		console.log('a')
		var users = JSON.parse(localStorage.getItem('users'));

		for(var i = 0; i < users.length; i++){
			if(login == users[i].name){
				if(password == users[i].password){
					that.currentUser(users[i]);
				}
			}
		}
		$('#signin').modal('hide');
		$('form[name="signin"] input').val('');
	};
	//регистрация
	this.signUp = function(){
		var login = $('form[name="signup"] [name = "login"]').val();
		var password =  $('form[name="signup"] [name = "password"]').val();
		var proofPassword =  $('form[name="signup"] [name = "proofPass"]').val();
		if(password === proofPassword){
			if(login){
				var users = JSON.parse(localStorage.getItem('users'));
				var user = {
					id: users.length,
					name: login,
					password: password
				}
				users.push(user);
				localStorage.setItem('users', JSON.stringify(users));
				that.currentUser(user);
			}
		}
		$('#signup').modal('hide');
		$('form[name="signup"] input').val('');
	}
}
var app = new ViewModel();
app.currentUser.subscribe(function(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
});
ko.applyBindings(app);

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
			// countAds = 8;
			break;
	
		case '2': $('.content').addClass('column-2');
			// countAds = 16;
			break;
		
		case '3':
			$('.content').addClass('column-1');
			// countAds = 8;
			break;
	}
})

$('form').submit(function(event){
	event.preventDefault();
})

$('.categories').prepend("<li id='-1category' class='active'>Все объявления</li>")