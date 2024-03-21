import React, { useState } from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import Bookcard from "@/components/book/card";
import AddBookModal from "@/components/book/create/modal";

const BookshelfMenu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const books = [
        {
            id: 1,
            title: "Book 1",
            genre: "Fiction",
            author: "Author 1",
            imageUrl: "/book1.jpg",
        },
        {
            id: 2,
            title: "Book 2",
            genre: "Non-fiction",
            author: "Author 2",
            imageUrl: "/book2.jpg",
        },
        {
            id: 3,
            title: "Book 3",
            genre: "Fantasy",
            author: "Author 3",
            imageUrl: "/book3.jpg",
        },
    ];

    return (
        <div className="container mx-auto mt-8 relative">
            <div className="flex justify-between items-center mb-4">
                <div className="w-full text-center">
                    <h1 className="text-3xl font-bold text-gray-900 w-full inline-block">
                        Menu
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <FaPlus
                        onClick={openModal}
                        className="text-gray-600 cursor-pointer"
                        size={24}
                    />
                    {/* Create Book icon */}
                    <FaSignOutAlt
                        className="text-gray-600 cursor-pointer"
                        size={24}
                    />
                    {/* Logout icon */}
                </div>
            </div>
            <div className="w-full">
                {/* Reading section */}
                <div className="flex flex-col items-center space-y-4 w-full">
                    <div className="w-full text-center">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 w-full inline-block">
                            Reading
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {books.slice(0, 3).map((book) => (
                            <Bookcard key={book.id} book={book} />
                        ))}
                    </div>
                </div>

                {/* Completed section */}
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">
                        Completed
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {books.slice(0, 3).map((book) => (
                            <Bookcard key={book.id} book={book} />
                        ))}
                    </div>
                </div>

                {/* Plan to Read section */}
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">
                        Plan to Read
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {books.slice(0, 3).map((book) => (
                            <Bookcard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-50" onClick={closeModal} />
                    <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            )}
        </div>
    );
};

export default BookshelfMenu;
