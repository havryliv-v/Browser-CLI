import { ActionType } from "../action-types"
import {
  Action,
  Direction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  UpdateCellAction,
} from "../actions"
import { CellTypes } from "../cell"

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  }
}

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  }
}

export const insertCellBefore = (
  id: string | null,
  type: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type,
    },
  }
}

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  }
}
