// import { useState } from 'react'
import './curation.scss';
import ex from '../../assets/curation_ex.svg'

function Curation() {

  return (
    <div className="curation-container">
      <h2 className="curation-title">Pick For You</h2>
      <div className="curation-items">
        <img
          src={ex}
          alt="Curation Item Examples"
        />
        <img
          src={ex}
          alt="Curation Item Examples"
        />
        <img
          src={ex}
          alt="Curation Item Examples"
        />
        <img
          src={ex}
          alt="Curation Item Examples"
        />
      </div>
    </div>
  )
};

export default Curation;
