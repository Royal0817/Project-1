document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.grid-container')
    const width = 4
    const height = 4
    let cells = []
    //winCondition()
    //creates grid of cells 
    // createGrid = [(index0),(index1),(index2),(index3),
    //               (index4),(index5),(index6),(index7),
    //               (index8),(index9),(index10),(index11),
    //               (index12),(index13),(index14),(index15)]
    function createGrid() {
           for(let i = 0; i < width*height; i++){
               cell = document.createElement('grid-cell')
               cell.textContent = 0
               container.append(cell)
               cells.push(cell)     
              
           }
    }
    createGrid()

    //generates random number in grid container. {} else statement is in case random cell is not equal to 0
    function generateNumbers() {
        let randomCell = Math.floor(Math.random() * cells.length)
           if (cells[randomCell].textContent == 0){
           cells[randomCell].textContent = 2
        } else generateNumbers()
    }
   
    //arrow keys to move divs, game controls
    document.onkeydown = function (e) {
           console.log(e)
           switch (e.key) {
               //left arrow key
               case 'ArrowLeft':
                   moveLeft()
                   combineRowLeftRight()
                   moveLeft()
                   generateNumbers()
                   break;
   
               //up arrow key
               case 'ArrowUp':
                   moveUp()
                   combineRowUpDown()
                   moveUp()
                   generateNumbers()
                   
                   break;
   
                //right arrow key
               case 'ArrowRight':
                   moveRight()
                   combineRowLeftRight()
                   moveRight()
                   generateNumbers()
                break;
   
                // down arrow key 
               case 'ArrowDown':
                   moveDown()
                   combineRowUpDown()
                   moveDown()
                   generateNumbers()
                   
                   break;
            }
   
    }

        function moveRight() {
            for (let i=0; i < width * height; i++) {
                //allows computer get rows on left hand side of the screen 
                if (i % 4 === 0) {
                    //grabs column on left hand side and defines arrays in the row as a string
                    let totalOne = cells[i].textContent
                    let totalTwo = cells[i + 1].textContent
                    let totalThree = cells[i + 2].textContent
                    let totalFour = cells[i + 3].textContent
                    //makes the row into a complete array, parseInt coverts strings to a number(will help later to add values together)
                    let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
               
                    //weeds out numbers that are not 0
                    let filteredArray = row.filter(cell => cell)
                    // fills in cells without a number with a 0 by filtering through array to check which ones a re missing
                    let missing = width - filteredArray.length
                    let zeros = Array(missing).fill(0)
                    //combines filtered array with new array of 0's on
                    // exp: newRow[0,0,0,2] = zeroes[0,0,0,0] + filtered array[0,0,0,2]
                    let newRow = zeros.concat(filteredArray)
                    
                    //assigns new value of array in indexes
                    cells[i].textContent = newRow[0]
                    cells[i +1].textContent = newRow[1]
                    cells[i +2].textContent = newRow[2]
                    cells[i +3].textContent = newRow[3]
                    
                }
            }
        }
    
        function moveLeft() {
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
                    // console.log(totalOne)
                    // console.log(totalTwo)
                    // console.log(totalThree)
                    // console.log(totalFour)
                    //weeds out numbers 
                    let filteredArray = row.filter(cell => cell)
                    let missing = width - filteredArray.length
                    let zeros = Array(missing).fill(0)
                    //need filtered rows to go left and zeroes on right 
                    let newRow = filteredArray.concat(zeros)
                    
                    //assigns new value of array in indexes
                    cells[i].textContent = newRow[0]
                    cells[i +1].textContent = newRow[1]
                    cells[i +2].textContent = newRow[2]
                    cells[i +3].textContent = newRow[3]
                }
            }
        }

        function moveUp() {
            for (let i=0; i < height; i++) {
                
                //grabs column on left hand side and defines cells in the row 
                let totalOne = cells[i].textContent
                let totalTwo = cells[i + height].textContent 
                let totalThree = cells[i + (height * 2)].textContent
                let totalFour = cells[i + (height * 3)].textContent
                //makes the column into an array, parseInt coverts strings to a number
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                // console.log(totalOne)
                // console.log(totalTwo)
                // console.log(totalThree)
                // console.log(totalFour)
                //weeds out numbers 
                let filteredArray = row.filter(cell => cell)
                let missing = 4 - filteredArray.length
                let zeros = Array(missing).fill(0)
                //changed placement zeros and filtered row to move left
                let newRow = filteredArray.concat(zeros)
                    
                //assigns new value of array in indexes  
                cells[i].textContent = newRow[0]
                cells[i + height].textContent = newRow[1]
                cells[i + (height * 2)].textContent = newRow[2]
                cells[i + (height * 3)].textContent = newRow[3]
                
                
            }
        }

        function moveDown() {
            for (let i=0; i < height; i++) {
            
                //grabs column on left hand side and defines cells in the row 
                let totalOne = cells[i].textContent
                let totalTwo = cells[i + height].textContent 
                let totalThree = cells[i + (height * 2)].textContent
                let totalFour = cells[i + (height * 3)].textContent
                //makes the column into an array, parseInt coverts strings to a number
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                // console.log(totalOne)
                // console.log(totalTwo)
                // console.log(totalThree)
                // console.log(totalFour)
                //weeds out numbers 
                let filteredArray = row.filter(cell => cell)
                let missing = 4 - filteredArray.length
                let zeros = Array(missing).fill(0)
                //changed placement zeros and filtered row to move left
                let newRow = zeros.concat(filteredArray)
                    
                //assigns new value of array in indexes
                cells[i].textContent = newRow[0]
                cells[i + height].textContent = newRow[1]
                cells[i + (height * 2)].textContent = newRow[2]
                cells[i + (height * 3)].textContent = newRow[3]          
            }
        }
        
        //cannot combine rows further down with index 12,13,14,15
        function combineRowUpDown() {
            for (let i = 0; i < 12; i++){
                //checksif cell is equal to cell next to it 
                if (cells[i].textContent === cells[i + height].textContent){
                    let arraySum = parseInt(cells[i].textContent) + parseInt(cells[i + height].textContent)
                    //combines both arrays into one and into the direction called
                    cells[i].textContent = arraySum
                    //one cell will have an empty string after combining and tyhis sets it back to 0
                    cells[i + width].textContent = 0
                }
            }
            setTimeout(winCondition,2500)
        }

        function combineRowLeftRight() {
            for (let i = 0; i < 15; i++) {
                //checks if cell is equal to cell next to it 
                if (cells[i].textContent === cells[i + 1].textContent){
                    let arraySum = parseInt(cells[i].textContent) + parseInt(cells[i+1].textContent)
                    //combines both arrays into one and into the direction called
                    cells[i].textContent = arraySum
                    //one cell will have an empty string after combining and tyhis sets it back to 0
                    cells[i +1 ].textContent = 0  
                }
            }
            setTimeout(winCondition,2500)
        }

        function winCondition() {
            for(let i = 0; i < cells.length; i++){
                if (cells[i].textContent == 64){
               alert('Youve Won')
            }
        }

        
    }

})  





// move elements in specified direction, grabs all elements in .game-container 
//if element has a number !== 0 check leave to the side unless 
// if values of child element = to value of other child element create a merge function 

//destination.appendChildTo()?
//eventTarget.EventListener
//Event.stopPropogation 
//bubbling, event propogation
//giving accessKey a value and then merging it with another
//parseInt converts string to number 
