import { useQueryClient, useMutation } from "react-query";
import userService from "../services/user";
// import { useMutation,useQueryClient } from "@tanstack/react-query"

const useLogin = () => {
    // const queryClient = useQueryClient();
    const queryClient = QueryClientProvider()
    return useMutation(
        (credentials) => userService.login(credentials),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("user"); // Assuming you have a query for the user data
            },
        }
    );
};


// const useSignUp = (userData) => {
//     // const queryClient = useQueryClient();
//     // const queryClient = QueryClientProvider()
//     return useMutation({
//         queryFn: async () => signUp(userData),
//         queryKey: ["user"],
//     })
//     // return useMutation(
//     //     (userData) => signUp(userData), // Pass userData to signUp
//     //     {
//     //         onSuccess: () => {
//     //             queryClient.invalidateQueries("user");
//     //         },
//     //     }
//     // );
// };

const useSignUp = (userData) => {
    console.log('userData', userData)
    const queryClient = useQueryClient(); 
    return useMutation(
        (userData) => userService.signUp(userData), 
        {
            onSuccess: () => {
                queryClient.invalidateQueries("user");
            },
        }
    );
};




export {
    useLogin,
    useSignUp,
};