"use client";

import { Editor } from "@tinymce/tinymce-react";

const EDITOR_INIT = {
  height: 400,
  menubar: false,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "charmap",
    "searchreplace",
    "visualblocks",
    "code",
    "table",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | table | code | removeformat",
  content_style:
    "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; }",
  promotion: false,
  branding: false,
};

export default function TinyMCEEditor({ content, onChange, height = 400 }) {
  return (
    <Editor
      tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@8.8.2/tinymce.min.js"
      licenseKey="gpl"
      value={content || ""}
      onEditorChange={onChange}
      init={{ ...EDITOR_INIT, height }}
    />
  );
}
