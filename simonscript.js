let userSeq = []; // Sequence of buttons pressed by the user
let gameSeq = []; // Sequence of buttons to be matched by the user
let h2 = document.querySelector("h2"); // Heading element to display the level and messages
let btns = ["yellow", "red", "purple", "green"]; 

let started = false; // Game start status
let level = 0; // Current game level

// Start the game when a key is pressed
document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game started");
        started = true;
        levelup();
    }
});

// Function to flash the game button
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 150);
}

// Function to flash the user button
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 150);
}

// Function to advance to the next level
function levelup() {
    userSeq = []; // Clear user sequence
    level++;
    h2.innerText = `level ${level}`;

    // Generate a random button to flash
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn); // Flash the random button
}

// Function to check the user's answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000); // Level up if the sequence is correct
        }
    } else {
        h2.innerHTML = `game over! your score was <b>${level}</b> <br> press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset(); // Reset the game if the sequence is incorrect
    }
}

// Function to handle button press by the user
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1); // Check the user's answer
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
