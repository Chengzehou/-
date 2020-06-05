//数据仓库
import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import promise from "redux-promise"
import {reducers} from "./reducers/index.js"

const store = createStore(reducers,applyMiddleware(thunk,promise)) //解决异步问题，植入中间件

export default store