import React, { useState, useEffect } from 'react';
import './App.css';

import Blocks from './Components/Blocks';

import box_01 from './Components/box_1.png';
import box_02 from './Components/box_2.png';
import box_03 from './Components/box_3.png';
import box_04 from './Components/box_4.png';
import box_05 from './Components/box_5.png';
const boxes = [box_01, box_02, box_03, box_04, box_05]

const App = () => {

  const [count, setCount] = useState(0);
  const [getPrize, setGetPrize] = useState(false);
  const [prizeNum, setPrizeNum] = useState('')
  const [lastWinNum, setLastWinNum] = useState(1)
  const [items, setItemsList] = useState(null);

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function getBlocks(count) {
    for (let index = 1; index < count; index++) {
        var element = document.createElement("div");
        //element.innerHTML = `<span>${index}</span>`;
        element.setAttribute("class", "block__default");
        element.setAttribute("id", `${index}`);
        document.getElementById("list").appendChild(element);
    }
}

function getImages(count) {
  var elements = []
  for (let index = 1; index < count; index++) {
        var element2 = document.createElement("img");
        var imageNumber = getRandomInRange(0,4);
        element2.setAttribute("src", boxes[imageNumber]);
        elements.push({id: index, item: boxes[imageNumber]})
        element2.setAttribute("id", `image-${index}`);
        document.getElementById(index).appendChild(element2);
        setItemsList(elements)
  }
}

useEffect(() => {
  setTimeout(() => {
    getBlocks(500)
    getImages(500)

    //document.querySelector('.button').addEventListener("click", (e) => {
    //  if(e.isTrusted) {
    //    Animation(getRandomInRange(3,10), getRandomInRange(10,20))
    //  }
    //})
  }, 0);
}, [])


  var pixels = 0

  function Animation(duration, speed) {
    document.getElementsByClassName('button')[0].disabled = true;
    var arrow = document.getElementById('arrow')
    pixels = arrow.offsetLeft + 38.5
    var lastWin = document.getElementById(lastWinNum)
    lastWin.setAttribute("style", ``);
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
              setPrizeNum(index+1)
              var prizeBlock = document.getElementById(index+1)
              setLastWinNum(index+1)
              prizeBlock.setAttribute("style", `animation: box 3s ease-in-out infinite;`);
              setTimeout(() => {
                prizeBlock.setAttribute("style", `transform: scale(1)`);
                document.getElementById("winItem").remove();
                document.getElementsByClassName('button')[0].disabled = false;
                setGetPrize(false)
                for (let index = 1; index < items.length; index++) {
                  document.getElementById(`image-${index}`).remove()
                }
                setCount(0)
                getImages(500)
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
