"use client";
import React from "react";
import { injectReducer } from "@/app/store";
import reducer from "../store";
import Hotels from "./Hotels";
import "./HotelList.css";

injectReducer("hotelsList", reducer);

const HotelsPage: React.FC = () => {
  return <Hotels />;
};

export default HotelsPage;
