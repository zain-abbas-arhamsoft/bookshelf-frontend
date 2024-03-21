// Checks if there's a logged-in user, returns user data or false
const isLoggedIn = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken");
    }
    return false;
};

export {  isLoggedIn };
