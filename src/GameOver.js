import { currentPage, changePage } from "./Page";

let GameOver = ({page, setPage}) => {
    let clicked = () => {
        changePage('shut-the-box');
        setPage(currentPage);
    }

    return (
        <>
            <h2 className="text-center text-xl font-bold">Game Over</h2>
            <p className="my-2 text-l font-medium">Good one ! Try Again !</p>
            <button onClick={clicked} className="p-2.5 m-3 border-2 duration-300
            border-black-200 rounded hover:border-neutral-950">Play Again</button>
        </>
    )
}

export default GameOver;