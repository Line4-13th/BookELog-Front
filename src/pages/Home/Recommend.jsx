// import { useState } from 'react'
import './recommend.scss';
import ex from '../../assets/recommend_ex.svg';

function Recommend() {

  return (
    <div className="recommend-container">
      <h2 className="recommend-title">오늘날, 떠오르는<br/>신인 작가들의 단편소설 추천</h2>
      <div className="recommend-items">
        <img
          src={ex}
          alt="Recommend Item Examples"
        />
        <img
          src={ex}
          alt="Recommend Item Examples"
        />
        <img
          src={ex}
          alt="Recommend Item Examples"
        />
        <img
          src={ex}
          alt="Recommend Item Examples"
        />
      </div>
    </div>
  )
};

export default Recommend;
