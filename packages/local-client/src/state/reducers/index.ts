import { combineReducers } from "redux"
import cellsReducer from "./cellsReducer"
import bundlesReduser from "./bundleReducer"
const reducers = combineReducers({
  cells: cellsReducer,
  bundle: bundlesReduser,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
