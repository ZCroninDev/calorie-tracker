// Storage controller

// Item controller
const ItemCtrl = (function() {
  // Item controller
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data structure  / state
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods 
  return {
    logData: function(){
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function() {

  // Public methods  
  return {

  }
})();



// App Controller
const App = (function(itemCtrl, UICtrl) {

  // Public function
  return {
    init: function(){
      console.log('Initializing App...');
    }
  }

})(itemCtrl, UICtrl);