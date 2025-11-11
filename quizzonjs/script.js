const questions = [
  { q: "What is event bubbling?", options: ["An event propagates from the target element up to ancestors", "An event propagates from ancestors down to target", "An event repeats indefinitely", "An event is captured by children only", "An event cancels itself"], answer: 0 },
  { q: "What is the difference between synchronous and asynchronous code?", options: ["Synchronous code blocks execution, async runs in background", "Async is faster", "Sync is deprecated", "Async is single-threaded", "Sync uses promises"], answer: 0 },
  { q: "Which array method creates a new array with the results of calling a function on every element?", options: ["map()", "forEach()", "filter()", "reduce()", "some()"], answer: 0 },
  { q: "What is a JavaScript module?", options: ["A file or script that exports values and imports dependencies", "A function that returns another function", "An object literal", "A prototype method", "A special variable"], answer: 0 },
  { q: "Which method merges two or more arrays?", options: ["concat()", "merge()", "push()", "append()", "join()"], answer: 0 },
  { q: "What is the result of 'typeof NaN'?", options: ["'number'", "'NaN'", "'undefined'", "'object'", "'null'"], answer: 0 },
  { q: "How is memory managed in JavaScript?", options: ["Automatic garbage collection", "Manual free and malloc", "Reference counting by developer", "Using weak references", "No memory management"], answer: 0 },
  { q: "What is event capturing?", options: ["An event propagates from the root to the target element", "An event propagates from target to root", "An event is stopped by propagation", "An event repeats indefinitely", "An event is prevented"], answer: 0 },
  { q: "How do you create a promise?", options: ["new Promise((resolve, reject) => {})", "Promise.create()", "Promise.new()", "async function", "Promise.then()"], answer: 0 },
  { q: "What does Object.freeze() do?", options: ["Prevents modification of object properties", "Deletes object properties", "Makes object enumerable", "Creates a deep copy", "Turns object into a proxy"], answer: 0 },
  { q: "Which method checks if an object contains a property?", options: ["hasOwnProperty()", "contains()", "in operator", "exist()", "checkProperty()"], answer: 0 },
  { q: "What is the output of 'typeof function() {}'?", options: ["function", "object", "undefined", "method", "class"], answer: 0 },
  { q: "What keyword is used to handle exceptions in JavaScript?", options: ["try-catch", "throw", "catch-try", "exception", "handle"], answer: 0 },
  { q: "How can you convert a string to a number?", options: ["parseInt()", "Number()", "Unary plus (+)", "All of the above", "toString()"], answer: 3 },
  { q: "What is the difference between 'slice()' and 'splice()' in arrays?", options: ["slice() returns a shallow copy, splice() modifies original", "slice() modifies original, splice() returns a shallow copy", "Both do the same", "slice() adds elements, splice() removes", "None of the above"], answer: 0 },
  { q: "What is a callback function?", options: ["A function passed as argument to another", "A function returned from another", "A recursive function", "A function that initializes objects", "A function with no arguments"], answer: 0 },
  { q: "What does 'console.log(typeof null)' return?", options: ["object", "null", "undefined", "boolean", "number"], answer: 0 },
  { q: "What does 'JSON.stringify()' do?", options: ["Converts object to JSON string", "Parses JSON string to object", "Creates JSON schema", "Calls toString method", "Generates JSON file"], answer: 0 },
  { q: "Which of the following is NOT a primitive data type?", options: ["Object", "String", "Number", "Boolean", "Symbol"], answer: 0 },
  { q: "What is the output of '0 && 1' ?", options: ["0", "1", "true", "false", "undefined"], answer: 0 },
  { q: "What is the output of 'null == undefined'?", options: ["true", "false", "undefined", "null", "error"], answer: 0 },
  { q: "What is the use of 'typeof' operator?", options: ["Returns the type of a variable", "Converts data types", "Declares variable types", "Checks if a variable exists", "Parses JSON"], answer: 0 },
  { q: "Which of the following is NOT a looping structure in JavaScript?", options: ["foreach", "for", "while", "do-while", "for...in"], answer: 0 },
  { q: "How do you declare an asynchronous function?", options: ["async function", "function async", "async =>", "async()", "function* async()"], answer: 0 },
  { q: "What is a generator function?", options: ["A function that can pause and resume execution", "A function that returns a promise", "A function that automatically retriggers", "A function that creates objects", "None of the above"], answer: 0 },

];

let currentGroup = 0;
let usedQuestions = [];
let currentAnswer = -1;
let currentQIndex = -1;
let timerInterval;
let timeLeft = 15;
const groups = ["groupA", "groupB", "groupC", "groupD", "groupE"];

document.getElementById("generateBtn").addEventListener("click", generateQuestion);
document.getElementById("submitBtn").addEventListener("click", checkAnswer);

function generateQuestion() {
  if (usedQuestions.length === questions.length) {
    clearInterval(timerInterval);
    document.getElementById("generateBtn").disabled = true;
    document.getElementById("question-box").style.display = "none";

    // Calculate winner group based on scores
    let maxScore = -1;
    let winnerGroup = "";
    groups.forEach(groupId => {
      const groupEl = document.getElementById(groupId);
      const scoreSpan = groupEl.querySelector("span");
      const score = parseInt(scoreSpan.textContent, 10) || 0;
      if (score > maxScore) {
        maxScore = score;
        winnerGroup = groupId.replace("group", "Group ");
      }
    });

    // Show Test Completed message and winner info
    const statusEl = document.getElementById("status");
    statusEl.innerHTML = `
      <strong>✅ Test Completed!</strong><br>
      Winner: ${winnerGroup} with ${maxScore} points.
    `;

    document.getElementById("currentGroupDisplay").textContent = "👉 Test done. See results above.";
    return;
  }

  clearInterval(timerInterval);
  timeLeft = 20;
  document.getElementById("timer").textContent = `⏱ Time Left: ${timeLeft}s`;
  document.getElementById("status").textContent = "";
  document.getElementById("question-box").style.display = "block";
  document.getElementById("generateBtn").disabled = true;

  // Pick a unique question not used before
  do {
    currentQIndex = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(currentQIndex));

  let qObj = questions[currentQIndex];
  document.getElementById("question").textContent = qObj.q;

  // Shuffle options and adjust answer index accordingly
  let options = [...qObj.options];
  const correctAnswerText = options[qObj.answer];
  for (let i = options.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  currentAnswer = options.indexOf(correctAnswerText);

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  options.forEach((opt, i) => {
    let label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${i}"> ${opt}`;
    optionsDiv.appendChild(label);
  });

  document.getElementById("currentGroupDisplay").textContent =
    "👉 Question for: " + groups[currentGroup].replace("group", "Group ");

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏱ Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("status").textContent = "⏳ Time's up! Passing to next group.";
      timeLeft = 20;
      moveToNextGroup();
      startTimer();
    }
  }, 1000);
}

function checkAnswer() {
  clearInterval(timerInterval);
  const selected = document.querySelector("input[name='option']:checked");
  if (!selected) {
    alert("Please select an answer!");
    startTimer();
    return;
  }
  let selectedValue = parseInt(selected.value);
  if (selectedValue === currentAnswer) {
    document.getElementById("status").textContent = `✅ Group ${String.fromCharCode(65 + currentGroup)} answered correctly!`;
    let groupEl = document.getElementById(groups[currentGroup]);
    let scoreSpan = groupEl.querySelector("span");
    scoreSpan.textContent = parseInt(scoreSpan.textContent) + 10;
    usedQuestions.push(currentQIndex);
    document.getElementById("generateBtn").disabled = false;
    setTimeout(() => {
      document.getElementById("question-box").style.display = "none";
      document.getElementById("status").textContent = '';
      moveToNextGroup();
      document.getElementById("timer").textContent = '';
      document.getElementById("currentGroupDisplay").textContent = "👉 Ready. Click Generate Question!";
    }, 1400);
  } else {
    document.getElementById("status").textContent = "❌ Wrong! Passing to next group.";
    moveToNextGroup();
    timeLeft = 20;
    startTimer();
  }
}

function moveToNextGroup() {
  currentGroup = (currentGroup + 1) % groups.length;
  document.getElementById("currentGroupDisplay").textContent =
    "👉 Question for: " + groups[currentGroup].replace("group", "Group ");
}