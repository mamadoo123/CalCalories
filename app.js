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
        }
    }
})()
// UI Controller: Populate the data Into The DOM elements
const UIController = (function(){
    const DOMElements = {
        itemList:'item-list'
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
            document.getElementById(DOMElements.itemList).innerHTML = html;
        }
    }
})()
// App Controller: To Initialze The App Once Loaded Or Reloaded
const AppController = (function(ItemController, UIController){

   return{
       init: function(){
           // Fetch the Data From Item Controller
           const items = ItemController.getItems();

           // Populate These Items into the DOM Using UI Controller
           UIController.populate(items);
       }
   }
})(ItemController, UIController);

// Init App 
AppController.init();