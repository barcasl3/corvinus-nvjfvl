let kerdesek;
let jelenlegiKerdes = 0;

let valasz1 = document.getElementById('valasz1');
let valasz2 = document.getElementById('valasz2');
let valasz3 = document.getElementById('valasz3');

function letoltes() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesDone(data));
}

function letoltesDone(data) {
    console.log('Sikeres letöltés!');
    console.log(data);

    kerdesek = data;
    showKerdes(jelenlegiKerdes);

    let elore = document.getElementById('elore');
    let vissza = document.getElementById('vissza');

    elore.addEventListener('click', () => { changeKerdes(1) });
    vissza.addEventListener('click', () => { changeKerdes(-1) });

    valasz1.addEventListener('click', () => { selectValasz(1, valasz1) });
    valasz2.addEventListener('click', () => { selectValasz(2, valasz2) });
    valasz3.addEventListener('click', () => { selectValasz(3, valasz3) });
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
    if (merre > 0) {
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
    }

    showKerdes(jelenlegiKerdes);

    valasz1.className = 'clickable';
    valasz2.className = 'clickable';
    valasz3.className = 'clickable';
}

function selectValasz(i, btnRef) {
    let correctValasz = kerdesek[jelenlegiKerdes].correctAnswer;
    if (correctValasz == i) {
        btnRef.classList.add("jo");
    }
    else {
        btnRef.classList.add("rossz")
    }
}