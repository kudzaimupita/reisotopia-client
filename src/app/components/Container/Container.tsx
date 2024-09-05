"use client";

import React from "react";
import "./Container.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Provider } from "react-redux";
import store, { persistor } from "@/app/store";
import { PersistGate } from "redux-persist/integration/react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="container">
          <Navbar />
          <div className="content">{children}</div>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default Container;
