import "./code-cell.css"

import React, { useEffect } from "react"

import CodeEditor from "../code-editor/code-editor"
import Preview from "../preview/preview"
import Resizable from "../resizable/resizable"
import { Cell } from "../../state"
import { useActions } from "../../hooks/use-actions"
import { useTypedSelector } from "../../hooks/use-typed-selector"

interface codeCellProps {
  cell: Cell
}

const CodeCell: React.FC<codeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundle[cell.id])
  const isBundle = !!bundle

  useEffect(() => {
    if (!isBundle) {
      createBundle(cell.id, cell.content)
      return
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 1250)
    return () => {
      clearTimeout(timer)
    }
  }, [cell.content, cell.id, createBundle, isBundle])

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-bg">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
