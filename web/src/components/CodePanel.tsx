export function CodePanel({ code }: { code: string }) {
  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
} 