document.addEventListener('DOMContentLoaded', () => {
 const container = document.querySelector('.grid-container')
 const width = 4
 let cells = []

 //creates grid
    function createGrid() {
        for(let i=0; i < width*width; i++){
            cell = document.createElement('grid-cell')
            cell.innerHTML = 0
            container.appendChild(cell)
            cells.push(cell)
        }
    
    }
    createGrid()

 //generates random number
    function generateNumbers() {
        let randomCell = Math.floor(Math.random() * cells.length)
        if (cells[randomCell].innerHTML == 0){
        cells[randomCell].innerHTML = 2
        } else generateNumbers()
    }


 
 //arrow keys to move divs
    document.onkeydown = function (e) {
        console.log(e)
        switch (e.key) {
            //left arrow key
            case 'ArrowLeft':
                generateNumbers()
                break;

            //up arrow key
            case 'ArrowUp':
                generateNumbers()
                break;

             //right arrow key
            case 'ArrowRight':
                generateNumbers()
             break;

             // down arrow key 
            case 'ArrowDown':
                generateNumbers()
                break;
        }

    };
})






