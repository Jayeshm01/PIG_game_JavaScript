var scores , roundScore, activePlayer , gameActive , prevDice
gameActive = false
init()

function init() {
    scores = [0,0]
    roundScore = 0
    activePlayer = 0
    document.querySelector(".dice").style.display = 'none'
    document.querySelector("#current-0").textContent = '0'
    document.querySelector("#current-1").textContent = '0' 
    document.querySelector("#score-0").textContent = '0' 
    document.querySelector("#score-1").textContent = '0'
    document.querySelector('#name-0').textContent = 'Player-1'
    document.querySelector('#name-1').textContent = 'Player-2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('active')
    gameActive = true
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 :activePlayer = 0
    roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none'
}


document.querySelector('.btn-roll').addEventListener('click',function(){
    if (gameActive) {
        var dice = Math.floor(Math.random() * 6) + 1
        var diceDOM  = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'
        if (dice === 6 && prevDice === 6) {
            scores[activePlayer] = 0
            document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer]
            nextPlayer()
        } else if (dice !== 1) {
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        }else {
            nextPlayer()
        }
        prevDice = dice
    }    
})



document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gameActive){
        scores[activePlayer] += roundScore
        document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer]

        if (scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gameActive = false
        }else{
            nextPlayer()
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init)
