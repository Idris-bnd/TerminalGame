const app = {


    cursorPosition: "right",
    alive:true,
    codeLines: null,
  
    init: async function() {
  
        // TODO
        app.drawBoard();
        app.cursorPosition = "right",

  
        TerminalGame.board = document.getElementById('boardDiv');

        // Event listeners - TODO
        const launchScriptButton = document.getElementById('launchScript');
        
        launchScriptButton.addEventListener('click', () => {
            app.handleLaunchScriptButton()
        })
        
    },
  
  
    handleLaunchScriptButton: function() {
      // TODO
      app.codeLines = document.getElementById('userCode').value.split('\n');
  
      // TODO : get all lines as an array
  
      window.setTimeout(function() {
        app.codeLineLoop(app.codeLines, 0);
      }, 300);
    },
  
  
    codeLineLoop: function(codeLines, index) {
      // Getting currentLine
      var currentLine = codeLines[index];
  
      if (!this.alive) {
        console.log('mort');
      }
    
      switch (currentLine.trim()) {
        case "moveForward":
          // Increment
          index++;
          app.moveForward()
      
          // if still a line to interpret
          if (index < codeLines.length) {
            // Recall same method (=> make a loop)
            window.setTimeout(function() {
              app.codeLineLoop(codeLines, index);
            }, 300);
          } else {
            window.setTimeout(function() {
              app.checkSuccess();
            }, 300);
          }
          
          break;
          case "moveBackward":
            // Increment
            index++;
            app.moveBackward()
        
            // if still a line to interpret
            if (index < codeLines.length) {
              // Recall same method (=> make a loop)
              window.setTimeout(function() {
                app.codeLineLoop(codeLines, index);
              }, 300);
            } else {
              window.setTimeout(function() {
                app.checkSuccess();
              }, 300);
            }
            
            break;
            case "turnRight":
              // Increment
              index++;
              app.turnRight()
          
              // if still a line to interpret
              if (index < codeLines.length) {
                // Recall same method (=> make a loop)
                window.setTimeout(function() {
                  app.codeLineLoop(codeLines, index);
                }, 300);
              } else {
                window.setTimeout(function() {
                  app.checkSuccess();
                }, 300);
              }
              
              break;
              case "turnLeft":
                // Increment
                index++;
                app.turnLeft()
            
                // if still a line to interpret
                if (index < codeLines.length) {
                  // Recall same method (=> make a loop)
                  window.setTimeout(function() {
                    app.codeLineLoop(codeLines, index);
                  }, 300);
                } else {
                  window.setTimeout(function() {
                    app.checkSuccess();
                  }, 300);
                }
                break;
                case "":
                  // Increment
                  index++;
              
                  // if still a line to interpret
                  if (index < codeLines.length) {
                    // Recall same method (=> make a loop)
                    window.setTimeout(function() {
                      app.codeLineLoop(codeLines, index);
                    }, 300);
                  } else {
                    window.setTimeout(function() {
                      app.checkSuccess();
                    }, 300);
                  }
                  break;
      
        default:

          TerminalGame.restartGame()

          break;
      }
  
    },
  
    checkSuccess: function() {
      // TODO display if the game is won or not
      const winPosition = document.querySelector('.cellEnd').children[0];
      const myTextArea = document.getElementById("userCode")
      myTextArea.value = "YOU WIN !!";
      let arrayLine = app.codeLines.length
  
      if (winPosition.classList.contains('cellCurrent')) {
          const myBoardDiv = document.getElementById('boardDiv')
          setTimeout(() => {
            app.codeLines.forEach((line) => {
              if (line == "") {
                arrayLine--;
                console.log(arrayLine);
              }
            })
            
            console.log(app.codeLines);
            if (arrayLine === 3) {
              myBoardDiv.remove()
              TerminalGame.secretLine()
              TerminalGame.winLine()
            }else{
              myBoardDiv.remove()
              TerminalGame.winLine()
            }
          },1500)

      }else{
        TerminalGame.restartGame()
      }
    },
  
    drawBoard: function () {
      const BoardAndButtonDiv = document.createElement('div')
      BoardAndButtonDiv.id = "boardDiv"
      BoardAndButtonDiv.classList.add('boardDivClass')

      const myButton = document.createElement('button');
      myButton.id = "launchScript";
      myButton.textContent = "launch your script";

      const myBoardDiv = document.createElement('div')
      myBoardDiv.id = "board"
  
      BoardAndButtonDiv.append(myBoardDiv, myButton)
      for (let i = 1; i < 5; i++) {
  
        const divCellRow = document.createElement('div')
        divCellRow.id = `row${i}`;
        divCellRow.dataset.id = `${i}`
        divCellRow.classList.add('cellRow')
  
        for (let u = 0; u < 6 ; u++) {
          const divCell = document.createElement('div');
          divCell.classList.add("cell", 'fa-solid');
          divCell.dataset.id = `${u}`
  
          const iElement = document.createElement('i');
          iElement.dataset.id = `in${u}`;
  
          divCell.append(iElement)
  
          divCellRow.append(divCell)
        }
  
        myBoardDiv.append(divCellRow)
        
    }
    
    document.querySelector('body').append(BoardAndButtonDiv)
      const firstCellRow = document.getElementById('row1')
      firstCellRow.children[0].classList.add('cellStart')
      firstCellRow.children[0].children[0].classList.add('cellCurrent','fa-angle-right')
  
      const lastCellRow = document.getElementById('row4')
      lastCellRow.children[5].classList.add('cellEnd')
  
  
  
      //ajout de murs
      const topRow = document.querySelectorAll('#row1 .cell')
      topRow.forEach((individualCell) => {
        individualCell.classList.add('cellMurTop')
      })
  
      const bottomRow = document.querySelectorAll('#row4 .cell')
      bottomRow.forEach((individualCell) => {
        individualCell.classList.add('cellMurBottom')
      })
  
      const leftRow = document.querySelectorAll(`.cell[data-id='0']`)
      leftRow.forEach((individualCell) => {
        individualCell.classList.add('cellMurLeft')
      })
  
      const rightRow = document.querySelectorAll(`.cell[data-id='5']`)
      rightRow.forEach((individualCell) => {
        individualCell.classList.add('cellMurRight')
      })
      //ajout de murs
  
    },
  
    moveForward: function () {
      const currentCell = document.querySelector('.cellCurrent');
      const currentRow = currentCell.parentElement.parentElement
  
  
      switch (this.cursorPosition) {
        case "left":
          const cellMoreLeft = parseInt(currentCell.dataset.id.substr(2,3)) - 1;
          
          let cellAfterLeft = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id=${"'in"+cellMoreLeft+"'"}`)
  
          if (currentCell.parentElement.classList.contains('cellMurLeft')) {
            cellAfterLeft = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id='in5']`)
          }
          if (cellAfterLeft.classList.contains('cellStart')) {
            this.cursorPosition = "right"
          }
          
          currentCell.classList.remove('cellCurrent', "fa-angle-left")
          cellAfterLeft.classList.add('cellCurrent', "fa-angle-left")
          break;
        case "right":
          const cellMoreRight = parseInt(currentCell.dataset.id.substr(2,3)) + 1;
          
          let cellAfterRight = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id=${"'in"+cellMoreRight+"'"}`)
          
          if (currentCell.parentElement.classList.contains('cellMurRight')) {
            cellAfterRight = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id='in0']`)
          }
          if (cellAfterRight.classList.contains('cellStart')) {
            this.cursorPosition = "right"
          }
  
          currentCell.classList.remove('cellCurrent', "fa-angle-right")
          cellAfterRight.classList.add('cellCurrent', "fa-angle-right")
        break;
        case "bottom":
  
          const rowMoreBottom = parseInt(currentRow.dataset.id) + 1;
          const number = currentCell.dataset.id.substr(2,3);
  
          let cellAfterBottom = document.querySelector(`.cellRow[data-id=${"'"+rowMoreBottom+"'"}] i[data-id=${"'in"+number+"'"}]`);
  
          if (currentCell.parentElement.classList.contains('cellMurBottom')) {
            cellAfterBottom = document.querySelector(`.cellRow[data-id='1'] i[data-id=${"'in"+number+"'"}]`)
          }
  
          currentCell.classList.remove('cellCurrent', "fa-angle-down")
          cellAfterBottom.classList.add('cellCurrent', "fa-angle-down")
        break;
        case "top":
  
          const rowMoreTop = parseInt(currentRow.dataset.id) - 1
          const number1 = currentCell.dataset.id.substr(2,3);
  
          let cellAfterTop = document.querySelector(`.cellRow[data-id=${"'"+rowMoreTop+"'"}] i[data-id=${"'in"+number1+"'"}]`)
  
          if (currentCell.parentElement.classList.contains('cellMurTop')) {
            cellAfterTop = document.querySelector(`.cellRow[data-id='4'] i[data-id=${"'in"+number1+"'"}]`)
          }
  
          currentCell.classList.remove('cellCurrent', "fa-angle-up")
          cellAfterTop.classList.add('cellCurrent', "fa-angle-up")
        break;
  
  
        default:
          break;
      }
  
    },
  
    moveBackward: function () {
      const currentCell = document.querySelector('.cellCurrent');
      const currentRow = currentCell.parentElement.parentElement
  
      switch (this.cursorPosition) {
        case "left":
          const cellMoreLeft = parseInt(currentCell.dataset.id.substr(2,3)) + 1;
          
          let cellAfterLeft = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id=${"'in"+cellMoreLeft+"'"}`)
  
          if (currentCell.parentElement.classList.contains('cellMurRight')) {
            cellAfterLeft = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id='in0']`)
          }
  
          if (cellAfterLeft.classList.contains('cellStart')) {
            this.cursorPosition = "right"
          }
          
          currentCell.classList.remove('cellCurrent', "fa-angle-left")
          cellAfterLeft.classList.add('cellCurrent', "fa-angle-left")
          break;
        case "right":
          const cellMoreRight = parseInt(currentCell.dataset.id.substr(2,3)) - 1;
          
          let cellAfterRight = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id=${"'in"+cellMoreRight+"'"}`)
          
          if (currentCell.parentElement.classList.contains('cellMurLeft')) {
            cellAfterRight = document.querySelector(`.cellRow[data-id=${"'"+currentRow.dataset.id+"'"}] i[data-id='in5']`)
          }
          if (cellAfterRight.classList.contains('cellStart')) {
            this.cursorPosition = "right"
          }
  
          currentCell.classList.remove('cellCurrent', "fa-angle-right")
          cellAfterRight.classList.add('cellCurrent', "fa-angle-right")
        break;
        case "bottom":
  
          const rowMoreBottom = parseInt(currentRow.dataset.id) - 1
          const number = currentCell.dataset.id.substr(2,3);
  
          let cellAfterBottom = document.querySelector(`.cellRow[data-id=${"'"+rowMoreBottom+"'"}] i[data-id=${"'in"+number+"'"}]`)
  
  
          if (currentCell.parentElement.classList.contains('cellMurTop')) {
            cellAfterBottom = document.querySelector(`.cellRow[data-id='4'] i[data-id=${"'in"+number+"'"}]`)
          }
  
          currentCell.classList.remove('cellCurrent', "fa-angle-down")
          cellAfterBottom.classList.add('cellCurrent', "fa-angle-down")
        break;
        case "top":
  
          const rowMoreTop = parseInt(currentRow.dataset.id) + 1
          const number1 = currentCell.dataset.id.substr(2,3);
  
          let cellAfterTop = document.querySelector(`.cellRow[data-id=${"'"+rowMoreTop+"'"}] i[data-id=${"'in"+number1+"'"}]`)
  
          if (currentCell.parentElement.classList.contains('cellMurBottom')) {
            cellAfterTop = document.querySelector(`.cellRow[data-id='1'] i[data-id=${"'in"+number1+"'"}]`)
          }
  
          currentCell.classList.remove('cellCurrent', "fa-angle-up")
          cellAfterTop.classList.add('cellCurrent', "fa-angle-up")
        break;
  
  
        default:
          break;
      }
  
    },
  
    turnRight: function () {
      const currentCell = document.querySelector('.cellCurrent');
  
      switch (this.cursorPosition) {
        case "right":
          this.cursorPosition = "bottom"
          currentCell.className = ('cellCurrent fa-angle-down')
          break;
        case "bottom":
          this.cursorPosition = "left"
          currentCell.className = ('cellCurrent fa-angle-left')
          break;
        case "left":
          this.cursorPosition = "top"
          currentCell.className = ('cellCurrent fa-angle-up')
         break;
        case "top":
          this.cursorPosition = "right"
          currentCell.className = ('cellCurrent fa-angle-right')
          break;
        default:
          break;
  
      }
    },
  
    turnLeft: function () {
      const currentCell = document.querySelector('.cellCurrent');
  
      switch (this.cursorPosition) {
        case "right":
          this.cursorPosition = "top"
          currentCell.className = ('cellCurrent fa-angle-up')
          // app.checkClasses(currentCell);
  
          break;
        case "bottom":
          this.cursorPosition = "right"
          currentCell.className = ('cellCurrent fa-angle-right')
          break;
        case "left":
          this.cursorPosition = "bottom"
          currentCell.className = ('cellCurrent fa-angle-down')
         break;
        case "top":
          this.cursorPosition = "left"
          currentCell.className = ('cellCurrent fa-angle-left')
          break;
        default:
          break;
  
      }
    },
  
    checkClasses: function (currentCell) {
      if (currentCell.classList.contains('cellMurTop')) {
        currentCell.classList.remove('cellMurTop')
        currentCell.classList.add('cellMurLeft')
      }
  
      if (currentCell.classList.contains('cellMurLeft')) {
        currentCell.classList.remove('cellMurLeft')
        currentCell.classList.add('cellMurRight')
      }
  
      if (currentCell.classList.contains('cellMurBottom')) {
        currentCell.classList.remove('cellMurBottom')
        currentCell.classList.add('cellMurLeft')
      }
  
      if (currentCell.classList.contains('cellMurRight')) {
        currentCell.classList.remove('cellMurRight')
        currentCell.classList.add('cellMurBottom')
      }
    },
  
  
  };
