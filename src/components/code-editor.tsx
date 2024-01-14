import "bulmaswatch/superhero/bulmaswatch.min.css"
import "./code-editor.css"

import MonacoEditor, { OnMount, Monaco } from "@monaco-editor/react"
import { useRef } from "react"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import prettier from "prettier/standalone"
import babelPlugin from "prettier/plugins/babel"
import estreePlugin from "prettier/plugins/estree"
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

  const onFormatClick = async () => {
    const unformatted = editorRef.current?.getValue()
    console.log(editorRef.current)
    if (unformatted) {
      const formated = await (
        await prettier.format(unformatted, {
          parser: "babel",
          plugins: [babelPlugin, estreePlugin],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
      ).replace(/\n$/, "")
      editorRef.current?.setValue(formated)
    }
  }
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
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
    </div>
  )
}

export default CodeEditor
