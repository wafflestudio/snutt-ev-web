import axios from "axios"
import Cookies from "js-cookie"

export const baseURL = process.env.NEXT_PUBLIC_API_URL

const apikey = Cookies.get("x-access-apikey") || ""
const token = Cookies.get("x-access-token") || ""

export const createApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "x-access-token": token, "x-access-apikey": apikey },
})
