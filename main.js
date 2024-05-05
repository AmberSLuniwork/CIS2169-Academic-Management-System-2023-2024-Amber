var pageCounter = 1;
var courseBtn = document.getElementById("course-btn");
var scheduleBtn = document.getElementById("schedule-btn");
var academicBtn = document.getElementById("academic-btn");
var article = document.getElementsByTagName("article")[0];

//stops the view more courses button loading more pages than it should!
var courseFirstPageLoaded = false;
//I want to have a view more modules button. I think it makes more sense.
var viewmorebtn = document.createElement("button");
//styling the button.
viewmorebtn.classList.add("btn");
viewmorebtn.textContent = "See More Modules";

//creating a div to store the modules
var moduleContainer = document.createElement("div");
moduleContainer.classList.add("container");
moduleContainer.setAttribute('id', 'module-container')
article.appendChild(moduleContainer);

viewmorebtn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/module-'+ pageCounter +'.json');
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    // Check if data is empty (i.e., module does not exist)
    if (ourData.length === 0) {
      alert("No more modules.");
      viewmorebtn.style.display = 'none'; // Hide the button
    } else {
      renderHTML(ourData);
    }
  };
  ourRequest.send();
  pageCounter++;
});

courseBtn.addEventListener("click", function(){
  if (courseFirstPageLoaded === false && pageCounter === 1) {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/module-1.json');
    ourRequest.onload = function(){
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
      pageCounter++;
      courseFirstPageLoaded = true;

      // Toggle the display of module container and view more button
      if (courseBtn.textContent === "View Courses"){
        courseBtn.textContent = "Hide courses";
        moduleContainer.style.display = "block";
        viewmorebtn.style.display = "block"; // Show the view more button
      } else {
        courseBtn.textContent = "View Courses";
        moduleContainer.style.display = "none";
        viewmorebtn.style.display = "none"; // Hide the view more button
        if (moduleContainer && moduleContainer.parentNode) {
          moduleContainer.parentNode.removeChild(moduleContainer);
        }
        //resets page counter.
        pageCounter = 1;
        courseFirstPageLoaded = false; // fixed variable declaration
      }
    };
    ourRequest.send();
  } else {
    // Toggle the display of module container and view more button
    if (courseBtn.textContent === "View Courses"){
      courseBtn.textContent = "Hide courses";
      moduleContainer.style.display = "block";
      viewmorebtn.style.display = "block"; // Show the view more button
    } else {
      courseBtn.textContent = "View Courses";
      moduleContainer.style.display = "none";
      viewmorebtn.style.display = "none"; // Hide the view more button
      moduleContainer.innerHTML = ""; // Clear the content inside moduleContainer
      //resets page counter.
      pageCounter = 1;
      courseFirstPageLoaded = false;
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
    htmlString +="<h2>"+data[i].Course+"</h2>";
    htmlString +="<p>" + "For " +data[i].Name + " students" + "</p>";
    htmlString += "<p>" + "This module is " +data[i].credits + " and " +data[i].hours + " hours." + "</p>"
    htmlString +="<h3>" + "Assessments" + "</h3>";
    //starting a list here because I think having the weights and volumes
    //with the corresponding assessments makes more sense than having them
    //separate and open to interpretation
    htmlString += "<ul>"
    //putting all html tags seperate so I can read it easier. Could group them later to save space once done.
    for(ii = 0; ii < data[i].Module.Assignment.length; ii++){
      htmlString += "<li>";
      // Assessment name here
      htmlString += "<p>" + data[i].Module.Assignment[ii] + "</p>"; 
      // List inside list = multi level list! No styling required.
      htmlString += "<ul>"; 
      htmlString += "<li>";
      htmlString += "<p>" + "Weight: " + data[i].Module.weights[ii] + "</p>"; // Add weighting
      htmlString += "</li>";
      htmlString += "<ul> <li> <p>" + "Volume: " + data[i].Module.Volume[ii] + "</p> </li> </ul>"
      htmlString += "</ul> </li>"; // End the weightings list + assessment item
  }
    htmlString += "</ul>" //end the assignment list! All done!
    htmlString += "<h3>" + 'Learning Outcomes' + "</h3>";
    for(ii = 0; ii < data[i].Module.Learning_outcomes.length; ii++){
      if (ii == 0){
        htmlString += "<p>" + data[i].Module.Learning_outcomes[ii];
      } else {
        htmlString += " and " + data[i].Module.Learning_outcomes[ii];
      }
      "</p";
    }
    htmlString += "<hr>";
  }
  moduleContainer.insertAdjacentHTML('beforeend', htmlString);
  moduleContainer.appendChild(viewmorebtn);
}
