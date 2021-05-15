function hangmanGame(){

    // Initialize # of lives
    let lives = 5;
    // Initialize Game (choose category and size of word)
    let category = chooseCategory();
    let word = chooseWord(category);
    console.log(word);

    // Keeps track of the guesses
    let guesses = [];

    let wordBox = document.getElementById("word");
    let correct = document.createElement('div');
    for (let i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'hangmanWord');
        let wordDisplay = document.createElement('div');
        wordDisplay.setAttribute('id', 'guess');
        wordDisplay.innerHTML = "_";
        guesses.push(wordDisplay);
        wordBox.appendChild(correct);
        correct.appendChild(wordDisplay);
    }
}
function updateProgress(){
    document.getElementById("guesses").value -= 20;
}
function chooseWord(category) {
    let wordLength = document.getElementById("number").value;
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
    if (document.getElementById("composers").checked) {
        return categories["Famous Composers"];
    }
    else {
        return categories["Fruits"];
    }
}

