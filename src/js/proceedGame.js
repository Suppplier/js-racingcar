import { app_div } from "./index.js"
import { cars } from "./setCarName.js"
import { runningtime } from "./setCount.js"
import { PROGRESS } from "./constant.js";
import { addResultSection } from "./addResult.js"

export let k = 1;

export const addProcessUI = () => {
    let process_section = `<section class="d-flex justify-center mt-5" id="process_section">
                                  <div class="mt-4 d-flex">
                                    ${setPlayersCar()}
                                  </div> 
                          </section>`;

    app_div.insertAdjacentHTML("beforeend", process_section);
    proceedGame();
  };

  const setPlayersCar = () => {
    let playersCar = "";
    for (let i = 0; i < cars.length; i++) {
      playersCar += `<div class="mr-2">
                                  <div class="car-player">${cars[i]}</div>
                                  ${PROGRESS.WAIT}
                              </div>\n`;
    }
    return playersCar;
  }
  
  const proceedGame = () => {
    let cnt = 0;
    let distance = new Array(cars.length).fill(0);
  
    const timerId = setInterval(() => {
      let move = [];
      for (let j = 0; j < cars.length; j++) {
        if (Math.floor(Math.random() * 10) >= 4) {
          distance[j]++;
          move.push(cars[j]);
        }
      }
      addProgressIcon(move, PROGRESS.MOVE, 0);
      addProgressIcon(cars, PROGRESS.WAIT, 0);
  
      if (++cnt == runningtime) {
        clearInterval(timerId);
        addProgressIcon(cars, "", 1);;
        addResultSection(distance);
      }
    }, 1000);
  };
  
  const addProgressIcon = (list, icon, isfinish) => {
    const players = app_div.querySelectorAll(".car-player");
    players.forEach((x) => {
      if (list.indexOf(x.innerHTML) >= 0) {
        const child = x.parentNode.querySelector(".mt-3");
        if (child != null) x.parentNode.removeChild(child);
        if (!isfinish) x.parentNode.insertAdjacentHTML("beforeend", icon);
      }
    });
  };
