var points = 0;
let clicked = false;
let propagation = true;
let order = false;

let blue_clicked = false;
let red_clicked = false;
let yellow_clicked = false;

var blue_point = 1;
var red_point = 2;
var yellow_point = 5;

function clearInfo(){
    document.getElementById("info1").textContent = "-";
    document.getElementById("info2").textContent = "-";
    document.getElementById("info3").textContent = "-";
}

function resetbuttons(){
    blue_clicked = false;
    red_clicked = false;
    yellow_clicked = false;
}

function displayInfo(){
    document.querySelector("#info1").textContent= "-"
    document.querySelector("#info2").textContent= "-"
    document.querySelector("#info3").textContent= "-"
    if (blue_clicked)
        document.querySelector("#info1").textContent= "Nacisnąłeś niebieski o wartości 1"
    if (red_clicked)
        document.querySelector("#info2").textContent= "Nacisnąłeś czerwony o wartości 2"
    if (yellow_clicked)
        document.querySelector("#info3").textContent= "Nacisnąłeś żółty o wartości 5"
}

function changePoints(points){
    var el = document.getElementById("points");
    el.textContent = points;
    this.points = points
}

function yellowClick(){
    if (points>30 || document.getElementById("yellow-box").classList.contains("disabled"))
        return;
    changePoints(points + yellow_point);
    yellow_clicked = true;
    if (!propagation){
        displayInfo();
        resetbuttons();
    }
}


function redClick(){
    if (points>50 || document.getElementById("red-box").classList.contains("disabled"))
        return;
    red_clicked = true;
    
    if (!propagation){
        displayInfo();
        resetbuttons();
    }
    changePoints(points + red_point);
    
}

function blueClick(){
    if (document.getElementById("blue-box").classList.contains("disabled"))
        return;
    changePoints(points + blue_point);
    blue_clicked = true;
    displayInfo();
    resetbuttons();
}
function clickHandler(id){
    if(!clicked){
        if (order && !propagation){
            id = "blue-box";
        }
        switch(id){
            case "blue-box":
                blueClick();
                break;
            case "red-box":
                redClick();
                break;
            case "yellow-box":
                yellowClick();
                break;
        }

        if(points>50){
            document.getElementById("red-box").classList.add("disabled");
        }
        if(points>30){
            document.getElementById("yellow-box").classList.add("disabled");
        }


    }
    if (!propagation)
        clicked = true;
}

function reset(){
    points = 0;
    changePoints(points);
    clicked = false;
    document.getElementById("red-box").classList.remove("disabled");
    document.getElementById("yellow-box").classList.remove("disabled");
    clearInfo();
    resetbuttons();
    document.querySelector("#info1").textContent= "Właśnie zresetowałeś";
}

function propagationHandler(){
    if (this.classList.contains("cur-stop")){
        propagation = false;
        this.classList.remove("cur-stop");
        this.classList.add("cur-start");
        this.textContent="Start Propagation";
    }
    else if (this.classList.contains("cur-start")){
        propagation = true;
        this.classList.remove("cur-start");
        this.classList.add("cur-stop");
        this.textContent="Stop Propagation";
    }
    return
}

function reverseClick(){
    order = !order;
    clearInfo();
    resetbuttons();
    document.querySelector("#info1").textContent= "Zmieniłeś kolejność";
}

document.getElementById("yellow-box").onclick = function() {
    clickHandler(this.id);
}

document.getElementById("red-box").onclick = function() {
    clickHandler(this.id);
}

document.getElementById("blue-box").onclick = function() {
    clickHandler(this.id);
    clicked = false;
}

document.getElementById("reset").onclick = reset;
document.getElementById("propagation").onclick = propagationHandler;
document.getElementById("reverse").onclick = reverseClick;