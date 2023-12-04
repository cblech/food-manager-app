import { AppData, FoodItem } from "./model/Data";

export type AppDataStruct = { appData: AppData, setChecked: (item: FoodItem, checked: boolean) => void };
export type AppDataPair = { appData: AppData, setAppData: React.Dispatch<React.SetStateAction<AppData>> };

export type UpdateProduct = {
    id: string | undefined;
    name: string;
    storeId: string | null;
    notes: string;
    setStored: number;
    realStored: number;
}

export type Product = UpdateProduct & {
    id: string;
}

export type UpdateStore = {
    id: string | undefined;
    name: string;
}

export type Store = UpdateStore & {
    id: string;
}

