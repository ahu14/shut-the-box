import React, {useState, useEffect} from "react";
import { currentPage, changePage } from "./Page";
import Game from "./Game";
import "./static/Home.css";


let HomePage = ({page, setPage}) => {
    let clicked = () => {
        changePage('shut-the-box');
        setPage(currentPage);
    }

    return (
        <div className="body-box">
            <h2 id="title">Home Page</h2>
            <button onClick={clicked} className="submit-btn">Let's Play</button>
        </div>
    )
}

let GameOver = ({page, setPage}) => {
    let clicked = () => {
        changePage('shut-the-box');
        setPage(currentPage);
    }

    return (
        <div className="body-box">
            <h2 id="title">Game Over</h2>
            <p id="message">Good one ! Try Again !</p>
            <button onClick={clicked} className="play-again-btn">Play Again</button>
        </div>
    )
}


let WinTheGame = ({page, setPage}) => {
    let clicked = (event) => {
        let classname = event.target.className;
        classname == 'home-btn' ? changePage('homepage') : changePage('shut-the-box');
        setPage(currentPage);
    }

    return (
        <div className="body-box">
            <h2 id="title">You Win !</h2>
            <p id="message">Good Game Well Played</p>
            <button onClick={clicked} className="home-btn">Go to Home Page</button>
            <button onClick={clicked} className="play-again-btn">Play Again</button>
        </div>
    )
}



let Home = () => {
    let [page, setPage] = useState(currentPage);
    let [template, setTemplate] = useState();

    useEffect(() => {
        if (page == 'shut-the-box'){
            setTemplate(<Game page={page} setPage={setPage} />);
        }

        else if (page == 'homepage'){
            setTemplate(<HomePage page={page} setPage={setPage} />);
        }

        else if (page == 'gameover'){
            setTemplate(<GameOver page={page} setPage={setPage} />);
        }

        else if (page == 'winthegame'){
            setTemplate(<WinTheGame page={page} setPage={setPage} />);
        }
    }, [page]);

    return template;
}

export default Home;