// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('PrintCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	$scope.menu = Dinner.getFullMenu();




});