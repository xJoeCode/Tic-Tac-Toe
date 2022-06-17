
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
    console.log(player1)
    console.log(player2)
    const gamePanel = document.querySelectorAll(".gamePanel")
    gamePanel.forEach(gamePanel => gamePanel.addEventListener('click', function playermark(e){
        if(player1.turn > 0 && e.target.style.backgroundColor != player1.getColor() && e.target.style.backgroundColor != player2.getColor()){
            console.log(player1.getColor)
            e.target.style.backgroundColor = player1.getColor()
            const datakey = e.target.getAttribute("data-key")
            gameBoard.push(`player1 key =${datakey}`)
            console.log(gameBoard)
            player1.turn--
            player2.turn++
            } else if (player2.turn > 0 && e.target.style.backgroundColor != player1.getColor() && e.target.style.backgroundColor != player2.getColor()){
                e.target.style.backgroundColor = player2.getColor()
                const datakey = e.target.getAttribute("data-key")
                gameBoard.push(`player2 key =${datakey}`)
                console.log(gameBoard)
                player2.turn--
                player1.turn++
                
            }
    }))
}

gameOn("tom", "jimmy")