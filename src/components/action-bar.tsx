import "./action-bar.css"

import { useActions } from "../hooks/use-actions"
import ActionButton from "./action-button"

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions()
  return (
    <div className="action-bar">
      <ActionButton action={() => moveCell(id, "up")} btnType={"arrow-up"} />
      <ActionButton
        action={() => moveCell(id, "down")}
        btnType={"arrow-down"}
      />
      <ActionButton action={() => deleteCell(id)} btnType={"times"} />
    </div>
  )
}

export default ActionBar
