// Storage Controller

// Item Controller
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
        logData: function(){
            return data;
        }
    }
})()
// UI Controller
const UIController = (function(){

})()
// App Controller: To Initialze The App Once Loaded Or Reloaded
const AppController = (function(ItemController, UIController){

   return{
       init: function(){
           console.log('Initializing app....');
       }
   }
})(ItemController, UIController);

// Init App 
AppController.init();