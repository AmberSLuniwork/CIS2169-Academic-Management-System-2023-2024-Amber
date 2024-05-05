var initialAssignmentAdded = true; // Flag to track if the initial assignment is added

function addAssignment() {
    var assignmentFields = document.getElementById("assignmentFields");
    var assignmentCount = assignmentFields.childElementCount + 1;

    var assignmentLabel = "CW" + assignmentCount;

    var htmlString = `
        <div id="assignmentDiv${assignmentCount}">
        <br>
            <label for="assignment${assignmentCount}"><p>Assignment ${assignmentCount}:</p></label><br>
            <input type="text" id="assignment${assignmentCount}" name="assignment${assignmentCount}" value="${assignmentLabel}" required><br>
            <label for="weighting${assignmentCount}"><p>Weighting:</p></label><br>
            <input type="number" id="weighting${assignmentCount}" name="weighting${assignmentCount}" min="0" max="100" required><br>
        </div>
    `;

    if (!initialAssignmentAdded) {
        htmlString += `<button type="button" onclick="removeAssignment(${assignmentCount})">Remove Assignment</button>`;
    }

    assignmentFields.insertAdjacentHTML('beforeend', htmlString);
    initialAssignmentAdded = false;
}

function removeAssignment(assignmentCount) {
    if (assignmentCount === 1) {
        alert("At least one assignment is required.");
        return;
    }

    var assignmentDiv = document.getElementById("assignmentDiv" + assignmentCount);
    assignmentDiv.parentNode.removeChild(assignmentDiv);

    if (!initialAssignmentAdded) {
        var buttonToRemove = document.querySelector(`button[onclick="removeAssignment(${assignmentCount})"]`);
        buttonToRemove.parentNode.removeChild(buttonToRemove);
    }
}

function createModule() {
    // Validate weightings
    var isValidWeightings = validateWeightings();
    if (!isValidWeightings) {
        alert("Weightings must add up to 100.");
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Validate at least one assignment
    var assignmentFields = document.getElementById("assignmentFields");
    if (assignmentFields.childElementCount === 0) {
        alert("At least one assignment is required.");
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Form submission logic
    // Add your code to submit the form and create the module
}

function validateWeightings() {
    var assignmentFields = document.getElementById("assignmentFields");
    var weightings = assignmentFields.querySelectorAll('input[type="number"]');
    var totalWeighting = 0;

    for (var i = 0; i < weightings.length; i++) {
        totalWeighting += parseInt(weightings[i].value);
    }

    return totalWeighting === 100;
}