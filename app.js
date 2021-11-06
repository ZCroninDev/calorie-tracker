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
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods 
  return {
		getItems: function(){
			return data.items;
		},
		addItem: function(name, calories){
			// Create id
			let ID;
			if(data.items.length > 0){
				ID = data.items[data.items.length - 1].id = 1
			} else {
				ID = 0;
			}

			// Calories to number
			calories = parseInt(calories)
			
			// Create new item
			newItem = new Item(ID, name, calories)

			// Add to item array
			data.items.push(newItem)

			return newItem;

		},
    getTotalCalories: function(){
      let total = 0;
      // Loop through items and adds cals
      data.items.forEach(function(item){
        total += item.calories;
      });

      // Set total cal in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: function(){
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function() {
	const UISelectors = {
		itemList: '#item-list',
    addBtn: '.add-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories'
	}

  // Public methods  
  return {
		populateItemList: function(items){
			let html = '';

			items.forEach(function(item){
				html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
			});

			// Insert List items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
		getItemInput: function(){
			return {
				name:document.querySelector(UISelectors.itemNameInput).value,
				calories:document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element 
      const li = document.createElement('li');
      // Add class 
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

    // Insert item
    document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function(){
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

	// Add item submit
	const itemAddSubmit = function(e){
		// Get form input from ui controller
		const input = UICtrl.getItemInput();

		// Check for name and calorie input
		if(input.name !== '' && input.calories !== ''){
			// Add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const  totalCalories = ItemCtrl.getTotalCalories();

      // Clear fields 
      UICtrl.clearInput();
		}

		e.preventDefault();
	}

  // Public function
  return {
    init: function(){
			// Fetch items form data structure
			const items =  ItemCtrl.getItems()

      // Check if any items
      if(items.length === 0){
        UICtrl.hideList();
      } else {
        // Populate list with items
			  UICtrl.populateItemList(items)
      }

			// Load event listeners
			loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

// Initialize App
App.init();