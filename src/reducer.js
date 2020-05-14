export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_WANT_TO_BE_FRIENDS") {
        console.log("action :>> ", action);
        console.log("state :>> ", state);
        state = { ...state, wantToBeFriends: action.users };
        console.log("state :>> ", state);
    }
    return state;
}
