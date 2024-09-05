"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";
import CardItem from "@/app/components/HotelCardItem/CardItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHotels } from "../store";
import "./HotelList.css";

const Hotels: React.FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.hotelsList.data.loading);
  const data = useSelector((state: any) => state.hotelsList.data.list);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    dispatch(fetchHotels() as any);
    try {
    } catch (error) {
      setError("Failed to fetch hotels");
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="hotel-list">
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : (
        data.map((hotel: any, index) => (
          <CardItem
            key={index}
            imageUrl={hotel?.images[0]?.url}
            name={hotel?.name}
            city={hotel?.city}
          />
        ))
      )}
    </div>
  );
};

export default Hotels;
