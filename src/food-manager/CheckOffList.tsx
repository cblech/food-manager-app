import styles from './BuyList.module.css';
import { FoodItem, FoodManagerModel } from './model/Data';

function CheckOff({ model }: { model: FoodManagerModel }) {
    return (
        <div className={styles.CheckOff}>
            <List model={model} />
        </div>
    )
}

function List({ model }: { model: FoodManagerModel }) {
    let items = model.getShoppingList();

    console.log(items);

    return (
        <ul className={styles.BuyList}>
            {
                items.map((item, index) => (
                    <BuyItem key={index} item={item} />
                ))
            }
        </ul>
    )
}

function BuyItem({ item}: { item: FoodItem}) {

    return (
        <li className={styles.BuyItem}>
            {item.name}
        </li>
    )
}

export default CheckOff;