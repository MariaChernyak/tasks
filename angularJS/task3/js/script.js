var app = angular.module('app', []);

app.controller('controller', function($scope) {
		$scope.a = "какой-то текст"
});
app.directive('modal', function() {
	return {
		restrict: 'E',
		scope: { 
			title : '@'
		},
		templateUrl: 'template.html',
		transclude: true,
      	// replace: true
	}
});

