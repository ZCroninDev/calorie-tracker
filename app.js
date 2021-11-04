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
		getItems: function(){
			return data.items;
		},
    logData: function(){
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function() {
	const UISelectors = {
		itemList: '#item-list'
	}

  // Public methods  
  return {
		populateItemList: function(items){
			let html = '';

			items.forEach(function(items){
				html += `<li class="collection-item" id="item-${items.id}">
        <strong>${items.name}: </strong> <em>${items.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
			});

			// Insert List items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		}
  }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl) {

  // Public function
  return {
    init: function(){
			// Fetch items form data structure
			const items =  ItemCtrl.getItems()


			// Populate list with items
			UICtrl.populateItemList(items)
    }
  }

})(ItemCtrl, UICtrl);

App.init();