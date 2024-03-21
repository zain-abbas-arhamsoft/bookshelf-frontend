import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import { BASE_URL } from "@/utils/config";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),

});

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation(newUser =>
        fetch(`${BASE_URL}v1/user/register`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(res => res.json())
    )
    if (mutation.isSuccess) {
        // Access response status code and data
        const { data } = mutation;
        const { message } = data
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const onSubmit=(event)=> {
        event.preventDefault()
         mutation.mutate({
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
    }

    return (
        <div className="selection:bg-rose-500 selection:text-white">
            <div className="flex min-h-screen items-center justify-center bg-rose-100">
                <div className="flex-1 p-8">
                    <div className="mx-auto w-80 overflow-hidden rounded-3xl bg-white shadow-xl">
                        {/* Form Header */}
                        <div className="rounded-bl-4xl relative h-44 bg-rose-500">
                            <svg
                                className="absolute bottom-0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320"
                            >
                                <path
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                ></path>
                            </svg>
                        </div>


                        {/* Form Body */}
                        <div className="rounded-tr-4xl bg-white px-10 pb-8 pt-4">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Welcome back!
                            </h1>



                            <form
                                className="mt-12"
                                action=""
                                method="POST"
                                // onSubmit={handleSubmit}
                                onSubmit={handleSubmit(onSubmit)}

                            >


                                {/* Username Input */}
                                <div className="relative mt-6">
                                    <input
                                        {...register("username", { required: true })}
                                        id="username"
                                        name="username"
                                        type="text"
                                        defaultValue={formData.username}
                                        onChange={handleChange}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                                        placeholder="Username"
                                        autoComplete="off"
                                    />
                                    {errors?.username && (
                                        <p className="text-red-600 text-sm">
                                            {errors?.username?.message}
                                        </p>
                                    )}
                                    <label
                                        htmlFor="username"
                                        className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                                    >
                                        Username
                                    </label>
                                </div>

                                {/* Email Input */}
                                <div className="relative mt-6">
                                    <input
                                        {...register("email", { required: true })}

                                        id="email"
                                        name="email"
                                        type="text"
                                        defaultValue={formData.email}
                                        onChange={handleChange}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                                        placeholder="john@doe.com"
                                        autoComplete="off"
                                    />
                                    {errors?.email?.type === "required" && (
                                        <p className="text-red-600 text-sm">
                                            Please enter your email address
                                        </p>
                                    )}
                                    {errors?.email && (
                                        <p className="text-red-600 text-sm">
                                            {errors?.email?.message}
                                        </p>
                                    )}
                                    <label
                                        htmlFor="email"
                                        className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                                    >
                                        Email address
                                    </label>
                                </div>

                                {/* Password Input */}
                                <div className="relative mt-10">
                                    <input
                                        {...register("password", { required: true })}
                                        id="password"
                                        type="password"
                                        name="password"
                                        defaultValue={formData.password}
                                        onChange={handleChange}
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                                        placeholder="Password"
                                        autoComplete="off"
                                    />
                                    {errors?.password && (
                                        <p className="text-red-600 text-sm">
                                            {errors?.password?.message}
                                        </p>
                                    )}
                                    <label
                                        htmlFor="password"
                                        className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                                    >
                                        Password
                                    </label>
                                </div>


                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    // onClick={handleSubmit}

                                    className="mt-20 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
                                >

                                    Sign up

                                </button>

                                <div className="text-center mt-4">
                                    <p className="text-gray-600 text-sm">
                                        Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            className="text-rose-500 hover:underline"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
