// Select Dom elements
const triesContainer = document.getElementById("tries");
const check = document.getElementById("check");
const hint = document.getElementById("hint");
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("body > h1").innerHTML = gameName;
let tries = document.querySelectorAll("#try");

// Setting game options
let numberOfTries = 5;
let numberOfHints = 2;
let currentTry = 1;
// Manage words
let words = ["create", "update", "delete", "master", "branch", "styles", "layout"]
let randomNum = Math.floor(Math.random() * words.length)
let wordToGuess = words[randomNum];
console.log(wordToGuess)
let wordToGuessArray = wordToGuess.split("");
// create try and add new try
function addTry () {
    let newTry = '';
    newTry += `
    <div id="try" class="try space-x-3 justify-between h-20 w-full flex items-center">
        <span class="font-bold text-2xl w-16">Try 1</span>
        <ul class="w-full h-full letters flex space-x-3">
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="w-full absolute left-0 top-1 border-none outline-none text-center" type="text"></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
        </ul>
    </div>
    `;
    triesContainer.innerHTML += newTry;
}
tries.forEach(tryElement => {
    const letters = tryElement.querySelectorAll(".letter input");
    letters.forEach((letter, index) => {
        letter.addEventListener("keyup", (event) => {
            // if a letter was entered
            if (event.target.value.length === 1){
                // make current input readonly
                event.target.setAttribute("readonly", "true");
            }
            // Move to the next input if it exsists
            if (index !== letters.length - 1){
                let nextLetter = letters[index + 1];
                nextLetter.removeAttribute("readonly");
                nextLetter.focus();
            }
        })
    })
})
// Check word button click event
check.addEventListener("click", () => {
    // Get the current try
    let currentInput = tries[currentTry - 1].querySelectorAll(".letter input");
    let currentWordArray = Array.from(currentInput).map(letter => letter.value);
    if (currentWordArray.join("") === wordToGuess){
        alert("You Won");
        location.reload();
    }
    else{
        for (let i = 0; i < wordToGuessArray.length; i++){
            currentInput[i].parentElement.innerHTML = currentInput[i].value;
            currentInput[i].parentElement.style.color = "white";
            if (wordToGuess.includes(currentWordArray[i].toLowerCase())){
                currentInput[i].parentElement.style.backgroundColor = "green";
                if (wordToGuessArray[i].toLowerCase() === currentWordArray[i].toLowerCase()){
                    currentInput[i].parentElement.style.backgroundColor = "yellow";
                    currentInput[i].parentElement.style.borderBottom = "none";
                }
            }
            else{
                currentInput[i].parentElement.style.backgroundColor = "grey";
                currentInput[i].parentElement.style.borderBottom = "none";
                currentInput[i].style.backgroundColor = "grey";
                currentInput[i].parentElement.style.color = "white";
            }
            currentInput[i].style.display = "none";
        }
    }
    if (currentTry !== numberOfTries && currentWordArray.join("") !== wordToGuess){
        addTry()
        currentTry++;
    }
    else if (currentTry === numberOfTries){
        alert("You Lost");
        location.reload();
    }
})