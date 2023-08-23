import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";

export const searchUser = createAsyncThunk('searchUsers', async (search) => {
    try {
        // dispatch({ type: 'searchUserRequest' });

        const { data } = await axios.get(`${server}/searchuser`, {
            params: { search }, // Pass the search query as a parameter
            withCredentials: true,
        });
        console.log(data.users);

        // dispatch({ type: 'searchUserSuccess', payload: data.users }); // Use "data.users" for the payload
        return data.users;
    } catch (error) {
        // dispatch({ type: 'searchUserFail', payload: error.response.data.message });
        throw new Error(error)
    }
});

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        loading: false,
        isAuthenticated: true,
        users: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(searchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(searchUser.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error;
        });
    }
})

export const userReducer = createReducer({}, {
    loginRequest: state => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    loginFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    registerRequest: state => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    registerFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    logoutRequest: state => {
        state.loading = true;
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
    },
    logoutFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },

    searchUserRequest: state => {
        state.loading = true;
    },
    searchUserSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    searchUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    loadUserRequest: state => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    loadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    clearError: state => {
        state.error = null;
    },
    clearMessage: state => {
        state.message = null;
    },
})