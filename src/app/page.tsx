"use client"

import { Provider } from "react-redux/dist/react-redux";
import Container from "./components/Container/Container";
import styles from "./page.module.css";
import Hotels from "./pages/HotelListing/Hotels";
import store, { persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import HotelsPage from "./pages/HotelListing/Container";

export default function Home() {
  return <main className={styles.main}>


        <Container>
      <HotelsPage/>
    </Container>

   
 </main>;
}
