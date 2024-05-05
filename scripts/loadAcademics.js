//this piece of code handles loading in the academic data. 
var pageCounter = 1;
var academicBtn = document.getElementById("academic-btn");
var article = document.getElementsByTagName("article")[0];
//stops the view more courses button loading more pages than it should!
var academicFirstPageLoaded = false;


//I want to have a view more button. I think it makes more sense.
var viewMoreAcademicsBtn = document.createElement("button");
viewMoreAcademicsBtn.classList.add("btn");
viewMoreAcademicsBtn.textContent = "View more academics";

//creating the div it all sits in...
var academicContainer = document.createElement("div");
academicContainer.classList.add("container");
academicContainer.setAttribute('id', 'academic-container')
article.appendChild(academicContainer);

viewMoreAcademicsBtn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/data/academics/academic-'+ pageCounter +'.json');
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    //this code doesn't work, but removing it stops everything else working. Keeping it in.
    if (ourData.length === 0) {
      alert("No more academics.");
      viewMoreAcademicsBtn.style.display = 'none'; 
    } else {
      renderHTML(ourData);
    }
  };
  ourRequest.send();
  pageCounter++;
});

academicBtn.addEventListener("click", function(){
  if (academicFirstPageLoaded === false && pageCounter === 1) {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/data/academics/academic-1.json');
    ourRequest.onload = function(){
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
      pageCounter++;
      academicFirstPageLoaded = true;

      // Toggle the display of module container and view more button
      if (academicBtn.textContent === "View Academics"){
        academicBtn.textContent = "Hide Academics";
        academicContainer.style.display = "block";
        viewMoreAcademicsBtn.style.display = "block"; // Show the view more button
      } else {
        academicBtn.textContent = "View Academics";
        academicContainer.style.display = "none";
        viewMoreAcademicsBtn.style.display = "none"; // Hide the view more button
        if (academicContainer && academicContainer.parentNode) {
          academicContainer.parentNode.removeChild(academicContainer);
        }
        //resets page counter.
        pageCounter = 1;
        academicFirstPageLoaded = false; // fixed variable declaration
      }
    };
    ourRequest.send();
  } else {
    // Toggle the display of module container and view more button
    if (academicBtn.textContent === "View Academics"){
      academicBtn.textContent = "Hide Academics";
      academicContainer.style.display = "block";
      viewMoreAcademicsBtn.style.display = "block"; // Show the view more button
    } else {
      academicBtn.textContent = "View Academics";
      academicContainer.style.display = "none";
      viewMoreAcademicsBtn.style.display = "none"; // Hide the view more button
      academicContainer.innerHTML = ""; // Clear the content inside academicContainer
      //resets page counter.
      pageCounter = 1;
      academicFirstPageLoaded = false;
    }
  }
});

//this is where it loads all the module data. I want it to match what I outlined in my sketches.
function renderHTML(data){
  //empty variable before the loop is added...
  var htmlString = "";
//this is a for loop that loads all the data in one module.
  for(i = 0; i < data.length; i++){
    //put the course name front and center. Give it a h2 tag for screenreaders.
    htmlString +="<h2> Name </h2>";
    htmlString +="<p>" + data[i].Name + "</p>";
    htmlString +="<h2> Department </h2>";
    htmlString +="<p>" + data[i].Department + "</p>";
    //adding an edit module button here
    htmlString += "<br> <br>";
    htmlString += "<button class='btn'>Edit Academic</button>";
    htmlString += "<hr>";
  }
  academicContainer.insertAdjacentHTML('beforeend', htmlString);
  htmlString += "<button class='btn'>Add Academic</button>"
  academicContainer.appendChild(viewMoreAcademicsBtn);
}
