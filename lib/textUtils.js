import React from 'react';

/**
 * Formats text with newline characters for proper display in React components
 * @param {string} text - The text to format
 * @param {Object} options - Formatting options
 * @param {string} options.className - Additional CSS classes to apply to paragraphs
 * @param {boolean} options.noWrapper - If true, don't wrap content in p tags (use when parent is already a p tag)
 * @returns {JSX.Element} - A React element with properly formatted text
 */
export const formatTextWithNewlines = (text, options = {}) => {
  if (!text) return null;
  
  // Default options
  const { className = '', noWrapper = false } = options;
  
  // Handle case where text is already a React element
  if (typeof text !== 'string') return text;
  
  // Normalize newlines to ensure consistent handling across platforms
  const normalizedText = text.replace(/\r\n/g, '\n');
  
  // Split the text by double newlines for paragraphs
  const paragraphs = normalizedText.split(/\n\n+/);
  
  // If there's only one paragraph, handle it differently to preserve formatting
  if (paragraphs.length === 1) {
    const lines = paragraphs[0].split(/\n/);
    
    // If there's only one line, just return it directly
    if (lines.length === 1) return lines[0];
    
    // Otherwise, return lines with <br /> tags
    const content = (
      <>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
    
    // If noWrapper is true or we're already inside a Text component with as="p", don't wrap in a p tag
    if (noWrapper) return content;
    
    // Use a div instead of p to avoid nesting issues
    return <span className={className}>{content}</span>;
  }
  
  // For multiple paragraphs
  const content = paragraphs.map((paragraph, pIndex) => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return null;
    
    // Split each paragraph by single newlines for line breaks within paragraphs
    const lines = paragraph.split(/\n/);
    
    const paragraphContent = (
      <React.Fragment key={pIndex}>
        {lines.map((line, lIndex) => (
          <React.Fragment key={lIndex}>
            {line}
            {lIndex < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
        {!noWrapper && pIndex < paragraphs.length - 1 && (<>
          <br /><br />
        </>)}
      </React.Fragment>
    );
    
    // If noWrapper is true, return content directly
    if (noWrapper) return paragraphContent;
    
    // Otherwise wrap in a p tag
    return (
      <p key={pIndex} className={`mb-4 last:mb-0 ${className}`}>
        {lines.map((line, lIndex) => (
          <React.Fragment key={lIndex}>
            {line}
            {lIndex < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    );
  });
  
  return <>{content}</>;
};
