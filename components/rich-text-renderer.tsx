"use client"
import React from 'react';
import { RichTextContent } from '@/lib/contentful-types';
import Link from 'next/link';

interface RichTextRendererProps {
  content: RichTextContent | any; // Allow any to handle Contentful json structure
  className?: string;
}

export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content) {
    return null;
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    const { nodeType, content, value, marks = [], data } = node;

    // Apply text marks (bold, italic, etc.)
    const applyMarks = (text: string, marks: any[]): React.ReactNode => {
      if (!marks.length) return text;

      return marks.reduce((result, mark) => {
        switch (mark.type) {
          case 'bold':
            return <strong key={`bold-${index}`}>{result}</strong>;
          case 'italic':
            return <em key={`italic-${index}`}>{result}</em>;
          case 'underline':
            return <u key={`underline-${index}`}>{result}</u>;
          case 'code':
            return <code key={`code-${index}`}>{result}</code>;
          case 'strikethrough':
            return <s key={`strikethrough-${index}`}>{result}</s>;
          default:
            return result;
        }
      }, text);
    };

    // Handle different node types
    switch (nodeType) {
      case 'document':
        return (
          <div key={`doc-${index}`} className={className}>
            {content?.map((node: any, idx: number) => renderNode(node, idx))}
          </div>
        );

      case 'paragraph':
        return (
          <p key={`p-${index}`} className="my-4">
            {content?.map((node: any, idx: number) => renderNode(node, idx))}
          </p>
        );

      case 'heading-1':
        return (
          <h1 key={`h1-${index}`} className="text-4xl font-bold my-6">
            {content?.map((node: any, idx: number) => renderNode(node, idx))}
          </h1>
        );

      case 'heading-2':
        return (
          <h2 key={`h2-${index}`} className="text-3xl font-bold my-5">
            {content?.map((node: any, idx: number) => renderNode(node, idx))}
          </h2>
        );

      case 'heading-3':
        return (
          <h3 key={`h3-${index}`} className="text-2xl font-bold my-4">
            {content?.map((node: any, idx: number) => renderNode(node, idx))}
          </h3>
        );

      case 'text':
        return applyMarks(value, marks);

      case 'hyperlink':
        const href = data?.uri || '#';
        return (
          <Link 
            key={`link-${index}`} 
            href={href}
            className="text-blue-500 hover:underline"
          >
            {content?.map((node: any, idx: number) => renderNode(node, idx))}
          </Link>
        );

      default:
        return value || null;
    }
  };

  return renderNode(content, 0);
}