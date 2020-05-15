import axios from "./axios";

export async function receiveWantToBeFriends() {
    const { data } = await axios.get("/want-to-be-friends");
    return {
        type: "RECEIVE_WANT_TO_BE_FRIENDS",
        users: data,
    };
}

export async function acceptFriend(otherId) {
    await axios.post(`/api/friendship/${otherId}`, {
        text: "Accept Friend Request",
    });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        otherId,
    };
}

export async function unfriend(otherId) {
    await axios.post(`/api/friendship/${otherId}`, {
        text: "Unfriend",
    });
    return {
        type: "UNFRIEND",
        otherId,
    };
}
