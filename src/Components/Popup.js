import React from 'react'
import './Popup.js'

function Popup(props) {
  return (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='clost-btn'>close</button>
            {props.children}
        </div>
    </div>
  )
}

export default Popup
