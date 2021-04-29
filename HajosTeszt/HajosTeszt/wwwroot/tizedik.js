let kerdesek;
let jelenlegiKerdes = 1;
let currKerdesObj = {};

let hotlist = [];
let questionsInHotList = 3;
let displayedQuestion;
let numberOfQuestions;
let nextQuestion = 1;

let timeoutHandler;

let valasz1 = document.getElementById('valasz1');
let valasz2 = document.getElementById('valasz2');
let valasz3 = document.getElementById('valasz3');

function letoltes() {
    /*fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesDone(data));

    fetch('questions/4')
        .then(response => response.json())
        .then(data => console.log(data))*/

    let elore = document.getElementById('elore');
    let vissza = document.getElementById('vissza');

    elore.addEventListener('click', () => { changeKerdes(1) });
    vissza.addEventListener('click', () => { changeKerdes(-1) });

    valasz1.addEventListener('click', () => { selectValasz(1, valasz1) });
    valasz2.addEventListener('click', () => { selectValasz(2, valasz2) });
    valasz3.addEventListener('click', () => { selectValasz(3, valasz3) });

    init();

    /*fetch('questions/1')
        .then(response => response.json())
        .then(data => kerdesMegjelenites(data))*/
}

function letoltesDone(data) {
    console.log('Sikeres letöltés!');
    console.log(data);

    kerdesek = data;
    showKerdes(jelenlegiKerdes);
}

function kerdesMegjelenites() {

    let kérdés = hotlist[displayedQuestion].question;

    //currKerdesObj = kérdés;
    console.log(kérdés);

    let kep = document.getElementById("kép1");

    document.getElementById("kerdes_szoveg").innerText = kérdés.questionText
    valasz1.innerText = kérdés.answer1
    valasz2.innerText = kérdés.answer2
    valasz3.innerText = kérdés.answer3

    if (kérdés.image != "") {
        kep.hidden = false;
        kep.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }

    else {
        kep.hidden = true;
    }
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotlist[i] = q;
    }

    for (var i = 0; i < questionsInHotList; i++) {
        kerdesBetoltes(nextQuestion, i);
        nextQuestion++;
    }
}

function kerdesBetoltes(id, destination) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json();
            }
        })
        .then(q => {
            hotlist[destination].question = q;
            hotlist[destination].goodAnswers = 0;
            console.log(`A ${id}. kérdés letöltve a hot list ${destination}. helyére`);
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kerdesMegjelenites();
            }
        })
}

function showKerdes(i) {

    console.log(i);

    let kerdesSzovegEl = document.getElementById('kerdes_szoveg');
    let kep = document.getElementById('kép1');

    kerdesSzovegEl.innerHTML = kerdesek[i].questionText;
    valasz1.innerHTML = kerdesek[i].answer1;
    valasz2.innerHTML = kerdesek[i].answer2;
    valasz3.innerHTML = kerdesek[i].answer3;

    if (kerdesek[i].image != "") {
        kep.hidden = false;
        kep.src = 'https://szoft1.comeback.hu/hajo/' + kerdesek[i].image;
    }
    else {
        kep.hidden = true;
    }

}

window.onload = function () {
    letoltes();
}

function changeKerdes(merre) {

    clearTimeout(timeoutHandler);

    valasz1.style.pointerEvents = "auto";
    valasz2.style.pointerEvents = "auto";
    valasz3.style.pointerEvents = "auto";

    if (merre > 0) {
        displayedQuestion++;
        if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    }
    else {
        displayedQuestion--;
        if (displayedQuestion == 0) displayedQuestion = questionsInHotList;
    }

    //jelenlegiKerdes += merre;

    /*if (merre > 0) {
        if (jelenlegiKerdes + 1 > kerdesek.length - 1) {
            jelenlegiKerdes = 0;
        }
        else {
            jelenlegiKerdes++;
        }
    }
    else {
        if (jelenlegiKerdes - 1 == -1) {
            jelenlegiKerdes = kerdesek.length - 1;
        }
        else {
            jelenlegiKerdes--;
        }
    }*/

    //kerdesBetoltes(jelenlegiKerdes);
    kerdesMegjelenites();

    valasz1.className = 'clickable';
    valasz2.className = 'clickable';
    valasz3.className = 'clickable';
}

function selectValasz(i, btnRef) {
    let correctValasz = hotlist[displayedQuestion].question.correctAnswer;
    if (correctValasz == i) {
        btnRef.classList.add("jo");
        hotlist[displayedQuestion].goodAnswers++;

        if (hotlist[displayedQuestion].goodAnswers == 3) {
            kerdesBetoltes(nextQuestion, destination);
        }
    }
    else {
        btnRef.classList.add("rossz")
        hotlist[displayedQuestion].goodAnswers = 0;
    }

    timeoutHandler = setTimeout(() => {
        changeKerdes(1)
    }, 3000)

    localStorage.setItem('hotlist', JSON.stringify(hotlist));

    valasz1.style.pointerEvents = "none";
    valasz2.style.pointerEvents = "none";
    valasz3.style.pointerEvents = "none";
}