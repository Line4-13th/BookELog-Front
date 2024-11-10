// import { useState } from 'react'
import './home.scss';
import Recommend from "./Recommend";
import Curation from "./Curation";
import logo from '../../../public/book-e-log-white.svg';
import profile from '../../assets/profile.svg'
import glass from '../../assets/magnifyingglass.svg'

function Home() {

  return (
    <div className="home-container">
      <header>
        <div className="home-header">
          <img 
            src={logo}
            alt="Book-E-Log logo"
            onClick={() => null}
            // 홈으로 돌아가기 추가
          />
          <img
            src={profile}
            alt="Profile Page"
            onClick={() => null}
            // 마이페이지 이동 (로그인 필요)
          />
        </div>
        <form className="home-search">
          <img
            src={glass}
            alt="Magnifying Glass Icon"
          />
          <input 
            type="text"
            placeholder='Search'
            onChange={(e) => e.target.value}
          />
        </form>
      </header>
      <Recommend />
      <Curation />
    </div>
  )
};

export default Home;
