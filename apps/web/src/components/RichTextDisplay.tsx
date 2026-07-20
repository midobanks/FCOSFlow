type RichTextDisplayProps = {
  content: Record<string, unknown>;
};

function renderMarks(marks: any[] | undefined, children: React.ReactNode): React.ReactNode {
  if (!marks) return children;

  let result = children;
  for (const mark of marks) {
    switch (mark.type) {
      case 'bold':
        result = <strong key={mark.type} className="font-semibold">{result}</strong>;
        break;
      case 'italic':
        result = <em key={mark.type}>{result}</em>;
        break;
      case 'underline':
        result = <span key={mark.type} className="underline">{result}</span>;
        break;
      case 'link':
        result = <a key={mark.type} href={mark.attrs?.href} className="text-brand-500 underline hover:text-brand-600" target="_blank" rel="noopener noreferrer">{result}</a>;
        break;
      case 'code':
        result = <code key={mark.type} className="rounded bg-neutral-100 px-1 py-0.5 text-sm font-mono">{result}</code>;
        break;
      default:
        result = <span key={mark.type}>{result}</span>;
    }
  }
  return result;
}

function renderNode(node: any, key: number): React.ReactNode {
  if (!node || typeof node !== 'object') return null;

  if (node.type === 'doc') {
    return <div className="space-y-4">{node.content?.map((child: any, i: number) => renderNode(child, i))}</div>;
  }

  const children = node.content?.map((child: any, i: number) => {
    if (child.type === 'text') {
      return renderMarks(child.marks, child.text ?? '');
    }
    return renderNode(child, i);
  }) ?? null;

  const textAlign = node.attrs?.textAlign;
  const alignClass = textAlign && textAlign !== 'left' ? `text-${textAlign}` : '';

  switch (node.type) {
    case 'paragraph':
      return <p key={key} className={`text-neutral-800 ${alignClass}`}>{children}</p>;
    case 'heading': {
      const level = node.attrs?.level ?? 2;
      const sizes = ['', 'text-xl font-bold', 'text-lg font-semibold', 'text-base font-semibold'];
      const className = `mt-6 mb-3 text-neutral-900 ${sizes[level] ?? sizes[2]} ${alignClass}`;
      if (level === 1) return <h1 key={key} className={className}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={className}>{children}</h2>;
      return <h3 key={key} className={className}>{children}</h3>;
    }
    case 'bulletList':
      return <ul key={key} className="list-disc pl-6 space-y-1 text-neutral-800">{children}</ul>;
    case 'orderedList':
      return <ol key={key} className="list-decimal pl-6 space-y-1 text-neutral-800">{children}</ol>;
    case 'listItem':
      return <li key={key}>{children}</li>;
    case 'blockquote':
      return <blockquote key={key} className="border-l-4 border-neutral-300 pl-4 italic text-neutral-600">{children}</blockquote>;
    case 'codeBlock':
      return <pre key={key} className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100"><code>{node.content?.[0]?.text ?? ''}</code></pre>;
    case 'image':
      return (
        <figure key={key} className="my-4">
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt ?? ''}
            className="mx-auto max-w-full rounded-lg"
          />
          {node.attrs?.title && <figcaption className="mt-1 text-center text-xs text-neutral-500">{node.attrs.title}</figcaption>}
        </figure>
      );
    case 'horizontalRule':
      return <hr key={key} className="my-6 border-neutral-200" />;
    case 'text':
      return renderMarks(node.marks, node.text ?? '');
    default:
      return children ?? null;
  }
}

export function RichTextDisplay({ content }: RichTextDisplayProps) {
  if (!content || Object.keys(content).length === 0) {
    return <p className="text-neutral-400 italic">No content</p>;
  }
  return <>{renderNode(content, 0)}</>;
}
