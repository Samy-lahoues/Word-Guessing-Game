// Select Dom elements
const triesContainer = document.getElementById("tries");
const check = document.getElementById("check");
const hintBtn = document.getElementById("hint");
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("body > h1").innerHTML = gameName;
let tries = document.querySelectorAll(".try");

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
// Manage hints
function updateHints(){
    hintBtn.querySelector("span").innerHTML = `Hints (${numberOfHints})`;
}
updateHints();
// create try and add new try

function addTry () {
    let newTry = '';
    newTry += `
    <div class="try space-x-3 justify-between h-20 w-full flex items-center">
        <span class="font-bold text-2xl w-16">Try ${currentTry}</span>
        <ul class="w-full h-full letters flex space-x-3">
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="single-letter w-full absolute left-0 top-1 border-none outline-none text-center" type="text"></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="single-letter w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="single-letter w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="single-letter w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="single-letter w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
            <li class="letter overflow-hidden relative text-black w-20 h-full text-center font-medium text-6xl text-wihte bg-white border-solid border-black border-b-2"><input maxlength="1" class="single-letter w-full absolute left-0 top-1 border-none outline-none text-center" type="text" readonly></li>
        </ul>
    </div>
    `;
    triesContainer.innerHTML += newTry;
    addEventListenersToTries();
    tries = document.querySelectorAll(".try");
    tries[currentTry - 1].querySelector(".letter input").focus();
}

function addEventListenersToTries() {
    let tries = document.querySelectorAll(".try");
    tries.forEach(tryElement => {
        const letters = tryElement.querySelectorAll(".letter input");
        letters.forEach((letter, index, array) => {
            letter.addEventListener("keyup", (event) => {
                // if a letter was entered
                if (event.target.value.length === 1){
                    // make current input readonly
                    event.target.setAttribute("readonly", "true");
                }
                // Move to the next input if it exists
                if (index !== letters.length - 1){
                    if (!array[index + 1].classList.contains("hint")){
                        let nextLetter = letters[index + 1];
                        nextLetter.removeAttribute("readonly");
                        nextLetter.focus();
                    }
                    else if ((index + 2) !== (letters.length - 1) && array[index + 1].classList.contains("hint")){
                        let nextLetter = letters[index + 2];
                        nextLetter.removeAttribute("readonly");
                        nextLetter.focus();
                    }
                }
            })
        })
    })
}

addEventListenersToTries();
// Check word button click event
check.addEventListener("click", () => {
    // Get the current try
    tries = document.querySelectorAll(".try");
    console.log(currentTry);
    console.log(tries[currentTry - 1]);
    let currentInput = tries[currentTry - 1].querySelectorAll(".letter input");
    let currentWordArray = Array.from(currentInput).map(letter => letter.value);
    if (currentWordArray.join("") === wordToGuess){
        alert("You Won");
        location.reload();
    }
    else{
        for (let i = 0; i < wordToGuessArray.length; i++){
            if (wordToGuess.includes(currentWordArray[i].toLowerCase())){
                currentInput[i].parentElement.style.backgroundColor = "green";
                currentInput[i].parentElement.style.borderBottom = "none";
                currentInput[i].style.backgroundColor = "green";
                console.log(wordToGuessArray[i].toLowerCase(), currentWordArray[i].toLowerCase())
                if (wordToGuessArray[i].toLowerCase() === currentWordArray[i].toLowerCase()){
                    currentInput[i].parentElement.style.backgroundColor = "yellow";
                    currentInput[i].parentElement.style.borderBottom = "none";
                    currentInput[i].style.backgroundColor = "yellow";
                }
            }
            else{
                currentInput[i].parentElement.style.backgroundColor = "grey";
                currentInput[i].parentElement.style.borderBottom = "none";
                currentInput[i].style.backgroundColor = "grey";
            }
        }
    }
    if (currentTry !== numberOfTries && currentWordArray.join("") !== wordToGuess){
        tries[currentTry - 1].style.opacity = "0.5";
        tries[currentTry - 1].querySelectorAll("li").forEach((liElement, index) => {
            liElement.textContent = currentWordArray[index];
            liElement.classList.remove("text-black")
            liElement.classList.add("text-white");
        });
        tries[currentTry - 1].querySelectorAll("input").forEach(inputElement => {
            inputElement.style.display = "none";
        })
        currentTry++;
        addTry()
    }
    else if (currentTry === numberOfTries && currentWordArray.join("") !== wordToGuess){
        alert("You Lost");
        location.reload();
    }
})
hintBtn.onclick = () => {
    tries = document.querySelectorAll(".try");
    if (numberOfHints > 0){
        let randomIndex = Math.floor(Math.random() * wordToGuessArray.length)
        let randomLetter = wordToGuessArray[randomIndex];
        const hintInput = tries[currentTry - 1].querySelectorAll(".letter input");
        hintInput[randomIndex].classList.add("hint");
        hintInput[randomIndex].value = randomLetter;
        hintInput[randomIndex].style.backgroundColor = "yellow";
        hintInput[randomIndex].style.width = "100%";
        hintInput[randomIndex].parentElement.style.backgroundColor = "yellow";
        hintInput[randomIndex].parentElement.style.borderBottom = "none";
        numberOfHints--;
        updateHints();
    }
    else{
        alert("You have no more hints");
        hintBtn.style.display = "none";
    }
}