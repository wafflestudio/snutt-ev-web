import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import qs from "qs"

const baseURL = process.env.NEXT_PUBLIC_API_URL

const apikey =
  Cookies.get("x-access-apikey") ||
  process.env.NEXT_PUBLIC_LOCAL_ACCESS_APIKEY ||
  ""

const token =
  Cookies.get("x-access-token") ||
  process.env.NEXT_PUBLIC_LOCAL_ACCESS_TOKEN ||
  ""

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "x-access-token": token,
    "x-access-apikey": apikey,
  },
})

const SnuttApi = {
  async get<R, T = any>(
    url: string,
    queryParams: T | undefined = undefined,
  ): Promise<R> {
    var path = url
    var queryString = qs.stringify(queryParams, {
      encode: false,
      arrayFormat: "comma",
    })

    if (queryString !== "") {
      path = `${url}?${queryString}`
    }

    const result = await axiosInstance
      .get<R, AxiosResponse<R>, T>(path)
      .then((response) => response.data)
    return result
  },

  async post<R, T>(url: string, body: T): Promise<R> {
    return await axiosInstance
      .post<R, AxiosResponse<R>, T>(url, body)
      .then((response) => response.data)
  },

  async delete<R, T>(url: string, body: T): Promise<R> {
    return await axiosInstance
      .delete<R, AxiosResponse<R>, T>(url, body)
      .then((response) => response.data)
  },

  async put<R, T>(url: string, body: T): Promise<R> {
    return await axiosInstance
      .put<R, AxiosResponse<R>, T>(url, body)
      .then((response) => response.data)
  },
}

export default SnuttApi
