// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details


  if ($cookieStore.get('menu') === undefined) {
    this.menu = [null, null, null];
  }
  else {
    this.menu = $cookieStore.get('menu');
  }

  if ($cookieStore.get('numberOfGuests') === undefined) {
    this.NumberOfGuests = 1;
  }
  else {
    this.NumberOfGuests = $cookieStore.get('numberOfGuests');
  }
  console.log(this.menu);
  

  //tanken är att id läggs in på varje rätt

  // ladda 'startvalues' från cookieStore när variablerna laddas första gången: cookieStore.get(key); returns value of given cookie key


  this.setNumberOfGuests = function(num) {
    //TODO Lab 2
    this.NumberOfGuests = num;
    
    $cookieStore.put('numberOfGuests', num);

    //console.log("coookieee", $cookieStore.get('numberOfGuests'));


    //Store change (typ get number?) i cookieStore varje gång en ändring görs till antal, skriver över tidigare ändringar: put(key, value); sets a value for given cookie key

  }

  // should return 
  this.getNumberOfGuests = function() {
    //TODO Lab 2
    return this.NumberOfGuests;
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(category) {
    //TODO Lab 2
    //Runs through menu
        for (var i = 0; i < this.menu.length; i++) {
          //Using getDish func (provide id) to get dish-object back
          var currentDish = this.Dish.get({id:this.menu[i]});
          //If the dish type is equal to the provided type the dish 
          //id is returned
          if (currentDish.category === category){
            return currentDish.id;        
          }

        }
  }

  //Returns all the dishes on the menu.
    this.getFullMenu = function() { 
      //TODO Lab 2
      var fullMenu = [];

      for (var i = 0; i < this.menu.length; i++) {
          //if we want to return objects
          if ( this.menu[i] != null ) {
            fullMenu.push(this.Dish.get({id:this.menu[i]}));
          }
      
          //if we want to return dish-id
          //fullMenu.push(this.menu[i]);
    }

    return fullMenu; 

  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    //TODO Lab 2
        //Make a list to store all ingredients
        var allIngredients = [];
      
        //for-loop to run through each dish in the menu 
      for (var i in this.menu) {
            var getCurrentDish = this.Dish.get({id:this.menu[i]});

            //get ingredients from each dish object
            var ingrs = getCurrentDish.ingredients;
        
            //run through 
            for (var j in ingrs){
                var ingr = ingrs[j].name
                allIngredients.push(ingr);
          }
     
        }
        return allIngredients;
  }


  


  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(dishType,id) {
    id = Number(id);
      //var dishType = this.Dish.get({id:id}).Category;
      console.log(dishType);

      //Depending on what type of dish, the new dish will overwrite the old one
      if (dishType === 'Appetizers'){
          this.menu[0] = id;
          console.log(this.menu);
      } else if (dishType === 'Main Dish'){
          this.menu[1] = id;
          console.log(this.menu);
      } else if (dishType === 'Desserts') {
          this.menu[2] = id;
          console.log(this.menu);
            
      }  
      $cookieStore.put('menu', this.menu);
      //console.log('add to menu', $cookieStore.get('menu'));
  }


  //Store change (typ add dish ( men också remove dish???) i cookieStore varje gång en ändring görs i menyn, skriver över tidigare ändringar


  //Removes dish from menu
  this.removeDishFromMenu = function(id) { 
    //TODO Lab 2    
      var menuLength = this.menu.length;
      //iterate through the menu and look for the id. Set to null
      for (var i = 0; i < menuLength; i++) {
        if (this.menu[i] === id) {
          this.menu[i] = null;
        }  
      }
      $cookieStore.put('menu', this.menu);
   }

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4'}, {get:{method:"GET", cache:true}});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4'}, {get:{method:"GET", cache:true}}); 
  //this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key: 'H9n1zb6es492fj87OxDtZM9s5sb29rW3'});

  this.getDishPrice = function (dishObject) {
    var dishPrice = 0; 
    //console.log("dish object: (getDishPrice)",dishObject);
    var ingredients = dishObject.Ingredients;
    console.log("ingredients: (getDishPrice)",ingredients);
    for (var i = 0; i < 4; i++) {
          ingredient = ingredients[i];
          ingredientQuantity = ingredient.Quantity;
          var price = 1*ingredientQuantity;
          dishPrice = dishPrice + price;
        }
    return dishPrice;
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() { 
    //TODO Lab 2
      var menuPrice = 0;
      for (var i = 0; i < this.menu.length; i++) {
          //get the current dish in the menu
          if ( this.menu[i] != null ) {
            var dishObj = this.Dish.get({id:this.menu[i]});
            console.log("dishOBJ (gettotalmenupice)",dishObj);
            var dishPrice = this.getDishPrice(dishObj);
            
            //for each ingredient, add price to menuPrice
            //var ingredientLength = currentDish.ingredients.length;
            //for (var j=0; j < ingredientLength; j++) {
            //   menuPrice = menuPrice + currentDish.ingredients[j].price;
            // } 
            menuPrice = menuPrice + dishPrice;       
        }
        
      }
    
      //multiply ingredient price by number of guests
      return menuPrice * this.getNumberOfGuests();

  }


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});