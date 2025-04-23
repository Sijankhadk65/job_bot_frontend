import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Link,
  Link2Off,
  Code,
} from "lucide-react";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  const iconButtonClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors duration-150 ${
      isActive
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
    }`;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        className={iconButtonClass(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive("underline"))}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive("heading", { level: 2 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive("heading", { level: 3 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive("orderedList"))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive({ textAlign: "left" }))}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive({ textAlign: "center" }))}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter size={16} />
      </button>
      <button
        className={iconButtonClass(editor.isActive({ textAlign: "right" }))}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight size={16} />
      </button>
      <button
        className={iconButtonClass(false)}
        onClick={() => {
          const url = window.prompt("Enter URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        <Link size={16} />
      </button>
      <button
        className={iconButtonClass(false)}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Link2Off size={16} />
      </button>
      <button
        className={iconButtonClass(false)}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo size={16} />
      </button>
      <button
        className={iconButtonClass(false)}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

export default MenuBar;
