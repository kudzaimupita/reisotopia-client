"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Loading from "@/app/components/Loading/Loading";
import CardItem from "@/app/components/HotelCardItem/CardItem";
import { fetchHotels, setPageNumber } from "../store";
import Toolbar from "@/app/components/ToolBar/ToolBar";
import Pagination from "@/app/components/Pagination/Pagination";
import { RootState } from "@/app/store";
import { Hotel } from "../store/types";
import "./HotelList.css";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";

const Hotels: React.FC = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(
    (state: RootState) => state.hotelsList.data.loading
  );
  const data = useAppSelector((state: RootState) => state.hotelsList.data.list);
  const lang = useAppSelector((state: RootState) => state.locale.currentLang);
  const { pageIndex, pageSize, sort, query, total, minPrice, maxPrice } =
    useAppSelector((state: RootState) => state.hotelsList.data.tableData);

  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    dispatch(
      fetchHotels({
        pageIndex,
        pageSize,
        sort,
        query,
        lang,
        minPrice,
        maxPrice,
      })
    ).catch(() => {
      setError("Error fetching hotels");
    });
  }, [dispatch, pageIndex, pageSize, sort, query, lang, minPrice, maxPrice]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="hotel-list">
        {" "}
        <Toolbar />
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : (
          data.map((hotel: Hotel, index: number) => (
            <CardItem
              key={index}
              imageUrl={hotel?.firstImage?.url}
              name={hotel?.name}
              address={hotel?.address}
              distanceToCenter={hotel?.distanceToCenterKm}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={pageIndex}
        totalPages={total}
        onPageChange={(index) => dispatch(setPageNumber(index))}
      />
    </>
  );
};

export default Hotels;
