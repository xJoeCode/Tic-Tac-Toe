const player = (name, color) => {
    let gameBoard = []
    let turn = 0;
    const getName = () => name
    const getColor = () => color

    const start = () => {
        turn++
    }

    
    const play = () => {
        const gamePanel = document.querySelectorAll(".gamePanel")
        gamePanel.forEach(gamePanel => gamePanel.addEventListener('click', function playermark(e){
            if (turn > 0){
            console.log(getColor)
            e.target.style.backgroundColor = color
            const datakey = e.target.getAttribute("data-key")
            gameBoard.push(datakey)
            console.log(gameBoard)
            turn--

                }
            }))
    }

    const passturn = (name) =>{
        if (turn > 0){
            console.log("passing turn")
            turn--
            name.turn++
            name.play("red")
        }
    }

    return{start, getName,getColor,play,passturn}

}





const tom = player("tom", "blue")
const jimmy = player("jimmy", "red")
tom.start()
tom.play()
jimmy.play()



const gameOn = () =>{
    
    for (let i= 0; i<10; i++ ){
        player1.play(1,red)
        player2.play(1,blue)
    }
}
