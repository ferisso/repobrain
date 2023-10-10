import Header from "@editorjs/header";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import SimpleImage from "@editorjs/simple-image";

const EDITOR_TOOLS = {
  code: Code,
  header: Header,
  checklist: Checklist,
  table: Table,
  list: {
    class: List,
    inlineToolbar: true,
  },
  linkTool: LinkTool,
  inlineCode: InlineCode,
  image: SimpleImage,
};

export default EDITOR_TOOLS;

