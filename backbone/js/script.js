var reader = new FileReader();
var currentUser;

if(localStorage.getItem('currentUser')){
	currentUser = new App.models.User(JSON.parse(localStorage.getItem('currentUser')));
}

var collection, collectionView, editAdView;

$.get('../json/categories.json', function(data){
	var collectionCategiries = new App.collections.categories(data);
	new App.views.categories({collection: collectionCategiries});

	var category = $('#category');
	for(var i = 0; i < data.length; i++){
		category.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');

	}
	$('#category option[value = "-1"]').prop('disabled', true);

});

$.get('../json/users.json', function(data){
	if(!localStorage.getItem('userCollection')){
		var userCollection = new App.collections.Users(data);
		localStorage.setItem('userCollection', JSON.stringify(data));
	}
	else{
		var userCollection = new App.collections.Users(JSON.parse(localStorage.getItem('userCollection')));
	}
	var userView = new App.views.user({model:currentUser, collection: userCollection})
})

 $.get('../json/ads.json', function(data){
	collection = new App.collections.Ads(data);
	for(var i = 0; i < collection.models.length; i++){
		collection.models[i].save();
	}
	collectionView = new App.views.Ads({collection: collection})
	editAdView = new App.views.editAd({collection: collection});

})

$('#add-button').click(function(){
		$('#edit form').attr('name', 'add-form');
		editAdView.model = null;
		editAdView.render();
});

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
