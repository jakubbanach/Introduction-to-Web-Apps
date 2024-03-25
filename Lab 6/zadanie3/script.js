function getA(data) {
    let json = data;

    let malopolskie = json.filter(function (city) {
        return city.province === "małopolskie";
    });

    let cities = ""

    for (let prop in malopolskie) {
        if (!malopolskie.hasOwnProperty(prop)) {
            continue;
        }
        cities += malopolskie[prop].name + ", "
    }
    cities = cities.substr(0, cities.length - 2);
    document.getElementById("a-answer").textContent = cities;
}

function checkDoubleA(word) {
    let cnt = 0;
    for (let i = 0; i < word.length; i++) {
        letter = word.charAt(i)
        if (letter == 'A' || letter == 'a')
            cnt++;
        if (cnt == 2)
            break;
    }
    return cnt == 2
}

function getB(data) {
    let json = data

    let filtered = json.filter(function (city) {
        return checkDoubleA(city.name);
    });

    let cities = ""

    for (let prop in filtered) {
        if (!filtered.hasOwnProperty(prop)) {
            continue;
        }
        cities += filtered[prop].name + ", "
    }
    cities = cities.substr(0, cities.length - 2);
    document.getElementById("b-answer").textContent = cities;


}

function getC(data) {
    let json = data;
    let citiesDensity = new Array;
    for (let prop in json) {
        citiesDensity.push([json[prop].name, json[prop].density]);
    }
    citiesDensity.sort(function (a, b) {
        if (a[1] < b[1])
            return 1
        else if (a[1] > b[1])
            return -1
        return 0
    });
    // text = ""
    // text+=citiesDensity[0]+citiesDensity[1]+citiesDensity[2]+citiesDensity[3]+citiesDensity[4];
    document.getElementById("c-answer").textContent = citiesDensity[4][0];
}

function getD(data) {
    let json = data;

    let aglomeracje = json.filter(function (entry) {
        return entry.people > 100000;
    });
    let cities = ""
    for (let prop in aglomeracje) {
        if (!aglomeracje.hasOwnProperty(prop)) {
            continue;
        }
        cities += aglomeracje[prop].name + " City, ";
    }
    cities = cities.substr(0, cities.length - 2);

    document.getElementById("d-answer").textContent = cities;
}

function getE(data) {
    let json = data;
    let More80k = 0;
    let Less80k = 0;
    for (let prop in json) {
        if (json[prop].people > 80000)
            More80k++;
        else
            Less80k++;
    }
    document.getElementById("e-answer1").textContent = "Miast powyżej 80000 mieszkańców jest: " + More80k;
    document.getElementById("e-answer2").textContent = "Miast poniżej 80000 mieszkańców jest: " + Less80k;
    if (More80k > Less80k) {
        document.getElementById("e-answer3").textContent = "Zatem: więcej jest miast powyżej 80k mieszkańców.";
    } else {
        document.getElementById("e-answer3").textContent = "Zatem: więcej jest miast poniżej 80k mieszkańców.";
    }

}

function getF(data) {
    let json = data;
    let area_sum = 0;

    let citiesP = new Array;
    for (let prop in json) {
        if (json[prop].township.charAt(0) == 'P')
            citiesP.push([json[prop].area, json[prop].township]);
    }
    console.log(citiesP);
    citiesPstr = ""
    citiesP.forEach(element => {
        area_sum += element[0];
        citiesPstr += element[1] + ", "
    });
    citiesPstr = citiesPstr.substr(0, citiesPstr.length - 2)
    document.getElementById("f-answer").textContent = area_sum / citiesP.length;
}

function getG(data) {
    let json = data;
    let More5k = 0;
    let condition = true;
    let citiesPomorskie = "";

    let pomorskie = json.filter(function (city) {
        return city.province === "pomorskie";
    });

    pomorskie.forEach(element => {
        if (element.people>5000){
            More5k++;
        }else{
            condition = false;
        }
        citiesPomorskie += element.name + ", "
    });
    citiesPomorskie = citiesPomorskie.substr(0, citiesPomorskie.length - 2) + "."
    document.getElementById("g-answer").textContent = "Czy wszystkie miasta w województwie pomorskim mają więcej niż 5000 mieszkańców? ";
    if (condition){
        document.getElementById("g-answer").textContent += "Tak";
    }else{
        document.getElementById("g-answer").textContent += "Nie";
    }
    document.getElementById("g-answer2").textContent = "Liczba miast z ilością mieszkańców większą niż 5k w województwie pomorskim: " + More5k;
}

fetch('city.json')
    .then(response => response.json())
    .then(data => {
        getA(data);
        getB(data);
        getC(data);
        getD(data);
        getE(data);
        getF(data);  
        getG(data);         
    })
    .catch(error => {
    console.error('Błąd wczytywania pliku JSON:', error);
    });

