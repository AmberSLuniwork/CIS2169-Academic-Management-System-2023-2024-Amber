var htmlString = ""; // Initialize htmlString outside of the event listener

document.addEventListener('DOMContentLoaded', function() {
    var pageCounter = 1;
    var article = document.getElementsByTagName("article")[0];

    // Create module container and append (add) it to the article
    var moduleContainer = document.createElement("div");
    moduleContainer.classList.add("container");
    moduleContainer.setAttribute('id', 'module-container');
    article.appendChild(moduleContainer);

    //stops the view more courses button loading more pages than it should!
    //I want to have a view more modules button. I think it makes more sense.
    var viewmorebtn = document.createElement("button");
    //styling
    viewmorebtn.classList.add("btn");
    viewmorebtn.textContent = "View More Modules";

    // Event listener for "View More Modules" button
    viewmorebtn.addEventListener("click", function() {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/data/modules/module-'+ pageCounter +'.json');
        ourRequest.onload = function(){
            var ourData = JSON.parse(ourRequest.responseText);
            //this code doesn't work, but removing it stops everything else working. Keeping it in.
            if (ourData.length === 0) {
                alert("No more modules.");
                viewmorebtn.style.display = 'none'; 
            } else {
                renderHTML(ourData);
            }
        };
        ourRequest.send();
        pageCounter++;
    });

    // Load the first page's worth of data when the page loads
    loadModuleData();

    // Function to load module data
    function loadModuleData() {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/data/modules/module-1.json');
        ourRequest.onload = function() {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        };
        ourRequest.send();
        pageCounter++;
    }

    // Function to render module data
    function renderHTML(data) {
        htmlString = ""; // Reset htmlString to an empty string
        for (var i = 0; i < data.length; i++) {
            htmlString += "<h2>" + data[i].Course + "</h2>";
            htmlString += "<p>For " + data[i].Name + " students</p>";
            htmlString += "<h3>Assignments</h3>";
            htmlString += "<ul>";
            for (var ii = 0; ii < data[i].Module.Assignment.length; ii++) {
                htmlString += "<li>";
                htmlString += "<p>" + data[i].Module.Assignment[ii] + "</p>";
                htmlString += "<ul>";
                htmlString += "<li>";
                htmlString += "<p>Weight: " + data[i].Module.weights[ii] + "</p>";
                htmlString += "</li>";
                htmlString += "<li>";
                htmlString += "<p>Volume: " + data[i].Module.Volume[ii] + "</p>";
                htmlString += "</li>";
                htmlString += "</ul>";
                htmlString += "</li>";
            }
            htmlString += "</ul>";
            htmlString += "<h3>Learning Outcomes</h3>";
            htmlString += "<p>";
            for (var ii = 0; ii < data[i].Module.Learning_outcomes.length; ii++) {
                if (ii == 0) {
                    htmlString += data[i].Module.Learning_outcomes[ii];
                } else {
                    htmlString += " and " + data[i].Module.Learning_outcomes[ii];
                }
            }
            htmlString += "</p>";
            // Button to edit module
            htmlString += "<button class='btn' onclick='editModule(\"" + data[i].Course + "\")'>Edit Module</button><br>";
            // Form for editing module (initially hidden)
            htmlString += "<br><form class='edit-form' id='form-" + data[i].Course + "' style='display:none;'>";
            htmlString += "<label for='name'>Name:</label>";
            htmlString += "<select id='name' name='name'>";
              htmlString += "<option value='Undergrad' " + (data[i].Name === 'Undergrad' ? 'selected' : '') + ">Undergrad</option>";
              htmlString += "<option value='Postgrad' " + (data[i].Name === 'Postgrad' ? 'selected' : '') + ">Postgrad</option>";
              htmlString += "<option value='Research' " + (data[i].Name === 'Research' ? 'selected' : '') + ">Research</option>";
            htmlString += "</select><br>";
            htmlString += "<label for='course'>Course:</label>";
            htmlString += "<input type='text' id='course' name='course' value='" + data[i].Course + "'><br>";
            // Fields for Assessments
            htmlString += "<h3>Assignments</h3>";
            for (var j = 0; j < data[i].Module.Assignment.length; j++) {
              htmlString += "<label for='assignment" + j + "'>Assignment " + (j + 1) + ":</label>";
              htmlString += "<input type='text' id='assignment" + j + "' name='assignment" + j + "' value='" + data[i].Module.Assignment[j] + "'><br>";
              htmlString += "<label for='weight" + j + "'>Weight:</label>";
              htmlString += "<input type='text' id='weight" + j + "' name='weight" + j + "' value='" + data[i].Module.weights[j] + "'><br>";
              htmlString += "<label for='volume" + j + "'>Volume:</label>";
              htmlString += "<input type='text' id='volume" + j + "' name='volume" + j + "' value='" + data[i].Module.Volume[j] + "'><br>";
            }
            // Learning Outcomes
            htmlString += "<h3>Learning Outcomes</h3>";
            for (var k = 0; k < data[i].Module.Learning_outcomes.length; k++) {
              htmlString += "<input type='text' id='learning_outcome" + k + "' name='learning_outcome" + k + "' value='" + data[i].Module.Learning_outcomes[k] + "'><br>";
            }
            htmlString += "</p>";
            // Credits and Hours
            htmlString += "<label for='credits'>Credits:</label>";
            htmlString += "<input type='text' id='credits' name='credits' value='" + data[i].credits + "'><br>";
            htmlString += "<label for='hours'>Hours:</label>";
            htmlString += "<input type='text' id='hours' name='hours' value='" + data[i].hours + "'><br>";
            htmlString += "<button type='submit' id=submit class='btn'>Save</button>";
            htmlString += "</form><br>";
            htmlString += "<hr>";
        }
        htmlString += "<form class='edit-form' id='form-add' style='display:none;'>";
          htmlString += "<label for='course'>Course:</label>";
          htmlString += "<input type='text' id='course' name='course'><br>";
          htmlString += "<label for='name'>Name:</label>";
          htmlString += "<input type='text' id='name' name='name'><br>";
          htmlString += "<label for='assignment1'>Assignment 1:</label>";
          htmlString += "<input type='text' id='assignment1' name='assignment1'><br>";
          htmlString += "<label for='weight1'>Weight 1:</label>";
          htmlString += "<input type='text' id='weight1' name='weight1'><br>";
          htmlString += "<label for='volume1'>Volume 1:</label>";
          htmlString += "<input type='text' id='volume1' name='volume1'><br>";
          htmlString += "<label for='learning_outcome1'>Learning Outcome 1:</label>";
          htmlString += "<input type='text' id='learning_outcome1' name='learning_outcome1'><br>";
          htmlString += "<label for='credits'>Credits:</label>";
          htmlString += "<input type='text' id='credits' name='credits'><br>";
          htmlString += "<label for='hours'>Hours:</label>";
          htmlString += "<input type='text' id='hours' name='hours'><br>";
          htmlString += "<button class='btn' id='finishModule' onclick='addModule()'>Add Module</button>";
        htmlString += "</form>";
    
        // button for adding modules here
        htmlString += "<button class='btn' id='addModule' onclick='toggleForm(\"form-add\")'>Add Module</button>";
        htmlString += "<br><br>";
        moduleContainer.insertAdjacentHTML('beforeend', htmlString);
        moduleContainer.appendChild(viewmorebtn);
    }
});

//adding and editing module functions go here - they need to be in the loop to access the data.
function toggleForm(formId, finishModule) {
  var form = document.getElementById(formId);
  var doneButton = document.getElementById(finishModule);
  if (form.style.display === "none") {
      form.style.display = "block";
      doneButton.textContent = "Done";
  } else {
      form.style.display = "none";
      doneButton.textContent = "Add Module";
  }
}
function editModule(moduleName) {
    // Show the form for editing the module
    var form = document.getElementById('form-' + moduleName);
    form.style.display = 'block';
}
saveBtn.addEventListener("Click", function(){

});
