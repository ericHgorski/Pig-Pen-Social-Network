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
    return state;
}
