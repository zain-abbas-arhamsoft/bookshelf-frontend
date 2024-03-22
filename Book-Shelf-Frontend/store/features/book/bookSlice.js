import { createSlice } from '@reduxjs/toolkit';

// Initial state for books slice
const initialBooksState = {
    books: [],
    loading: false,
    error: null,
};

// Initial state for featured books slice
const initialFeaturedBooksState = {
    featuredBooks: [],
    loading: false,
    error: null,
};

// Create slice for books
const booksSlice = createSlice({
    name: 'books',
    initialState: initialBooksState,
    reducers: {
        fetchBooks(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
    },
});

// Create slice for featured books
const featuredBooksSlice = createSlice({
    name: 'featuredBooks',
    initialState: initialFeaturedBooksState,
    reducers: {
        fetchFeaturedBooks(state, action) {
            console.log('action', action.payload)
            state.loading = false;
            state.featuredBooks = state.featuredBooks.concat(action.payload);
        },
    },
});

// Export actions from each slice
export const { fetchBooks } = booksSlice.actions;
export const { fetchFeaturedBooks } = featuredBooksSlice.actions;

// Combine reducers from each slice
export const booksReducer = booksSlice.reducer;
export const featuredBooksReducer = featuredBooksSlice.reducer;
