import axios from "axios";
import { BASE_URL } from "@/utils/config";
class userService {

    /**
     *To sign up a user
     * @returns
     */
    async signUp(userData) {
        const res = await axios.post(`${BASE_URL}v1/user/register`, {
            method: "POST",
            body: JSON.stringify({
                userData
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        return res;
    }



    /**
     *To login a user
     * @returns
     */
    async login() {
        const res = await axios.post(
            `${BASE_URL}/v1/user/login`,
            {
                method: "POST",
                body: JSON.stringify({
                    userData
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }
        );
        return res;
    }
}

export default userService;