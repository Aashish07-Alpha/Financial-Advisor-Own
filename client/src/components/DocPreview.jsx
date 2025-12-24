import React from 'react';

const DocPreview = ({ file }) => {
  if (!file) return null;
  const url = URL.createObjectURL(file);
  if (file.type.startsWith('image/')) {
    return <img src={url} alt="Preview" className="max-w-xs max-h-64 rounded shadow" />;
  }
  if (file.type === 'application/pdf') {
    return <div className="w-64 h-40 flex items-center justify-center bg-gray-100 rounded shadow">PDF Preview (coming soon)</div>;
  }
  return null;
};

export default DocPreview; 