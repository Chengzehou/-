const defaultState = {
    timeaction: "",
    timelast: "",
    timenow: "",
    qd: false,
    qt: true
}

export const userqd = (state = defaultState, action) => {
    switch (action.type) {
        case "userpostqd":
            return { ...defaultState, ...action.payload }
            break;
        case "userpostqt":
            return {...state,...action.payload}
        default:
            return state;
            break;
    }
}