import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.css';

ColorBox.propTypes = {
    
};

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'yellow', 'green', 'black', 'blue'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}


function ColorBox() {
    
    const [color, setColor] = useState(() => {
        const initialColor = localStorage.getItem('box-color') || 'deeppink';
        return initialColor;
    });


    function handleBoxClick() {
        //get random color --> setcolor
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box-color', newColor);
    }
    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick = {handleBoxClick}
        >
           
        </div>
    );
}

export default ColorBox;