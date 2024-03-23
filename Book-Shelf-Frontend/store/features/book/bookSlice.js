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

// Initial state for featured books slice
const initialBookIdState = {
    bookId: "",
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
            state.loading = false;
            state.featuredBooks = state.featuredBooks.concat(action.payload);
        },
    },
});

// Create slice for featured books
const bookIdSlice = createSlice({
    name: 'bookId',
    initialState: initialBookIdState,
    reducers: {
        saveBookId(state, action) {
            state.loading = false;
            state.bookId = action.payload;

        },
    },
});

// Export actions from each slice
export const { fetchBooks } = booksSlice.actions;
export const { fetchFeaturedBooks } = featuredBooksSlice.actions;
export const { saveBookId } = bookIdSlice.actions;

// Combine reducers from each slice
export const booksReducer = booksSlice.reducer;
export const featuredBooksReducer = featuredBooksSlice.reducer;
export const bookIdReducer = bookIdSlice.reducer;

export const getBookId = (state) => state.books.bookId;

