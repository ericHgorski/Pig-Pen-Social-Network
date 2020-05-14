import axios from "axios";

export async function receiveWantToBeFriends() {
    const { data } = await axios.get("/want-to-be-friends");
    console.log("resp in actions :>> ", data);
    return {
        type: "RECEIVE_WANT_TO_BE_FRIENDS",
        users: data,
    };
}
