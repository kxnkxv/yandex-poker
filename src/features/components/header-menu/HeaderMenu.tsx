import React from 'react';
import './hearder.css';

export interface IPopupPageProps {

}

const HearderMenu: React.FunctionComponent<IPopupPageProps> = (props) => {
  return (
    <div className="hearder">
      <img className='logo'/>
      <div>hearder</div>
    </div>
  )
}

export default HearderMenu;