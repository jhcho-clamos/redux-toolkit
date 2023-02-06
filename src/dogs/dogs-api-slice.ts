import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DOGS_API_KEY =
  "live_Zobvo5iZuDAWmE9JbQ2YF816f68MHLH4IGKJHuMZHo1zsoe60EKaLqWTCcY9P7si";

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thedogapi.com/v1",
    prepareHeaders(headers) {
      headers.set("x-api-key", DOGS_API_KEY);
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], any | void>({
        query: (params) => {
          return `/breeds?limit=${params?.limit}&page=${params?.page}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = apiSlice;
