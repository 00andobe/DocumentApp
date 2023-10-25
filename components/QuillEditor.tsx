import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleEditorChange = (content) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <ReactQuill
      value={editorValue}
      onChange={handleEditorChange}
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"], // Basic formatting options
          [{ list: "ordered" }, { list: "bullet" }], // Lists
          [{ align: [] }], // Text alignment
          [{ header: "1" }, { header: "2" }, "blockquote"], // Headers and blockquotes
          ["clean"], // Remove formatting
          [{ 'color': [] }, { 'background': [] }],   
        ],
      }}
    />
  );
};

export default QuillEditor;
