import axios from "axios"
import Cookies from "js-cookie"

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://snutt-api.wafflestudio.com/"
    : "https://snutt-api-dev.wafflestudio.com/"

const apikey = Cookies.get("x-access-apikey") || ""
const token = Cookies.get("x-access-token") || ""

export const createApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "x-access-token": token, "x-access-apikey": apikey },
})
