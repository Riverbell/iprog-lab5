// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('OverviewCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	$scope.menu = Dinner.getFullMenu();

	$scope.dishPrice = function(dishID) {
	    console.log("dish id:",dishID);
		$scope.dish = Dinner.Dish.get({id:dishID});
		var dishPrice = 0; 
	    console.log($scope.dish);
	    $scope.ingredients = $scope.dish.Ingredients;
	    console.log($scope.ingredients);
	    for (var i = 0; i < 4; i++) {
	          ingredient = ingredients[i];
	          ingredientQuantity = ingredient.Quantity;
	          var price = 1*ingredientQuantity;
	          dishPrice = dishPrice + price;
	        }
	    return dishPrice;
	    }




});