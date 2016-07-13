var app = angular.module('chommiesApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'FeedCtrl',
		templateUrl: 'templates/feed.html'
	});
	$routeProvider.when('/me/:brusId', {
		controller: 'MeCtrl',
		templateUrl: 'templates/me.html'
	});
});

app.controller('FeedCtrl', function($scope, $http) {
	$scope.isSending = false;
	$http ({
		url: "http://ixchommies.herokuapp.com/props",
		method: "GET",
		params: {
			token: "823aad78de2524bb97a079ed4933b45b",
		}
	}).then(function(response) {
		console.log(response);
		$scope.props = response.data;
	})

	$http ({
		url: "http://ixchommies.herokuapp.com/brus",
		method: "GET",
		params: {
			token: "823aad78de2524bb97a079ed4933b45b",
		}
	}).then(function(response) {
		console.log(response);
		$scope.brus = response.data;
	})

	$scope.sendProps = function(x,y) {
			console.log($scope.selectedBru);
			console.log($scope.newPropsValue);
			$scope.errorMessage = "";
			$scope.isSending = true;
	$http ({
		url: "http://ixchommies.herokuapp.com/props",
		method: "POST",
		params: {
			token: "823aad78de2524bb97a079ed4933b45b",
		},
		data: {
			for: x,
			props: y
		}
	}).then(function(response) {
		console.log(response);
		$scope.props.unshift(response.data);
		$scope.newPropsValue = "";
		$scope.selectedBru = "";
	}).catch(function(response) {
		console.log(response);
		$scope.errorMessage = response.data.message;
		$scope.newPropsValue = "";
		$scope.selectedBru = "";
	}).finally(function(response) {
		console.log(response);
		$scope.isSending = false;
	})
}
	});

app.controller('MeCtrl', function($scope, $http) {
	$http ({
		url: "http://ixchommies.herokuapp.com/props/me",
		method: "GET",
		params: {
			token: "823aad78de2524bb97a079ed4933b45b",
		}
	}).then(function(response) {
		console.log(response);
		$scope.meprops = response.data;
	})
})
