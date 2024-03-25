const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];

const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];

const add = document.getElementById('app');

function wypisz(table){
    let x="";
    for(const el of table){
        x+="<li>" + el + "</li>";
    }
    add.innerHTML += x;
}

// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)
function nazwy_r(){
    let tab = names.filter((name) => name.includes('r'));
    return tab
}

// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
//   sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
//   inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
//   Nastepnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2
function test_numbers(){
    let first_cond = numbers.every(el => el<9)
    add.innerHTML += "<li> Podpunkt 1: " + first_cond + "</li>";
    let incremented = numbers.map((el) => el+1);
    add.innerHTML += "<li> Podpunkt 3: [" + incremented.filter((el) => el%2==1) + "]</li>";
    const result = incremented.reduce((a,b) => a+b);
    add.innerHTML += "<li> Podpunkt 4: Suma to " + result + "</li>";
}

// 3. Na stronach internetowych wyświetlają się kraje z Europy
function onlyEurope(){
    let europe = countries.filter(el => el.continent == 'Europe');
    let x="";
    for(const el of europe){
        x+="<li>" + el.name + "</li>";
    }
    add.innerHTML += x;
}

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.
function strangeEmails(){
    let mails = people.filter(el => el.email.includes("replicant.io"));
    let x="";
    for(const el of mails){
        x+="<li>" + el.name + "</li>";
    }
    add.innerHTML += x;
}

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu
function deleteDuplicates(){
    let noDuplicates = duplicateName.filter((item, index, array) => array.indexOf(item) === index);
    wypisz(noDuplicates);
}

window.onload = function() {
    add.innerHTML += "<h3> SEKCJA 1 - IMIONA Z 'R'</h3>";
    wypisz(nazwy_r());
    add.innerHTML += "<br> <h3> SEKCJA 2 - OPERACJE NA LICZBACH </h3>";
    test_numbers();
    add.innerHTML += "<br> <h3> SEKCJA 3 - KRAJE TYLKO Z EUROPY </h3>";
    onlyEurope();
    add.innerHTML += "<br> <h3> SEKCJA 4 - OSOBY Z DZIWNYMI MAILAMI</h3>";
    strangeEmails();
    add.innerHTML += "<br> <h3> SEKCJA 5 - BEZ DUPLIKATOW</h3>";
    deleteDuplicates();
    // wypisz(nazwy_r())
};

