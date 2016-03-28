// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {
	console.log("SKIT");
	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.setNumberOfGuest = function(number){
		Dinner.setNumberOfGuests(number);
	}

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	$scope.plusButton = function(){
		console.log("uyuyuuy");
		Dinner.setNumberOfGuests(Dinner.getNumberOfGuests() + 1);
	};
 
	$scope.minusButton = function(){
		Dinner.setNumberOfGuests(Dinner.getNumberOfGuests() - 1);
	};

	
	$scope.menu = Dinner.getFullMenu();

	$scope.getDishPrice2 = function(id) {
		console.log("Dish id!!!!!",id);
		//return Dinner.getDishPrice(id);
	};

	$scope.testFunc = function (dishId) {
	    //$scope.dishPrice = 0; 
	    //console.log("IIIIIDDDDDDDDish id:",dishId);
	    console.log("YO");
	    $scope.dish = Dinner.Dish.get({id:dishId});
	    console.log($scope.dish);
	    $scope.ingredients = $scope.dish.Ingredients;
	    console.log($scope.dish.Title);
	    //for (var i = 0; i < 4; i++) {
	    //      $scope.ingredient = $scope.ingredients[i];
	    //      ingredientQuantity = $scope.ingredient.Quantity;
	    //      $scope.price = 1*ingredientQuantity;
	    //      $scope.dishPrice = $scope.dishPrice + $scope.price;
	    //    }
	    //return $scope.dishPrice;
    };
	



	// TODO in Lab 5: Implement the methods to get the dinner menu
	// add dish to menu and get total menu price

});