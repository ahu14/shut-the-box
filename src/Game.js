import "./Game.css";

let Number = () => {
    let numberData = [];

    for (let i = 1; i < 10; i++){
        numberData.push(<div key={i} id={i} className='number'>{i}</div>);
    }

    return numberData;
}


let Game = () => {
    return (
        <div className="shut-the-box">
            <div className="number-box"><Number /></div>
            <div className="connecting-stick"></div>
            <div className="small-board"></div>
            <div className="big-board"></div>
        </div>
    )
}

export default Game;