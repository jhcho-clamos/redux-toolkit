import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

const DOGS_API_KEY =
  "live_Zobvo5iZuDAWmE9JbQ2YF816f68MHLH4IGKJHuMZHo1zsoe60EKaLqWTCcY9P7si";

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    // baseUrl: "https://api.thedogapi.com/v1",

    baseUrl: "https://api.thedogapi.com/v1",

    // prepareHeaders(headers) {
    //   headers.set("x-api-key", DOGS_API_KEY);
    //   return headers;
    // },
  }),

  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], any | void>({
        // query: ({ limit = 10, page = 0 }) => {
        //   return `/breeds?limit=${limit}&page=${page}`;
        // },
        query: ({ limit = 10, page = 0 }) => ({
          url: `/breeds?limit=${limit}&page=${page}`,
          method: "get",
        }),
      }),
    };
  },
});

export const { useFetchBreedsQuery } = apiSlice;
