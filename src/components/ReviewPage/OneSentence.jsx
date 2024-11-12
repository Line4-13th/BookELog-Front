import "./OneSentence.scss";

const OneSentence = ({ userName, reviewText }) => {
  return (
    <div className="background">
      <p className="user-name">{userName}</p>
      <p className="user-review">{reviewText}</p>
    </div>
  );
};

export default OneSentence;
