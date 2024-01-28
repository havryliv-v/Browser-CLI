import React, { useEffect, useState } from "react"
import { ResizableBox, ResizableBoxProps } from "react-resizable"

import "./resizable.css"

interface ResizableProps {
  direction: "horizontal" | "vertical"

  children?: React.ReactNode
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps
  const [innerHeight, setInnerHeight] = useState(Math.floor(window.innerHeight))
  const [innerWidth, setInnerWidth] = useState(Math.floor(window.innerWidth))
  const [width, setWidth] = useState(Math.floor(window.innerWidth * 0.75))

  useEffect(() => {
    let timer: any
    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerHeight(Math.floor(window.innerHeight))
        setInnerWidth(Math.floor(window.innerWidth))
        if (Math.floor(window.innerWidth) < width) {
          setWidth(Math.floor(window.innerWidth * 0.75))
        }
      }, 100)
    }
    window.addEventListener("resize", listener)
    return () => {
      window.removeEventListener("resize", listener)
    }
  }, [])

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      maxConstraints: [Math.floor(window.innerWidth * 0.75), Infinity],
      minConstraints: [Math.floor(window.innerWidth * 0.2), Infinity],
      width,
      height: Infinity,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width)
      },
    }
  } else {
    resizableProps = {
      maxConstraints: [Infinity, Math.floor(window.innerHeight * 0.9)],
      minConstraints: [Infinity, 60],
      width: Infinity,
      height: 400,
      resizeHandles: ["s"],
    }
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
