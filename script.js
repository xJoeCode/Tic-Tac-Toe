
const player = (name, avatar) => {
    console.log('newplayer')
    let turn = 0;
    //const hideform = () => {document.querySelector(".formContainer").style.display = "none"}
    const getAvatarValues = () => {
        const avatarValue = document.getElementsByName(avatar)
        for(let i = 0; i < avatarValue.length; i++){
            if(avatarValue[i].checked){
                return avatarValue[i].value
            }
        }
    }
    const getName = () => name
    //const getColor = () => color
    //const getAvatar = () => avatar
    return {getName,turn, getAvatarValues}
}


const gameStarter = (name1, name2, avatar1, avatar2) =>{

    const getTurn = () =>{
        const starfirstValue = document.getElementsByName("start")
        for(let i = 0; i < starfirstValue.length; i++){
            if(starfirstValue[i].checked){
                if(starfirstValue[i].value == 1){
                    console.log("player1getsturn")
                    player1.turn++
                } else if (starfirstValue[i].value == 2){
                    player2.turn++
                    console.log("player2getsturn")
                }
            }
        }
    }
        const player1 = player(name1,avatar1)
        const player2 = player(name2, avatar2)
        const player1Avatar = player1.getAvatarValues()
        const player2avatar = player2.getAvatarValues()
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
        getTurn()
        gameOn.start(player1, player2)
        }
    }

    
    

const gameOn = (() => {
    let gameBoard = []
    const start = (player1, player2) =>{
    if(player1.turn > 0){
        document.querySelector("#turnLabel").textContent = `${player1.getName()}'s Turn`
        } else if (player2.turn >0){
            document.querySelector("#turnLabel").textContent = `${player2.getName()}'s Turn`
        }
    const gameBoardIcons = document.querySelector(".gameBoard")
    const player1Icon = document.createElement("img")
    player1Icon.setAttribute("src", `./Assets/${player1.getAvatarValues()}.png`)
    player1Icon.classList.add(`${player1.getName()}Icon`)
    const player2Icon = document.createElement("img")
    player2Icon.setAttribute("src", `./Assets/${player2.getAvatarValues()}.png`)
    player2Icon.classList.add(`${player2.getName()}Icon`)
    gameBoardIcons.appendChild(player1Icon)
    gameBoardIcons.appendChild(player2Icon)
        
        
    const gamePanel = document.querySelectorAll(".gamePanel")
    gamePanel.forEach(gamePanel => gamePanel.addEventListener('click', function playermark(e){
        if(player1.turn > 0 && !(e.target.hasChildNodes()) && e.target.className == "gamePanel"){
            const icon = document.createElement("img")
            icon.setAttribute("src", `./Assets/${player1.getAvatarValues()}.png`)
            e.target.appendChild(icon)
            const datakey = e.target.getAttribute("data-key")
            gameBoard.push(`${player1.getName()}${datakey}`)
            console.log(gameBoard)
            player1.turn--
            player2.turn++
            document.querySelector("#turnLabel").textContent = `${player2.getName()}'s Turn`
            checkWinCondition(player1.getName())
            } else if (player2.turn > 0 && !(e.target.hasChildNodes()) && e.target.className == "gamePanel"){
                document.querySelector("#turnLabel").textContent = `${player2.getName()}'s Turn`
                const icon = document.createElement("img")
                icon.setAttribute("src", `./Assets/${player2.getAvatarValues()}.png`)
                e.target.appendChild(icon)
                const datakey = e.target.getAttribute("data-key")
                gameBoard.push(`${player2.getName()}${datakey}`)
                console.log(gameBoard)
                player2.turn--
                player1.turn++
                document.querySelector("#turnLabel").textContent = `${player1.getName()}'s Turn`
                checkWinCondition(player2.getName())
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
            const playerIcon = document.querySelector(`.${_player}Icon`)
            playerIcon.style.zIndex= "9"
            playerIcon.style.transform = "translateY(600px) rotate(360deg)"
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
            
    }}
    return{start}
})()
    









