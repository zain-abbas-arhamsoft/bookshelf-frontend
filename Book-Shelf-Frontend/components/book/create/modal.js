import React from "react";
import { useForm } from "react-hook-form";
import { useMutation,useQuery } from "react-query";
import { BASE_URL } from "@/utils/config";
import Link from "next/link";

const AddBookModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const accessToken = localStorage.getItem('accessToken')
  const genreQuery = useQuery("genres", async () => {
    const response = await fetch(`${BASE_URL}v1/book/genre`, {
      headers: {
        Authorization: accessToken
      }
    }); // Assuming this is your endpoint to fetch genres
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }
    return response.json();
  });
  const mutation = useMutation((bookData) =>
    fetch(`${BASE_URL}v1/book/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    }).then((res) => res.json())
  );

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
      onClose(); // Close the modal after successfully adding the book
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Add Book</h3>
          <div className="mt-2 px-7 py-3">
            <div className="modal-body px-4 py-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control mb-4">
                  <label htmlFor="title" className="block mb-1">Title</label>
                  <input {...register("title", { required: true })} id="title"
                    name="title"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder=" Title"
                    autoComplete="off" />

                  {errors.title && <span className="text-red-500">Title is required</span>}
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="author" className="block mb-1">Author Name</label>
                  <input {...register("author", { required: true })} name="author" type="text" placeholder=" Author"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                  />
                  {errors.author && <span className="text-red-500">Author name is required</span>}
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="publicationHouse" className="block mb-1">Publication House</label>
                  <input {...register("publicationHouse")}
                    name="publicationHouse"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder=" Publication House" />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="publicationDate" className="block mb-1">Publication Date</label>
                  <input {...register("publicationDate")} type="date" name="publicationDate"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder=" Publication Date" />
                </div>


                <div className="form-control mb-4">
                  <label htmlFor="genre" className="block mb-1">Genre</label>
                  <select {...register("genre")} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none">
                    {genreQuery.isLoading ? (
                      <option>Loading...</option>
                    ) : genreQuery.isError ? (
                      <option>Error fetching genres</option>
                    ) : (
                      genreQuery.data.data.map((genre) => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                      ))
                    )}
                  </select>
                  {errors.genre && <span className="text-red-500">Genre is required</span>}
                </div>


                <div className="form-control mb-4">
                  <label htmlFor="publicationYear" className="block mb-1">Publication Year</label>
                  <input {...register("publicationYear")} type="number" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none" />
                </div>
                <button type="submit" className="btn-primary w-full">Add Book</button>
              </form>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            {/* Close Modal */}
            <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
