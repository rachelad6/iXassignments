var app = angular.module('ListApp', []); 

app.controller('ListCtrl', function($scope) {
  $scope.newItem = "";
  $scope.newItemQuantity = "";
  $scope.items = [];
  
  $scope.addItem = function() {
    var repeat=false;
    for (var i=0; i<$scope.items.length; i++) {
    	if($scope.items[i].name === $scope.newItem.toLowerCase()) {
    		$scope.items[i].quantity = parseInt($scope.items[i].quantity) + parseInt($scope.newItemQuantity);
    		repeat = true;
    	}
    }
    if(!repeat) {
    	var item= {
    		"name": $scope.newItem.toLowerCase(),
    		"quantity": $scope.newItemQuantity,
    		"isEditing": false
    	};
    	$scope.items.push(item);
    	$scope.newItem = "";
    	$scope.newItemQuantity = "";
	}
  }

  $scope.deleteItem = function(i) {
	$scope.items.splice(i, 1);
  };

  $scope.incQuantity = function(item) {
	console.log(item);
	item.quantity = parseInt(item.quantity) + 1;
  };

  $scope.decQuantity = function(item) {
	console.log(item);
	if(parseInt(item.quantity) -1 >=0)
		item.quantity = parseInt(item.quantity) - 1;
  };

   $scope.emptyCart = function() {
  	$scope.items = [];
  }

 });


  