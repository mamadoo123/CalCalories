// Storage Controller
const StorageController = (function(){
    return{
        addToLS: function(item){
            let items = [];
            // check if there are items in the local storage
            if(localStorage.getItem('items') !== null){
                // get the data from LS
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                // store the new data in LS
                localStorage.setItem('items', JSON.stringify(items));
            }else{
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        removeItemFromLS: function(item){
            items = JSON.parse(localStorage.getItem('items'));
            items.forEach((element, index) => {
                if(element.id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items))
        },
        getItemsFromLS: function(){
            let items = [];
            if(localStorage.getItem('items') !== null){
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemInLS: function(item){
            items = JSON.parse(localStorage.getItem('items'));
            items.forEach((element, index) => {
                if(element.id === item.id){
                    items.splice(index, 1, item);
                }
            });
            localStorage.setItem('items', JSON.stringify(items))
        },
        clearAllItemsFromLs: function(){
            if(localStorage.getItem('items') !== null){
                localStorage.clear();
            }
        }
    }
})();

// Item Controller: Holds the data structure of items
const ItemController = (function(){
//[1] Private Var And Functions
    // constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories
    }
    // Data Structure | State 
    const data = {
        items:StorageController.getItemsFromLS(),
        currentItem:null,
        calories:0
    }
// [2] Return- The Public Functions by which we can acces private data and other functions
    return{
        getItems: function(){
            return data.items;
        },
        getItem: function(id){
            const item = data.items.find(item => item.id === id)
            return item
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        logData: function(){
            return data;
        },
        addItem: function(item){
            item.calories = parseInt(item.calories)
            if(data.items.length > 0){
            item.id = data.items.length;
            }else{
            item.id = 0;
            }
            // Create A New Item Object Using the Constructor
            newItem = new Item(item.id, item.name, item.calories);
            // Push the newly created item into our data 
            data.items.push(newItem);
            return newItem;
        },
        updateItem: function(name, calories){
            let found = null;
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = parseInt(calories);
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(item){
            const itemDelete = data.items.find(itm => itm.id === item.id);
            data.items.pop(itemDelete);
            data.currentItem = null;
        },
        deleteAllItems: function(){
            data.items = [];
            data.currentItem = null;
        },
        getTotalCalories: function(){
            let total =0;
            data.items.forEach(item => total += item.calories);
            data.calories = total;
            return data.calories;
        }
    }
})()
// UI Controller: Populate the data Into The DOM elements
const UIController = (function(){
    const DOMElements = {
        itemList:'#item-list',
        addButton:'.add-btn',
        backButton:'.back-btn',
        deleteButton:'.delete-btn',
        clearButton:'.clear-btn',
        updateButton:'.update-btn',
        itemName:'#item-name',
        itemCalories:'#item-calories',
        totalCalories:'.total-calories',
        allLis:'#item-list li'
    }
    return{
        populate: function(items){
            let html ='';
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });
            document.querySelector(DOMElements.itemList).innerHTML = html;
        },
        getDOM: function(){
            return DOMElements;
        },
        getInputs: function(){
            return{
                name: document.querySelector(DOMElements.itemName).value,
                calories: document.querySelector(DOMElements.itemCalories).value
            }
        },
        addNewItem: function(item){
            const li = document.createElement('li');
            li.className ="collection-item";
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i></a>`
            document.querySelector(DOMElements.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInputs: function(){
            document.querySelector(DOMElements.itemName).value = '';
            document.querySelector(DOMElements.itemCalories).value = '';
        },
        populateCalories: function(calories){
            document.querySelector(DOMElements.totalCalories).textContent = `${calories} Calory`
        },
        setInitialState: function(){
            UIController.clearInputs();
            document.querySelector(DOMElements.addButton).style.display = 'inline';
            document.querySelector(DOMElements.updateButton).style.display = 'none';
            document.querySelector(DOMElements.deleteButton).style.display = 'none';
            document.querySelector(DOMElements.backButton).style.display = 'none';
        },
        setEditState: function(){
            // Set the style display for each button in the Edit state
            document.querySelector(DOMElements.addButton).style.display = 'none';
            document.querySelector(DOMElements.updateButton).style.display = 'inline';
            document.querySelector(DOMElements.deleteButton).style.display = 'inline';
            document.querySelector(DOMElements.backButton).style.display = 'inline';
            // Set the values of Inputs according the current item of the data object
            const currentItem = ItemController.getCurrentItem();
            document.querySelector(DOMElements.itemName).value = currentItem.name;
            document.querySelector(DOMElements.itemCalories).value = currentItem.calories;
        },
        updateListItem: function(item){
            let lis = document.querySelectorAll(DOMElements.allLis); // returns a Node List
            // convert the Node List into Array
            lis = Array.from(lis);
            // looping through the li to get the li to be updated
            lis.forEach(function(li){
                const itemId = li.getAttribute('id');
                if(itemId === `item-${item.id}`){
                    document.querySelector(`#${itemId}`).innerHTML =`<strong>${item.name}:
                    </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i></a>`
                }
            });

        },
        deleteListItem: function(item){
            let lis = document.querySelectorAll(DOMElements.allLis); // returns a Node List
            // convert the Node List into Array
            lis = Array.from(lis);
            // looping through the li to get the li to be updated
            lis.forEach(function(li){
                const itemId = li.getAttribute('id');
                if(itemId === `item-${item.id}`){
                    document.querySelector(`#${itemId}`).remove();
                }
            });
        },
        deleteAllItems: function(){
            const lis = document.querySelectorAll(DOMElements.allLis);
            const lisArray = Array.from(lis);
            lisArray.forEach(li =>{
                const liId = li.getAttribute('id');
                document.querySelector(`#${liId}`).remove();
            })
        }
    }
})()
// App Controller: To Initialze The App Once Loaded Or Reloaded
const AppController = (function(ItemController, UIController, StorageController){
// create a fn that loads all eventListeners
const loadEventListeners = function(){
    // Add Button
    const addBtn = document.querySelector(UIController.getDOM().addButton);
    addBtn.addEventListener('click', addItem);
    
    // Edit Button
    document.querySelector(UIController.getDOM().itemList).addEventListener('click', edit);
    
    // Update Button
    document.querySelector(UIController.getDOM().updateButton).addEventListener('click', update)
    
    // Back Button
    document.querySelector(UIController.getDOM().backButton).addEventListener('click', backHandler)
    
    // Delete Button 
    document.querySelector(UIController.getDOM().deleteButton).addEventListener('click', deleteHandler)
    
    // Clear Button
    document.querySelector(UIController.getDOM().clearButton).addEventListener('click', clearAll);
    // prevent submit on Enter
    document.addEventListener('keypress', preventEnterKey);

    // Event Handlers Functions
    function addItem(e){
        const inputs = UIController.getInputs();
        if(inputs.name !== ''&& inputs.calories !== ''){
            const newItem = ItemController.addItem(inputs);
            StorageController.addToLS(newItem);
            UIController.addNewItem(newItem)
        }else{
            alert('Pleae Complete all Fields')
        }
        // Get The Total Calories
        const totalCalories = ItemController.getTotalCalories();
        // dispaly the total calories
        UIController.populateCalories(totalCalories);
        // Clear All Input Fields
        UIController.clearInputs();
        e.preventDefault()
    }
    
    function edit(e){
        if(e.target.parentElement.classList.contains('secondary-content')){
            // Extract the Item ID from the id of Target List Item 
            const itemId = parseInt(e.target.parentElement.parentElement.id.substring(5,6));
            // Get the spicified Item from item controller
            const item = ItemController.getItem(itemId);
            // Set the Current Item Property of the Item Controller
            ItemController.setCurrentItem(item);
            // Set the Edit State
            UIController.setEditState();
        }
    }

    function update(e){
        // get the input new values
        const itemInputs = UIController.getInputs();
        // update the current item property of the data oject with the new values
        const updatedItem = ItemController.updateItem(itemInputs.name, itemInputs.calories);
        // Store the updated data in LS
        StorageController.updateItemInLS(updatedItem);
        // Use the UI to update or re-render the list item
        UIController.updateListItem(updatedItem);
        // Get The Total Calories
        const totalCalories = ItemController.getTotalCalories();
        // dispaly the total calories
        UIController.populateCalories(totalCalories);
        // Clear All Input Fields
        UIController.setInitialState();

        e.preventDefault();
    }

    function backHandler(e){
        UIController.setInitialState();
        e.preventDefault()
    }

    function deleteHandler(e){
        const currentItem = ItemController.getCurrentItem();
        StorageController.removeItemFromLS(currentItem);
        ItemController.deleteItem(currentItem);
        UIController.deleteListItem(currentItem);
        const totalCalories = ItemController.getTotalCalories();
        // dispaly the total calories
        UIController.populateCalories(totalCalories);
        // Clear All Input Fields
        UIController.setInitialState();

        e.preventDefault()
    }

    function clearAll(e){
        ItemController.deleteAllItems();
        UIController.deleteAllItems();
        StorageController.clearAllItemsFromLs();
        const totalCalories = 0;
        // dispaly the total calories
        UIController.populateCalories(totalCalories);
        // Clear All Input Fields
        UIController.setInitialState();
        e.preventDefault()
    }

    function preventEnterKey(e){
        if(e.keyCode === 13 || e.which === 13){
            e.preventDefault;
            return false
        }
    }
}
   return{
       init: function(){
           // Set Initial State of all buttons
           UIController.setInitialState(); 
           // Fetch the Data From Item Controller
           const items = ItemController.getItems();
           // Populate These Items into the DOM Using UI Controller
           UIController.populate(items);
             // Get The Total Calories
            const totalCalories = ItemController.getTotalCalories();
            // dispaly the total calories
            UIController.populateCalories(totalCalories);
           // Load All Event Listeners
           loadEventListeners();
       }
   }
})(ItemController, UIController, StorageController);

// Init App 
AppController.init();