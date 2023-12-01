import React from 'react';
import styles from './App.module.css';
import CheckOff from './CheckOffList';
import { FoodManagerModel } from './model/Data';

function App() {
  let model = new FoodManagerModel();

  return (
    <div className={styles.App}>
      <CheckOff model={model}/>
    </div>
  );
}

export default App;
