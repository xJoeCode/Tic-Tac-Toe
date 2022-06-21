
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
        getTurn()
        gameOn.start(player1, player2)
        }
    }

    
    

const gameOn = (() => {
    let gameBoard = []
    const start = (player1, player2) =>{
    const gamePanel = document.querySelectorAll(".gamePanel")
    gamePanel.forEach(gamePanel => gamePanel.addEventListener('click', function playermark(e){

        if(player1.turn > 0 && !(e.target.hasChildNodes()) && e.target.className == "gamePanel"){
            //e.target.style.backgroundColor = player1.getColor()
            const icon = document.createElement("img")
            icon.setAttribute("src", `./Assets/${player1.getAvatarValues()}.png`)
            e.target.appendChild(icon)
            const datakey = e.target.getAttribute("data-key")
            gameBoard.push(`${player1.getName()}${datakey}`)
            console.log(gameBoard)
            player1.turn--
            player2.turn++
            checkWinCondition(player1.getName())
            } else if (player2.turn > 0 && !(e.target.hasChildNodes()) && e.target.className == "gamePanel"){
                console.log(e.target)
                //e.target.style.backgroundColor = player2.getColor()
                const icon = document.createElement("img")
                icon.setAttribute("src", `./Assets/${player2.getAvatarValues()}.png`)
                e.target.appendChild(icon)
                const datakey = e.target.getAttribute("data-key")
                gameBoard.push(`${player2.getName()}${datakey}`)
                console.log(gameBoard)
                player2.turn--
                player1.turn++
                checkWinCondition(player2.getName())
            }
    }))

    function checkWinCondition(_player){

        wincondition = {
            winCondition1: ['01', '02' ,'03'],
            winCondition2: ['01', '04', '07'],
            winCondition3: ['01', '05', '09'],
            winCondition3: ['02', '05', '08'],
            winCondition4: ['03', '05', '07'],
            winCondition5: ['03', '06', '09'],
            winCondition6: ['04', '05', '06'],
            winCondition7: ['07', '08', '09']
        }
        
        // removes the player name from the array
        if (gameBoard.length == 9){
            alert("Its a Tie")
        } else {
        const playerArray = (gameBoard.filter(player => player.includes(`${_player}`)).map(n => n.replace(`${_player}`,'')))
        console.log(playerArray)
        
        // loops every array in the wincondition object to check who matches the win conditions
        for (array in wincondition){
        const playerWin = checkWin(wincondition[array])
        if (playerWin){
            wincondition[array].forEach(element => document.querySelector(`[data-key="${element}"]`).style.backgroundColor = "black" )
            alert(`${_player} Wins`)
            player1.turn = 0
            player2.turn = 0
            console.log(player1)
            console.log(player2)
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
    



//const tom = player("tom", "blue")
//const jimmy = player("jimmy", "green")
//gameOn.getTurn(tom)
//gameOn.start(tom, jimmy)