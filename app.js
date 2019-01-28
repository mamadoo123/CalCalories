// Storage Controller

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
        items:[
            {id:0, name:'Steak Dinner', calories: 1200},
            {id:1, name:'French Fries', calories: 1700},
            {id:2, name:'Fesh', calories: 600}
        ],
        currentItem:null,
        calories:0
    }
// [2] Return- The Public Functions by which we can acces private data and other functions
    return{
        getItems: function(){
            return data.items;
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
        itemName:'#item-name',
        itemCalories:'#item-calories',
        totalCalories:'.total-calories'
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
        }
    }
})()
// App Controller: To Initialze The App Once Loaded Or Reloaded
const AppController = (function(ItemController, UIController){
// create a fn that loads all eventListeners
const loadEventListeners = function(){
    // Add Button
    const addBtn = document.querySelector(UIController.getDOM().addButton);
    addBtn.addEventListener('click', addItem);
    function addItem(e){
        const inputs = UIController.getInputs();
        if(inputs.name !== ''&& inputs.calories !== ''){
            const newItem = ItemController.addItem(inputs);
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
}
   return{
       init: function(){
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
})(ItemController, UIController);

// Init App 
AppController.init();