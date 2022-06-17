
const player = (name, color) => {
    let turn = 0;
    const getName = () => name
    const getColor = () => color

    return{getName,getColor,turn}
}



const gameOn = (name1, name2) => {
    let gameBoard = []
    const player1 = player(`${name1}`, "blue")
    const player2 = player(`${name2}`, "red")
    console.log(typeof player1.getName())
    player1.turn++
    const gamePanel = document.querySelectorAll(".gamePanel")
    gamePanel.forEach(gamePanel => gamePanel.addEventListener('click', function playermark(e){

        if(player1.turn > 0 && e.target.style.backgroundColor != player1.getColor() && e.target.style.backgroundColor != player2.getColor()){
            e.target.style.backgroundColor = player1.getColor()
            const datakey = e.target.getAttribute("data-key")
            gameBoard.push(`player1${datakey}`)
            //console.log(gameBoard)
            checkWinCondition("player1")
            player1.turn--
            player2.turn++

            } else if (player2.turn > 0 && e.target.style.backgroundColor != player1.getColor() && e.target.style.backgroundColor != player2.getColor()){
                e.target.style.backgroundColor = player2.getColor()
                const datakey = e.target.getAttribute("data-key")
                gameBoard.push(`player2${datakey}`)
                //console.log(gameBoard)
                checkWinCondition("player2")
                player2.turn--
                player1.turn++
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
        const playerArray = (gameBoard.filter(player => player.includes(`${_player}`)).map(n => n.replace(`${_player}`,'')))
        console.log(playerArray)
        
        // loops every array in the wincondition object to check who matches the win conditions
        for (array in wincondition){
           const playerWin = checkWin(wincondition[array])
           console.log(playerWin)
           if (playerWin){
               console.log(playerWin)
               alert(`${_player} Wins`)
            }
        }
        // checks player array to see if the array matches the win conditions
        function checkWin(winCondition){
           return winCondition.every(n => playerArray.includes(n))
        } 
        console.log(_player)
               
    }
}

gameOn("tom", "jimmy")