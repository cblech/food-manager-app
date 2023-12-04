import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, DocumentData, Firestore, getDocs, getFirestore, onSnapshot, QuerySnapshot, setDoc } from "firebase/firestore";
import { AppDataPair, Product, Store, UpdateProduct, UpdateStore } from "../common-types";
import { FoodItem } from "./Data";

let appDataPair: AppDataPair;
let firestore: Firestore;
let setStores: React.Dispatch<React.SetStateAction<Store[]>>;
let setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
/**
 * Set the AppDataPair object to be used by the app
 * 
 * **Needs to be called before any other functions in this file**
 * 
 * @param newAppDataPair  The AppDataPair object to be used by the app
 */
export function setAppDataPair(newAppDataPair: AppDataPair) {
    appDataPair = newAppDataPair;
}

export function setSetStores(newSetStores: React.Dispatch<React.SetStateAction<Store[]>>) {
    setStores = newSetStores;
}

export function setSetProducts(newSetProducts: React.Dispatch<React.SetStateAction<Product[]>>) {
    setProducts = newSetProducts;
}

export function initFirebase() {

    // Initialize Firestore
    const firebaseConfig = {
        apiKey: "AIzaSyAnVlcTBeKaEGMxzhJfvJqAI6ejsev7GwE",
        authDomain: "food-manager-app.firebaseapp.com",
        projectId: "food-manager-app",
        storageBucket: "food-manager-app.appspot.com",
        messagingSenderId: "738787514422",
        appId: "1:738787514422:web:4fbb11c745ac598b9b6097"
    };

    const firebaseApp = initializeApp(firebaseConfig);
    firestore = getFirestore(firebaseApp);

    // Load initial data from Firestore
    // pullShoppingListData();
    const _unsub = onSnapshot(collection(firestore, "shopping-list"), (snapshot) => {
        let appData = appDataPair.appData;

        for (const doc of snapshot.docs) {
            const data = doc.data() as { name: string, checked: boolean };
            appData = appData.updateFoodItem({ id: doc.id, ...data });
        }
    
        appDataPair.setAppData(appData);
    }); 

    const _unsub2 = onSnapshot(collection(firestore, "stores"), (snapshot) => {
        let stores: Store[] = [];
        for (const doc of snapshot.docs) {
            const data = doc.data() as { name: string };
            stores.push({ id: doc.id, ...data });
        }
        setStores(stores);
    });

    const _unsub3 = onSnapshot(collection(firestore, "products"), (snapshot) => {
        let products: Product[] = [];
        for (const doc of snapshot.docs) {
            const data = doc.data() as { name: string, storeId: string | null, notes: string, setStored: number, realStored: number };
            products.push({ id: doc.id, ...data });
        }
        setProducts(products);
    });
}

export async function pushShoppingListItem(foodItem: FoodItem) {
    const { id, ...data } = foodItem;
    await setDoc(doc(collection(firestore, "shopping-list"), id), data);

    //console.log("Document successfully written!");
}

export async function pushProductData(product: UpdateProduct) {
    const { id, name, storeId, notes, setStored, realStored } = product;
    // if id is undefined, create a new document
    if (id === undefined) {
        await addDoc(collection(firestore, "products"), { name, storeId, notes, setStored, realStored });
    } else {
        await setDoc(doc(collection(firestore, "products"), id), { name, storeId, notes, setStored, realStored });
    }
}

export async function pushStoreData(store: UpdateStore){
    const { id, name } = store;
    // if id is undefined, create a new document
    if (id === undefined) {
        await addDoc(collection(firestore, "stores"), { name });
    } else {
        await setDoc(doc(collection(firestore, "stores"), id), { name });
    }
}