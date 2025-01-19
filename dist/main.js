// Select Dom elements
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
let words = ["Create", "Update", "Delete", "Master", "Branch", "Styles", "Layout"];
let randomNum = Math.floor(Math.random() * words.length)
let wordToGuess = words[randomNum];
let wordToGuessArray = wordToGuess.split("");
// create try and add new try
function addTry () {
    let newTry = '';
    newTry.innerHTML = `
    <div id="try" class="try space-x-3 justify-between h-20 opacity-50 w-full flex items-center">
                    <span class="font-bold text-2xl w-16">Try ${currentTry}</span>
                    <ul class="w-full h-full letters flex space-x-3">
                        <li class="letter text-white w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-green-300">C</li>
                        <li class="letter text-white w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-slate-400">P</li>
                        <li class="letter text-white w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-slate-400">E</li>
                        <li class="letter text-white w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-green-300">B</li>
                        <li class="letter text-white w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-slate-400">M</li>
                        <li class="letter text-white w-20 h-full text-center font-medium text-6xl pt-3 text-wihte bg-slate-400">Z</li>
                    </ul>
                </div>
                `;
    document.querySelector("#tries").appendChild(newTry);
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
    let currentWordArray = letters[currentTry].map(letter => {
        return letter.value;
    })
    console.log(currentWordArray);
    // for (let i = 0; i < wordToGuessArray.length; i++){

    // }
})