var app = angular.module('calculatorApp', []);


app.controller('CalculatorCtrl', function($scope) {
	$scope.doAdd = function() {
		console.log($scope.x, $scope.y);
		var numx = parseInt($scope.x);
		var numy = parseInt($scope.y);
		$scope.result = numx + numy;
	};
	$scope.doMultiply = function() {
		console.log($scope.x, $scope.y);
		var numx = parseInt($scope.x);
		var numy = parseInt($scope.y);
		$scope.result = numx * numy;
	};
});