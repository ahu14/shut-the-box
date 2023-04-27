import React, {useState, useEffect, useRef} from "react";
import { currentPage, changePage } from "./Page";


let diceNum = (num) => {
    let diceData = [];

    for (let i = 0; i < num; i++){
        let diceDot = document.createElement('div');
        diceDot.id = 'dice-dot';
        diceDot.key = 'dice-dot-' + i;
        diceDot.className = 'w-3 h-3 rounded-full bg-black';
        diceData.push(diceDot);
    }

    return diceData;
}



let Number = ({number, setNumber, total, setTotal}) => {
    let numberData = [];

    let clicked = (event) => {
        let numberId = parseInt(event.target.id);
        let isTransformed = event.target.style.transform;

        if (!isTransformed && total - numberId >= 0){
            setTotal(total -= numberId);
            setNumber(num => num.filter(n => n != numberId));
            event.target.style.transform = 'translate(0, 30px)';
        }
    }

    for (let i = 1; i < 10; i++){
        numberData.push(
            <div key={i} id={i} onClick={clicked}
            className="w-5 h-12 text-slate-50 bg-yellow-800 sm:w-6">{i}</div>
        );
    }

    return numberData;
}



let Game = ({page, setPage, setting, setSetting}) => {
    let [totalNum, setTotal] = useState(0);
    let [num, setNumm] = useState(Math.floor(Math.random() * 5) + 1);
    let [number, setNumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let roll = useRef();

    let play = () => {
        if (totalNum === 0){
            setTotal(totalNum = 0);
            let dice = document.querySelectorAll('#dice');
            let diceDot = document.querySelectorAll('#dice-dot');
            
            diceDot.forEach(dot => dot.remove());

            for (let i of dice){
                setNumm(num = Math.floor(Math.random() * 5 + 1));
                setTotal(totalNum += num);
                diceNum(num).forEach(d => i.appendChild(d));
            }
        }
    }

    let rollDice = () => {
        if (totalNum == 0){
            let dice = document.querySelectorAll('#dice');

            for (let i = 0; i < 2; i++){
                setNumm(num = Math.floor(Math.random() * 6 + 1));
                setTotal(totalNum += num);
                
                diceNum(num).forEach(d => dice[i].appendChild(d));
            }
        }
    }

    useEffect(() => {
        rollDice();

        if (setting.automatic){
            roll.current.style.display = "none";
        }
    }, []);

    useEffect(() => {
        if (totalNum == 0 && setting.automatic){
            play();
            rollDice();
        }

        if (totalNum > 0){
            let condition = false;

            for (let i = 0; i < number.length; i++){
                if (number[i] == totalNum){
                    condition = condition || true;
                }
    
                for (let a = number.length - 1; a >= 0; a--){
                    if (number[i] != number[a] && (number[i] + number[a]) == totalNum){
                        condition = condition || true;
                    }
                }
            }
    
            if (condition == false){
                setTimeout(() => {
                    changePage('gameover');
                    setPage(currentPage);
                }, 1500);
            }
        }

        else if (totalNum == 0 && number.length == 0){
            setTimeout(() => {
                changePage('winthegame');
                setPage(currentPage);
            }, 1500);
        }
    }, [number, totalNum]);


    return (
        <>
            <h2 className="text-xl text-center font-bold mb-4">Current Value : {totalNum}</h2>
            
            <div className="w-11/12 h-7/12 text-center sm:w-96">
                <div className="w-inherit h-1 flex flex-row justify-evenly
                flex-wrap text-center border-4 border-transparent">
                    <Number number={number} setNumber={setNumber}
                    total={totalNum} setTotal={setTotal} />
                </div>

                <div className="w-inherit h-10 bg-amber-600
                border-8 border-yellow-900"></div>

                <div className="w-inherit h-7 border-t-0 bg-amber-600 border-yellow-900 border-8"></div>

                <div id="big-board" className="w-inherit h-56
                border-8 border-t-0 border-yellow-900 bg-amber-600
                grid grid-cols-2 gap-2 justify-items-center content-center">
                    <div id="dice" className="w-32 h-8 bg-white border-rounded
                    flex content-center flex-wrap justify-evenly"></div>
                    <div id="dice" className="w-32 h-8 bg-white border-rounded
                    flex content-center flex-wrap justify-evenly"></div>
                </div>

                <button className="mt-4 p-3 text-slate-50 bg-yellow-800" 
                onClick={play} ref={roll}>Roll The Dice</button>
            </div>
        </>
    )
}

export default Game;