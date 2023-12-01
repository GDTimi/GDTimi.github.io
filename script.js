// Run on load - populate the portfolio projects data
fetch("data.json").then(function (response) {
    return response.json();
}). then(function(data) {
    //Select where to display the data    
    const displayTarget = document.querySelector("#portfolioDisplay");

    //Empty string to build up with HTML + project data
    let output = '';
     
    //Loop through the portfolio items
    data.projects.forEach(function (project, i){

        //Create the project item class div
        output += '<div class="portfolioItemContainer">';

        //Add the project details
        output += `<div class="portfolioItemTitle"><h3>${project.name}</h3></div>`;
        output += `<div class="portfolioItemDescription">`;
        output += `<img class="portfolioItemImage" src="${project.imageMain}" onload="imageOrientationSetter(this)" onerror="javascript:this.src='images/portfolioImageNotAvailable.png'" alt="Main portfolio project image for ${project.name}" />`;
        output += `${project.description}`;
        
        //Add the more images link, if the project images property is there
        let projectImages = project.projectImages;
        if (projectImages != undefined) {
            output += `
            <br><br><button id="${i}" class="modalOpen">See more images</button>
            `;    
        }

        output += `</div>`;

        //Add the project links section start
        output += `
        <div class="portfolioItemLinks">
            <div><h4>Project links:</h4></div>
            <div class="portfolioItemLinksContainer">
            `;

        //Parse and add the projects link data
        let projectLinksArray = project.projectLinks;

        //Handle depending on whether the project links array is present
        if (projectLinksArray === undefined){
            output += "No links are available for this project."
        }
        else{
            //Iterate through the links array, creating appropriate links based on the linkType property
            projectLinksArray.forEach(function (linkItem){
                let linkURL = linkItem.linkURL;
                let linkImage = undefined;
                let linkDescriptionSuffix = "";

                //Parse the link type
                switch(linkItem.linkType){
                    case "AppStore":
                    linkImage = "https://img.shields.io/badge/App_Store-0D96F6?style=for-the-badge&logo=app-store&logoColor=white";
                    linkDescriptionSuffix = "the App Store";
                    break;

                    case "GitHub":
                    linkImage = "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white";
                    linkDescriptionSuffix = "GitHub";
                    break;

                    case "PlayStore":
                    linkImage = "https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white";
                    linkDescriptionSuffix = "the Play Store";
                    break;
                    
                    case "Steam":
                    linkImage = "https://img.shields.io/badge/steam-%23000000.svg?style=for-the-badge&logo=steam&logoColor=white";
                    linkDescriptionSuffix = "Steam";
                    break;
                }

                //If no recognised link image has been found
                if(linkImage === undefined){
                    //Add the URL just by itself
                    output += `<a href="${linkURL}">${linkURL}</a>`;
                } else {
                    //Process the linked image alongside the URL
                    output += `<a href="${linkURL}" target="_blank"><img src="${linkImage}"  alt="Link to ${project.name} on ${linkDescriptionSuffix}" /></a>`;
                }
            })
        }

        //Add the project links section finish
        output += `
            </div>
        </div>       
        `;

        //Close out the project item div
        output += '</div>';
    })

    //Update the display target
    displayTarget.innerHTML += output;

    // Add the modal open listeners where required
    document.querySelectorAll('.modalOpen').forEach(button =>
        {
            button.addEventListener('click', popupOpen);
        }
    )
})

//Setup the modal box functions and handling
var modal = document.querySelector("#modalBox");

//Modal opener
function popupOpen(){
    modal.style.display = "block";
    popupScreenshotFetcher(this.id);
}

//Modal close
function popupClose(){
    modal.style.display = "none";
}

// Get the <span> element that closes the modal
var span = document.getElementById("modalClose");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  console.log("clicked")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 

//This function will take the given array id, fetch the relevant screenshots and then update the HTML as required
function popupScreenshotFetcher(arrayID) {
    //Run the fetcher
    fetch("data.json").then(function (response) {
        return response.json();
    }). then(function(data) {

    //Select where to display the data    
    let displayTarget = document.querySelector("#modalScreenshotContainer");

    //Empty string to build up with HTML + project data
    let output = '';
    let project = data.projects[arrayID]
    let projectImageArray = project.projectImages;

    //Iterate through the image array, adding the image data to the output string
    projectImageArray.forEach(function (imageItem){
        
        //Debug check the image item
        console.log(imageItem);
        var itemImage = imageItem.imageURL;
        var itemDescription = imageItem.imageDescription;
        
        //Add the image data
        output +=`
        <img class="modalScreenshot" src="${itemImage}" onerror="javascript:this.src='images/portfolioImageNotAvailable.png'" alt="${itemDescription}" />
        `;
    })

    //Update the display target
    displayTarget.innerHTML = output;
    })
}

function imageOrientationSetter(image) {
    let imageWidth = image.width;
    let imageHeight = image.height;

    //Set the appropriate class depending on the dimension
    if(imageWidth > imageHeight) {
    image.classList.add("orientationLandscape");
    } else {
    image.classList.add("orientationPortrait");
    }
}