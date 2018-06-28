


function holdState(animal) {
  let animalMenuBarElement = document.getElementById(animal)
  let animalClass = document.getElementsByClassName('barAnimals')
  let dropDownContectElements = document.getElementById("content")
  for (i = 0; i < animalClass.length; i++) {

    animalClass[i].setAttribute("style", "border: 0px")

  }

  if (animalMenuBarElement.selected === true) {
    dropDownContectElements.setAttribute("style", "display: none;")
    animalMenuBarElement.setAttribute("style", "border: 0px solid black")
    animalMenuBarElement.selected = false;
  }
  else {
    clearCategories(animal)
    dropDownContectElements.setAttribute("style", "display: flex;")
    animalMenuBarElement.setAttribute("style", "border: 5px solid black")
    animalMenuBarElement.selected = true;
  }

}

// Client ID and API key from the Developer Console
var CLIENT_ID = '935390890075-th5n5keb2pkqv9mun11rs92br073idog.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAkiNwNzVroOuHodPWScgLUgDOSk3loYUs';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}



/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

let currentDepartment = ""
function listMajors(currentAnimal) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1a6lR7xANcqYZBblKDcJ-Nn9ZRhZZhuqAd9gwv6tfQKg', range: 'Categories!A2:E',
  }).then(function (response) {
    
    var range = response.result;
    let animCol
    switch (currentAnimal) {
      case "cat": animCol = 2;
        break;
      case "dog": animCol = 3;
        break;
      case "bird": animCol = 4;
        break;
      case "fish": animCol = 5;
        break;
      case "reptile": animCol = 6;
        break;
        console.log("Animal is " + currentAnimal + "animCol is " + animCol);
        break;
      default: console.log("Animal Malfunction! animCol is " + animCol)
    }

    console.log("animCol is " + animCol)
    if (range.values.length > 0) {
      //appendPre('Department,    Category:');
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        if (row[animCol] === "x" || row[animCol] === "X") {
          if (currentDepartment === "" || currentDepartment != row[1]) {
            appendHeading(row[1])
            appendItem(row[0])
            currentDepartment = row[1]
          }
          else {
            appendItem(row[0])
          }

        }
      }
    } else {
      appendHeading('No data found.');
    }
  }, function (response) {
    appendHeading('Error: ' + response.result.error.message);
  });
}
function clearCategories(animal) {
  var elements = document.getElementById('content').getElementsByClassName('categories');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  var departs = document.getElementById('content').getElementsByClassName('department');
  while (departs.length > 0) {
    departs[0].parentNode.removeChild(departs[0]);
  }
  listMajors(animal)
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */

// function appendPre(message) {
//   var pre = document.getElementById('content');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }
// MOVED BELOW AND MODIFIED
function appendHeading(message) {
  var pre = document.getElementById('content');
  var para = document.createElement("p");
  para.classList.add('department');
  para.innerHTML = message;
  pre.appendChild(para);
}
function appendItem(message) {
  var pre = document.getElementById('content');
  var bItem = document.createElement("p");
  bItem.classList.add("categories")
  bItem.innerHTML = message;
  pre.appendChild(bItem);
}