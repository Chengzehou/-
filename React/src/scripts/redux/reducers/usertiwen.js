//员工体温记录
const defaultState = []


export const usertiwen = (state=defaultState,action)=>{
    switch(action.type){
        case "getusertiwen":
            return [...action.payload]
        break;

        default:
        return state;
        break;
    }

}