import { configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { NoteSlice } from "./api/NoteSlice";
import { AuthSlice } from "./api/AuthSlice ";
import { UserSlice } from "./api/UserSlice ";


export const store = configureStore({
    reducer : {
        [NoteSlice.reducerPath] : NoteSlice.reducer,
        [AuthSlice.reducerPath] : AuthSlice.reducer,
        [UserSlice.reducerPath] : UserSlice.reducer
    },
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(NoteSlice.middleware)
    .concat(AuthSlice.middleware).concat(UserSlice.middleware)
})
setupListeners(store.dispatch)