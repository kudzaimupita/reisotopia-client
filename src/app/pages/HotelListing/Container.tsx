"use client";
import React, { useState, useEffect } from "react";
import "./HotelList.css";
import { getHotels } from "@/app/services/tasks.service";
import Loading from "@/app/components/Loading/Loading";
import CardItem from "@/app/components/HotelCardItem/CardItem";
import store, { injectReducer, persistor } from "@/app/store";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import reducer, { fetchHotels } from "../store";
import Hotels from "./Hotels";
import { PersistGate } from "redux-persist/integration/react";

injectReducer("hotelsList", reducer);

const HotelsPage: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Hotels />
      </PersistGate>
    </Provider>
  );
};

export default HotelsPage;
