import { currentPage, changePage } from "./Page";

let WinTheGame = ({page, setPage}) => {
    let clicked = (event) => {
        let classId = event.target.id;
        classId == 'home-page' ? changePage('homepage') : changePage('shut-the-box');
        setPage(currentPage);
    }

    return (
        <div className="w-48 h-48 text-center">
            <h2 className="text-xl font-bold">You Win !</h2>
            <p className="text-lg mb-3">Good Game Well Played</p>
            <button onClick={clicked} id="home-page" className="p-2.5 m-3 border-2 duration-300
            border-black-200 rounded hover:border-neutral-950">Go to Home Page</button>
            <button onClick={clicked} id="play-again" className="p-2.5 m-3 border-2 duration-300
            border-black-200 rounded hover:border-neutral-950">Play Again</button>
        </div>
    )
}

export default WinTheGame;