type RichTextDisplayProps = {
  content: Record<string, unknown>;
};

function H1({ children }: { children?: React.ReactNode }) {
  return <h1 className="mt-6 mb-3 text-xl font-bold text-neutral-900">{children}</h1>;
}

function H2({ children }: { children?: React.ReactNode }) {
  return <h2 className="mt-6 mb-3 text-lg font-semibold text-neutral-900">{children}</h2>;
}

function H3({ children }: { children?: React.ReactNode }) {
  return <h3 className="mt-6 mb-3 text-base font-semibold text-neutral-900">{children}</h3>;
}

const headingComponents = { 1: H1, 2: H2, 3: H3 } as const;

function renderNode(node: any, key: number): React.ReactNode {
  if (!node || typeof node !== 'object') return null;

  if (node.type === 'doc') {
    return <div className="space-y-4">{node.content?.map((child: any, i: number) => renderNode(child, i))}</div>;
  }

  const children = node.content?.map((child: any, i: number) => renderNode(child, i)) ?? null;

  switch (node.type) {
    case 'paragraph':
      return <p key={key} className="text-neutral-800">{children}</p>;
    case 'heading': {
      const level = node.attrs?.level as 1 | 2 | 3 ?? 2;
      const Heading = headingComponents[level] ?? H2;
      return <Heading key={key}>{children}</Heading>;
    }
    case 'bulletList':
      return <ul key={key} className="list-disc pl-6 space-y-1 text-neutral-800">{children}</ul>;
    case 'orderedList':
      return <ol key={key} className="list-decimal pl-6 space-y-1 text-neutral-800">{children}</ol>;
    case 'listItem':
      return <li key={key}>{children}</li>;
    case 'bold':
      return <strong key={key} className="font-semibold">{children}</strong>;
    case 'italic':
      return <em key={key}>{children}</em>;
    case 'text':
      return node.text ?? null;
    case 'horizontalRule':
      return <hr key={key} className="my-6 border-neutral-200" />;
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
