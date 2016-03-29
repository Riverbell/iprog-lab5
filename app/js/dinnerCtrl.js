// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.setNumberOfGuest = function(number){
		Dinner.setNumberOfGuests(number);
	}

	$scope.getNumberOfGuests = function() {
		console.log("hejhej");
		return Dinner.getNumberOfGuests();
	}

	$scope.plusButton = function(){
		Dinner.setNumberOfGuests(Dinner.getNumberOfGuests() + 1);
	};
 
	$scope.minusButton = function(){
		Dinner.setNumberOfGuests(Dinner.getNumberOfGuests() - 1);
	};

	
	$scope.menu = Dinner.getFullMenu();


	$scope.getDishPrice = function(dishObject) {
		return Dinner.getDishPrice(dishObject);
	};

	$scope.test = function() {
		console.log("TESTAR");
	}

	$scope.fullMenuPrice = function() {
		console.log("In fullMenuPrice!!!123");
		var menuPrice = 0;
		for (var j = 0; j < $scope.menu.length; j++) {
			menuPrice = menuPrice + Dinner.getDishPrice($scope.menu[j]);
			console.log(j);
		}
		return menuPrice * Dinner.getNumberOfGuests();
	};
	



	// TODO in Lab 5: Implement the methods to get the dinner menu
	// add dish to menu and get total menu price

});