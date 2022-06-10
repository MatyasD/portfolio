const scrollDemo = document.querySelector(".outer-wrapper");
const content = document.querySelector(".content");
const progress = document.querySelector("#progress");
const contents = [];
const positions = [];
const sticks = [];
let lastPos = null;
let numOfEvents = document.getElementsByClassName("event").length;
const homeButton = document.querySelector("ul");
const nameEl = document.querySelector("#name");



function getPositions() {
    for (i = 1; i < numOfEvents + 1; i++) {
        contents.push(document.querySelector(".content" + [i]));

        positions.push(document.querySelector(".event" + [i]));
        sticks.push(document.querySelector(".event" + [i]));
    }
    for (i = 0; i < numOfEvents; i++) {
        let style = positions[i].currentStyle || window.getComputedStyle(positions[i])
        positions.push(parseInt(style.marginLeft));
    }

    for (i = 0; i < numOfEvents; i++) {
        positions.shift()
    }
    for (i = 0; i < numOfEvents; i++) {
        positions[i] = positions[i] - 400;
    }
}

getPositions();


scrollDemo.addEventListener("scroll", event => {
    let scrolled = scrollDemo.scrollTop;
    addingLenght(scrolled);
    eventPassed(scrolled);

});


function eventPassed(scrolled) {
    var style = getComputedStyle(document.body)
    let thirdColor = style.getPropertyValue('--third-color');
    let secondColor = style.getPropertyValue('--second-color');

    for (i = 0; i < positions.length; i++) {

        contents[i].style.visibility = "hidden";
        sticks[i].style.backgroundColor = secondColor;




        if (positions[i] <= scrolled) {

            contents[i].style.visibility = "visible"
            sticks[i].style.backgroundColor = thirdColor;
            lastPos = positions[i];


        }
        else if (lastPos > scrolled) {
            contents[i].style.visibility = "hidden";
            sticks[i].style.backgroundColor = secondColor;

        }

    }
}




function addingLenght(scrolled) {

    let lenghtBonus = 403;
    var nameElTop = window.getComputedStyle(nameEl).top

    if (nameElTop == 480 + "px") {
        homeButton.style.left = (scrolled - 175) + "px"
        console.log(nameElTop)
    } else {
        homeButton.style.left = scrolled + "px"
    }

    progress.style.width = (scrolled + lenghtBonus) + "px";

}

