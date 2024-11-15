import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; // jsPDF 직접 사용
import "./FullContent.scss";
import BackButton from "../../assets/backbutton_brown.svg";
import BASE_URL from "../../../API_URL";

function FullContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logId } = location.state || {}; // logId 전달받음

  const [bookTitle, setBookTitle] = useState("");
  const [recordContent, setRecordContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogData = async () => {
      if (!logId) {
        setError("Invalid log ID.");
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/api/reading_log/user_reading_logs/${logId}/`
        );
        const data = response.data;
        setBookTitle(data.book || "제목 없음");
        setRecordContent(data.notes || "내용 없음");
        setImageUrl(data.image);
        setError(null);
      } catch (err) {
        console.error("Error fetching log data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogData();
  }, [logId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveImage = () => {
    const content = document.getElementById("content-to-pdf");
    html2canvas(content, {
      useCORS: true,
      allowTaint: false,
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${bookTitle}-content.png`;
      link.click();
    });
  };

  const handleSavePDF = () => {
    const element = document.getElementById("content-to-pdf");
    html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 이미지 비율 계산
      const imgProps = pdf.getImageProperties(canvas);
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;

      const aspectRatio = imgHeight / imgWidth;
      let targetWidth = pdfWidth;
      let targetHeight = targetWidth * aspectRatio;

      // 이미지가 페이지를 넘으면 비율에 맞게 조정
      if (targetHeight > pdfHeight) {
        targetHeight = pdfHeight;
        targetWidth = targetHeight / aspectRatio;
      }

      pdf.addImage(
        imgData,
        "PNG",
        (pdfWidth - targetWidth) / 2,
        0,
        targetWidth,
        targetHeight
      );
      pdf.save(`${bookTitle}.pdf`);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
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
    } else {
      alert("공유 기능이 지원되지 않는 브라우저입니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="full-content-container">
      <img
        className="bbackbutton"
        src={BackButton}
        onClick={handleBack}
        alt="뒤로가기 버튼"
      />
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
      <div className="full-content" id="content-to-pdf">
        {imageUrl ? (
          <img src={imageUrl} alt="Record Image" style={{ maxWidth: "100%" }} />
        ) : (
          <p>이미지가 없습니다.</p>
        )}
        <div
          id="content-to-image"
          dangerouslySetInnerHTML={{ __html: recordContent }}
        />
      </div>
    </div>
  );
}

export default FullContent;
