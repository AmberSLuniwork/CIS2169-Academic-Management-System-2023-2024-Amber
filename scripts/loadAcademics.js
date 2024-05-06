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
    loadAcademicData();

    // Function to load module data
    function loadAcademicData() {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'https://raw.githubusercontent.com/AmberSLuniwork/CIS2169-Academic-Management-System-2023-2024-Amber/main/data/academics/academic-1.json');
        ourRequest.onload = function() {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        };
        ourRequest.send();
        pageCounter++;
    }

    function renderHTML(data) {
      htmlString = ""; // Reset htmlString to an empty string
      for (var i = 0; i < data.length; i++) {
          htmlString += "<h2>Name</h2>"
          htmlString += "<p>" + data[i].Name + "</p>";
          htmlString += "<h2>Department</h2>"
          htmlString += "<p>" + data[i].Department + "</p>";
  
          // Button to edit academic
          htmlString += "<button class='btn' onclick='editAcademic(\"" + data[i].Name + "\", \"" + i + "\")'>Edit Academic</button><br>";
          // Form for editing academic (initially hidden)
          htmlString += "<br><form class='edit-form' id='form-" + data[i].Name + "-" + i + "' style='display:none;'>";
          htmlString += "<label for='name-" + i + "'>Name:</label>";
          htmlString += "<input type='text' id='name-" + i + "' name='name'><br>";
          // You can similarly add unique IDs for other form elements
      }
      // Your existing code
  }
  
  // Function to toggle form visibility
  function toggleForm(formId, finishAcademic) {
      var form = document.getElementById(formId);
      var doneButton = document.getElementById(finishAcademic);
      if (form.style.display === "none") {
          form.style.display = "block";
          doneButton.textContent = "Done";
      } else {
          form.style.display = "none";
          doneButton.textContent = "Add Academic";
      }
  }
  
  // Function to handle editing an academic
  function editAcademic(academicName, index) {
      var form = document.getElementById('form-' + academicName + "-" + index);
      form.style.display = 'block';
  }
});