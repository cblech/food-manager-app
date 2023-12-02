export class FoodManagerModel {
    // List of food items
    private _shoppingList: FoodItem[] = [];
    private _localStoreKey = "food-manager";

    // Get the shopping list
    public getShoppingList() {
        return this._shoppingList;
    }

    // Add a food item to the shopping list
    public addFoodItem(foodItem: string): FoodManagerModel {
        let newThis = Object.create(this) as FoodManagerModel;

        newThis._shoppingList.push(new FoodItem(foodItem));

        newThis.save();

        return newThis;
    }

    // Remove a food item from the shopping list
    public removeFoodItem(foodItem: string): FoodManagerModel {
        let newThis = Object.create(this) as FoodManagerModel;

        newThis._shoppingList = newThis._shoppingList.filter(item => item.name !== foodItem);

        newThis.save();

        return Object.create(newThis);
    }

    public updateFoodItem(index: number, changedItem: FoodItem): FoodManagerModel {
        let newThis = Object.create(this) as FoodManagerModel;

        newThis._shoppingList[index] = changedItem;
        
        newThis.save();

        return Object.create(newThis);
    }

    constructor() {
        this._initialize();
    }

    private _initialize() {
        // Load the shopping list from local storage
        let storage = localStorage.getItem(this._localStoreKey);
        if (storage) {
            this._shoppingList = JSON.parse(storage).map((item: FoodItemStruct) => new FoodItem(item));
        } else {
            // tmp: add some items if the list is empty
            this._shoppingList = [
                new FoodItem("Chicken"),
                new FoodItem("Dog"),
                new FoodItem("Cat"),
                new FoodItem("Fish"),
                new FoodItem("Bird"),
                new FoodItem("Cow"),
                new FoodItem("Pig"),
                new FoodItem("Horse"),
                new FoodItem("Sheep"),
                new FoodItem("Goat")
            ];

            this.save();
        }
    }

    public save() {
        // Save the shopping list to local storage
        localStorage.setItem(this._localStoreKey, JSON.stringify(this._shoppingList.map(item => item.data)));
    }
}

type FoodItemStruct = {
    name: string,
    checked: boolean
};

export class FoodItem {
    private _data: FoodItemStruct = { name: "", checked: false };
    public get data() {
        return this._data;
    }

    public get name() {
        return this._data.name;
    }

    public get checked() {
        return this._data.checked;
    }

    public setChecked(checked: boolean) {
        let newThis = Object.create(this);
        newThis._data.checked = checked;
        return newThis;
    }

    constructor(name?: string|FoodItemStruct) {
        if (typeof name === "string") {
            this._data.name = name;
        } else if (typeof name === "object") {
            this._data = name;
        } else {
            this._data.name = "";
        }
    }
}