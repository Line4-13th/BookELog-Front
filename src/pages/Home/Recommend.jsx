// import { useState } from 'react'
import './recommend.scss';
import ex1 from '../../assets/recommend/ex1.svg';
import ex2 from '../../assets/recommend/ex2.svg';
import ex3 from '../../assets/recommend/ex3.svg';
import ex5 from '../../assets/recommend/ex5.svg';
import ex6 from '../../assets/recommend/ex6.svg';

function Recommend() {

  return (
    <div className="recommend-container">
      <h2 className="recommend-title">오늘날, 떠오르는<br/>신인 작가들의 단편소설 추천</h2>
      <div className="recommend-items">
        <img
          src={ex1}
          alt="Recommend Item Examples"
        />
        <img
          src={ex2}
          alt="Recommend Item Examples"
        />
        <img
          src={ex3}
          alt="Recommend Item Examples"
        />
        <img
          src={ex5}
          alt="Recommend Item Examples"
        />
        <img
          src={ex6}
          alt="Recommend Item Examples"
        />
      </div>
    </div>
  )
};

export default Recommend;
