import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions"
import bundle from "../../bundler"
import axios from "axios"
import { Cell } from "../cell"
import { RootState } from "../reducers"

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    })
    const result = await bundle(input)

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    })
  }
}

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS })
    try {
      const { data } = await axios.get<Cell[]>("/cells")
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      })
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        })
      }
    }
  }
}

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState()
    const cells = order.map((id) => data[id])
    try {
      await axios.post("/cells", { cells })
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.SAVE_CELLS_ERROR,
          payload: err.message,
        })
      }
    }
  }
}
