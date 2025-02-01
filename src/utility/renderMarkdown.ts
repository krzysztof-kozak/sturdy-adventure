import { marked } from "marked";
import DOMPurify from "dompurify";

function renderMarkdown(markdown: string) {
  const parsedMarkdown = marked.parse(markdown, { async: false });
  return { __html: DOMPurify.sanitize(parsedMarkdown) };
}

export { renderMarkdown };
