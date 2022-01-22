import React from 'react';

import '../App.css';

import box_01 from './box_1.png';
import box_02 from './box_2.png';
import box_03 from './box_3.png';
import box_04 from './box_4.png';
import box_05 from './box_5.png';

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

setTimeout(() => {
    for (let index = 1; index < 250; index++) {
        var element = document.createElement("div");
        //element.innerHTML = `<span>${index}</span>`;
        element.setAttribute("class", "block__default");
        element.setAttribute("id", `${index}`);
        document.getElementById("list").appendChild(element);
        var element2 = document.createElement("img");
        var image = getRandomInRange(1,5);
        switch (image) {
            case 1:
                element2.setAttribute("src", box_01);
                break;
            case 2:
                element2.setAttribute("src", box_02);
                break;
            case 3:
                element2.setAttribute("src", box_03);
                break;
            case 4:
                element2.setAttribute("src", box_04);
                break;
            case 5:
                element2.setAttribute("src", box_05);
                break;
        }
        document.getElementById(index).appendChild(element2);
    }
  }, 0);



const Blocks = props => (
	<div className='background'>
        {props.getPrize ? 
        <div>Приз {props.prizeNum}</div> 
        : 
        <div></div>
        }
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
            <button className='button' onClick={() => {props.Animation(5, 15)}}>Крутить</button>
        </div>
    </div>
);

export default Blocks;