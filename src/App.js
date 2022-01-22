import React, { useState, useEffect } from 'react';
import './App.css';

import Blocks from './Components/Blocks';


const App = () => {

  const [count, setCount] = useState(0);
  const [getPrize, setGetPrize] = useState(false);
  const [prizeNum, setPrizeNum] = useState('')
  const [lastWinNum, setLastWinNum] = useState(1)

  function setPrize(data) {
    setGetPrize(data);
  }

  var pixels = 0

  function Animation(duration, speed) {
    var arrow = document.getElementById('arrow')
    pixels = arrow.offsetLeft + 38.5
    setCount(0)
    var lastWin = document.getElementById(lastWinNum)
    lastWin.setAttribute("style", ``);
    var changeSpeed = true;
    var changeSpeed2 = true;
    var start_time = parseInt((Date.now() / 1000).toFixed(0))
    setGetPrize(false)
    var speedStep = speed / 10
    var timeStep = (duration * 1000) / 40
    setTimeout(() => {
      var slowing = setInterval(() => {
        if(speed <= 0) {
          speed = 0;
          clearInterval(slowing)
          return;
        }
        speed -= speedStep
        console.log(speed)
      }, timeStep);
    }, (duration * 1000) * 0.75);
    var timer = setInterval(() => {
      //console.log(start_time + duration - (Date.now() / 1000))
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
            console.log('win')
            setTimeout(() => {
              console.log('win_animation', index+1)
              console.log(pixels)
              //console.log(index+1)
              //console.log(pixels, c.offsetLeft, n.offsetLeft)
              setPrizeNum(index+1)
              var prizeBlock = document.getElementById(index+1)
              setLastWinNum(index+1)
              prizeBlock.setAttribute("style", `animation: box 3s ease-in-out infinite;`);
              changeSpeed = true
              changeSpeed2 = true
              setTimeout(() => {
                prizeBlock.setAttribute("style", `transform: scale(1)`);
                setGetPrize(false)
              }, 5000);
            }, 700);
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
