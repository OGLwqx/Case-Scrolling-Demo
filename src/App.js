import React, { useState, useEffect } from 'react';
import './App.css';

import Blocks from './Components/Blocks';


const App = () => {

  const [count, setCount] = useState(0);
  const [getPrize, setGetPrize] = useState(false);
  const [prizeNum, setPrizeNum] = useState('')

  function setPrize(data) {
    setGetPrize(data);
  }

  var pixels = 140

  function Animation(duration, speed) {
    setCount(0)
    var changeSpeed = true;
    var changeSpeed2 = true;
    var start_time = parseInt((Date.now() / 1000).toFixed(0))
    setGetPrize(false)
    var timer = setInterval(() => {
      if(start_time + duration - (Date.now() / 1000) < 0 && changeSpeed) {
        speed = speed * 0.4
        console.log(changeSpeed, speed)
        changeSpeed = false
      }
      if(start_time + duration - (Date.now() / 1000) < -0.2 && changeSpeed2) {
        speed = speed * 0.1
        console.log(changeSpeed, speed)
        changeSpeed2 = false
      }
      console.log(start_time + duration - (Date.now() / 1000))
      if(parseInt((Date.now() / 1000).toFixed(0)) - start_time > duration) {
        clearInterval(timer)
        //console.log(true)
        setGetPrize(true)
        var blocks = document.getElementsByClassName('block__default')
        var blocks_array = Array.prototype.slice.call( blocks )

        for (let index = 0; index < blocks_array.length; index++) {
          const c = blocks_array[index];
          const n = blocks_array[index+1]
          //console.log(c.offsetLeft)
          if(pixels > c.offsetLeft && pixels < n.offsetLeft)  {
            console.log(index+1)
            console.log(pixels, c.offsetLeft, n.offsetLeft)
            setPrizeNum(index+1)
            var prizeBlock = document.getElementById(index+1)
            prizeBlock.setAttribute("style", `animation: box 3s ease-in-out infinite;`);
            changeSpeed = true
            changeSpeed2 = true
            setTimeout(() => {
              prizeBlock.setAttribute("style", `transform: scale(1)`);
              setGetPrize(false)
            }, 5000);
          }
        }

        return;
      }
      pixels += speed
      setCount(prev => prev - speed);
    }, 1);
  }

  return (
    <Blocks Animation={Animation} pos={count} getPrize={getPrize} prizeNum={prizeNum}/>
  );
}

export default App;
