export let pageName = ['homepage', 'shut-the-box', 'gameover', 'winthegame'];

export let currentPage = 'homepage';

export let changePage = (page) => {
    for (let i of pageName){
        if (i == page){
            currentPage = page;
        }
    }
}