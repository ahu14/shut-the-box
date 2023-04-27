import { currentPage, changePage} from "./Page";

let HomePage = ({page, setPage}) => {
    let clicked = (event) => {
        let classId = event.target.id;
        classId == 'play' ? changePage('shut-the-box') : changePage('settings');
        setPage(currentPage);
    }

    return (
        <>
            <h2 className="text-2xl font-bold">Home Page</h2>
            <button onClick={clicked} id="play" className="p-3 m-3 
            border-2 duration-300 border-black-200 rounded 
            hover:border-neutral-950">Let's Play</button>
            <button onClick={clicked} id="settings" className="p-3 m-3 
            border-2 duration-300 border-black-200 rounded 
            hover:border-neutral-950">Settings</button>
        </>
    )
}

export default HomePage;