'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

type RichTextEditorProps = {
  content?: Record<string, unknown>;
  onChange?: (content: Record<string, unknown>) => void;
  editable?: boolean;
  placeholder?: string;
};

export function RichTextEditor({
  content,
  onChange,
  editable = true,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? 'Start writing...',
        showOnlyWhenEditable: true,
      }),
    ],
    content: content ?? { type: 'doc', content: [] },
    editable,
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getJSON() as Record<string, unknown>);
    },
  });

  if (!editor) return null;

  const Toolbar = () => (
    <div className="flex flex-wrap gap-1 border-b border-neutral-200 p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-brand-100 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
        title="Heading"
      >
        H
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded px-2 py-1 text-sm font-bold ${editor.isActive('bold') ? 'bg-brand-100 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded px-2 py-1 text-sm italic ${editor.isActive('italic') ? 'bg-brand-100 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive('bulletList') ? 'bg-brand-100 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
        title="Bullet list"
      >
        ≡
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive('orderedList') ? 'bg-brand-100 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
        title="Ordered list"
      >
        1.
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="rounded px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100"
        title="Divider"
      >
        —
      </button>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {editable && <Toolbar />}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-4 py-3 [&_.ProseMirror-p-placeholder]:text-neutral-400 [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
