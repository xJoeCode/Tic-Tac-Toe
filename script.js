
class player {

constructor (name, avatar) {
    this.name =  name
    this.avatar = avatar
}
    turn = 0;

    get avatarValues(){
        return this.calcAvatarValues()
    }

  calcAvatarValues() {
        const avatarValue = document.getElementsByName(this.avatar)
        for(let i = 0; i < avatarValue.length; i++){
            if(avatarValue[i].checked){
               return avatarValue[i].value
            }
        }
    }
    
}




const gameStarter = (name1, name2, avatar1, avatar2) =>{

    
    const player1 = new player(name1,avatar1)
    const player2 = new player(name2,avatar2)
    console.log(player1)
    const player1Avatar = player1.avatarValues
    const player2avatar = player2.avatarValues
    if (player1Avatar == player2avatar){
        alert("Both players have same avatar kindly pick a different one")
    } else if(name1 == "" || name2 == ""){
        alert("Name Fields are empty")
    } else if (name1 == name2) {
        alert("Both players have the same name, Kindly check name fields again")
    }
    else {
    document.querySelector(".formContainer").style.display = "none"
    document.querySelector(".cuteIcons").style.display = "none"
    document.querySelector(".cuteIcons2").style.display = "none"

    const resetButton =  document.getElementById("resetButton")
    resetButton.onclick = function() { gameOn.resetAll(player1,player2) }

    //gameOn.addresetFunc(player1, player2)
    gameOn.getTurn(player1, player2)
    gameOn.start(player1, player2)
    
    }
}





//const gameStarter = (name1, name2, avatar1, avatar2) =>{

    
 //       const player1 = player(name1,avatar1)
 //       const player2 = player(name2, avatar2)
 //       const player1Avatar = player1.getAvatarValues()
 //       const player2avatar = player2.getAvatarValues()
//        if (player1Avatar == player2avatar){
 //           alert("Both players have same avatar kindly pick a different one")
 //       } else if(name1 == "" || name2 == ""){
 //           alert("Name Fields are empty")
 //       } else if (name1 == name2) {
//            alert("Both players have the same name, Kindly check name fields again")
//        }
//        else {
 //       document.querySelector(".formContainer").style.display = "none"
 //       document.querySelector(".cuteIcons").style.display = "none"
//        document.querySelector(".cuteIcons2").style.display = "none"

//        const resetButton =  document.getElementById("resetButton")
//        resetButton.onclick = function() { gameOn.resetAll(player1,player2) }

        //gameOn.addresetFunc(player1, player2)
 //       gameOn.getTurn(player1, player2)
//        gameOn.start(player1, player2)
        
//        }
 //   }


    

const gameOn = (() => {

    let gameBoard = []
   

    const getTurn = (player1, player2) =>{
        const starfirstValue = document.getElementsByName("start")
        for(let i = 0; i < starfirstValue.length; i++){
            if(starfirstValue[i].checked){
                if(starfirstValue[i].value == 1){
                    console.log("player1getsturn")
                    player1.turn++
                    document.querySelector("#turnLabel").textContent = `${player1.name}'s Turn`
                } else if (starfirstValue[i].value == 2){
                    player2.turn++
                    document.querySelector("#turnLabel").textContent = `${player2.name}'s Turn`
                    console.log("player2getsturn")
                }
            }
        }
    }

    const start = (player1, player2) => {


    const gameBoardIcons = document.querySelector(".gameBoard")
    const player1Icon = document.createElement("img")
    player1Icon.setAttribute("src", `./Assets/${player1.avatarValues}.png`)
    player1Icon.classList.add(`${player1.name}Icon`)
    const player2Icon = document.createElement("img")
    player2Icon.setAttribute("src", `./Assets/${player2.avatarValues}.png`)
    player2Icon.classList.add(`${player2.name}Icon`)
    gameBoardIcons.appendChild(player1Icon)
    gameBoardIcons.appendChild(player2Icon)


        
    const gamePanel = document.querySelectorAll(".gamePanel")
    gamePanel.forEach(gamePanel => gamePanel.addEventListener('click', function playermark(e){
        if(player1.turn > 0 && !(e.target.hasChildNodes()) && e.target.className == "gamePanel"){
            const icon = document.createElement("img")
            icon.setAttribute("src", `./Assets/${player1.avatarValues}.png`)
            e.target.appendChild(icon)
            const datakey = e.target.getAttribute("data-key")
            gameBoard.push(`${player1.name}${datakey}`)
            console.log(gameBoard)
            player1.turn--
            player2.turn++
            document.querySelector("#turnLabel").textContent = `${player2.name}'s Turn`
            checkWinCondition(player1.name)
            } else if (player2.turn > 0 && !(e.target.hasChildNodes()) && e.target.className == "gamePanel"){
                document.querySelector("#turnLabel").textContent = `${player2.name}'s Turn`
                const icon = document.createElement("img")
                icon.setAttribute("src", `./Assets/${player2.avatarValues}.png`)
                e.target.appendChild(icon)
                const datakey = e.target.getAttribute("data-key")
                gameBoard.push(`${player2.name}${datakey}`)
                console.log(gameBoard)
                player2.turn--
                player1.turn++
                document.querySelector("#turnLabel").textContent = `${player1.name}'s Turn`
                checkWinCondition(player2.name)
            }
    }))

    function checkWinCondition(_player){

        wincondition = {
            winCondition1: ['01', '02' ,'03'],
            winCondition2: ['01', '04', '07'],
            winCondition3: ['01', '05', '09'],
            winCondition4: ['02', '05', '08'],
            winCondition5: ['03', '05', '07'],
            winCondition6: ['03', '06', '09'],
            winCondition7: ['04', '05', '06'],
            winCondition8: ['07', '08', '09']
        }
        // removes the player name from the array
        if (gameBoard.length == 9){
            document.querySelector("#turnLabel").textContent = "Its a Tie"
        } else {
        const playerArray = (gameBoard.filter(player => player.includes(`${_player}`)).map(n => n.replace(`${_player}`,'')))
        console.log(playerArray)
        
        // loops every array in the wincondition object to check who matches the win conditions
        for (array in wincondition){
        const playerWin = checkWin(wincondition[array])
        if (playerWin){
            wincondition[array].forEach(element => document.querySelector(`[data-key="${element}"]`).style.backgroundColor = "#8a3324" )
            document.querySelector("#turnLabel").textContent = `${_player} Win`
            console.log(`${_player}Icon`)
            //const playerIcon = document.querySelector(`.${_player}Icon`)
            //playerIcon.style.zIndex= "9"
            //playerIcon.style.transform = "translateY(600px) rotate(360deg)"
            player1.turn = 0
            player2.turn = 0
            }
        }
        // checks player array to see if the array matches the win conditions array
        function checkWin(winCondition){
            return winCondition.every(n => playerArray.includes(n))
            } 
            console.log(_player)
            }
        }
    }

    const resetAll = (player1,player2) => {
            console.log("resetting")
            const gamePanel = document.querySelectorAll(".gamePanel")
            gamePanel.forEach(gamePanel => {
                gamePanel.removeAttribute('style');
                if (gamePanel.firstChild){
                        gamePanel.removeChild(gamePanel.firstChild)
                }
            })
            gameBoard = []
            getTurn(player1,player2) 
    }



        return{start,getTurn,resetAll}
})()
    









