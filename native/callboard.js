//пользователь
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
User.prototype.editAd = function(){

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

//объявление
function Ad(name, price, description, category, img){
	this.id = getUniqueAdID();
	this.name = name;
	this.price = price;
	this.description = description;
	this.img = img || 'noImage.jpg';
	this.userID = currentUser.id;
	this.categoryID = categoryID;
	this.publication = false;
}

function Category(name){
	this.name = name;
	this.id = getUniqueCategoryID();
}