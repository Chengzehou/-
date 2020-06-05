//合并reducer
import {combineReducers} from "redux"
import { baseuser } from "./userbase"
import { usertiwen } from "./usertiwen"
import { userqd } from "./userqd"


export const reducers = combineReducers({
        baseuser:baseuser,
        usertiwen:usertiwen,
        userqd:userqd,
})