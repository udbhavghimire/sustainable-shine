"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useEffect, useRef, useState } from "react";

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null);
  const imageMenuRef = useRef(null);
  const colorMenuRef = useRef(null);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageMenuRef.current && !imageMenuRef.current.contains(event.target)) {
        setShowImageMenu(false);
      }
      if (colorMenuRef.current && !colorMenuRef.current.contains(event.target)) {
        setShowColorMenu(false);
      }
    };

    if (showImageMenu || showColorMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showImageMenu, showColorMenu]);

  if (!editor) {
    return null;
  }

  const addImageFromUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setShowImageMenu(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);

    // Convert to base64 and insert into editor
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      editor.chain().focus().setImage({ src: base64String }).run();
      setUploadingImage(false);
      setShowImageMenu(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.onerror = () => {
      alert("Failed to read image file");
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
    setShowImageMenu(false);
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors font-bold ${
          editor.isActive("bold") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors italic ${
          editor.isActive("italic") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors underline ${
          editor.isActive("underline") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Underline"
      >
        U
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors line-through ${
          editor.isActive("strike") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Strikethrough"
      >
        S
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Text Color */}
      <div className="relative" ref={colorMenuRef}>
        <button
          type="button"
          onClick={() => setShowColorMenu(!showColorMenu)}
          className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Text Color"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </button>
        {showColorMenu && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-2 grid grid-cols-5 gap-1">
            {[
              { color: "#000000", label: "Black" },
              { color: "#dc2626", label: "Red" },
              { color: "#16a34a", label: "Green" },
              { color: "#2563eb", label: "Blue" },
              { color: "#9333ea", label: "Purple" },
              { color: "#ea580c", label: "Orange" },
              { color: "#0891b2", label: "Cyan" },
              { color: "#84cc16", label: "Lime" },
              { color: "#ec4899", label: "Pink" },
              { color: "#64748b", label: "Gray" },
            ].map(({ color, label }) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setShowColorMenu(false);
                }}
                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400 transition-all"
                style={{ backgroundColor: color }}
                title={label}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetColor().run();
                setShowColorMenu(false);
              }}
              className="col-span-5 mt-1 px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
            >
              Reset Color
            </button>
          </div>
        )}
      </div>

      {/* Highlight */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("highlight") ? "bg-yellow-200 text-gray-900" : ""
        }`}
        title="Highlight"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors font-bold ${
          editor.isActive("heading", { level: 1 })
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors font-bold ${
          editor.isActive("heading", { level: 2 })
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors font-bold ${
          editor.isActive("heading", { level: 3 })
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Heading 3"
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors font-bold text-sm ${
          editor.isActive("heading", { level: 4 })
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Heading 4"
      >
        H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("paragraph") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Paragraph"
      >
        P
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("bulletList") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Bullet List"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("orderedList")
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Numbered List"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4h18M3 12h18M3 20h18"
          />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Alignment */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: "left" })
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Align Left"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h10M4 18h16"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: "center" })
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Align Center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M7 12h10M4 18h16"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: "right" })
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Align Right"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M10 12h10M4 18h16"
          />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Quote and Code */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("blockquote")
            ? "bg-emerald-100 text-emerald-700"
            : ""
        }`}
        title="Quote"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("codeBlock") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Code Block"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Link and Image */}
      <button
        type="button"
        onClick={addLink}
        className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("link") ? "bg-emerald-100 text-emerald-700" : ""
        }`}
        title="Add Link"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>
      {editor.isActive("link") && (
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-3 py-1.5 rounded hover:bg-red-200 transition-colors text-red-600"
          title="Remove Link"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      
      {/* Image Upload - with dropdown menu */}
      <div className="relative" ref={imageMenuRef}>
        <button
          type="button"
          onClick={() => setShowImageMenu(!showImageMenu)}
          className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
            uploadingImage ? "opacity-50 cursor-wait" : ""
          }`}
          title="Add Image"
          disabled={uploadingImage}
        >
          {uploadingImage ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
        
        {/* Image upload menu */}
        {showImageMenu && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[180px] overflow-hidden">
            <button
              type="button"
              onClick={triggerFileUpload}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload Image
            </button>
            <button
              type="button"
              onClick={addImageFromUrl}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors border-t border-gray-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Image from URL
            </button>
          </div>
        )}
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Horizontal Rule */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
        title="Horizontal Line"
      >
        —
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Table */}
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
        className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
        title="Insert Table"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
      {editor.isActive("table") && (
        <>
          <button
            type="button"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className="px-2 py-1.5 text-xs rounded hover:bg-gray-200 transition-colors"
            title="Add Column"
          >
            +Col
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className="px-2 py-1.5 text-xs rounded hover:bg-gray-200 transition-colors"
            title="Add Row"
          >
            +Row
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteTable().run()}
            className="px-2 py-1.5 text-xs rounded hover:bg-red-200 text-red-600 transition-colors"
            title="Delete Table"
          >
            Del
          </button>
        </>
      )}

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Undo/Redo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Undo"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Redo"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
          />
        </svg>
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }) {
  console.log('RichTextEditor render - content prop:', content?.substring(0, 100));
  
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-emerald-600 underline hover:text-emerald-700",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full my-4",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-gray-300 px-4 py-2 bg-gray-100 font-bold",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-gray-300 px-4 py-2",
        },
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Update editor content when prop changes
  useEffect(() => {
    console.log('RichTextEditor useEffect - content:', content);
    console.log('RichTextEditor useEffect - editor exists:', !!editor);
    
    if (editor && content !== undefined && content !== null) {
      const currentContent = editor.getHTML();
      console.log('Current editor content:', currentContent);
      
      // Only update if content is actually different (normalize for comparison)
      const normalizeHTML = (html) => html.replace(/\s+/g, ' ').trim();
      const normalizedContent = normalizeHTML(content);
      const normalizedCurrent = normalizeHTML(currentContent);
      
      console.log('Normalized content:', normalizedContent);
      console.log('Normalized current:', normalizedCurrent);
      
      // Update if different, or if current is empty/default and we have content
      if (normalizedContent !== normalizedCurrent || (normalizedContent && !normalizedCurrent)) {
        console.log('Updating editor with content');
        editor.commands.setContent(content);
      } else {
        console.log('Content already matches, skipping update');
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none" />
      
      {/* Custom styles for editor */}
      <style jsx global>{`
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
        }
        
        .ProseMirror table td,
        .ProseMirror table th {
          border: 2px solid #ddd;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
          min-width: 100px;
        }
        
        .ProseMirror table th {
          background-color: #f3f4f6;
          font-weight: bold;
          text-align: left;
        }
        
        .ProseMirror table .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(16, 185, 129, 0.1);
          pointer-events: none;
        }
        
        .ProseMirror table .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #10b981;
          pointer-events: none;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

