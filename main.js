var pageCounter = 1;
var moduleContainer = document.getElementById('module-container');
var btn = document.getElementById("course-btn");

//I want to have a view more modules button. I think it makes more sense.
var viewmorebtn = document.createElement("button");
//styling the button.
viewmorebtn.classList.add("btn");
viewmorebtn.textContent = "See More Modules";


btn.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://raw.githubusercontent.com/Edge-Hill-University-Web/CIS2169-Academic-Management-System-2023-2024/main/module-'+ pageCounter +'.json');
  ourRequest.onload = function(){
    //console.log(ourRequest.responseText);
    //alert("You clicked the course button")
    var ourData = JSON.parse(ourRequest.responseText);
    //console.log(ourData[0]);
    renderHTML(ourData);

    //making it so you can hide the courses and click a different button.
    if (btn.textContent === "View Courses"){
      btn.textContent = "Hide courses";
      moduleContainer.style.display = "block";
    } else {
      btn.textContent = "View Courses";
      moduleContainer.style.display = "none";
    }
  };
  ourRequest.send();
});

viewmorebtn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://raw.githubusercontent.com/Edge-Hill-University-Web/CIS2169-Academic-Management-System-2023-2024/main/module-'+ pageCounter +'.json');
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
  pageCounter++;
  if (pageCounter > 3){
    alert("No more modules.");
  }
});

//this is where it loads all the module data. I want it to match what I outlined in my sketches.
function renderHTML(data){
  var htmlString = "";
//this is a for loop that loads all the data in one module.
  for(i = 0; i < data.length; i++){
    //put the course name front and center. Give it a h2 tag for screenreaders.
    htmlString +="<h2>"+data[i].Course+"</h2>";
    htmlString +="<p>" + "For " +data[i].Name + " students" + "</p>";
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
      htmlString += "<p>" + "Weight: " + data[i].Module.Weights[ii] + "</p>"; // Add weighting
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
