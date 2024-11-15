import React, { useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import "./RecordInput.scss";

Quill.register("modules/imageResize", ImageResize);

const RecordInput = ({ onContentChange, onImageUpload }) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
      ],
      imageResize: {},
    }),
    []
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (onImageUpload) {
      onImageUpload(file); // 상위로 이미지 파일 전달
    }
  };

  return (
    <div className="record-input-container">
      <div className="image-upload-section">
        <label className="image-upload-label">
          대표 이미지 업로드:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload-input"
          />
        </label>
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        style={{ height: "300px", width: "100%" }}
        onChange={onContentChange} // 내용 변경 시 상위로 전달
      />
    </div>
  );
};

export default RecordInput;
