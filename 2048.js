document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.grid-container')
    const width = 4
    const height = 4
    let cells = []
    let score = 0

    function createGrid() {
           for(let i = 0; i < width*height; i++){
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');            
               cell.setAttribute('id', 'cells');
               cell.textContent = 0
               container.append(cell)
               cells.push(cell)
           }
    }  
        createGrid()
        hideZero()
        updateScore()
     
        function hideZero() {
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent == 0) {
                    cells[i].classList.add('hidden-cell'); // Add a class to hide the zero content
                } else {
                    cells[i].classList.remove('hidden-cell'); // Remove the class if it's not zero
                }
            }
        }
        //generates random number in grid container if cell is !== 0 else statement will rerun the code snippet
        function generateNumbers() {
            // Reset background color for all cells
            cells.forEach(cell => {
                cell.style.backgroundColor = getNumberColor(parseInt(cell.textContent));
            });
        
            let randomCell = Math.floor(Math.random() * cells.length);
            if (cells[randomCell].textContent == 0) {
                const newValue = 2;
                

                cells[randomCell].textContent = newValue;
                cells[randomCell].classList.remove('hidden');
                cells[randomCell].style.backgroundColor = getNumberColor(newValue);
                cells[randomCell].classList.add('fade-in');
                
                score = Math.max(score, newValue);
                
                
            } else {
                generateNumbers();
            }
            
            updateScore();
            hideZero();
        }

        function updateScore() {
            const scoreElement = document.getElementById('score');
            if (scoreElement) {
                // Find the maximum value in the cells array
                const highestNumber = cells.reduce((max, cell) => {
                    const cellValue = parseInt(cell.textContent);
                    return cellValue > max ? cellValue : max;
                }, 0);
    
                scoreElement.textContent = `Score: ${highestNumber}`;
            } else {
                console.error('Score element not found!');
            }
        }
      
        
   
        function getNumberColor(value) {
            switch (value) {
                case 2:
                    return '#eee4da'; // Light color for 2
                case 4:
                    return '#ede0c8'; // Light color for 4
                case 8:
                    return '#f2b179';
                case 16:
                    return '#f59563';
                case 32:
                    return '#f67c5f';
                case 64:
                    return '#f65e3b';
                case 128:
                    return '#edcf72';
                case 256:
                    return '#edcc61';
                case 512:
                    return '#edc850';
                case 1024:
                    return '#edc53f';
                case 2048:
                    return '#edc22e';
                default:
                    return '#ffffff'; 
            }
        }
    
// ---------------------------------keyboard events------------------------------------
let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchmove', (e) => {
        // Prevent scrolling during the swipe
        e.preventDefault();
    }, false);

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, false);

    document.addEventListener('touchmove', (e) => {
        // Prevent scrolling during the swipe
        e.preventDefault();
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;

        handleSwipe(e); // Pass the event to handleSwipe
    }, false);

    function handleSwipe(e) {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Determine the direction of the swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Swipe right
                moveRight();
                combineRowLeftRight();
                moveRight();
                generateNumbers();
            } else {
                // Swipe left
                moveLeft();
                combineRowLeftRight();
                moveLeft();
                generateNumbers();
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                // Swipe down
                moveDown();
                combineRowUpDown();
                moveDown();
                generateNumbers();
            } else {
                // Swipe up
                moveUp();
                combineRowUpDown();
                moveUp();
                generateNumbers();
            }
        }

        // Prevent default only when handling the swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            e.preventDefault();
        }
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
            for (let i = 0; i < width * height; i++) {
                //allows computer to get array of index 0,4,8,12
                if (i % 4 === 0) {
                    //grabs inner text of cells to the right of index 0,4,8,12
                    let totalOne = cells[i].textContent
                    let totalTwo = cells[i + 1].textContent
                    let totalThree = cells[i + 2].textContent
                    let totalFour = cells[i + 3].textContent

                    //makes the row into a complete array, parseInt coverts strings to a number(will help later to add values together)
                    let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
               
                    //weeds out numbers that are not 0 and returns array of non zero numbers 
                    let filteredArray = row.filter(cell => cell)
                    // fills in cells without a number with a 0 by filtering through array to check which ones are missing
                    let missing = width - filteredArray.length
                    let zeros  = Array(missing).fill(0)
                    //combines filtered array with new array of 0's 
                    // exp: newRow[0,0,0,2] = zeroes[0,0,0,0] + filtered array[0,0,0,2]
                    let newRow = zeros.concat(filteredArray)
                    
                    //assigns new value of array in indexes
                    cells[i].textContent = newRow[0]
                    cells[i + 1].textContent = newRow[1]
                    cells[i + 2].textContent = newRow[2]
                    cells[i + 3].textContent = newRow[3]
                    
                }
            }
        }
    
        function moveLeft() {
            for (let i=0; i < width * height; i++) {
                if (i % 4 === 0) {
                    let totalOne = cells[i].textContent
                    let totalTwo = cells[i + 1].textContent 
                    let totalThree = cells[i + 2].textContent
                    let totalFour = cells[i + 3].textContent
                    let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                
                    let filteredArray = row.filter(cell => cell)
                    
                    let missing = width - filteredArray.length
                    let zeros = Array(missing).fill(0)
                    //this time aligns filtered items to the left
                    let newRow = filteredArray.concat(zeros)
                    
                    cells[i].textContent = newRow[0]
                    cells[i + 1].textContent = newRow[1]
                    cells[i + 2].textContent = newRow[2]
                    cells[i + 3].textContent = newRow[3]
                }
            }
        }

        function moveUp() {
            //grabs first 4 indexes 
            for (let i = 0; i < height; i++) {
                // this grabs arrays in columns 
                let totalOne = cells[i].textContent
                let totalTwo = cells[i + height].textContent 
                let totalThree = cells[i + (height * 2)].textContent
                let totalFour = cells[i + (height * 3)].textContent
                //this puts it togehter to make the column
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
              
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
            for (let i= 0; i < height; i++) {
                let totalOne = cells[i].textContent
                let totalTwo = cells[i + height].textContent 
                let totalThree = cells[i + (height * 2)].textContent
                let totalFour = cells[i + (height * 3)].textContent
        
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredArray = row.filter(cell => cell)

                let missing = 4 - filteredArray.length
                let zeros = Array(missing).fill(0)

                let newRow = zeros.concat(filteredArray)
                    
                
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
            yaLostedBuddy()
            
        }

        function combineRowLeftRight() {
            for (let i = 0; i < 15; i++) {
                //checks if cell is equal to cell next to it 
                if (cells[i].textContent === cells[i + 1].textContent){
                    let arraySum = parseInt(cells[i].textContent) + parseInt(cells[i+1].textContent)
                    //combines both arrays into one and into the direction called
                    cells[i].textContent = arraySum
                    //one cell will have an empty string after combining and tyhis sets it back to 0
                    cells[i + 1 ].textContent = 0  
                }
            }
            setTimeout(winCondition,2500)
            yaLostedBuddy()
        }

        // ---------- Win conditions ----------------
        function winCondition() {
            for(let i = 0; i < cells.length; i++){
                if (cells[i].textContent >= 64){
                    openWinModal()
                }
            }
        }

        function yaLostedBuddy() {
            let emptyCells = 0
            for(let i = 0; i < 16; i++ )  {
                if(cells[i].textContent == 0)
                emptyCells++
            }
            if (emptyCells === 0) {
                closeWinModal()
            }   
        }

        
        
        // Function to display the win modal
        function openWinModal() {
            const modal = document.getElementById('winModal');
            modal.style.display = 'block';
    
            // Display the score in the modal
            const modalScore = document.getElementById('modalScore');
            
            // Use the highestNumber variable to display the correct score
            const highestNumber = cells.reduce((max, cell) => {
                const cellValue = parseInt(cell.textContent);
                return cellValue > max ? cellValue : max;
            }, 0);
            
            modalScore.textContent = `${highestNumber}`;
        
        }
    })
    
    // Function to close the win modal
    function closeWinModal() {
        const modal = document.getElementById('winModal');
        modal.style.display = 'none';
    }
