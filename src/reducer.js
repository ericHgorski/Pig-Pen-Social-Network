export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_WANT_TO_BE_FRIENDS") {
        state = { ...state, wantToBeFriends: action.users };
    }
    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            wantToBeFriends: state.wantToBeFriends.map((user) =>
                user.id == action.otherId ? { ...user, accepted: true } : user
            ),
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            wantToBeFriends: state.wantToBeFriends.filter(
                (user) => user.id != action.otherId
            ),
        };
    }
    if (action.type == "GET_RECENT_PUBLIC_MESSAGES") {
        console.log("action :>> ", action);
        console.log("action.msgs :>> ", action.msgs);
        state = {
            ...state,
            publicChatMessages: action.msgs,
        };
    }

    if (action.type == "ADD_PUBLIC_MESSAGE") {
        console.log("action :>> ", action);
        state = {
            ...state,
            publicChatMessages: [...state.publicChatMessages, action.msg],
        };
    }
    return state;
}
