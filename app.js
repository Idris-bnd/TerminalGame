const TerminalGame = {

    // properties

    baseLine : "yours/users/CD::245/TerminalGame:‎ ‎ ‎ ‎",
    body: null,
    listBase: null,
    errorCompt: 0,
    game:false,
    board:false,
    gameCommands:false,
    textArea:false,

    init:function () {
        this.body = document.querySelector('body');
        console.log(this.body);
        this.createPage();
    },

    createPage: function () {
      this.listBase = document.createElement('ul')
      this.listBase.classList.add('listBase')
      this.body.append(this.listBase);
      
      const firstLi = document.createElement('li');
      firstLi.textContent = this.baseLine + "type 'informations' for get more."
      this.listBase.append(firstLi)

      this.addInputText()
    },

    addInputText: function () {
        const myInputText = document.createElement('input')
        myInputText.type = "text"
        myInputText.classList.add('textLine');
        myInputText.setAttribute('autofocus', 'autofocus');

        const divForInputText = document.createElement('div');
        divForInputText.append(myInputText);

        const liForInputText = document.createElement('li');
        liForInputText.textContent = this.baseLine;
        liForInputText.classList.add('lastLine')
        liForInputText.append(divForInputText);

        this.listBase.append(liForInputText);


        this.body.addEventListener('click', (e) => {
            console.log(e.target);
            if (e.target.id === "userCode") {
                e.target.focus()
            }else{
                myInputText.focus()
            }
        })

        myInputText.addEventListener('keydown', (e) =>{
            if (e.keyCode === 13) {
                this.addLine(myInputText.value.trim())
                const lastInputText = document.querySelector('.textLine')
                lastInputText.focus()
            }
        });

    },

    addLine: function () {

        const beforeLi = document.querySelector('.lastLine');
        const currentLineValue = beforeLi.children[0].children[0].value.trim();
        
        beforeLi.remove()
        
        const myNewLine = document.createElement('li');
        myNewLine.textContent = this.baseLine + currentLineValue;
        
        this.listBase.append(myNewLine);
        
        this.checkTheLine(currentLineValue)

        if (this.errorCompt >= 4) {
            return
        }
        this.addInputText()
        
    },

    checkTheLine:  function (currentLineValue) {

        switch (currentLineValue) {
            case "informations":
                this.informationBlock()
                break;
            case "help":
                this.helpBlock()
                break;
            case "createGame()":
                if (!this.game) {   
                    this.createTheGame()
                    this.game = true
                }
                break;
            case "clear":
                this.clearScript()
                break;
            case "game-about":
                this.informationAboutGameBlock()
                break;
            case "createGameCommands()":
                if (this.game) {
                    this.createGameCommands()
                    this.gameCommands = true;
                }
                break;
            case "createTextArea()":
                if (this.board && !this.textArea && this.gameCommands) {
                    this.textArea = true;
                    this.createTextArea()
                }else{

                }
                break;
        
            default:
                this.errorCompt++

                if (this.errorCompt === 3) {
                    this.windowPreventBlock();
                }
                if (this.errorCompt === 4) {
                    this.windowBUG();
                }
                
                break;
        }
    },

    helpBlock: function () {
        const helpLi = document.createElement('li');

        const helpArray = [
            {
                helpText: "type 'help' to listing commands.",
            },
            {
                helpText: "type 'clear' to clear all the script",
            },
            {
                helpText: "type 'game-about' to have informations about the game you will create",
            },
            {
                helpText: "type 'createGame()' to instancing the game.",
            },
            {
                helpText: "Warning !!! if you write a bad command 4 times in a row, the window will bug.",
            },
        ]
        const ulHelpLi = document.createElement('ul')
        ulHelpLi.classList.add('textBlock');

        helpArray.forEach((oneError) => {
            let errorLi = document.createElement('li');
            errorLi.textContent = oneError.helpText;

            ulHelpLi.append(errorLi);
        })

        const warningLi = ulHelpLi.children[4]
        warningLi.classList.add('redWarning')
        
        helpLi.append(ulHelpLi);
        
        this.listBase.append(helpLi);
    },
    
    informationBlock: function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "Hello :)), I'm sooooo tired today, so I decided that I was going to let you create the game that my boss asked me, and do it quickly, I have to return it tomorrow morning.";
        const informationLi2 = document.createElement('li');
        informationLi2.textContent = "Oh, and type 'help' for more information, *aaaahhhhh* it's time to go back to my bed  ;)";

        ulinformationLi.append(informationLi1, informationLi2);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

    informationAboutGameBlock: function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "You have to create the game and win it else my boss will fire me !";

        ulinformationLi.append(informationLi1);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

    windowPreventBlock: function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "WARNING , ONE MORE MISTAKE AND THE SCRIPT WILL BUG";
        informationLi1.classList.add('redWarning')

        ulinformationLi.append(informationLi1);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

    windowBUG: function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        document.getElementById('boardDiv') ? document.getElementById('boardDiv').remove() : ""

        let errorCount = 0;
        let myInterval = setInterval(() => {
            errorCount++

            if (errorCount === 357 ) {
                clearInterval(myInterval)
            }
            const informationLi1 = document.createElement('li');
            informationLi1.textContent = "REFRESH THE PAGE" + errorCount;
            informationLi1.classList.add('redWarning')
            ulinformationLi.append(informationLi1);
        },10)


        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

    clearScript: function () {

        this.listBase.remove()
        this.createPage()
        const elementToremove = document.querySelector('.lastLine:nth-child(2)');
        elementToremove.remove()

        if (this.board) {
            this.board.remove()
            this.board = false;
        };

        this.game = false;
        this.textArea = false;
        this.gameCommands = false;

        return
    },

    errorLine: function () {

        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "WARNING , ONE MORE MISTAKE AND THE SCRIPT WILL BUG";
        informationLi1.classList.add('redWarning')

        ulinformationLi.append(informationLi1);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

    createTheGame:function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "Nice you went to create the game, now you need to create the commands !";

        const informationLi2 = document.createElement('li');
        informationLi2.textContent = "try createGameCommands() maybe it will run";


        ulinformationLi.append(informationLi1, informationLi2);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);

        
        app.init()
    },

    createGameCommands:function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "Okay, you went to create the commands, the game is ready to run";

        const informationLi2 = document.createElement('li');
        informationLi2.textContent = "but now you need to write the commands somewhere right ? try createTextArea()";


        ulinformationLi.append(informationLi1, informationLi2);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

    createTextArea:function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "Nice, the game is ready to run";

        const informationLi2 = document.createElement('li');
        informationLi2.textContent = "Rules : 1 instruction per line";

        const informationLi3 = document.createElement('li');
        informationLi3.textContent = "Commands : moveForward  /  moveBackward  /  turnRight  /  turnLeft.";

        const informationLi4 = document.createElement('li');
        informationLi4.textContent = "use Tab for write in your textarea / (bonus : finish the game with 3 commands only)";


        const myTextArea = document.createElement('textarea');
        myTextArea.id = "userCode"

        myTextArea.addEventListener('click', () => {
            myTextArea.focus()
        })


        ulinformationLi.append(informationLi1, informationLi2, informationLi3, informationLi4);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
        this.board.prepend(myTextArea)
    },

    restartGame:function () {
        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "Ohh you lose, restart !";

        const myTextArea = document.createElement('textarea');
        myTextArea.id = "userCode"

        ulinformationLi.append(informationLi1);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);

        document.querySelectorAll('.boardDivClass').forEach((element) => {
            element.remove()
        })
        app.init()

        this.board.prepend(myTextArea);


    },

    winLine: function () {

        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "GG ! You have create the game and win it ! You are a real engineer right now !";

        const informationLi2 = document.createElement('li');
        informationLi2.textContent = "but if you are an engineer, you don't have to recruit me ?? * think think think*";

        const informationLi3 = document.createElement('li');
        informationLi3.textContent = "Yeah you might be an engineer but you probably won't need such a game for your site";

        const informationLi4 = document.createElement('li');
        informationLi4.textContent = "However ! you probably need someone with other skills, maybe even me! What do you think ?";

        const informationLi5 = document.createElement('li');
        informationLi5.innerHTML = "If so, contact me at this link :  <a href='https://idrisbndportfolio.web.app/contact'>https://idrisbndportfolio.web.app/contact</a> ";

        ulinformationLi.append(informationLi1, informationLi2, informationLi3, informationLi4, informationLi5);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

    secretLine: function () {

        const informationLi = document.createElement('li');

        const ulinformationLi = document.createElement('ul')
        ulinformationLi.classList.add('textBlock');

        const informationLi1 = document.createElement('li');
        informationLi1.textContent = "!! Wow you win with only 3 commands ???!!!! you have unlocked the secret line !";
        informationLi1.classList.add('blueLine')

        const informationLi2 = document.createElement('li');
        informationLi2.innerHTML = "secret line : it's just a link to the cutest cat you ever seen. <a href='https://i.pinimg.com/originals/9a/09/ed/9a09ed259baad06fb3d3e478d8100f12.jpg' target='_blank'> the link</a>";
        informationLi2.classList.add('blueLine')

        ulinformationLi.append(informationLi1, informationLi2);

        informationLi.append(ulinformationLi);

        this.listBase.append(informationLi);
    },

}


window.addEventListener("DOMContentLoaded", () => {
    TerminalGame.init();
  });