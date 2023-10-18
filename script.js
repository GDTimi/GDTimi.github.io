// Populate the portfolio projects data
fetch("data.json").then(function (response) {
    return response.json();
}). then(function(data) {

    //Debug check the data
    //console.log(data);

    //Select where to display the data    
    const displayTarget = document.querySelector("#portfolioDisplay");

    //Empty string to build up with HTML + project data
    let output = '';
     
    //Loop through the portfolio items
    data.projects.forEach(function (project){

        //Create the project item class div
        output += '<div class="portfolioItemContainer">';

        //Add the project title
        output += `<div class="portfolioItemTitle"><h3>${project.name}</h3></div>`;

        //Add the project description
        output += `<div class="portfolioItemDescription">${project.description}</div>`;

        //Add the project image
        output += `
        <div class="portfolioItemImage">
            <img src="${project.imageMain}" onerror="javascript:this.src='images/portfolioImageNotAvailable.png'" alt="Main portfolio project image for ${project.name}" />
        </div>
        `;

        //Add the project links section start
        output += `
        <div class="portfolioItemLinks">
            <div>Project links:</div>
            <div class="portfolioItemLinksContainer">
            `;

        //Parse and add the projects link data
        

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

})
