document.addEventListener('DOMContentLoaded', () => {
 const container = document.querySelector('.grid-container')
 const width = 4
 const height = 4
 let cells = []

 //creates grid
    function createGrid() {
        for(let i = 0; i < width*height; i++){
            cell = document.createElement('grid-cell')
            cell.textContent = 0
            container.append(cell)
            cells.push(cell)     
        }
    }
    createGrid()

 //generates random number in container 
    function generateNumbers() {
        let randomCell = Math.floor(Math.random() * cells.length)
        if (cells[randomCell].textContent == 0){
        cells[randomCell].textContent = 20
        } else generateNumbers()
    }

    //arrow keys to move divs, game controls
    document.onkeydown = function (e) {
        console.log(e)
        switch (e.key) {
            //left arrow key
            case 'ArrowLeft':
                //function needed to move divs onto left side 
                generateNumbers() 
                break;

            //up arrow key
            case 'ArrowUp':
                //function needed to move divs onto top side 
                generateNumbers()
                break;

             //right arrow key
            case 'ArrowRight':
                moveRight()
                // combineRow()
                generateNumbers()
             break;

             // down arrow key 
            case 'ArrowDown':
                //function needed to move divs onto down side
                generateNumbers()
                
                break;
        }

    
    
        function moveRight() {
            for (let i=0; i < width * height; i++) {
               //allows computer get rows on left hand side of the screen 
              if (i % 4 === 0) {
                    //grabs column on left hand side and defines cells in the row 
                    let totalOne = cells[i].textContent
                    let totalTwo = cells[i + 1].textContent 
                    let totalThree = cells[i + 2].textContent
                    let totalFour = cells[i + 3].textContent
                    //makes the row into an array, parseInt coverts strings to a number
                    let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                    
                    //weeds out numbers 
                    let filteredArray = row.filter(cell => cell)
                    let missing = width - filteredArray.length
                    let zeros = Array(missing).fill(0)
                    let newRow = zeros.concat(filteredArray)
                    
        
                    cells[i].textContent = newRow[0]
                    cells[i +1].textContent = newRow[1]
                    cells[i +2].textContent = newRow[2]
                    cells[i +3].textContent = newRow[3]
                }
            }
        }
    

        // move elements in specified direction, grabs all elements in .game-container 
        //if element has a number !== 0 check leave to the side unless 
        // if values of child element = to value of other child element create a merge function 
        
        //destination.appendChildTo()?
        //eventTarget.EventListener
        //Event.stopPropogation 
        //bubbling, event propogation
        //giving accessKey a value and then merging it with another?
        //offset, get bouncingclientRect?

        // console.log(document.querySelectorAll('grid-cell')[1])
    }
    
    
})






