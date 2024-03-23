import React, { useState } from "react";
import { FaPlus, FaSignOutAlt, FaTrash } from "react-icons/fa";
import Bookcard from "@/components/book/card";
import AddBookModal from "@/components/book/create/modal";
import { useGetBooksQuery } from "@/components/hooks/user";
import { useSelector } from 'react-redux';
import { selectAccessToken, setAccessToken } from '@/store/features/user/userSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchFeaturedBooks, deleteBook } from '@/store/features/book/bookSlice';
import { useDeleteBookMutation } from "@/components/hooks/user";
const BookshelfMenu = () => {

    const router = useRouter()
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const [filteredBooks, setFilteredBooks] = useState(null); // Initialize filteredBooks with null
    const [filteredPlanToReadBooks, setFilteredPlanToReadBooks] = useState(null); // Initialize filteredBooks with null
    const [filteredCompletedBooks, setFilteredCompletedBooks] = useState(null); // Initialize filteredBooks with null

    const accessToken = useSelector(selectAccessToken);
    if (accessToken === null) {
        router.push('/login')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleLogout = () => {
        dispatch(setAccessToken(null));
        router.push('/login')
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Filter books based on search query
            let filteredReadingBooks = data?.data?.filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) && book.status === "Reading"
            );
            setFilteredBooks(filteredReadingBooks.length > 0 ? filteredReadingBooks : []); // If no books match the search query, set filteredBooks to null
            let filteredPlanToReadBooks = data?.data?.filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) && book.status === "Plan to Read"
            );
            setFilteredPlanToReadBooks(filteredPlanToReadBooks.length > 0 ? filteredPlanToReadBooks : [])
            let filteredCompletedBooks = data?.data?.filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) && book.status === "Completed"
            );
            setFilteredCompletedBooks(filteredCompletedBooks.length > 0 ? filteredCompletedBooks : [])
            if (filteredBooks?.length > 0)
                dispatch(fetchFeaturedBooks(filteredBooks));
            if (filteredPlanToReadBooks?.length > 0)
                dispatch(fetchFeaturedBooks(filteredPlanToReadBooks));
            if (filteredCompletedBooks?.length > 0)
                dispatch(fetchFeaturedBooks(filteredCompletedBooks));
        }
    };

    const mutation = useGetBooksQuery(accessToken);
    let data;
    if (mutation.isSuccess === true) {
        data =  mutation?.data
    }
    else {
        data = []
    }
    const bookDeleted = useDeleteBookMutation(accessToken)
  

    const deleteAccount = async () => {
        bookDeleted.mutateAsync()
        dispatch(deleteBook([]))
    };

    return (
        <>
        <div className="mx-auto mt-8 relative">
            <div className="bg-rose-500 p-5 items-center mb-20">
                <div className="container flex justify-between items-center ml-auto mr-auto">
                    <div className="w-1/5"></div>
                    <div className="w-3/5 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 w-full inline-block">
                            Menu
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4 gap-10 w-1/5 justify-end">
                        <FaPlus
                            onClick={openModal}
                            className="text-gray-900 cursor-pointer"
                            size={24}
                            title="Add Book"

                        />
                        <FaSignOutAlt
                            onClick={handleLogout} // Handle logout
                            className="text-gray-600 cursor-pointer"
                            size={24}
                            title="Logout"
                        />
                        <FaTrash
                            onClick={deleteAccount}
                            className="text-gray-600 cursor-pointer"
                            size={24}
                            title="Delete Account"
                        />
                    </div>
                </div>

            </div>

            {/* Search bar */}
            <div className="mt-4 mb-7 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="p-4 border rounded-md focus:outline-none focus:border-blue-500 w-2/5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className="w-full">
                <div className="flex flex-col items-center space-y-4 w-full">
                    <div className="w-full text-center">
                        <h2 className="text-2xl font-bold mb-2 text-gray-900 w-full inline-block">
                            Reading
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {filteredBooks !== null ?
                            filteredBooks.map((book) => (
                                <Bookcard key={book._id} book={book} />
                            )) :
                            data?.data?.filter((book) => book.status === "Reading")?.map((book) => (
                                <Bookcard key={book._id} book={book} />
                            ))
                        }
                    </div>

                    {!data?.data?.filter((book) => book.status === "Reading")?.length && (
                        <div className="mt-12 text-gray-600">
                            No Books Found
                        </div>)}
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-2xl font-bold mb-2 mt-4 text-gray-900">
                        Plan to Read
                    </h2>

                    <div className="overflow-x-auto max-w-full" >
                        <div className="grid grid-cols-3 gap-4" >
                            {filteredPlanToReadBooks !== null ?
                                filteredPlanToReadBooks.map((book) => (
                                    <Bookcard key={book._id} book={book}
                                    />
                                )) :
                                data?.data?.filter((book) => book.status === "Plan to Read")?.map((book) => (
                                    <Bookcard key={book._id} book={book}
                                    />
                                ))
                            }
                        </div>
                        {!data?.data?.filter((book) => book.status === "Plan to Read")?.length && (
                            <div className="mt-12 text-gray-600">
                                No Books Found
                            </div>)}

                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-2xl font-bold mb-2 mt-4 text-gray-900">
                        Completed
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {filteredCompletedBooks !== null ? // Check if filteredBooks is not null
                            filteredCompletedBooks.map((book) => (
                                <Bookcard key={book._id} book={book} />
                            )) :
                            data?.data?.filter((book) => book.status === "Completed")?.map((book) => (
                                <Bookcard key={book._id} book={book} />
                            ))
                        }
                    </div>
                    {!data?.data?.filter((book) => book.status === "Completed")?.length && (
                        <div className="mt-12 text-gray-600">
                            No Books Found
                        </div>)}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-50" onClick={closeModal} />
                    <AddBookModal isOpen={isModalOpen} onClose={closeModal} accessToken={accessToken} />
                </div>
            )}

            </div>
            </>
    );
};
export default BookshelfMenu;
