import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import BaseQuery from "./BaseQuery";
const getcookie = () => {
    return Cookies.get("token");
}
export const UserSlice = createApi({
    reducerPath: "userSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: BaseQuery,
        prepareHeaders: (Headers) => {
            const token = getcookie();
            if (token) {
                Headers.set("Authorization", `Bearer ${token}`);
            }
            return Headers
        }
    }),
    tagTypes: ['userSlice'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => {
                return{
                    url: "user",
                    method: "GET",
                }
            },
            providesTags: ["userSlice"]
        }),
    })
})

export const { useGetUserQuery } = UserSlice