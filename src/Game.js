import React, {useState, useEffect} from "react";
import { currentPage, changePage } from "./Page";
import "./static/Game.css";

let diceNum = (num) => {
    let diceData = [];

    for (let i = 0; i < num; i++){
        let diceDot = document.createElement('div');
        diceDot.key = i;
        diceDot.className = 'dice-dot';
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
<<<<<<< HEAD
            setNumber(num => num.filter(n => n !== numberId));

            if (number.length === 0 && total === 0){
                alert('good game !');
            }

=======
            setNumber(num => num.filter(n => n != numberId));
>>>>>>> development
            event.target.style.transform = 'translate(0, 40px)';
        }
    }

    for (let i = 1; i < 10; i++){
        numberData.push(
            <div key={i} id={i} onClick={clicked}
            className="number">{i}</div>
        );
    }

    return numberData;
}



let Game = ({page, setPage}) => {
    let [totalNum, setTotal] = useState(0);
    let [num, setNumm] = useState(Math.floor(Math.random() * 5) + 1);
    let [number, setNumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let play = () => {
        if (totalNum === 0){
            setTotal(totalNum = 0);
            let dice = document.querySelectorAll('.dice');
            let diceDot = document.querySelectorAll('.dice-dot');
            
            diceDot.forEach(dot => dot.remove());

            for (let i of dice){
                setNumm(num = Math.floor(Math.random() * 5 + 1));
                setTotal(totalNum += num);
                diceNum(num).forEach(d => i.appendChild(d));
            }
        }
    }

    useEffect(() => {
        let bigBoard = document.querySelector('.big-board');

        for (let i = 0; i < 2; i++){
            setNumm(num = Math.floor(Math.random() * 5 + 1));
            setTotal(totalNum += num);

            let dice = document.createElement('div');
            dice.id = num;
            dice.className = "dice";
            
            diceNum(num).forEach(d => dice.appendChild(d));
            bigBoard.appendChild(dice);
        }
    }, []);

    useEffect(() => {
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
            <h2 id="title">Current Value : {totalNum}</h2>
            
            <div className="shut-the-box">
                <div className="number-box">
                    <Number number={number} setNumber={setNumber}
                    total={totalNum} setTotal={setTotal} />
                </div>

                <div className="connecting-stick"></div>
                <div className="small-board"></div>
                <div className="big-board"></div>

                <button onClick={play} className="play-btn">Roll The Dice</button>
            </div>
        </>
    )
}

export default Game;