let allTrains;
let trainCount;
let trainsTableDiv;
let addButton;

document.onload = loadTrains();

function loadTrains() {
    trainsTableDiv = document.getElementById('vonatok');

    document.getElementById('addtrain').addEventListener('click', () => {
        let data = {
            trainnumber: Number(document.getElementById('trainnumber').value),
            type: document.getElementById('type').value,
            startstation: document.getElementById('startstation').value,
            deptime: document.getElementById('deptime').value,
            endstation: document.getElementById('endstation').value,
            arrtime: document.getElementById('arrtime').value
        }

        fetch('api/trains', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                if (data.ok) {
                    console.log('Siker');
                    refreshTrains();
                }
                else {
                    console.log('Hiba');
                }
            })
    });

    refreshTrains();

    
}

function deleteTrain(id) {
    fetch(`/api/trains/${id}`, {
        method: 'DELETE'
    })
        .then(data => {
        if (data.ok) {
            console.log('Siker');
            refreshTrains();
        }
        else {
            console.log('Hiba');
        }
    })
}

function refreshTrains() {
    allTrains = [];
    trainsTableDiv.innerHTML = '';
    fetch('api/trains')
        .then(resp => resp.json())
        .then(trains => {
            allTrains = trains;
            for (let i = 0; i < allTrains.length; i++) {
                let newRow = document.createElement('tr');
                let idTd = document.createElement('td');
                let vonatszamTd = document.createElement('td');
                let vonatnemTd = document.createElement('td');
                let induloTd = document.createElement('td');
                let indulasTd = document.createElement('td');
                let celTd = document.createElement('td');
                let erkezesTd = document.createElement('td');
                let torlesTd = document.createElement('td');

                let torlesBtn = document.createElement('button');

                torlesBtn.classList.add('btn');
                torlesBtn.classList.add('btn-danger');
                torlesBtn.type = "button";
                torlesBtn.innerHTML = "Törlés";
                torlesBtn.onclick = function () {
                    deleteTrain(allTrains[i].id);
                }

                torlesTd.appendChild(torlesBtn);

                idTd.innerHTML = allTrains[i].id;
                vonatszamTd.innerHTML = allTrains[i].trainnumber;
                vonatnemTd.innerHTML = allTrains[i].type;
                induloTd.innerHTML = allTrains[i].startStation;
                indulasTd.innerHTML = allTrains[i].depTime;
                celTd.innerHTML = allTrains[i].endStation;
                erkezesTd.innerHTML = allTrains[i].arrTime;


                newRow.appendChild(idTd);
                newRow.appendChild(vonatszamTd);
                newRow.appendChild(vonatnemTd);
                newRow.appendChild(induloTd);
                newRow.appendChild(indulasTd);
                newRow.appendChild(celTd);
                newRow.appendChild(erkezesTd);
                newRow.appendChild(torlesTd);

                trainsTableDiv.appendChild(newRow);
            }
        })
}