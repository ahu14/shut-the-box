import React, {useState, useEffect} from "react";
import "./Game.css";

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



let Number = ({total, setTotal}) => {
    let numberData = [];
    let [number, setNumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let clicked = (event) => {
        let numberId = parseInt(event.target.id);
        let isTransformed = event.target.style.transform;

        if (!isTransformed && total - numberId >= 0){
            setTotal(total -= numberId);
            setNumber(num => num.filter(n => n != numberId));

            if (number.length == 0 && total == 0){
                alert('good game !');
            }

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



let Game = () => {
    let [totalNum, setTotal] = useState(0);
    let [num, setNumm] = useState(Math.floor(Math.random() * 5) + 1);

    let playAgain = () => window.location.reload();

    let play = () => {
        if (totalNum == 0){
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


    return (
        <>
            <h2 id="title">Current Value : {totalNum}</h2>
            
            <div className="shut-the-box">
                <div className="number-box">
                    <Number total={totalNum} setTotal={setTotal} />
                </div>

                <div className="connecting-stick"></div>
                <div className="small-board"></div>
                <div className="big-board"></div>

                <div className="btn-box">
                    <button onClick={play} className="play-btn">Roll The Dice</button>
                    <button onClick={playAgain} className="new-game">New Game</button>
                </div>
            </div>
        </>
    )
}

export default Game;