var app = angular.module('movieApp', ['ngRoute']); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'HomeCtrl',
		templateUrl: 'templates/home.html',
	})
	$routeProvider.when('/movie/:movieId', {
		controller: 'MovieCtrl',
		templateUrl: 'templates/movie.html'
	})
});

app.controller('HomeCtrl', function($scope, $http) {
	$scope.searchMovie = function(searchBar) {
	$http ({
			url: "http://www.omdbapi.com/?",
			method: "GET",
			params: {
				s: searchBar
			}
	}).then(function(response) {
		console.log(response);
		$scope.movieArray = response.data.Search;
	})
}
})

app.controller('MovieCtrl', function($scope, $http, $routeParams) {
	$http ({
			url: "http://www.omdbapi.com/",
			params: {
				i: $routeParams.movieId
			}
	}).then(function(response) {
		console.log(response);
		$scope.movie= response.data;

		$http ({
			url: "http://api.giphy.com/v1/gifs/search",
			method: "GET",
			params: {
				q: $scope.movie.Title,
				api_key: "dc6zaTOxFJmzC"
			}
	}).then(function(response) {
		console.log(response);
		$scope.gifArray = response.data.data;
	})
	});
});

