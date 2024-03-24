import { createSlice } from '@reduxjs/toolkit';

// Initial state for books slice
const initialBooksState = {
    books: [],
    featuredBooks: [],
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
        deleteBook(state, action) {
            state.loading = false;
            state.books = action.payload;
            state.featuredBooks = action.payload;
            state.bookId = "";
        },
        fetchFeaturedBooks(state, action) {
            state.loading = false;
            if (action.payload.length > 0)
                state.featuredBooks = state.featuredBooks.concat(action.payload);
            else
                state.featuredBooks = action.payload;
        },
        saveBookId(state, action) {
            state.loading = false;
            state.bookId = action.payload;
        },
    },
});


// Export actions from each slice
export const { fetchBooks, deleteBook, saveBookId, fetchFeaturedBooks } = booksSlice.actions;
// Combine reducers from each slice
export default booksSlice.reducer;

export const getBookId = (state) => state.books.bookId;

