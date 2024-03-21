import React, { useState } from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import Bookcard from "@/components/book/card";
import AddBookModal from "@/components/book/create/modal";
import { useGetBooksQuery } from "@/components/hooks/user";
const BookshelfMenu = ({ bookData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    let accessToken;
    if (typeof Window !== "undefined") {
        accessToken = localStorage.getItem('accessToken');
    }
    const mutation = useGetBooksQuery(accessToken);
    const { data } = mutation
    return (
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
                            className="text-white-900 cursor-pointer"
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

            </div>

            <div className="w-full">
                {/* Reading section */}
                <div className="flex flex-col items-center space-y-4 w-full">
                    <div className="w-full text-center">
                        <h2 className="text-2xl font-bold mb-2 text-gray-900 w-full inline-block">
                            Reading
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {data?.data?.filter((book) => book.status === "Reading")?.map((book) => (<Bookcard key={book._id} book={book} />))}
                    </div>
                </div>

                {/* Completed section */}
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Plan to Read
                    </h2>

                    <div className="overflow-x-auto max-w-full">
                        <div className="grid grid-cols-3 gap-4">
                            {data?.data?.filter((book) => book.status === "Plan to Read")?.map((book) => (
                                <Bookcard key={book._id} book={book} />
                            ))}
                        </div>
                    </div>



                </div>

                {/* Plan to Read section */}
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Completed
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {data?.data?.filter((book) => book.status === "Completed")?.map((book) => (<Bookcard key={book._id} book={book} />))}

                    </div>
                    {!data?.data?.filter((book) => book.status === "Completed")?.length && (

                        <div className="mt-12 text-gray-600">
                            No Books Found
                        </div>)}

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
