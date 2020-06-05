//员工基本信息reducer
const defaultState = {
    username:"",
    userid:"",
    jiguan:"",
    sex:"",
    age:"",
    phone:"",
    idcard:"",
    department:"",
    address:"",
}

export const baseuser = (state=defaultState,action)=>{
    switch(action.type){
        case "Changebaseuserinfor":
            return {...state,...action.payload}
        break;
        case "getbaseuserinfor":
            return {...state,...action.payload}
        break;
        default:
        return state;
        break;
    }

}