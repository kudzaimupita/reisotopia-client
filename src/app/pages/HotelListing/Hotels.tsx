'use client';

import React, { useState, useEffect } from 'react';
import './HotelList.css';
import { getHotels } from '@/app/services/tasks.service';
import Loading from '@/app/components/Loading/Loading';

interface Hotel {
  id: number;
  name: string;
}

interface FetchHotelsResponse {
  success: boolean;
  error: string;
  result: Hotel[];
}

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getHotels({});
      const { success, error, result } = response.data as FetchHotelsResponse;


      console.log(response)
      if (!success) {
        throw new Error(error);
      }

      setHotels(result);
    } catch (error) {
      setError('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="hotel-list">
        {loading ? (
         <Loading/>
        ) : error ? (
          <p>{error}</p>
        ) : (
          hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              <h2>{hotel.name}</h2>
            </div>
          ))
        )}
      </div>
  );
};

export default Hotels;
