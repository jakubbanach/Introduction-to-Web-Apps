function getNecessaryData(json){
    let regions = new Array;
    for (let prop in json) {
        regions.push([json[prop].subregion, 
            json[prop].name.common,
            json[prop].capital,
            json[prop].population,
            json[prop].area]);
    }
    return regions;
}

function sortByIndex(regions, index, how=1){
    return regions.sort((a, b) => {
        // sortowanie (how -> rosnąca: 1, malejąco: -1)
        if (index<2){
            if (a[index] < b[index]) return -1*how;
            if (a[index] > b[index]) return 1*how;
        }else{
            if (parseInt(a[index]) < parseInt(b[index])) return -1*how;
            if (parseInt(a[index]) > parseInt(b[index])) return 1*how;
        }
        return 0;
    });
}

function sumDataFromColumn(subregion, regions, index){
    let result = 0;
    regions.forEach(regionData => {
        if (regionData[0] === subregion) {
            result+=parseInt(regionData[index]);
        }
    });
    return result;
}

let clickedSubregion = {};
let clickedPagination = 1;
let subregionsList = document.getElementById('subregionsList');

function getRegion(regions) {
    let subregions = {};
    regions.forEach((regionData) => {
        let subregion = regionData[0];
        if (!subregions[subregion] && subregion!==undefined) {
            subregions[subregion] = true;
            let listItem = document.createElement('li');
            listItem.id = `sub ${subregion}`;
            let headerItem = document.createElement('div'); 
            headerItem.id = `position`;
            headerItem.innerHTML = "<p>"+subregion+"</p>";
            headerItem.innerHTML+="<p>"+sumDataFromColumn(subregion, regions, 3)+"</p>";
            headerItem.innerHTML+="<p>"+sumDataFromColumn(subregion, regions, 4)+"</p>";
            listItem.appendChild(headerItem);
            listItem.addEventListener('click', (event) => displaySubregionData(subregion, regions, event));
            subregionsList.appendChild(listItem);
            }
        });
    return subregions;
}


function displaySubregionData(subregion, regions, event) {
    let subregionTable = document.getElementById(`sub ${subregion}`);
    let currentTable = subregionTable.querySelector('table');
    console.log(event);
    if (currentTable){
        if (event.target.localName === "li" || event.target.localName === "p")
            subregionTable.removeChild(currentTable);
        return;
    }
    let table = document.createElement('table');

    regions.forEach(regionData => {
        if (regionData[0] === subregion) {
            let row = table.insertRow();
            for (let i = 1; i < regionData.length; i++) {
                let cell = row.insertCell();
                cell.textContent = regionData[i];
            }
        }
    });
    subregionTable.appendChild(table);
    let check = checkFirstTrueClick();
    sortTable(check);
}

let clicked = [false,false,false,false];

function changeIcon(button, buttonId) {
    let id = parseInt(buttonId.substring(7))-1;
    clicked[id] = !clicked[id];
    button.innerHTML = clicked[id] ? "🡅" : "🡇";
    sortTable(id);
}

function checkFirstTrueClick(){
    const indeks = clicked.findIndex(element => element === true);
    return indeks !== -1 ? indeks : 0;
}

function sortTable(buttonId) {
    let columnIndex = buttonId;
    let how = 0;
    if (clicked[buttonId] !== true)
        how = 1;
    else
        how = -1;
    for(let i in allRegions){
        let subregionStyle = document.getElementById(`sub ${String(i)}`);
        if(subregionStyle.style.display === 'block'){
            let currentTable = subregionStyle.querySelector('table');
            if(currentTable!==null){
                let array = tableToArray(currentTable);
                let sortedArray = sortByIndex(array, columnIndex, how);
                let x = arrayToTable(sortedArray);
                currentTable.innerHTML = x.innerHTML;
            }
        }
    }
}

function tableToArray(table) {
    const result = [];
    const rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      const rowData = [];
      const cells = rows[i].getElementsByTagName('td');
      for (let j = 0; j < cells.length; j++) {
        rowData.push(cells[j].innerText);
      }
      result.push(rowData);
    }
    return result;
}

function arrayToTable(data) {
    const table = document.createElement('table');
  
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('tr');
      
      for (let j = 0; j < data[i].length; j++) {
        const cell = document.createElement('td');
        cell.innerText = data[i][j];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    return table;
  }
  
document.addEventListener("DOMContentLoaded", function() {
    const paginationItems = document.querySelectorAll(".pagination .page-item");

    paginationItems.forEach(function(item) {
      item.addEventListener("click", function(event) {
        event.preventDefault();
        paginationItems.forEach(function(element) {
          element.classList.remove("active");
        });
        item.classList.add("active");
        clickedPagination = item.querySelector("a").id;
        whichRegionsToShow();
      });
    });
  });

function whichRegionsToShow(){
    let x = 0;
    for(let i in allRegions){
        let subregionStyle = document.getElementById(`sub ${String(i)}`);
        if(parseInt(x/5+1) === parseInt(clickedPagination)){
            subregionStyle.style.display = 'block';
        }else{
            subregionStyle.style.display = 'none';
        }
        x+=1;
    }
}

function filterByText(regions, index, text) {
    return regions.filter(region => {
        if (text === '') return true;
        const regionText = region[index].toString();
        console.log(region[index]);
        console.log(regionText.includes(text));
        return regionText.includes(text);
    });
}

// const inputElement = document.getElementById('input_1');

// inputElement.addEventListener('input', function(event) {
//     console.log(event.target.id.toString().substring(6));
//     const inputText = this.value;
//     for(let i in allRegions){
//         let subregionStyle = document.getElementById(`sub ${String(i)}`);
//         if(subregionStyle.style.display === 'block'){
//             let currentTable = subregionStyle.querySelector('table');
//             console.log("SUBREGION: ",currentTable);
//             if(currentTable!==null){
//                 let array = tableToArray(currentTable);
//                 let filteredResults = filterByText(array, 0, inputText);
//                 console.log(array);
//                 console.log(filteredResults);
//                 let x = arrayToTable(filteredResults);
//                 console.log(x);
//                 currentTable.innerHTML = x.innerHTML;
//             }
//         }
//     }
    
// });


let table = Array;
let allRegions = {};
fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        table = getNecessaryData(data);
        allRegions = getRegion(table);
        whichRegionsToShow();
    })
    .catch(error => {
    console.error('Błąd wczytywania pliku JSON:', error);
    });

