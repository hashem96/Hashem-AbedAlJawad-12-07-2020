import React from 'react'
import './screenContainer.css'

const ScreenContainer = (props) => {
    return (
        <div className="screenContainer">
            {props.children}
        </div>
    )
}

export default ScreenContainer
