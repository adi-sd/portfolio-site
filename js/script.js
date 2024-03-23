// Active Class Variables

let ACTIVE_SECTION = "active-section";
let ACTIVE_NAVBAR = "active";
let ACTIVE_MAIN_NAV_IND = "active-main-ind";
let ACTIVE_CARD_NAV_IND = "active-card-ind";
let ACTIVE_CARD_CHANGE_BUTTON = "active-card-change-button";
let ACTIVE_SECTION_CARD = "active-section-card";

// Navbar Elements
let navbarElementArray = [];
let indicatorElementArray = [];
let contentFrameArray = [];

document.addEventListener("DOMContentLoaded", () => {
    let navbar = document.getElementById("main-navbar");
    navbarElementArray = navbar.getElementsByTagName("li");

    // Indicator Elements
    let indicator = document.getElementById("indicator");
    indicatorElementArray = indicator.getElementsByTagName("li");

    // Section Elements
    let contentFrame = document.getElementById("content-frame");
    contentFrameArray = contentFrame.getElementsByTagName("section");

    let currentSelectedSectionByClass = getCurrentlyActiveSection();
    if (currentSelectedSectionByClass) {
        currentSelectedSectionByClass.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    let currentSectionSelector = "#" + currentSelectedSectionByClass.getAttribute("id");
    reflectActiveClassOnSectionNavigation(navbarElementArray, currentSectionSelector, ACTIVE_NAVBAR);
    reflectActiveClassOnSectionNavigation(indicatorElementArray, currentSectionSelector, ACTIVE_MAIN_NAV_IND);
});

// Event Handlers

function handleMainNavIndicatorEvent(clickedElement) {
    // Cleanup
    removeClassFromAll(indicatorElementArray, ACTIVE_MAIN_NAV_IND);
    removeClassFromAll(contentFrameArray, ACTIVE_SECTION);

    // scroll to the desired element
    let currSectionSelector = scrollToDesiredSection(clickedElement);
    console.log(currSectionSelector);

    // Add the active classes
    reflectActiveClassOnSectionNavigation(navbarElementArray, currSectionSelector, ACTIVE_NAVBAR);
    clickedElement.classList.add(ACTIVE_MAIN_NAV_IND);
}

function handleNavbarLinkEvent(clickedElement) {
    // Cleanup
    removeClassFromAll(navbarElementArray, ACTIVE_NAVBAR);
    removeClassFromAll(contentFrameArray, ACTIVE_SECTION);

    // scroll to the desired element
    let currSectionSelector = scrollToDesiredSection(clickedElement);

    // Add the active classes
    reflectActiveClassOnSectionNavigation(indicatorElementArray, currSectionSelector, ACTIVE_MAIN_NAV_IND);
    clickedElement.classList.add(ACTIVE_NAVBAR);
}

function handleSectionCardIndicatorEvent(clickedElement) {
    let currentSection = getCurrentlyActiveSection();
    let cardNavElementArray = getSectionCardIndicatorArray(currentSection);
    let cardChangeButtonArray = getSectionChangeButtonArray(currentSection);
    let cardsArray = getSectionCardsArray(currentSection);

    // clean up
    removeClassFromAll(cardNavElementArray, ACTIVE_CARD_NAV_IND);
    removeClassFromAll(cardChangeButtonArray, ACTIVE_CARD_CHANGE_BUTTON);
    removeClassFromAll(cardsArray, ACTIVE_SECTION_CARD);

    let cardIndex = getCardIndex(clickedElement);

    let showThisCard = cardsArray[cardIndex];
    if (showThisCard) {
        showThisCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    clickedElement.classList.add(ACTIVE_CARD_NAV_IND);
    reflectActiveClassOnCardNavigation(cardChangeButtonArray, cardIndex, ACTIVE_CARD_CHANGE_BUTTON);
}

function handleSectionCardChangeButtonEvent(clickedElement) {
    let currentSection = getCurrentlyActiveSection();
    let cardNavElementArray = getSectionCardIndicatorArray(currentSection);
    let cardChangeButtonArray = getSectionChangeButtonArray(currentSection);
    let cardsArray = getSectionCardsArray(currentSection);

    // clean up
    removeClassFromAll(cardNavElementArray, ACTIVE_CARD_NAV_IND);
    removeClassFromAll(cardChangeButtonArray, ACTIVE_CARD_CHANGE_BUTTON);
    removeClassFromAll(cardsArray, ACTIVE_SECTION_CARD);

    let cardIndex = getCardIndex(clickedElement);

    let showThisCard = cardsArray[cardIndex];
    if (showThisCard) {
        showThisCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    clickedElement.classList.add(ACTIVE_CARD_CHANGE_BUTTON);
    reflectActiveClassOnCardNavigation(cardNavElementArray, cardIndex, ACTIVE_CARD_NAV_IND);
}

// Utility Functions

function reflectActiveClassOnSectionNavigation(elementArray, currentSectionSelector, className) {
    for (let i = 0; i < elementArray.length; i++) {
        if (elementArray[i].getAttribute("data-selection") === currentSectionSelector) {
            elementArray[i].classList.add(className);
        } else {
            elementArray[i].classList.remove(className);
        }
    }
}

function reflectActiveClassOnCardNavigation(elementArray, currentCardIndex, className) {
    let id0 = elementArray[0].getAttribute("id");
    let attributeSuffix = id0.slice(0, id0.length - 1);
    console.log(attributeSuffix);
    for (let i = 0; i < elementArray.length; i++) {
        if (elementArray[i].getAttribute("id") === attributeSuffix + currentCardIndex) {
            elementArray[i].classList.add(className);
        } else {
            elementArray[i].classList.remove(className);
        }
    }
}

function removeClassFromAll(elementArray, className) {
    for (let i = 0; i < elementArray.length; i++) {
        elementArray[i].classList.remove(className);
    }
}

function scrollToDesiredSection(clickedElement) {
    let sectionSelector = clickedElement.getAttribute("data-selection");
    let sectionToShow = document.querySelector(sectionSelector);
    console.log("Going to - " + sectionSelector);
    if (sectionToShow) {
        sectionToShow.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    sectionToShow.classList.add(ACTIVE_SECTION);
    return sectionSelector;
}

function getCurrentlyActiveSection() {
    return document.querySelector("." + ACTIVE_SECTION);
}

function getCurrentCardNavigation() {
    let currentlyDisplayedSection = getCurrentlyActiveSection();
    let cardNavigation = currentlyDisplayedSection.querySelector(".card-indicators");
    console.log("Executing Card Navigation!");
    return cardNavigation;
}

function getSectionCardsArray(activeSection) {
    return activeSection.getElementsByClassName("section-card");
}

function getSectionCardIndicatorArray(activeSection) {
    return activeSection.getElementsByClassName("ci-ele");
}

function getSectionChangeButtonArray(activeSection) {
    return activeSection.getElementsByClassName("ccb-ele");
}

function getSiblings(element) {
    var siblings = [];
    var sibling = element.parentNode.firstChild;

    // Loop through each sibling and collect
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    return siblings;
}

function getCardIndex(clickedElement) {
    let cardIndexStr = clickedElement.getAttribute("id");
    return parseInt(cardIndexStr.charAt(cardIndexStr.length - 1));
}

// Project Card Navigation

let ACTIVE_PROJECT_CARD = "active-project-card";

let projectCards = [];

function getAllProjectCards() {
    return document.getElementsByClassName("project-card");
}

function getCurrentActiveCardIndex() {
    let currentActiveProjectElement = document.getElementsByClassName(ACTIVE_PROJECT_CARD)[0];
    let currentProjectIdStr = currentActiveProjectElement.getAttribute("data-selection").slice("#project".length);
    let currentProjectId = parseInt(currentProjectIdStr);
    // console.log("Current Project - " + currentProjectId);
    return currentProjectId - 1;
}

function handleProjectCardUpEvent() {
    // console.log("Project Card Up Clicked!!");
    projectCards = getAllProjectCards();
    let activeProjectCardId = getCurrentActiveCardIndex();
    let reqProjectCardId = activeProjectCardId - 1;
    if (reqProjectCardId < 0) {
        // Invalid Id
    } else {
        projectCards[activeProjectCardId].classList.remove(ACTIVE_PROJECT_CARD);
        let reqProjectCardElement = projectCards[reqProjectCardId];
        reqProjectCardElement.classList.add(ACTIVE_PROJECT_CARD);
        reqProjectCardElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function handleProjectCardDownEvent() {
    // console.log("Project Card Down Clicked!!");
    projectCards = getAllProjectCards();
    let activeProjectCardId = getCurrentActiveCardIndex();
    let reqProjectCardId = activeProjectCardId + 1;
    if (reqProjectCardId >= projectCards.length) {
        // Invalid Id
    } else {
        projectCards[activeProjectCardId].classList.remove(ACTIVE_PROJECT_CARD);
        let reqProjectCardElement = projectCards[reqProjectCardId];
        reqProjectCardElement.classList.add(ACTIVE_PROJECT_CARD);
        reqProjectCardElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
