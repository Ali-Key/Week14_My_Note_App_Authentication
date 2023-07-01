import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import BaseQuery from './BaseQuery';

const getcookie = ()=>{
    return Cookies.get("token");
}
export const NoteSlice = createApi({
    reducerPath: 'noteSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseQuery,
        prepareHeaders : (Headers)=>{
            const token = getcookie();
            if(token){
                Headers.set("Authorization",`Bearer ${token}`);
            }
            return Headers;
        }
    }),
    tagTypes: ['Note'],
    endpoints: (builder) => ({

        getNotes: builder.query({
            query: () => {
                return{
                    url: "notes",
                    method: "GET",
                }
            },
            providesTags: ["Note"]
        }),

        addNotes: builder.mutation({
            query: (addNote) => ({
                url: "create_note",
                method: "POST",
                body: addNote
            }),
            invalidatesTags: ["Note"]
        }),

        updateNotes: builder.mutation({
            query: ({ updateNote, id }) => ({
                url: `update_note/${id}`,
                method: "PUT",
                body: updateNote
            }),
            invalidatesTags: ["Note"]

        }),

        deleteNotes: builder.mutation({
            query: (id) => ({
                url: `delete_note/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Note"]

        })

    })
})

export const { useGetNotesQuery, useAddNotesMutation, useUpdateNotesMutation, useDeleteNotesMutation } = NoteSlice;







