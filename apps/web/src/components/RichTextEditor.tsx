'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import ImageExt from '@tiptap/extension-image';
import LinkExt from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useCallback, useRef } from 'react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      ImageExt.configure({ inline: false }),
      LinkExt.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
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

  const addImage = useCallback((url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      addImage(dataUrl);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [addImage]);

  const addLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const btn = (label: string, active: boolean, onClick: () => void, title: string) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`rounded px-2 py-1 text-sm ${active ? 'bg-brand-100 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
      title={title}
    >
      {label}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {editable && (
        <div className="flex flex-wrap gap-0.5 border-b border-neutral-200 p-1.5">
          <div className="flex items-center gap-0.5 border-r border-neutral-200 pr-1.5 mr-1.5">
            {btn('H1', editor.isActive('heading', { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), 'Heading 1')}
            {btn('H2', editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 'Heading 2')}
            {btn('H3', editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 'Heading 3')}
          </div>
          <div className="flex items-center gap-0.5 border-r border-neutral-200 pr-1.5 mr-1.5">
            {btn('B', editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), 'Bold')}
            {btn('I', editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), 'Italic')}
            {btn('U', editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), 'Underline')}
          </div>
          <div className="flex items-center gap-0.5 border-r border-neutral-200 pr-1.5 mr-1.5">
            {btn('\u2261', editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), 'Bullet list')}
            {btn('1.', editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), 'Ordered list')}
          </div>
          <div className="flex items-center gap-0.5 border-r border-neutral-200 pr-1.5 mr-1.5">
            {btn('\u2190', editor.isActive({ textAlign: 'left' }), () => editor.chain().focus().setTextAlign('left').run(), 'Align left')}
            {btn('\u2194', editor.isActive({ textAlign: 'center' }), () => editor.chain().focus().setTextAlign('center').run(), 'Align center')}
            {btn('\u2192', editor.isActive({ textAlign: 'right' }), () => editor.chain().focus().setTextAlign('right').run(), 'Align right')}
          </div>
          <div className="flex items-center gap-0.5">
            {btn('\u279C', false, () => fileInputRef.current?.click(), 'Insert image')}
            {btn('\u{1F517}', editor.isActive('link'), addLink, 'Add link')}
            {btn('\u2014', false, () => editor.chain().focus().setHorizontalRule().run(), 'Divider')}
          </div>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-4 py-3 [&_.ProseMirror-p-placeholder]:text-neutral-400 [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
