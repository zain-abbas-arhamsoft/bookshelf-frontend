import { LIVE_URL, BASE_URL } from "@/utils/config";
import { useQuery, useMutation } from "react-query";
export function useGenresQuery(accessToken) {
  return useQuery("genres", async () => {
    const response = await fetch(`${LIVE_URL}v1/book/genre`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }
    return response.json();
  });
}
export function getBooks(accessToken) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: accessToken,
    },
  };
  const response = fetch(`${LIVE_URL}v1/book/books`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
  return response;
}

export function useBookStatusMutation(accessToken) {
  return useMutation((bookStatus) =>
    fetch(`${LIVE_URL}v1/book/update-status`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: accessToken,
      },
      body: JSON.stringify(bookStatus),
    }).then((res) => res.json())
  );
}

export function useUserRegisterMutation() {
  return useMutation((newUser) =>
    fetch(`${LIVE_URL}v1/user/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json())
  );
}

export function useUserLoginMutation() {
  return useMutation((User) =>
    fetch(`${LIVE_URL}v1/user/login`, {
      method: "POST",
      body: JSON.stringify(User),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json())
  );
}

export function useCreateBookMutation(accessToken) {
  return useMutation((bookData) =>
    fetch(`${LIVE_URL}v1/book/create`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
      body: bookData,
    }).then((res) => res.json())
  );
}

export function useDeleteBookMutation(accessToken) {
  return useMutation(() => {
    fetch(`${LIVE_URL}v1/book/delete-books`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: accessToken,
      },
    }).then((res) => res.json());
  });
}
