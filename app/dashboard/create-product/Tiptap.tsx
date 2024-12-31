"use client";

import { Icons } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type TiptapProps = {
  val: string;
  clearEditor: boolean;
  clearEditor2: boolean;
};

const Tiptap = ({ val, clearEditor, clearEditor2 }: TiptapProps) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-4" },
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-4" },
        },
        heading: {
          HTMLAttributes: { class: "text-2xl font-bold" },
        },
      }),
    ],
    content: val,
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue("description", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  useEffect(() => {
    if (clearEditor && editor) editor.commands.clearContent();
  }, [clearEditor, editor]);

  useEffect(() => {
    if (clearEditor2 && editor) editor.commands.clearContent();
  }, [clearEditor2, editor]);

  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(val);
  }, [val]);

  return (
    <div className="space-y-2">
      {editor && (
        <div>
          <Toggle
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            size={"sm"}
            aria-label="Toggle heading"
          >
            <Icons.h1 style={{ width: 19, height: 19 }} aria-hidden="true" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            size={"sm"}
            aria-label="Toggle bold"
          >
            <Icons.bold style={{ width: 18, height: 18 }} aria-hidden="true" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            size={"sm"}
            aria-label="Toggle italic"
          >
            <Icons.italic
              style={{ width: 18, height: 18 }}
              aria-hidden="true"
            />
          </Toggle>
          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={"sm"}
            aria-label="Toggle strike"
          >
            <Icons.strike
              style={{ width: 18, height: 18 }}
              aria-hidden="true"
            />
          </Toggle>
          <Toggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            size={"sm"}
            aria-label="Toggle orderedList"
          >
            <Icons.orderList
              style={{ width: 17, height: 17 }}
              aria-hidden="true"
            />
          </Toggle>
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            size={"sm"}
            aria-label="Toggle bulletList"
          >
            <Icons.unOrderList
              style={{ width: 17, height: 17 }}
              aria-hidden="true"
            />
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
