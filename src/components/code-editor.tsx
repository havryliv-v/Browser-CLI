import MonacoEditor, { OnMount, Monaco } from "@monaco-editor/react"
import React, { useRef } from "react"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

  const onEditorDidMount: OnMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    _monaco: Monaco
  ) => {
    editorRef.current = editor
    editor.onDidChangeModelContent(() => onChange(editor.getValue()))
    editor.updateOptions({ tabSize: 2 })
  }
  return (
    <MonacoEditor
      onMount={onEditorDidMount}
      value={initialValue}
      theme="vs-dark"
      language="javascript"
      height="500px"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor
