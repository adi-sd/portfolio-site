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

    for (let i = 0; i < navbarElementArray.length; i++) {
        navbarElementArray[i].addEventListener("click", function () {
            // Navbar Elements
            for (let j = 0; j < indicatorElementArray.length; j++) {
                navbarElementArray[j].classList.remove("active");
            }
            this.classList.add("active");

            let sectionSelector = this.getAttribute("data-selection");
            let sectionToShow = document.querySelector(sectionSelector);

            console.log("Going to - " + sectionSelector + " using Navbar");

            if (sectionToShow) {
                sectionToShow.scrollIntoView({ behavior: "smooth" });
            }

            // Make indicator active
            for (let j = 0; j < indicatorElementArray.length; j++) {
                if (indicatorElementArray[j].getAttribute("data-selection") === sectionSelector) {
                    indicatorElementArray[j].classList.add("selected");
                } else {
                    indicatorElementArray[j].classList.remove("selected");
                }
            }
        });

        indicatorElementArray[i].addEventListener("click", function () {
            // Indicator Elements
            for (let j = 0; j < indicatorElementArray.length; j++) {
                indicatorElementArray[j].classList.remove("selected");
            }
            this.classList.add("selected");

            let sectionSelector = this.getAttribute("data-selection");
            let sectionToShow = document.querySelector(sectionSelector);

            console.log("Going to - " + sectionSelector + " using Indicators");

            if (sectionToShow) {
                sectionToShow.scrollIntoView({ behavior: "smooth" });
            }

            // Make Nav Item Active
            for (let j = 0; j < navbarElementArray.length; j++) {
                if (indicatorElementArray[j].getAttribute("data-selection") === sectionSelector) {
                    navbarElementArray[j].classList.add("active");
                } else {
                    navbarElementArray[j].classList.add("active");
                }
            }
        });
    }
});
