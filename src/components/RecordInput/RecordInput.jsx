import ReactQuill, { Quill } from "react-quill";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import "./RecordInput.scss";

Quill.register("modules/imageResize", ImageResize);

const RecordInput = ({ onContentChange }) => {
  // props로 onContentChange 받기
  const modules = useMemo(
    () => ({
      toolbar: [
        ["image"],
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

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      style={{ height: "15rem", width: "100%" }}
      onChange={onContentChange} // 내용 변경 시 상위로 전달
    />
  );
};

export default RecordInput;
