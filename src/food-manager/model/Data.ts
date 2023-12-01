import React from "react";

export class FoodManagerModel{
    //public test = React.useState("test");
    // List of food items
    private shoppingList = React.useState([{name:"Chicken"},{name:"Dog"}] as FoodItem[]);

    // Get the shopping list
    public getShoppingList(){
        return this.shoppingList[0];
    }

    // Add a food item to the shopping list
    public addFoodItem(foodItem: FoodItem){
        this.shoppingList[1]([...this.shoppingList[0], foodItem]);
    }

    // Remove a food item from the shopping list
    public removeFoodItem(foodItem: FoodItem){
        this.shoppingList[1](this.shoppingList[0].filter(item => item !== foodItem));
    }
}

export class FoodItem{
    public name = "";
}