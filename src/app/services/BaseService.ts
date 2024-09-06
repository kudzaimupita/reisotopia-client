import axios from "axios";

const BaseService = axios.create({
  timeout: 60000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default BaseService;
