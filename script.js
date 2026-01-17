window.addEventListener("beforeunload", e => {
  e.preventDefault();
  e.returnValue = "";
});

const quizData = [
/* ---------- APTITUDE (10) ---------- */
{q:"If a train runs 60 km in 1 hour, how much distance will it cover in 30 minutes?",o:["15 km","20 km","30 km","60 km"],a:2},
{q:"What is the next number: 2, 6, 12, 20, ?",o:["28","30","32","40"],a:0},
{q:"If A = 1, B = 2, then Z = ?",o:["24","25","26","27"],a:2},
{q:"Simple Interest on ₹1000 at 10% for 2 years is?",o:["₹100","₹200","₹300","₹400"],a:1},
{q:"Find odd one out: HTML, CSS, JavaScript, Python",o:["HTML","CSS","JavaScript","Python"],a:3},
{q:"5 men take 5 days to build wall. 1 man will take?",o:["1 day","5 days","10 days","25 days"],a:3},
{q:"What is 25% of 200?",o:["25","50","75","100"],a:1},
{q:"If today is Monday, what day after 9 days?",o:["Tuesday","Wednesday","Thursday","Friday"],a:1},
{q:"Ratio of 10:20 simplified is?",o:["1:1","1:2","2:1","2:2"],a:1},
{q:"Average of 10 and 20 is?",o:["10","15","20","25"],a:1},

/* ---------- PROGRAMMING (15) ---------- */
{q:"Which data structure follows FIFO?",o:["Stack","Queue","Tree","Graph"],a:1},
{q:"Time complexity of binary search?",o:["O(n)","O(log n)","O(n²)","O(1)"],a:1},
{q:"Which is NOT a primitive in JS?",o:["Number","String","Boolean","Object"],a:3},
{q:"Which keyword defines constant in JS?",o:["var","let","const","define"],a:2},
{q:"Which loop runs at least once?",o:["for","while","do-while","foreach"],a:2},
{q:"What does OOP stand for?",o:["Object Oriented Programming","Open Object Process","Order Of Program","None"],a:0},
{q:"Which sorting is fastest on average?",o:["Bubble","Selection","Quick","Insertion"],a:2},
{q:"Which operator checks value & type?",o:["==","=","===","!="],a:2},
{q:"Which keyword handles exception?",o:["catch","throw","try","all"],a:3},
{q:"What is recursion?",o:["Loop","Function calling itself","Condition","Array"],a:1},
{q:"Which is immutable?",o:["Array","Object","String","Function"],a:2},
{q:"Which language is single-threaded?",o:["Java","Python","C++","JavaScript"],a:3},
{q:"Heap memory is used for?",o:["Static data","Dynamic allocation","Code","Registers"],a:1},
{q:"Which symbol for comments in JS?",o:["<!--","//","#","**"],a:1},
{q:"Which is not OOP principle?",o:["Encapsulation","Inheritance","Compilation","Polymorphism"],a:2},

/* ---------- WEB DEV (25) ---------- */
{q:"HTML stands for?",o:["Hyper Text Markup Language","High Text ML","Hyperlinks Text","None"],a:0},
{q:"Which tag creates hyperlink?",o:["<a>","<link>","<href>","<nav>"],a:0},
{q:"CSS property for text color?",o:["font-color","color","text-color","bgcolor"],a:1},
{q:"Which is block element?",o:["span","a","div","img"],a:2},
{q:"Which JS runs first?",o:["External","Inline","Internal","Depends"],a:3},
{q:"DOM stands for?",o:["Data Object Model","Document Object Model","Display Object","None"],a:1},
{q:"Which keyword exports module?",o:["export","require","include","module"],a:0},
{q:"Node.js is?",o:["Framework","Library","Runtime","Language"],a:2},
{q:"Which handles routing in Express?",o:["Router","Path","RouteJS","Nav"],a:0},
{q:"MongoDB stores data in?",o:["Tables","Rows","Documents","Cells"],a:2},
{q:"Which is NoSQL?",o:["MySQL","MongoDB","Postgres","Oracle"],a:1},
{q:"Which HTTP method updates data?",o:["GET","POST","PUT","FETCH"],a:2},
{q:"What is middleware?",o:["DB","Request handler","Function between req-res","Router"],a:2},
{q:"JSON stands for?",o:["JS Object Notation","Java Syntax","Job Serial","None"],a:0},
{q:"useState is?",o:["Hook","Component","API","Class"],a:0},
{q:"Which frontend library MERN uses?",o:["Angular","Vue","React","Svelte"],a:2},
{q:"Which CSS layout is best responsive?",o:["Float","Flexbox","Table","Inline"],a:1},
{q:"Which method parses JSON?",o:["JSON.parse","JSON.stringify","parseJSON","toJSON"],a:0},
{q:"REST API is?",o:["Protocol","Architecture","Language","Library"],a:1},
{q:"Status code 404 means?",o:["Server error","Unauthorized","Not found","Success"],a:2},
{q:"JWT used for?",o:["Auth","DB","UI","Cache"],a:0},
{q:"Which DB is schema-less?",o:["MySQL","MongoDB","Oracle","SQL"],a:1},
{q:"CORS relates to?",o:["Security","Design","Layout","DB"],a:0},
{q:"Which env file stores secrets?",o:["config.js",".env","secret.txt","keys.js"],a:1},
{q:"MERN stands for?",o:["Mongo Express React Node","MySQL Express React Node","Mongo Ember React Node","None"],a:0}
];

/* ---------- SAFE RENDERING (NO innerHTML) ---------- */

const form = document.getElementById("quizForm");

quizData.forEach((q, i) => {
  const questionDiv = document.createElement("div");
  questionDiv.className = "question";

  const title = document.createElement("h3");
  title.textContent = `${i + 1}. ${q.q}`;
  questionDiv.appendChild(title);

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  q.o.forEach((opt, j) => {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${i}`;
    input.value = j;

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opt));

    optionsDiv.appendChild(label);
  });

  questionDiv.appendChild(optionsDiv);
  form.appendChild(questionDiv);
});

/* -------- TIMER WITH RESUME LOCK -------- */
let time = localStorage.getItem("time")
  ? Number(localStorage.getItem("time"))
  : 3000;

const timerEl = document.getElementById("timer");
const warning = document.getElementById("warning");

const timer = setInterval(() => {
  localStorage.setItem("time", time);

  timerEl.textContent =
    `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;

  if (time <= 300) {
    warning.textContent = "Last 5 minutes remaining";
    timerEl.style.color = "red";
  }

  if (time <= 0) {
    clearInterval(timer);
    submitQuiz();
  }
  time--;
}, 1000);

document.getElementById("submitBtn").onclick = submitQuiz;

/* ---------- SUBMIT ---------- */
function submitQuiz() {
  clearInterval(timer);
  localStorage.clear();
  document.getElementById("submitBtn").disabled = true;

  let score = 0;
  quizData.forEach((q, i) => {
    const ans = document.querySelector(`input[name="q${i}"]:checked`);
    if (ans && Number(ans.value) === q.a) score++;
  });

  document.querySelectorAll("input").forEach(i => i.disabled = true);

  const percent = ((score / quizData.length) * 100).toFixed(2);

  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>Assessment Result</h2>
    <p>Total Questions: 50</p>
    <p>Correct Answers: ${score}</p>
    <p>Percentage: ${percent}%</p>
    <h3>Status: ${percent >= 60 ? "PASS" : "FAIL"}</h3>
    <button onclick="window.print()">Download Certificate (PDF)</button>
  `;
}
