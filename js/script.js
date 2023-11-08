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

    for (let i = 0; i < indicatorElementArray.length; i++) {
        // navbarElementArray[]

        indicatorElementArray[i].addEventListener("click", function () {
            // Indicator Elements
            for (let j = 0; j < indicatorElementArray.length; j++) {
                indicatorElementArray[j].classList.remove("selected");
            }
            this.classList.add("selected");

            // Section Elements
            for (let j = 0; j < contentFrameArray.length; j++) {
                contentFrameArray[j].classList.remove("active-section");
            }
            let sectionSelector = this.getAttribute("data-selection");
            let sectionToShow = document.querySelector(sectionSelector);

            console.log("Going to - " + sectionSelector);

            if (sectionToShow) {
                sectionToShow.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
