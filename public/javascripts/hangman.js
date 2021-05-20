// Initialize word variable
let word;
// Initialize # of lives
let lives = 5;
// Keep track of guesses
let guesses = [];

// Starts an new game, clearing any existing ones
function hangmanGame(){
    // Checks for an existing game
    if (document.getElementById("letter") !== null) {
        // Reset
        document.getElementById("guessButton").disabled = false;
        document.getElementById("guesses").value = 100;
        document.getElementById("guessBox").value = "";
        document.getElementById("hangmanImage").src = "images/hangman_01.jpg";
        let element = document.getElementById("word");
        element.removeChild(element.firstChild);
        // Removes any "wrong" messages
        if (document.getElementById("notFound") !== null) {
            let deleteThis = document.getElementById("makeGuess");
            deleteThis.removeChild(deleteThis.firstChild);
        }
        // Sets lives back to 5
        lives = 5;
        // Resets the guesses array
        guesses.length = 0;
    }
    // Initialize Game (choose category and size of word)
    let category = chooseCategory();
    word = chooseWord(category);
    console.log(word);

    // Display word on the page
    let wordBox = document.getElementById('word');
    let correct = document.createElement('tr');
    for (let i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'hangmanWord');
        let wordDisplay = document.createElement('td');
        wordDisplay.setAttribute('id', 'letter');
        wordDisplay.setAttribute('class', 'letter')
        wordDisplay.innerHTML = "_";
        wordBox.appendChild(correct);
        correct.appendChild(wordDisplay);
    }
}
// Updates the number of lives and progress bar/image on the page when a wrong guess is made
function updateProgress(){
    document.getElementById('guesses').value -= 20;
    lives--;
    if (lives === 4) {
        document.getElementById("hangmanImage").src = "images/hangman_02.jpg";
    }
    if (lives === 3) {
        document.getElementById("hangmanImage").src = "images/hangman_03.jpg";
    }
    if (lives === 2) {
        document.getElementById("hangmanImage").src = "images/hangman_04.jpg";
    }
    if (lives === 1) {
        document.getElementById("hangmanImage").src = "images/hangman_05.jpg";
    }
    if (lives === 0) {
        document.getElementById("hangmanImage").src = "images/hangman_07.jpg";
        //resets red messages
        if (document.getElementById("notFound") !== null) {
            let deleteThis = document.getElementById("makeGuess");
            deleteThis.removeChild(deleteThis.firstChild);
        }
        document.getElementById("guessButton").disabled = true;
        showLossMessage();
    }
}
// Chooses a random word from the array given the length and category constraints
// provided by the user
function chooseWord(category) {
    let wordLength = document.getElementById('number').value;
    let lessWords = [];
    let j = 0;
    for (let i = 0; i < category.length; i++) {
        if (category[i].word.length < wordLength) {
            lessWords[j] = category[i].word;
            j++;
        }
    }
    return lessWords[Math.floor(Math.random() * lessWords.length)];
}
// Returns the category chosen by the user in JSON format
function chooseCategory() {
    // Categories JSON structure
    let categories = {
    "Famous Composers": [
        {"word": "mozart"},
        {"word": "beethoven"},
        {"word": "vivaldi"},
        {"word": "shostakovich"},
        {"word": "brahms"},
        {"word": "dvorak"},
        {"word": "holst"},
        {"word": "sibelius"},
        {"word": "elgar"},
        {"word": "popper"}
        ],
    "Fruits": [
        {"word": "apple"},
        {"word": "banana"},
        {"word": "orange"},
        {"word": "grapefruit"},
        {"word": "peach"},
        {"word": "guava"},
        {"word": "kiwi"},
        {"word": "nectarine"},
        {"word": "pineapple"},
        {"word": "passionfruit"}
        ]
    }
    console.log(categories);
    if (document.getElementById("composers").checked) {
        return categories["Famous Composers"];
    }
    else {
        return categories["Fruits"];
    }
}
// Checks if the guessed letter is in the word
function guessLetter(guess) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
            return true;
        }
    }
    return false;
}
// Checks if the guessed word is the same as the word
function guessWord(guess) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] !== guess[i]) {
            return false;
        }
    }
    return true;
}
// Makes a guess based on the contents of the textbox on the page
// Checks the word if the textbox has a word
// Searches for the letter in the word if the textbox has a letter
function makeGuess() {
    // Resets wrong guess message
    if (document.getElementById("notFound") !== null) {
        let deleteThis = document.getElementById("makeGuess");
        deleteThis.removeChild(deleteThis.firstChild);
    }
    // If a game hasn't been started yet, makes sure that there is no error
    if (word === undefined) {
        return;
    }
    // Reads the guess in the textbox on the page
    let guess = document.getElementById("guessBox").value;
    // If the guess is nothing (textbox was empty) answer will not count
    if (guess === "") {
        return;
    }
    // If letter has already been guessed, displays message and returns
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i] === guess) {
            let notFound = document.createElement("div");
            notFound.id = "notFound";
            notFound.style = "color: red; padding-left: 10px";
            notFound.innerHTML = "letter has already been guessed";
            document.getElementById("makeGuess").appendChild(notFound);
            return;
        }
    }
    // If not, guess gets added to the guesses array
    guesses.push(guess);
    // Guess is a word
    if (guess.length > 1 && guess.length !== 0) {
        if (guessWord(guess)) {
            let element = document.querySelectorAll(".letter")
            for (let i = 0; i < word.length; i++) {
                element[i].innerHTML = word[i];
            }
            // Shows win message
            showVictoryMessage();
        }
        else {
            // Immediate loss if the word is wrong
            while(lives !== 0) {
                updateProgress();
            }
        }
    }
    // Guess is a letter
    else {
        if (guessLetter(guess)) {
            let element = document.querySelectorAll(".letter")
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    element[i].innerHTML = guess;
                }
            }
            for (let i = 0; i < word.length; i++) {
                if (element[i].innerHTML === "_") {
                    return;
                }
            }
            showVictoryMessage();
        }
        // Lose a life if the letter is wrong
        else {
            let notFound = document.createElement("div");
            notFound.id = "notFound";
            notFound.style = "color: red; padding-left: 10px";
            notFound.innerHTML = "Wrong letter";
            document.getElementById("makeGuess").appendChild(notFound);
            updateProgress();
        }
    }
}
// Displays the victory message when a game is won
function showVictoryMessage() {
    let wonGame = document.createElement("div");
    wonGame.id = "notFound";
    wonGame.style = "color: green; padding-left: 10px;"
    wonGame.innerHTML = "Congratulations, You Won!";
    document.getElementById("makeGuess").appendChild(wonGame);
    document.getElementById("guessButton").disabled = true;
}
// Displays the "Game Over" message when a game is lost
function showLossMessage() {
    let notFound = document.createElement("div");
    notFound.id = "notFound";
    notFound.style = "color: red; padding-left: 10px;"
    notFound.innerHTML = "Game Over";
    document.getElementById("makeGuess").appendChild(notFound);
}