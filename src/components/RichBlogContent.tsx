import React from 'react';
import DOMPurify from 'dompurify';

interface RichBlogContentProps {
  content: string;
}

const RichBlogContent: React.FC<RichBlogContentProps> = ({ content }) => {
  // Sanitize the HTML to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'class'],
  });

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
        prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6
        prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5
        prose-p:text-gray-800 prose-p:leading-loose prose-p:mb-8
        prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-em:italic prose-em:text-gray-700
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300
        prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
        prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50
        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
        prose-li:text-gray-800 prose-li:mb-2
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1
        prose-code:rounded prose-code:text-red-600 prose-code:text-sm
        prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4
        prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:mb-4
        prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6
        prose-table:border-collapse prose-table:w-full prose-table:mb-4
        prose-th:bg-gray-100 prose-th:font-bold prose-th:text-left
        prose-th:p-3 prose-th:border prose-th:border-gray-300
        prose-td:p-3 prose-td:border prose-td:border-gray-300
      "
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default RichBlogContent;
