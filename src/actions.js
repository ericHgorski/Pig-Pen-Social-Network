import axios from "axios";

export async function receiveWantToBeFriends() {
    const { data } = await axios.get("/want-to-be-friends");
    return {
        type: "RECEIVE_WANT_TO_BE_FRIENDS",
        users: data,
    };
}

export async function acceptFriend(otherId) {
    const { data } = await axios.post(`/api/friendship/${otherId}`, {
        text: "Accept Friend Request",
    });
    console.log("data :>> ", data);
}
