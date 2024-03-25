import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGenresQuery } from "@/pages/api/user";
import { useCreateBookMutation } from "@/pages/api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "react-query";

const addBookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author name is required" }),
  publicationHouse: z
    .string()
    .min(1, { message: "Publication House is required" }),
  publicationDate: z
    .string()
    .min(1, { message: "Publication Date is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
  publicationYear: z
    .string()
    .min(1, { message: "Publication year must be a positive integer" }),
  image: z.object({}).nullable().optional(), // Define image as an object, allowing null
});

export default function AddBookModal({ isOpen, onClose, accessToken }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationHouse: "",
    publicationDate: "",
    genre: "",
    publicationYear: "",
    status: "Plan to Read", // Initial value for book status
    image: null, // To store the selected image file
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addBookSchema),
  });

  const genreQuery = useGenresQuery(accessToken);
  const mutation = useCreateBookMutation(accessToken);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    const selectedGenre = genreQuery.data.data.find(
      (genre) => genre.name === formData.genre
    );
    const updatedFormData = {
      ...formData,
      genre: selectedGenre?._id,
    };

    const data = new FormData();
    data.append("title", updatedFormData.title);
    data.append("author", updatedFormData.author);
    data.append("publicationHouse", updatedFormData.publicationHouse);
    data.append("publicationDate", updatedFormData.publicationDate);
    data.append("genre", updatedFormData?.genre);
    data.append("publicationYear", updatedFormData.publicationYear);
    data.append("status", updatedFormData.status);
    data.append("image", updatedFormData.image);
    onClose();
    const mutationResult = await mutation.mutateAsync(data);
    let { success, message } = mutationResult;
    if (success === true) {
      queryClient.invalidateQueries("books");
    } else {
      toast.error(message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };
  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex items-center justify-center">
          <div className="p-8 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 text-rose-500 ">
                Add Book
              </h3>
              <div
                className="mt-2 px-7 py-3 overflow-y-auto"
                style={{ maxHeight: "70vh" }}
              >
                <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
                  {/* Title */}
                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-1">
                      Title
                    </label>
                    <input
                      {...register("title", { required: true })}
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={formData.title}
                      onChange={handleChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                      placeholder="Title"
                      autoComplete="off"
                    />
                    {errors?.title?.type === "required" && (
                      <p className="text-red-600 text-sm">Please enter title</p>
                    )}
                    {errors?.title && (
                      <p className="text-red-600 text-sm">
                        {errors?.title?.message}
                      </p>
                    )}
                  </div>

                  <div className="form-control mb-4">
                    <label htmlFor="author" className="block mb-1">
                      Author Name
                    </label>
                    <input
                      {...register("author", { required: true })}
                      defaultValue={formData.author}
                      onChange={handleChange}
                      id="author"
                      name="author"
                      type="text"
                      placeholder=" Author"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    />

                    {errors?.author && (
                      <p className="text-red-600 text-sm">
                        {errors?.author?.message}
                      </p>
                    )}
                  </div>

                  {/* Publication House */}

                  <div className="form-control mb-4">
                    <label htmlFor="publicationHouse" className="block mb-1">
                      Publication House
                    </label>
                    <input
                      {...register("publicationHouse")}
                      id="publicationHouse"
                      name="publicationHouse"
                      defaultValue={formData.publicationHouse}
                      onChange={handleChange}
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                      placeholder=" Publication House"
                    />

                    {errors?.publicationHouse && (
                      <p className="text-red-600 text-sm">
                        {errors?.publicationHouse?.message}
                      </p>
                    )}
                  </div>

                  {/* Publication Date */}

                  <div className="form-control mb-4">
                    <label htmlFor="publicationDate" className="block mb-1">
                      Publication Date
                    </label>
                    <input
                      {...register("publicationDate")}
                      value={
                        formData.publicationDate ? formData.publicationDate : ""
                      }
                      onChange={handleChange}
                      id="publicationDate"
                      type="date"
                      name="publicationDate"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                      placeholder=" Publication Date"
                    />

                    {errors?.publicationDate && (
                      <p className="text-red-600 text-sm">
                        {errors?.publicationDate?.message}
                      </p>
                    )}
                  </div>

                  {/* Genre */}

                  <div className="form-control mb-4">
                    <label htmlFor="genre" className="block mb-1">
                      Genre
                    </label>
                    <select
                      {...register("genre")}
                      onChange={handleChange}
                      defaultValue={formData.genre}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    >
                      <option value="">Select Genre</option>{" "}
                      {/* Add this line */}
                      {genreQuery.isLoading ? (
                        <option>Loading...</option>
                      ) : genreQuery.isError ? (
                        <option>Error fetching genres</option>
                      ) : (
                        genreQuery?.data?.data.map((genre) => (
                          <option key={genre.id} value={genre.name}>
                            {genre.name}
                          </option>
                        ))
                      )}
                    </select>

                    {errors?.genre && (
                      <p className="text-red-600 text-sm">
                        {errors?.genre?.message}
                      </p>
                    )}
                  </div>

                  {/* Publication Year */}

                  <div className="form-control mb-4">
                    <label htmlFor="publicationYear" className="block mb-1">
                      Publication Year
                    </label>
                    <input
                      {...register("publicationYear")}
                      defaultValue={formData.publicationYear}
                      onChange={handleChange}
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    />

                    {errors?.publicationYear && (
                      <p className="text-red-600 text-sm">
                        {errors?.publicationYear?.message}
                      </p>
                    )}
                  </div>

                  {/* Book Status Dropdown */}
                  <div className="form-control mb-4">
                    <label htmlFor="status" className="block mb-1">
                      Book Status
                    </label>
                    <select
                      {...register("status")}
                      onChange={handleChange}
                      value={formData.status}
                      id="status"
                      name="status"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    >
                      <option value="Plan to Read">Plan to Read</option>
                      <option value="Reading">Reading</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4">
                    <label htmlFor="image" className="block mb-1">
                      Image
                    </label>
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      id="image"
                      name="image"
                      defaultValue={formData?.image}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    />
                    {errors?.image && (
                      <p className="text-red-600 text-sm">
                        {errors?.image?.message}
                      </p>
                    )}
                  </div>

                  {/* Add Book Button */}
                  <button
                    type="submit"
                    className="mt-20 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
                  >
                    Add Book
                  </button>
                </form>
              </div>
            </div>
            {/* Close Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
