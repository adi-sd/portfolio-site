document.addEventListener("DOMContentLoaded", (event) => {
    // Navbar Elements
    let navbar = document.getElementById("main-navbar");
    let navbarElementArray = navbar.getElementsByTagName("li");

    // Indicator Elements
    let indicator = document.getElementById("indicator");
    let indicatorElementArray = indicator.getElementsByTagName("li");

    // Section Elements
    let contentFrame = document.getElementById("content-frame");
    let contentFrameArray = contentFrame.getElementsByTagName("section");

    for (let i = 0; i < contentFrameArray.length; i++) {
        navbarElementArray[i].addEventListener("click", function () {
            // Navbar Elements
            cleanNavigationElement(navbarElementArray, "active");
            cleanNavigationElement(contentFrameArray, "current-displayed-class");

            this.classList.add("active");
            let currSectionSelector = scrollToDesiredSection(this, "Navbar Link");
            console.log(currSectionSelector);
            // Make indicator active
            makeNavigationElementActive(indicatorElementArray, currSectionSelector, "selected");
        });

        indicatorElementArray[i].addEventListener("click", function () {
            // Indicator Elements
            cleanNavigationElement(indicatorElementArray, "selected");
            cleanNavigationElement(contentFrameArray, "current-displayed-class");

            this.classList.add("selected");
            let currSectionSelector = scrollToDesiredSection(this, "Section Indicator");

            // Make Nav Item Active
            makeNavigationElementActive(navbarElementArray, currSectionSelector, "active");
        });
    }

    let currentlyDisplayedSection = getCurrentlyActiveSection();
});

function makeNavigationElementActive(elementArray, currentSectionSelector, className) {
    for (let i = 0; i < elementArray.length; i++) {
        if (elementArray[i].getAttribute("data-selection") === currentSectionSelector) {
            elementArray[i].classList.add(className);
        } else {
            elementArray[i].classList.remove(className);
        }
    }
}

function cleanNavigationElement(elementArray, className) {
    for (let i = 0; i < elementArray.length; i++) {
        elementArray[i].classList.remove(className);
    }
}

function scrollToDesiredSection(currentNavElement, type) {
    let sectionSelector = currentNavElement.getAttribute("data-selection");
    let sectionToShow = document.querySelector(sectionSelector);
    console.log("Going to - " + sectionSelector + " using " + type);
    if (sectionToShow) {
        sectionToShow.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    sectionToShow.classList.add("current-displayed-class");
    return sectionSelector;
}

function getCurrentlyActiveSection(contentFrameArray) {
    return document.querySelector("current-displayed-class");
}
