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

	$scope.getDishPrice = function(dishObject) {
		return Dinner.getDishPrice(dishObject);
	};

	$scope.fullMenuPrice = function() {
		console.log("In fullMenuPrice!!!999");
		var menuPrice = 0;
		for (var j = 0; j < $scope.menu.length; j++) {
			menuPrice = menuPrice + Dinner.getDishPrice($scope.menu[j]);
		}
		return menuPrice * Dinner.getNumberOfGuests();
	};



});