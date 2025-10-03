let wins=0, losses= 0, ties = 0;

//callback to user's choice
function handleUserChoice(choice, callback){
    document.querySelectorAll("#user-throw img").forEach(img => {
        //Highlights image
        img.classList.remove("selected");
    });
    document.querySelector(`[data-choice="${choice}"]`).classList.add("selected");

    callback(choice);
}

//Callback to computer's choice
function compThrow(callback){
    const choices = ["rock", "paper", "scissors"];
    const computerImg = document.getElementById("computer-image");
    let shuffleIndex = 0;

    const shuffleInterval = setInterval(() => {
        computerImg.src = `game.PNG/${choices[shuffleIndex]}.PNG`;
        shuffleIndex = (shuffleIndex + 1) % choices.length;
    }, 500);

    //Sets the computers choice at random
    setTimeout(() => {
    clearInterval(shuffleInterval);
    const finalChoice = choices[Math.floor(Math.random() * choices.length)];
    computerImg.src = `game.PNG/${finalChoice}.PNG`;
    callback(finalChoice);
    }, 3000);

}

//Declares the winner depending on the user and computers throw.
function chooseWinner(user, computer, callback){
    let result ="";
    if (user === computer){
        result = "It's a tie!";
        ties++
    }else if(
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        result = "You win!";
        wins++;
    }else {
        result = "Computer wins!";
        losses++;
    }
    callback(result);
}

//Updates wins and losses to scoreboard.
function updateResult(result){
    document.getElementById("result-text").textContent = result;
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("ties").textContent = ties;
}

// Resets scoreboard, user's and computer's choice after button is clicked.
function restartGame(){
    wins = losses = ties = 0;
    document.getElementById("wins").textContent = 0;
    document.getElementById("losses").textContent = 0;
    document.getElementById("ties").textContent = 0;
    document.getElementById("computer-image").src = "game.PNG/question-mark.PNG";
    document.getElementById("result-text").textContent = "Make your move!";
    document.querySelectorAll("#user-throw img").forEach(img => {
        img.classList.remove("selected");
    });

}

// Event listeners
document.querySelectorAll("#user-throw img").forEach(img => {
    img.addEventListener("click", () => {
        const userChoice = img.dataset.choice;

        handleUserChoice(userChoice, (choice) =>{
            compThrow((computerChoice) => {
                chooseWinner(choice, computerChoice, (result) => {
                    updateResult(result);
                });
            });
        });
    });
});

document.getElementById("reset").addEventListener("click", restartGame);
