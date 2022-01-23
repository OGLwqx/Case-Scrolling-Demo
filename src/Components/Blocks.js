import React from 'react';

import '../App.css';

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const Blocks = props => (
	<div className='background'>
        <div className='item-cell__wrapper'>
            <div className='item-cell' id='cell'>
                
            </div>
        </div>
        <div className='arrow__wrapper'>
            <div class="arrow" id='arrow'>
                <span class="arrow-left"></span>
                <span class="arrow-right"></span>
            </div>
        </div>
        <div className='blocks__wrapper' style={{
			position: 'absolute',
			left: props.pos+'px',
		}} id='list'>
        
        </div>
        <div className='button__wrapper'>
            <button className='button' onClick={() => {props.Animation(getRandomInRange(3,10), getRandomInRange(10,20))}}>Крутить</button>
        </div>
    </div>
);

export default Blocks;