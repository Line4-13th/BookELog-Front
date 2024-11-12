import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js"; // html2pdf.js 임포트
import "./FullContent.scss";

function FullContent() {
  const location = useLocation(); // 전달된 state 가져오기
  const { bookTitle, recordContent, imageUrl } = location.state || {}; // 전달된 bookTitle, recordContent, imageUrl 받기
  const navigate = useNavigate();

  useEffect(() => {
    console.log("FullContent received data:", {
      bookTitle,
      recordContent,
      imageUrl,
    });
  }, [bookTitle, recordContent, imageUrl]);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSaveImage = () => {
    const content = document.getElementById("content-to-image"); // 이미지로 저장할 콘텐츠
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "content.png"; // 파일 이름 설정
      link.click(); // 다운로드 시작
    });
  };

  const handleSavePDF = () => {
    const element = document.getElementById("content-to-pdf"); // PDF로 저장할 콘텐츠
    const options = {
      filename: `${bookTitle}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf(element, options); // PDF로 저장
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: bookTitle,
        text: `Check out this content: ${bookTitle}`,
        url: window.location.href,
      };
      await navigator.share(shareData);
      console.log("Shared successfully");
    } catch (err) {
      console.error("Error sharing content", err);
    }
  };

  return (
    <div className="full-content-container">
      <header className="book-detail-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <div className="folder-dropdown">
          <p>{bookTitle}</p> {/* 전달된 제목 표시 */}
        </div>
      </header>

      <div className="full-content" id="content-to-pdf">
        {" "}
        {/* PDF 저장할 콘텐츠 */}
        {/* 이미지와 콘텐츠 */}
        {/* {imageUrl ? (
          <img src={imageUrl} alt="Full Content" style={{ maxWidth: "100%" }} />
        ) : (
          <p>No image available</p>
        )} */}
        {/* Quill에서 작성한 전체 내용 표시 */}
        <div
          id="content-to-image"
          dangerouslySetInnerHTML={{ __html: recordContent }}
        />{" "}
        {/* 이미지로 저장할 콘텐츠 */}
      </div>

      <div className="buttons-container">
        <button onClick={handleSaveImage} className="ssave-button">
          이미지로 저장
        </button>
        <button onClick={handleSavePDF} className="ssave-button">
          PDF로 저장
        </button>
        <button onClick={handleShare} className="share-button">
          공유
        </button>
      </div>
    </div>
  );
}

export default FullContent;
