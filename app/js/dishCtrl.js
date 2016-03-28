// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

	$scope.id = $routeParams.dishId;

	$scope.getDish = function() {
		$scope.status = "Searching...";
  		$scope.dish = Dinner.Dish.get({id:$scope.id});
  		console.log($scope.dish);
	}

	$scope.getDish();

	$scope.addToMenu = function() {
		console.log("YO add dish to menu", $scope.dish.RecipeID);

		Dinner.addDishToMenu($scope.dish.Category,$scope.dish.RecipeID);
	}



});