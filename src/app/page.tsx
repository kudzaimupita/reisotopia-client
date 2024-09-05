"use client"
import { Provider } from "react-redux/dist/react-redux";
import Container from "./components/Container/Container";
import styles from "./page.module.css";
import Hotels from "./pages/HotelListing/Hotels";
import store, { persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

export default function Home() {
  return <main className={styles.main}><>

<Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>
        <Container>
      <Hotels/>
    </Container>
        </PersistGate>
  
    </Provider>
   
  </></main>;
}
