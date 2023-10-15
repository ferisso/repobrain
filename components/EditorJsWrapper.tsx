'use client'
import EDITOR_TOOLS from '@/tools/EditorJsTools';
import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

interface EditorJsWrapperProps {
  data?: any, 
  setData?: (editorData: any) => void, 
  className?: string
}
 
export default function EditorJsWrapper({ data, setData, className }: EditorJsWrapperProps) {
    //add a reference to editor
    const ref = useRef<any>();

    //initialize editorjs
    useEffect(() => {
      //initialize editor if we don't have a reference
      if (!ref.current) {
        const editor = new EditorJS({
          holder: 'editorjs',
          tools: EDITOR_TOOLS,
          placeholder: 'Description',
          data: data,
          async onChange(api) {
            const result = await api.saver.save()
            setData && setData(JSON.stringify(result))
          },
        });
        ref.current = editor;
      }
  
      //add a return function handle cleanup
      return () => {
        if (ref.current && ref.current.destroy) {
          ref.current.destroy();
        }
      };
    }, []);
  
  
    return <div id="editorjs" className={className} />;
}