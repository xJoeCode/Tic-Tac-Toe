
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
    player1.turn++
    const gamePanel = document.querySelectorAll(".gamePanel")
    gamePanel.forEach(gamePanel => gamePanel.addEventListener('click', function playermark(e){
        if(player1.turn > 0 && e.target.style.backgroundColor != player1.getColor() && e.target.style.backgroundColor != player2.getColor()){
            console.log(player1.getColor)
            e.target.style.backgroundColor = player1.getColor()
            const datakey = e.target.getAttribute("data-key")
            gameBoard.push(`player1${datakey}`)
            //console.log(gameBoard)
            checkWinCondition()
            player1.turn--
            player2.turn++
            } else if (player2.turn > 0 && e.target.style.backgroundColor != player1.getColor() && e.target.style.backgroundColor != player2.getColor()){
                e.target.style.backgroundColor = player2.getColor()
                const datakey = e.target.getAttribute("data-key")
                gameBoard.push(`player2 ${datakey}`)
                //console.log(gameBoard)
                player2.turn--
                player1.turn++
            }
    }))
    function checkWinCondition(){

        wincondition = {
            winCondition1: ['01', '02' ,'03'],
            winCondition2: ['01', '04', '07'],
            winCondition3: ['01', '05', '09'],
            winCondition3: ['02', '05', '08'],
            winCondition4: ['03', '05', '07'],
            winCondition5: ['03', '06', '09'],
            winCondition6: ['04','05','06'],
            winCondition7: ['07', '08', '09']
        }
        
        // const winCondition2 = 
        const player1 = (gameBoard.filter(player => player.includes("player1")).map( n => n.replace('player1','')))
        for (array in wincondition){
           const player1Win = checkWin(wincondition[array])
           if (player1Win){
               console.log(player1Win)
               alert("Player 1 Wins")
            }
            
        }
        function checkWin(winCondition1){
           return winCondition1.every(n => player1.includes(n))
        } 
        console.log(player1)
               
    }
}

gameOn("tom", "jimmy")