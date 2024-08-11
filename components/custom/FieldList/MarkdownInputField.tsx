"use client";

import React, { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const MarkdownInputField = ({ field, record, setRecord }: any) => {
  const [editorHeight, setEditorHeight] = useState(300);

  const handleEditorChange = ({ text }: any) => {
    setRecord({ ...record, [field.slug]: text });
  };

  return (
    <div className=" py-2 ">
      <label>{field.name}</label>
      <ResizableBox
        width={Infinity}
        height={editorHeight}
        minConstraints={[300, 300]}
        maxConstraints={[Infinity, 1000]}
        onResizeStop={(e, data) => setEditorHeight(data.size.height)}
        resizeHandles={["s"]}
      >
        <MdEditor
          value={record[field.slug] || field.defaultValue}
          style={{ height: "100%" }}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleEditorChange}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
            },
            canView: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
              both: true,
            },
            imageUrl: "https://octodex.github.com/images/minion.png", // Example image URL for the image plugin
            syncScrollMode: ["leftFollowRight", "rightFollowLeft"],
          }}
          // Adding all possible plugins
          plugins={[
            "header",
            "font-bold",
            "font-italic",
            "font-underline",
            "font-strikethrough",
            "list-unordered",
            "list-ordered",
            "block-quote",
            "block-code-inline",
            "block-code-block",
            "table",
            "link",
            "image",
            "emoji",
            "clear",
            "logger",
            "mode-toggle",
            "full-screen",
            "drag-drop",
          ]}
        />
      </ResizableBox>
    </div>
  );
};

export default MarkdownInputField;
