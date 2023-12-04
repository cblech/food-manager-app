import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Modal, SxProps } from '@mui/material';
import { useEffect,  useState } from 'react';
import styles from './App.module.css';
//import CheckOff from './CheckOffList';
import { AppData } from './model/Data';
import CssBaseline from '@mui/material/CssBaseline';
import { Product, Store } from './common-types';
import { initFirebase, setAppDataPair, pushProductData, setSetStores, pushStoreData, setSetProducts } from './model/firebase-connection';
import { EditProduct } from './EditProduct';
import { ListProducts } from './ListProducts';

function App() {
  const [appData, setAppData] = useState(new AppData());
  const [stores, setStores] = useState<Store[]>([]);
  const [editProductModalOpen, setEditProductModalOpen] = useState(undefined as Product | undefined | null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setAppDataPair({ appData: appData, setAppData: setAppData });
  }, [appData, setAppData]);

  useEffect(() => {
    setSetStores(setStores);
  }, [setStores]);

  useEffect(() => {
    setSetProducts(setProducts);
  }, [setProducts]);

  useEffect(() => {
    initFirebase();
  }, []);

  //useEffect(() => { pushAppData(); }, [appData]);

  //function setChecked(item: FoodItem, checked: boolean) {
  //  if (item.checked === checked) return;
  //  const newItem = { ...item, checked: checked };
  //  pushShoppingListItem(newItem);
  //}


  //const appDataStruct = useMemo(() => ({ appData: appData, setChecked: setChecked } as AppDataStruct), [appData]);

  let darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    spacing: 8
  });

  const editProduct = editProductModalOpen !== undefined ?
    <EditProduct
      currentProduct={editProductModalOpen}
      updateProductData={pushProductData}
      stores={stores}
      updateStoreData={pushStoreData}
      setEditProductModalOpen={setEditProductModalOpen} /> :
    <></>;

  const style: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '90%',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container className={styles.App}>
        {/* <CheckOff appDataStruct={appDataStruct} /> */}
        <ListProducts products={products} setEditProductModalOpen={setEditProductModalOpen} stores={stores} />

      </Container>
      <Modal
        open={editProductModalOpen !== undefined}
        onClose={() => setEditProductModalOpen(undefined)}>
        <Box sx={style}>
          {editProduct}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default App;
