import axios from "axios";
import Cookies from "js-cookie";

const apikey =
  Cookies.get("x-access-apikey") ||
  process.env.NEXT_PUBLIC_LOCAL_ACCESS_APIKEY ||
  "";

const token =
  Cookies.get("x-access-token") ||
  process.env.NEXT_PUBLIC_LOCAL_ACCESS_TOKEN ||
  "";

const defaultHeaders = {
  "x-access-token": token,
  "x-access-apikey": apikey,
};

export const coreClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API_URL,
  headers: defaultHeaders,
});

export const evClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EV_API_URL,
  headers: defaultHeaders,
});
