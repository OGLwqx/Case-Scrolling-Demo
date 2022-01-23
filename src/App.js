import React, { useState, useEffect } from 'react';
import './App.css';

import Blocks from './Components/Blocks';

import box_01 from './Components/box_1.png';
import box_02 from './Components/box_2.png';
import box_03 from './Components/box_3.png';
import box_04 from './Components/box_4.png';
import box_05 from './Components/box_5.png';

const App = () => {

  const [count, setCount] = useState(0);
  const [getPrize, setGetPrize] = useState(false);
  const [prizeNum, setPrizeNum] = useState('')
  const [lastWinNum, setLastWinNum] = useState(1)
  const [items, setItemsList] = useState(null);

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

useEffect(() => {
  setTimeout(() => {
    var elements = []
    for (let index = 1; index < 500; index++) {
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
                elements.push({id: index, item: box_01})
                break;
            case 2:
                element2.setAttribute("src", box_02);
                elements.push({id: index, item: box_02})
                break;
            case 3:
                element2.setAttribute("src", box_03);
                elements.push({id: index, item: box_03})
                break;
            case 4:
                element2.setAttribute("src", box_04);
                elements.push({id: index, item: box_04})
                break;
            case 5:
                element2.setAttribute("src", box_05);
                elements.push({id: index, item: box_05})
                break;
        }
        document.getElementById(index).appendChild(element2);
    }
    setItemsList(elements)
  }, 0);
}, [])


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
    var timeStep = (duration * 1000) / 20
    setTimeout(() => {
      var slowing = setInterval(() => {
        if(speed - speedStep <= 0) {
          speed = 0;
          clearInterval(slowing)
          return;
        }
        speed -= speedStep
        //console.log(speed)
      }, timeStep);
    }, (duration * 1000) * 0.50);
    var timer = setInterval(() => {
      if(parseInt((Date.now() / 1000).toFixed(0)) - start_time > duration) {
        clearInterval(timer)
        setGetPrize(true)
        var blocks = document.getElementsByClassName('block__default')
        var blocks_array = Array.prototype.slice.call( blocks )

        for (let index = 0; index < blocks_array.length; index++) {
          const c = blocks_array[index];
          const n = blocks_array[index+1]
          if(pixels > c.offsetLeft && pixels < n.offsetLeft)  {
            setTimeout(() => {
              var showPrize = document.createElement("img");
              showPrize.setAttribute("id", 'winItem');
              var winItem = items[index]
              showPrize.setAttribute("src", winItem.item);
              document.getElementById("cell").appendChild(showPrize);
              console.log(winItem)
              console.log(pixels)
              setPrizeNum(index+1)
              var prizeBlock = document.getElementById(index+1)
              setLastWinNum(index+1)
              prizeBlock.setAttribute("style", `animation: box 3s ease-in-out infinite;`);
              changeSpeed = true
              changeSpeed2 = true
              setTimeout(() => {
                prizeBlock.setAttribute("style", `transform: scale(1)`);
                document.getElementById("winItem").remove();
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
