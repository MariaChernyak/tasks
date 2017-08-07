var users = []; //массив пользователей
var ads = [];
var categories = [];
var currentUser = null;

var getUniqueUserID = getUniqueNumber(); //
var getUniqueAdID = getUniqueNumber();
var getUniqueCategoryID = getUniqueNumber();

//конструктор для пользователя
function User(name, password){
	this.id = getUniqueUserID();
	this.password = chipher(password);
	this.name = name;
	this.listIDAd = [];
}
//добавление объявления
User.prototype.addAd = function(){

}
//редактирование объявления
User.prototype.editAd = function(id, name, photo, price, description){
	var length = this.listIDAd.length;
	ads[id].name = name;
	ads[id].img = photo;
	ads[id].price = price;
	ads[id].description = description;
		
}
//удаление объявления
User.prototype.deleteAd = function(){

} 

function Admin(name, password){
	User.apply(this, arguments);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

//модерирование записи
Admin.prototype.moderate = function(){

}

// временный блок
users.push(new Admin('Maria', 1111));
var a = new Admin('Mari', 111);
users.push(a);
users.push(new User('Andrey', 2222));

currentUser = users[0];
ads.push(new Ad('АБВГ', 2, 'sda', 1));
ads.push(new Ad('ФФ', 2, 'sdddda', 1));
currentUser = users[1];
ads.push(new Ad('3', 2, 'sdddda', 2));
currentUser = users[0];
ads.push(new Ad('4', 2, 'sdddda', 0));

categories.push(new Category('Продать'));
categories.push(new Category('Купить'));
categories.push(new Category('Сдать в аренду'));

function Category(name){
	this.name = name;
	this.id = getUniqueCategoryID();
}

var content = document.querySelector('.content');



var navigation = document.querySelector('.navigation');
navigation.addEventListener('click', tab);

//переключение категорий
function tab(e){
	var id = parseInt(e.target.id);
	var list = e.target.parentNode.children;

	for(var i = 0; i < list.length; i++){
		list[i].classList.remove('active');
	}
	e.target.classList.add('active');

	if(isFinite(id)){
		showAds(id);
	}
	else{
		showAds();
	}
}
document.getElementById('signin-button').addEventListener('click', signin);

//!!!!позже заменить на submit
function signin(){
	var name = document.getElementById('login').value;
	if(name){
		var length =  users.length;
		for(var i = 0, flag = 0; i < length; i++){
			if(name == users[i].name){
				flag = 1;
				if(document.getElementById('pass').value && chipher(document.getElementById('pass').value) == users[i].password){
					currentUser = users[i];

					$('#signin').modal('hide');
					document.getElementById('login').value = '';
					document.getElementById('pass').value = '';


				}
				else{
					alert('неверный пароль')
				}
				break;
			}
		}
		if(!flag){
			alert('Пользователь с таким именем не найден');
		}
	}
	else{
		alert('Введите имя')
	}
}

document.getElementById('save').addEventListener('click', editAd);

function showListCategories(){
	
	var ul = document.querySelector('.categories');
	var length = categories.length;

	for(var i = 0; i < length; i++){
		var str = "<li id='" + categories[i].id + "category'>" + categories[i].name + "</li>";
		ul.innerHTML += str;
	}
	navigation.appendChild(ul);
}

//выводит список объявлений
function showAds(categoryID){
	content.innerHTML = '';
	var length = ads.length;

	if(length){
		if(arguments.length){
			for(var i = length-1; i >= 0; i--){
				if(ads[i] && ads[i].publication){
					if(ads[i].categoryID == categoryID){
						showAd(ads[i]);
					}
				}
				
			}
		}
		else{
			for(var i = length-1; i >= 0; i--){
				if(ads[i] && ads[i].publication){
					showAd(ads[i]);
				}
			}
		}
	}
	
}

//выводит объявление
function showAd(obj){
	var ad = document.createElement('div');
	ad.classList.add('ad');
	ad.id = obj.id;
	showInfoAd(obj, ad);
	content.appendChild(ad);
}

function showInfoAd(obj, ad){
	var str = '';
	if(obj.userID === currentUser.id || (currentUser.constructor == Admin)){
		str = "<ul class ='edit-buttons'><li class='edit'><a class='glyphicon glyphicon-pencil'  data-toggle='modal' data-target='#edit' ></a></li>";
		str += "<li class='delete'><a class='glyphicon glyphicon-remove'></a></li></ul>";

	}
	console.log(obj.img);
	str += "<img src='" + obj.img + "'><h2 class='ad-name'>" + obj.name + "</h2>";
	str += "<p class='ad-price'>" + obj.price + "руб</p><p class='description'>" + obj.description + "</p>";
	ad.innerHTML = str;
	if(ad.querySelector('.edit')){
		ad.querySelector('.edit').addEventListener('click', edit);
	}
	if(ad.querySelector('.delete')){
		ad.querySelector('.delete').addEventListener('click', deleteAd);
	}
}

function deleteAd(){
	var id = this.parentNode.parentNode.id;
	removeAd(id);
	this.parentNode.parentNode.remove();
}

function edit(){
	var id = this.parentNode.parentNode.id;
	var ad = getAd(id);
	document.getElementById('edit').setAttribute('data-ad-id', id);
	document.getElementById('name').value = ad.name;
	document.getElementById('price').value = ad.price;
	document.getElementById('description').value = ad.description;

}

function editAd(){
	var adID = document.getElementById('edit').getAttribute('data-ad-id');
	console.log();
	var name = document.getElementById('name').value;

	// var photo = document.getElementById('photo').value;
	var photo =  'img/noImage.jpg';
	var price = document.getElementById('price').value;

	var description = document.getElementById('description').value;

	currentUser.editAd(adID, name, photo, price, description);

	showInfoAd(getAd(document.getElementById(adID).id), document.getElementById(adID));
	$('#edit').modal('hide');
	resetForm();

}

function resetForm(){
	document.getElementById('name').value = '';
	document.getElementById('price').value = '';
	document.getElementById('description').value = '';
}

function getAd(id){
	return ads[id];
}

function removeAd(id){
	if(currentUser.id == ads[id].userID ){
		var length = currentUser.listIDAd.length;
		for(var i = 0; i < length; i++){
			if(currentUser.listIDAd[i] == id){
				delete currentUser.listIDAd[i];
			}
		}
	}
	delete ads[id];
}
//конец временного блока


function getUniqueNumber(){ //возвращает функцию-счетчик
	var number = 0;
	return function(){
		return number++;
	}
}

//пользователи


//записи


function Ad(name, price, description, categoryID, img){
	this.id = getUniqueAdID();
	this.name = name;
	this.price = price;
	this.description = description;
	this.img = img || 'img/noImage.jpg';
	this.userID = currentUser.id;
	this.categoryID = categoryID;
	this.publication = true;
}

function login(){

}

function chipher(password){
	return password;
}

showListCategories();
showAds();
