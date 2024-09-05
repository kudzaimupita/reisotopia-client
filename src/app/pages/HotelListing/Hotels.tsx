"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Loading from "@/app/components/Loading/Loading";
import CardItem from "@/app/components/HotelCardItem/CardItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHotels, setPageNumber } from "../store";
import "./HotelList.css";
import Toolbar from "@/app/components/ToolBar/ToolBar";
import Pagination from "@/app/components/Pagination/Pagination";

const Hotels: React.FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.hotelsList.data.loading);
  const data = useSelector((state: any) => state.hotelsList.data.list);
  const lang = useSelector((state: any) => state.locale.currentLang);

  const [error, setError] = useState<string | null>(null);

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state: any) => state.hotelsList.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(
      fetchHotels({
        pageNumber: pageIndex,
        pageSize,
        sort,
        search: query,
        lang,
      })
    );
  }, [dispatch, pageIndex, pageSize, sort, query, lang]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query]
  );

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData, pageIndex, pageSize, sort]);

  return (
    <>
      <div className="hotel-list">
        <Toolbar />

        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : (
          data.map((hotel: any, index) => (
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
