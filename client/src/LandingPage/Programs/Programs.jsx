import React from 'react';
import './Programs.css';
import program_1 from '../../assets/offer-4.jpg';
import program_2 from '../../assets/offer-2.jpg';
import program_3 from '../../assets/offer-3.jpg';
import program_icon_1 from '../../assets/program-icon-1.png';
import program_icon_2 from '../../assets/program-icon-2.png';
import program_icon_3 from '../../assets/program-icon-3.png';

const Programs = () => {
  return (
    <div className='programs'>
        <div className="program">
            <img className='img1' src={program_1} alt="" />
            <div className="caption">
                <img src={program_icon_1} alt="" />
                <p>Personalized Financial Planning</p>
            </div>
        </div>
        <div className="program">
            <img className='img2'  src={program_2} alt="" />
            <div className="caption">
                <img src={program_icon_2} alt="" />
                <p>Investment Portfolio Management</p>
            </div>
        </div>
        <div className="program">
            <img className='img3'  src={program_3} alt="" />
            <div className="caption">
                <img src={program_icon_3} alt="" />
                <p>Retirement & Tax Planning</p>
            </div>
        </div>
    </div>
  )
}

export default Programs;
