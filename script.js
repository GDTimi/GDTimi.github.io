// Populate the portfolio projects data
fetch("data.json").then(function (response) {
    return response.json();
}). then(function(data) {

    //Debug check the data
    console.log(data);

    //Select where to display the data    
    const displayTarget = document.querySelector("#portfolioDisplay");

    //Empty string to build up with HTML + project data
    let output = '';
     

     

    //Update the display target
    displayTarget.innerHTML += output;

})
