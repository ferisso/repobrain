
import EDITOR_TOOLS from '@/tools/EditorJsTools';
import { createReactEditorJS } from 'react-editor-js'

export default function EditorJsWrapper() {

  let ReactEditorJS: any = false;

  if (typeof window !== "undefined") {
    ReactEditorJS = createReactEditorJS()
  }
  return (
    <div className="px-4 py-1 border rounded-md min-h-[200px]">
    {
      ReactEditorJS && <ReactEditorJS tools={EDITOR_TOOLS} />
    }
  </div>
  )
}