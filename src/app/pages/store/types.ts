export interface FirstDeal {
  expireTime: string; // ISO date string
  headline: string;
  details: string;
}

export interface FirstImage {
  url: string;
  caption: string;
}

export interface Hotel {
  id: string;
  minPrice: number;
  currencyCode: string;
  name: string;
  address: string;
  city: string;
  description: string;
  firstDeal: FirstDeal | null;
  firstImage: FirstImage;
  distanceToCenterKm: number;
}

export interface HotelsResponse {
  result: {
    totalPages: number;
    hotels: Hotel[];
  };
}

export interface TableData {
  total: number;
  pageIndex: number;
  pageSize: number;
  query: string;
  sort: string;
  minPrice: number;
  maxPrice: number;
}

export interface HotelsState {
  loading: boolean;
  list: Hotel[];
  tableData: TableData;
}
export interface PriceRangePayload {
  minPrice: number;
  maxPrice: number;
}
export interface FetchHotelsParams {
  pageIndex: number;
  pageSize: number;
  query: string;
  sort: string;
}

export interface HotelsListState {
  data: {
    loading: boolean;
    list: Hotel[];
    tableData: {
      total: number;
      pageIndex: number;
      pageSize: number;
      query: string;
      sort: string;
      minPrice: number;
      maxPrice: number;
    };
  };
}

export interface FetchHotelsParams {
  pageIndex: number;
  pageSize: number;
  sort: string;
  query: string;
  lang: string;
  minPrice?: number;
  maxPrice?: number;
}
