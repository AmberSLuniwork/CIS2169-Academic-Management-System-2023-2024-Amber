var htmlString = ""; // Initialize htmlString outside of the event listener

document.addEventListener('DOMContentLoaded', function() {
    var pageCounter = 1;
    var article = document.getElementsByTagName("article")[0];

    // Create module container and append (add) it to the article
    var moduleContainer = document.createElement("div");
    moduleContainer.classList.add("container");
    moduleContainer.setAttribute('id', 'academic-container');
    article.appendChild(moduleContainer);

    //stops the view more courses button loading more pages than it should!
    //I want to have a view more modules button. I think it makes more sense.
    var viewmorebtn = document.createElement("button");
    //styling
    viewmorebtn.classList.add("btn");
    viewmorebtn.textContent = "View More Academics";

    // Event listener for "View More Modules" button
    viewmorebtn.addEventListener("click", function() {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/data/academics/academic-'+ pageCounter +'.json');
        ourRequest.onload = function(){
            var ourData = JSON.parse(ourRequest.responseText);
            //this code doesn't work, but removing it stops everything else working. Keeping it in.
            if (ourData.length === 0) {
                alert("No more academics.");
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
        ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/data/modules/academic-1.json');
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
            htmlString += "<h2>Name</h2>"
            htmlString += "p" + data[i].Name + "</p>";
            htmlString += "<h2>Name</h2>"
            htmlString += "p" + data[i].Department + "</p>";

            // Button to edit module
            htmlString += "<button class='btn' onclick='editAcademic(\"" + data[i].Course + "\")'>Edit Academic</button><br>";
            // Form for editing academic (initially hidden)
            htmlString += "<br><form class='edit-form' id='form-" + data[i].Course + "' style='display:none;'>";
            htmlString += "<label for='name'>Name:</label>";
            htmlString += "<input type='text' id='name' name='name'><br>";

        }
        htmlString += "<form class='edit-form' id='form-add' style='display:none;'>";
          htmlString += "<label for='name'>Name:</label>";
          htmlString += "<input type='text' id='name' name='name'><br>";
          htmlString += "<label for='department'>Department:</label>";
          htmlString += "<input type='text' id='department' name='department'><br>";
          htmlString += "<button class='btn' id='finishAcademic' onclick='addAcademic()'>Add Academic</button>";
        htmlString += "</form>";
    
        // button for adding modules here
        htmlString += "<button class='btn' id='addAcademic' onclick='toggleForm(\"form-add\")'>Add Academic</button>";
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