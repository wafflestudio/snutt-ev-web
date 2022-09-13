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

const defaultHeaders = {
  "x-access-token": token,
  "x-access-apikey": apikey,
}

export const coreClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API_URL,
  headers: defaultHeaders,
})

export const evClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EV_API_URL,
  headers: defaultHeaders,
})

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "x-access-token": token,
    "x-access-apikey": apikey,
  },
})

/**
 * @deprecated use each axios client instead
 * 어차피 deprecated 라 eslint disable
 */
const SnuttApi = {
  // eslint-disable-next-line
  async get<R, T = any>(
    url: string,
    queryParams: T | undefined = undefined,
  ): Promise<R> {
    let path = url
    const queryString = qs.stringify(queryParams, {
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

  // eslint-disable-next-line
  async delete<R, T>(url: string, body: any): Promise<R> {
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
