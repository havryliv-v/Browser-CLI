import { code } from "@uiw/react-md-editor/lib/cjs/commands"
import { Cell } from "../state"
import CodeCell from "./code-cell"
import TextEditor from "./text-editor"
import ActionBar from "./action-bar"

interface CellItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellItemProps> = ({ cell }) => {
  let child: JSX.Element
  if (cell.type === "code") {
    child = <CodeCell cell={cell} />
  } else {
    child = <TextEditor cell={cell} />
  }
  return (
    <div>
      <ActionBar id={cell.id} />
      {child}
    </div>
  )
}

export default CellListItem
