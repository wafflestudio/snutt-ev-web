import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import qs from "qs"

export const baseURL = process.env.NEXT_PUBLIC_API_URL

const apikey = Cookies.get("x-access-apikey") || ""
const token = Cookies.get("x-access-token") || ""

export const createApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "x-access-token": token, "x-access-apikey": apikey },
})

const SnuttApi = {
  async get<R, T = any>(
    url: string,
    queryParams: T | undefined = undefined,
  ): Promise<R> {
    var path = url
    if (queryParams !== undefined) {
      path = `${url}?${qs.stringify(queryParams)}`
    }
    try {
      const result = await createApi
        .get<R, AxiosResponse<R>, T>(path)
        .then((response) => response.data)
      return result
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },

  async post<R, T>(url: string, body: T): Promise<R> {
    try {
      return await createApi
        .post<R, AxiosResponse<R>, T>(url, body)
        .then((response) => response.data)
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },

  async delete<R, T>(url: string, body: T): Promise<R> {
    try {
      return await createApi
        .delete<R, AxiosResponse<R>, T>(url, body)
        .then((response) => response.data)
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },

  async put<R, T>(url: string, body: T): Promise<R> {
    try {
      return await createApi
        .put<R, AxiosResponse<R>, T>(url, body)
        .then((response) => response.data)
    } catch (e) {
      throw "temp error because ErrorBoundary cannot handle axios error..."
    }
  },
}

export default SnuttApi
