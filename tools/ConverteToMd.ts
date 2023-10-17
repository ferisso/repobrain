const ConverteToMd = (editorJSON: any): string => {
  if (!editorJSON) return "";
  editorJSON = JSON.parse(editorJSON);
  const markdownText: string = editorJSON.blocks
    .map((block: any) => {
      switch (block.type) {
        case "paragraph":
          return block.data.text;
        case "header":
          return `# ${block.data.text}`;
        case "list":
          if (block.data.style === "ordered") {
            return block.data.items
              .map((item: any, index: number) => `${index + 1}. ${item}`)
              .join("\n");
          } else {
            return block.data.items.map((item: any) => `- ${item}`).join("\n");
          }
        case "quote":
          return `> ${block.data.text}`;
        case "code":
          return "```" + block.data.language + "\n" + block.data.code + "\n```";
        case "checklist":
          return block.data.items
            .map((item: any) => `- [${item.checked ? "x" : " "}] ${item.text}`)
            .join("\n");
        default:
          return "";
      }
    })
    .join("\n\n");

  return markdownText;
};

export default ConverteToMd;
