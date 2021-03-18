window.onload = function () {
    let kulsoDiv = document.getElementById("kulso");
    for (let i = 0; i < 10; i++) {
        let ujElem = document.createElement('div');
        ujElem.innerHTML = i + 1;
        ujElem.style.backgroundColor = `rgb(${((10 - i) * 25)}, ${((10 - i) * 25)}, ${((10 - i) * 25)})`;
        if (i > 4) {
            ujElem.style.color = "white";
        }
        kulsoDiv.appendChild(ujElem);
    }

    for (let sor = 0; sor < 10; sor++) {
        let ujSor = document.createElement('div');
        let pascalDiv = document.getElementById('pascal');
        ujSor.classList.add('sor');
        pascalDiv.appendChild(ujSor);

        for (let oszlop = 0; oszlop <= sor; oszlop++) {
            let ujOszlop = document.createElement('div');
            ujOszlop.classList.add('elem');
            let ertek = faktorialis(sor) / (faktorialis(oszlop) * faktorialis(sor - oszlop));
            ujOszlop.innerHTML = ertek;
            ujSor.appendChild(ujOszlop);
        }
    }
}

var faktorialis = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}