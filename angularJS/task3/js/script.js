var app = angular.module('app', []);
app.controller('tab-controller', function(){

})
app.directive('tabControl', function(){
	return{
		restrict: 'E',
   	   	transclude: true,
   	   	scope: {},
   	   	templateUrl: 'tabControl.html',
   	   	controller: function($scope){
   	   		$scope.panes = [];
   	   		this.registerPane = function(pane){
   	   			$scope.panes.push(pane);
   	   			if($scope.panes.length === 1){
   	   				pane.selected = true;
   	   			}
   	   		}, 
   	   		$scope.onPaneActivated = function(pane){
   	   			for(var i = 0; i < $scope.panes.length; i++){
   	   				$scope.panes[i].selected = false;
   	   			}
   	   			pane.selected = true;

   	   		}
   	   	}
	}
})
app.directive('pane', function(){
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			title: '@'
		},
		link($scope, element, attr, ctrl){
			ctrl.registerPane($scope);
		},
		templateUrl: 'pane.html',
		require: '^tabControl'
	}
})