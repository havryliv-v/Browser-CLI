import { useTypedSelector } from "../hooks/use-typed-selector"
import CellListItem from "./cell-list-item"
import AddCell from "./add-cell"
import { Fragment } from "react"

const CellList: React.FC = () => {
  const { data, order } = useTypedSelector((state) => state.cells)
  const cells = order.map((id) => data[id])

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ))

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  )
}

export default CellList
