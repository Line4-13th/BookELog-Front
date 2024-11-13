// import { useState } from 'react'
import './curation.scss';
import recipe from '../../assets/curation_main/recipe.svg';
import world from '../../assets/curation_main/world.svg';
import movie from '../../assets/curation_main/movie.svg';
import weekly from '../../assets/curation_main/weekly.svg';
import { useNavigate } from 'react-router-dom';

function Curation() {
  const navigate = useNavigate();

  return (
    <div className="curation-container">
      <h2 className="curation-title">Pick For You</h2>
      <div className="curation-items">
        <img
          src={recipe}
          alt="Recipe book curation"
        />
        <img
          src={movie}
          alt="Movie book curation"
          onClick={() => navigate('/curationItem')}
        />
        <img
          src={world}
          alt="World history book curation"
        />
        <img
          src={weekly}
          alt="Weekly book series curation"
        />
      </div>
    </div>
  )
};

export default Curation;
