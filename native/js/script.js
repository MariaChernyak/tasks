var getUniqueUserID = getUniqueNumber(); //генерирует ID
var getUniqueAdID = getUniqueNumber(); //
var getUniqueCategoryID = getUniqueNumber();//
var currentCategoryID = -1;
var countAds = 8;
var users = []; //массив пользователей
var ads = [];
var categories = [];
var currentUser = null;
var reader = new FileReader();



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

function Category(name){
	this.name = name;
	this.id = getUniqueCategoryID();
}

function chipher(password){
	return password;
}

//конструктор для пользователя
function User(name, password){
	this.id = getUniqueUserID();
	this.password = chipher(password);
	this.name = name;
	this.listIDAd = [];
}

//добавление объявления
User.prototype.addAd = function(name, price, description, categoryID, img){
	 var ad = new Ad(name, price, description, categoryID, img);
	 currentUser.listIDAd.push(ad.id);
	 ads.push(ad);
	 localStorage.setItem('ads', JSON.stringify(ads));
	 ads = JSON.parse(localStorage.getItem('ads'));
	 return ad;

}
//редактирование объявления
User.prototype.editAd = function(id, name, price, description, categoryID, photo){
	// var length = this.listIDAd.length;
	var ad = ads[getAdIndex(id)];
	ad.name = name;
	if(photo){
		ad.img = photo;
	}

	ad.price = price;
	ad.description = description;
	ad.categoryID = categoryID;
	localStorage.setItem('ads', JSON.stringify(ads));
	ads = JSON.parse(localStorage.getItem('ads'));

}
//удаление объявления
User.prototype.deleteAd = function(adID){
	var length = currentUser.listIDAd.length;
	if(currentUser){
		for(var i = 0; i < length; i++){
			if(currentUser.listIDAd[i] == adID){
				currentUser.listIDAd.splice(i, 1);
				// delete currentUser.listIDAd[i];
			}
		}
	}
	var ad = ads[getAdIndex(adID)];
	if(ad){
		ads.splice(getAdIndex(adID),1);
		// delete ads[adID];
	}
	localStorage.setItem('ads', JSON.stringify(ads));
	ads = JSON.parse(localStorage.getItem('ads'));

} 
function Admin(name, password){
	User.apply(this, arguments);
	this.role = 'admin';
}
//наследование Admin от User
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

//модерирование записи
Admin.prototype.moderate = function(adID){
	var index = getAdIndex(adID);
	if(ads[index]){
		ads[index].publication = true;
	}
	localStorage.setItem('ads', JSON.stringify(ads));
	ads = JSON.parse(localStorage.getItem('ads'));

}

//возвращает функцию-счетчик
function getUniqueNumber(){ 
	var number = 0;
	return function(){
		return number++;
	}
}
//возвращает объявление по id
function getAdIndex(id){
	for(var i = 0; i < ads.length; i++){
		if(ads[i].id == id){
			return i;
			break;
		}
	}
}

users.push(new Admin('Maria', 1111));
users.push(new User('Andrey', 2222));

currentUser = users[0];
currentUser.addAd('пр. Победителей 56', 500, 'Сдам уютную 1-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная, Машерова 12', 800, 'Сдам квартиру на длительный срок', 2, "img/2.jpg");
currentUser.addAd('куплю квартиру', 0, 'Ищу 1-2-комнатную квартиру недалеко от метро. Недорого', 1, "img/3.jpg");
currentUser = users[1];
currentUser.addAd('пр. Победителей 50', 5, 'Сдам уютную 2-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная', 600, 'Сдам квартиру на длительный срок', 2);
currentUser.addAd('Продам квартиру', 50000, '2-комнатная квартиру недалеко от метро Каменная горка. Недорого', 0, "img/4.jpg");
currentUser.addAd('пр. Победителей 50', 5, 'Сдам уютную 2-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная', 600, 'Сдам квартиру на длительный срок', 2);
currentUser.addAd('Продам квартиру', 50000, '2-комнатная квартиру недалеко от метро Каменная горка. Недорого', 0, "img/4.jpg");currentUser.addAd('пр. Победителей 50', 5, 'Сдам уютную 2-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная', 600, 'Сдам квартиру на длительный срок', 2);
currentUser.addAd('Продам квартиру', 50000, '2-комнатная квартиру недалеко от метро Каменная горка. Недорого', 0, "img/4.jpg");currentUser.addAd('пр. Победителей 50', 5, 'Сдам уютную 2-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная', 600, 'Сдам квартиру на длительный срок', 2);
currentUser.addAd('Продам квартиру', 50000, '2-комнатная квартиру недалеко от метро Каменная горка. Недорого', 0, "img/4.jpg");currentUser.addAd('пр. Победителей 50', 5, 'Сдам уютную 2-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная', 600, 'Сдам квартиру на длительный срок', 2);
currentUser.addAd('Продам квартиру', 50000, '2-комнатная квартиру недалеко от метро Каменная горка. Недорого', 0, "img/4.jpg");currentUser.addAd('пр. Победителей 50', 5, 'Сдам уютную 2-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная', 600, 'Сдам квартиру на длительный срок', 2);
currentUser.addAd('Продам квартиру', 50000, '2-комнатная квартиру недалеко от метро Каменная горка. Недорого', 0, "img/4.jpg");currentUser.addAd('пр. Победителей 50', 5, 'Сдам уютную 2-комнатную квартиру на длительный срок', 2, "img/1.jpg");
currentUser.addAd('2-х комнатная', 600, 'Сдам квартиру на длительный срок', 2);
currentUser.addAd('Продам квартиру', 50000, '2-комнатная квартиру недалеко от метро Каменная горка. Недорого', 0, "img/4.jpg");

categories.push(new Category('Продать'));
categories.push(new Category('Купить'));
categories.push(new Category('Сдать в аренду'));

localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('categories', JSON.stringify(categories));
localStorage.setItem('ads', JSON.stringify(ads));

function getUsersFromStorage(){
	var usersArray = JSON.parse(localStorage.getItem('users'));

	for(var i = 0; i < usersArray.length; i++){
		if(usersArray[i].role && usersArray[i].role == 'admin'){
			usersArray[i].__proto__ = Admin.prototype;
		}
		else{
			usersArray[i].__proto__ = User.prototype;
		}
	}
	return usersArray;
		
}

users = getUsersFromStorage();
categories = JSON.parse(localStorage.getItem('categories'));
ads = JSON.parse(localStorage.getItem('ads'));


//block - элемент, в который выводить объявления
//count - количество элементов для вывода
function showAdList(container, count, categoryID, from){
	// container.innerHTML = '';
	if(count && count >= 0){
		if(categoryID >= 0){
			var adsArray = ads.filter(function(ad){
				return ad.categoryID == categoryID;
			})
		}
		else if(categoryID == -1){
			adsArray = ads;
		}
		var length = adsArray.length;
		
		if(from){
			length -= from;
		}
		if(length > 0){
			var $frag = $(document.createDocumentFragment());
						
			for(var i = length-1; i >= 0 && count; i--){
				if(adsArray[i] && adsArray[i].publication){
					var $div = createAdContainer(ads[i]);
					showAd(adsArray[i], $div);
					// countAds += count;
					count--;
					$frag.append($div);
				}
			}
			container.append($frag);
			
		}
		if(i < 0){
			console.log('aa')
			$('#load-button').addClass('none');
		}
		else{
			$('#load-button').removeClass('none');
		}
	}
}


//возвращает пустой  блок 
function createAdContainer(ad){
	var $div = $('<div></div>').addClass('ad');
	$div.attr('id', ad.id);
	return $div;
}
//ad - объявление
//div - блок для вставки объявления

function showAd(ad, $div, container){
	var str = '';
	if(currentUser){
		if(ad.userID === currentUser.id || (currentUser.constructor == Admin)){
			str = "<ul class ='edit-buttons'><li class='edit'><a class='glyphicon glyphicon-pencil'  data-toggle='modal' data-target='#edit' ></a></li>";
			str += "<li class='delete'><a class='glyphicon glyphicon-remove'></a></li></ul>";
		}
	}
	
	str += "<img src='" + ad.img + "'><h2 class='ad-name'>" + ad.name + "</h2>";
	str += "<p class='ad-price'>" + ad.price + "руб</p><p class='description'>" + ad.description + "</p>";
	$div.html(str);
	if($div.find('.edit')){
		$div.find('.edit').click(edit);
	}

	// if(div.querySelector('.edit')){
	// 	div.querySelector('.edit').addEventListener('click', edit);
	// }
	if($div.find('.delete')){
		$div.find('.delete').click(deleteAd)
	}
	// if(div.querySelector('.delete')){
	// 	div.querySelector('.delete').addEventListener('click', deleteAd);
	// }
	if(container){

		container.prepend($div);
	}

}

function deleteAd(){
	var id = this.parentNode.parentNode.id;
	currentUser.deleteAd(id);
	this.parentNode.parentNode.remove();
}

//переключение категорий
function tab(e){
	var id = parseInt(e.target.id);
	currentCategoryID = id;
	var list = e.target.parentNode.children;

	for(var i = 0; i < list.length; i++){
		list[i].classList.remove('active');
	}
	e.target.classList.add('active');
	var content = $('.content');
	if(isFinite(id)){
		content.html('');
		showAdList(content, countAds, id);
		// showAds(id);
	}
	else {
		content.innerHTML = '';
		showAdList(content, countAds, -1);
		// showAds();
	}
}
function showListCategories(){
	
	var ul = $('.categories');
	var length = categories.length;

	for(var i = 0; i < length; i++){
		var str = "<li id='" + categories[i].id + "category'>" + categories[i].name + "</li>";
		ul.html(ul.html() + str);
	}
	navigation.append(ul);
}

function edit(){
	var id = this.parentNode.parentNode.id;
	var ad = ads[getAdIndex(id)];
	$("form[name='edit-form']").attr('data-ad-id', id);
	$('#name').val(ad.name);
	$('#price').val(ad.price) ;
	$('#description').val(ad.description);
	// document.querySelector("form[name='edit-form']").setAttribute('data-ad-id', id);
	// document.getElementById('name').value = ad.name;
	// document.getElementById('price').value = ad.price;
	// document.getElementById('description').value = ad.description;
}

document.querySelector("form[name='edit-form']").addEventListener('submit', function(event){
	event.preventDefault();
	if(validateForm(this)){
		var id = this.getAttribute('data-ad-id');
		if(currentUser){
			var photo;
			var form = this;
			reader.onload = function(event) {
	    		var dataUrl = event.target.result;
	    		var photo = event.target.result;
	    	
	    	//редактирование	
	    		if(id){
					currentUser.editAd(id, form.name.value,  form.price.value, form.description.value, form.category.value, photo);
					showAd(ads[getAdIndex(id)], $(id));
					$('#edit').modal('hide');
					resetForm(form);
				}
			//добавление
				else{
					var ad = currentUser.addAd(form.name.value,  form.price.value, form.description.value, form.category.value, photo);
					$('#edit').modal('hide');
					resetForm(form);
					if(ad.categoryID == currentCategoryID || currentCategoryID == -1){
						showAd(ad, createAdContainer(ad), $('.content'));
					}
				}
		    }
	 
			reader.onerror = function(event) {
		   		 console.error("Файл не может быть прочитан! код " + event.target.error.code);
			}
		 
			if(this.photo.value){
				reader.readAsDataURL(this.photo.files[0]);
			}	
			else{
				//редактирование
				if(id){
					currentUser.editAd(id, this.name.value,  this.price.value, this.description.value, this.category.value, photo);
					showAd(ads[getAdIndex(id)], $('#' + id));
					$('#edit').modal('hide');
					resetForm(this);
				}
				//добавление
				else{
					var ad = currentUser.addAd(this.name.value,  this.price.value, this.description.value, this.category.value, photo);
					$('#edit').modal('hide');
					resetForm(this);
					if(ad.categoryID == currentCategoryID || currentCategoryID == -1){
						showAd(ad, createAdContainer(ad), $('.content'));
					}
				}
			}
			
		}
	}
});
// document.getElementById('edit-button').addEventListener('click', validateForm);

function validateForm(form){
	var flag = 0;
	if(!form.name.value){
		form.name.parentNode.classList.add('has-error');
		flag ++;
	}
	else{
		form.name.parentNode.classList.remove('has-error');
	}
	if(form.price.value && isFinite(form.price.value)){
		form.price.parentNode.classList.remove('has-error');
	}
	else{
		form.price.parentNode.classList.add('has-error');
		flag++;
	}
	if(!form.description.value){
		form.description.parentNode.classList.add('has-error');
		flag ++;
	}
	else{
		form.description.parentNode.classList.remove('has-error');
	}
	var categoryID = form.category.value;
	if(!flag){
		return true;
	}
	else{
		return false;
	}

	// form.photo.addEventListener("dragover", function(event) {
	//     event.preventDefault(); 
	// });
	// form.photo.addEventListener('drop', function(event){
	// 	event.preventDefault();
	// 	var file = event.dataTransfer.files[0];
	// 	reader.readAsDataURL(file);
	// 	console.log('aaaa');
	// })
	
	// reader.onload = function(event) {
 //    	var dataUrl = event.target.result;
 //      	console.log(dataUrl);
	// };
	 
	// reader.onerror = function(event) {
	//     console.error("Файл не может быть прочитан! код " + event.target.error.code);
	// };
	 
	// reader.readAsDataURL(form.photo.files[0]);
}

function resetForm(form){
	var inputs = form.querySelectorAll('input');
	var length = inputs.length;
	for(var i = 0; i < length; i++){
		inputs[i].value = '';
	}

}

document.getElementById('add-button').addEventListener('click', function(){
	var form = document.querySelector("form[name='edit-form']");
	resetForm(form);
	form.removeAttribute('data-ad-id');
});

function validateAutorizationForm(form){
	var flag = 0;
	if(this.login.value){
		form.login.parentNode.classList.remove('has-error');
	}
	else{
		form.login.parentNode.classList.add('has-error');
		flag++;

	}
	if(this.pass.value){
		form.pass.parentNode.classList.remove('has-error');
	}
	else{
		flag++;
		form.pass.parentNode.classList.add('has-error');
	}
	if(!document.getElementById('proofPass').parentNode.classList.contains('none')){
		if(this.pass.value === this.proofPass.value){
			form.proofPass.parentNode.classList.remove('has-error');
		}
		else{
			flag++;
			form.proofPass.parentNode.classList.add('has-error');
		}
	}
	if(flag){
		return false;
	}
	else{
		return true;
	}
}

function drawing(){
	$('.content').html('');
	showAdList($('.content'), countAds, currentCategoryID);
	if(currentUser){
		$('.userinfo').removeClass('none');
		$('.authorization').addClass('none');
		$('.username').html(currentUser.name);
		$('#add-button').removeClass('none');
		
		if(currentUser.role == 'admin'){
			
		}
	}
	else{
		$('.userinfo').addClass('none');
		$('.authorization').removeClass('none');
		$('#add-button').addClass('none');
	}

}

// var navigation = document.querySelector('.navigation');
// navigation.addEventListener('click', tab);

var navigation = $('.navigation');
navigation.click(tab);

showListCategories();


var category = document.getElementById('category');
for(var i = 0; i < categories.length; i++){
	category[i] = new Option(categories[i].name, categories[i].id);
}

document.getElementById('photo').addEventListener('change', function(){

})
$('#signin-button').click(function(){
	resetForm(document.querySelector('#signin form'));
	$('#signin form').attr('name', 'signin');
	$('.proofPass').addClass('none');

})
$('#signup-button').click(function(){
	resetForm(document.querySelector('#signin form'));
	$('#signin form').attr('name', 'signup');
	$('.proofPass').removeClass('none');
})

document.querySelector('#signin form').addEventListener('submit', function(event){
	event.preventDefault();
	if(validateAutorizationForm(this)){
		//вход
		if(this.name =='signin'){
			var length =  users.length;
			var name = this.login.value;
			for(var i = 0, flag = 0; i < length; i++){
				if(name == users[i].name){
					flag = 1;
					if(chipher(this.pass.value)== users[i].password){
						currentUser = users[i];
						$('#signin').modal('hide');
						drawing();
						break;
					}
					else{
						alert('неверный пароль')
					}
				}
			}
			if(!flag){
				alert('Пользователь с таким именем не найден');
			}
		} 
		//регистрация
		else{
			var user = new User(this.login.value, this.pass.value);
			users.push(user);
			currentUser = user;
			drawing();
			$('#signin').modal('hide');
		}
	}

})

$('#load-button').click(function(){
	console.log($('.ad').size());
	showAdList($('.content'), countAds, currentCategoryID, $('.ad').size());
})

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

$('#signout').click( function(){
		currentUser = null;
		drawing();
	})

drawing();


