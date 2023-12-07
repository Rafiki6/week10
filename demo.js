fetch("http://localhost:8081/api/courses", {
    method: "POST",
    body: (data)
})
    .then(response => response.json())
    .then(json => {
        2 - 16
        // If the POST finishes successfully, display a message
        let confirmationMessage =
            document.getElementById(confirmationMessage);
        confirmationMessage.innerHTML = "New student added";
    });

// GET EXAMPLE

fetch("http://localhost:8081/api/courses")
    .then(response => response.json())
    .then(data => {
        data.forEach(item => console.log(JSON.stringify(item, 0, 4)));
    });

// POST AKA CREATE AN NEW INTITY
const item =
{
    "id": 17,
    "dept": "Finance",
    "courseNum": "401",
    "courseName": "INTRO AJAX API REST CRUD",
    "instructor": "Brittany",
    "startDate": "Aug",
    "numDays": 5
}
// POST Request is used to specify that data(a resource added to the data store)
fetch("http://localhost:8081/api/courses", {
    method: "POST",//CREATE
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify(item)
})
    .then(response => response.json())
    .then(item => console.log(JSON.stringify(item, 0, 4)))

// PUT request is used to specify that a resource in the data store be edited.
fetch("http://localhost:8081/api/courses", {
    methot: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item)
})
    .then(response => response.json())
    .then(item => console.log(JSON.stringify(item, 0, 4)))

// DELETE REQUEST workflow is to fetch data to let the user visually confirm it is data to deleted
fetch("http://localhost:8081/api/courses", {
    method: "DELETE"
})
    .then(response => {
        if (response.ok) {
            console.log("DELETE Request Successful")
        } else {
            console.log("DELETE Request Failed")
        }
    })