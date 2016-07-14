var app = angular.module('tensionApp', ['ngRoute', 'firebase']);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'HomeCtrl',
		templateUrl: 'templates/home.html',
	});
	$routeProvider.when('/channel/:channelId/', {
		controller: 'ChannelCtrl',
		templateUrl: 'templates/channel.html',
	});
	$routeProvider.when('/signup', {
		controller: 'SignUpCtrl',
		templateUrl: 'templates/signup.html',
	})
	$routeProvider.when('/login', {
		controller: 'LoginCtrl',
		templateUrl: 'templates/login.html',
	})
});

app.controller("HomeCtrl", function($scope, $firebaseArray, $firebaseObject, $routeParams) {
 	var ref = firebase.database().ref().child('channels');
 		$scope.channels = $firebaseArray(ref);
 		console.log($scope.channels);
 	// var ref = firebase.database().ref().child('channels').child('random');
 	// $scope.channel = $firebaseObject(ref);
 	// $scope.channel.name = "Random";
 	// $scope.channel.description = "off-topic";
 	// $scope.channel.$save();
 });	


app.controller("ChannelCtrl", function($scope, $firebaseArray, $firebaseObject, $routeParams) {
    var ref = firebase.database().ref().child('messages').child($routeParams.channelId);
    $scope.messages = $firebaseArray(ref);
    $scope.sendMessage = function() {
        $scope.messages.$add({
            text: $scope.userName,
            sender: $scope.newMessage,
            created_at: Date.now()
        });
     };

     $scope.newMessage = "";
     console.log($scope.messages);
});

app.controller('SignUpCtrl', function($scope, $firebaseArray, $firebaseObject, $routeParams, $firebaseAuth) {
    $scope.errorMessage = "";
    $scope.signUp = function() {
        console.log($scope.name);
        console.log($scope.email);
        console.log($scope.password);
    
    $scope.authObj = $firebaseAuth();
    
    $scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
            var ref = firebase.database().ref().child('users').child(firebaseUser.uid);
            $scope.users = $firebaseObject(ref);
            $scope.users.name= $scope.name;
            // $scope.users.email = $scope.email;
            // $scope.users.password = $scope.password;
            $scope.users.$save();
            $scope.name = "";
            $scope.email = "";
            $scope.password = "";
            console.log("User" + firebaseUser.uid + "created successfully!");
        }).catch(function(error) {
            console.log("Error:" , error);
            $scope.errorMessage = error.message;
        });
    }
});

app.controller('LoginCtrl', function($scope, $firebaseArray, $firebaseObject, $routeParams, $firebaseAuth) {
    $scope.errorMessage = "";
    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);
    
    $scope.authObj = $firebaseAuth();
    
    $scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password)
    .then(function(firebaseUser) {
  		console.log("Signed in as:", firebaseUser.uid);
	}).catch(function(error) {
  		console.error("Authentication failed:", error);
        $scope.errorMessage= error.message;
	});
}
});


    // $scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
    //     .then(function(firebaseUser) {
    //         var ref = firebase.database().ref().child('users').child(firebaseUser.uid);
    //         $scope.users = $firebaseObject(ref);
    //         $scope.users.name= $scope.name;
    //         $scope.users.$save();
    //         $scope.name = "";
    //         $scope.email = "";
    //         $scope.password = "";
    //         console.log("User" + firebaseUser.uid + "created successfully!");
    //     }).catch(function(error) {
    //         console.log("Error:" , error);
    //     });
    // }


