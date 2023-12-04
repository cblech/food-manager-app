import { isEqual } from "lodash";

export class AppData {
    // List of food items
    private _shoppingList: FoodItem[] = [];

    // Get the shopping list
    public getShoppingList() {
        return this._shoppingList;
    }

    /**
     * Remove a food item from the shopping list
     * @param removeItem the item to be removed
     * @returns a new AppData object with the updated shopping list
     */
    public removeFoodItem(removeItem: FoodItem): AppData {
        let newThis = Object.create(this) as AppData;

        newThis._shoppingList = newThis._shoppingList.filter((item) => item.id !== removeItem.id);

        return newThis;
    }

    /**
     * Add a food item to the shopping list or update an existing item
     * @param changedItem the item to be added or updated
     * @returns a new AppData object with the updated shopping list
     */
    public updateFoodItem(changedItem: FoodItem): AppData {
        // check if item needs to be changed
        if(this._shoppingList.some((item) => isEqual(item, changedItem))) {
            return this;
        }

        let newThis = Object.create(this) as AppData;

        let found = false;
        newThis._shoppingList = newThis._shoppingList.map((item) => {
            if (item.id === changedItem.id) {
                found = true;
                return changedItem;
            } else {
                return item; 
            }
        });

        if (!found) {
            newThis._shoppingList.push(changedItem);
        }

        return newThis;
    }
}

export type FoodItem = {
    id: string;
    name: string;
    checked: boolean;
}