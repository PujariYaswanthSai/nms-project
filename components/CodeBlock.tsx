
import React, { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg my-2 relative">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700 rounded-t-lg">
        <span className="text-xs font-semibold text-gray-300">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-white bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded-md transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
