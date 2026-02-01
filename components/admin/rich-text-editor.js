"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useRef, useState } from "react";

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null);
  const imageMenuRef = useRef(null);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageMenuRef.current && !imageMenuRef.current.contains(event.target)) {
        setShowImageMenu(false);
      }
    };

    if (showImageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showImageMenu]);

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
    <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
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
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
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
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content) {
      const currentContent = editor.getHTML();
      // Only update if content is actually different (normalize for comparison)
      const normalizeHTML = (html) => html.replace(/\s+/g, ' ').trim();
      if (normalizeHTML(content) !== normalizeHTML(currentContent)) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
}

