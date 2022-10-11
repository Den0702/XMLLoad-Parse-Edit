let cds = [];
let cdFields = [];
let editingCD;

function handleEditCDClick(i) {
  // inicjalizacja formularza -
  // oraz jego prezentacja
  editingCD = cds[i];
  const form = document.getElementById("cdEditForm");
  form.elements["TITLE"].value = editingCD["TITLE"];
  form.elements["ARTIST"].value = editingCD["ARTIST"];
  form.elements["COUNTRY"].value = editingCD["COUNTRY"];
  form.elements["COMPANY"].value = editingCD["COMPANY"];
  form.elements["PRICE"].value = editingCD["PRICE"];
  form.elements["YEAR"].value = editingCD["YEAR"];

  showForm();
}

function hideForm() {
  const form = document.getElementById("cdEditForm");
  form.style.display = "none";
}
function showForm() {
  const form = document.getElementById("cdEditForm");
  form.style.display = "block";
}

function handleEditCDFormSaveClick() {
  const form = document.getElementById("cdEditForm");
  // zapisanie do edytowanej płyty nowe wartości pól
  editingCD["TITLE"] = form.elements["TITLE"].value;
  editingCD["ARTIST"] = form.elements["ARTIST"].value;
  editingCD["COUNTRY"] = form.elements["COUNTRY"].value;
  editingCD["COMPANY"] = form.elements["COMPANY"].value;
  editingCD["PRICE"] = form.elements["PRICE"].value;
  editingCD["YEAR"] = form.elements["YEAR"].value;

  displayCDs();
  hideForm();
}

function readFileFromInput() {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("You need to choose an XML file");
    return;
  }

  const file = fileInput.files[0];
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    processFileContents(e.target.result);
  };
  fileReader.readAsText(file);
}

function processFileContents(fileContents) {
    //parsowanie XML'a
    const domParser = new DOMParser();
    const xmlDoc = domParser.parseFromString(fileContents, "text/xml");
    const catalogNode = xmlDoc.querySelector("CATALOG");
    cds = [];
    for (let i = 0; i < catalogNode.children.length; i++) {
      const cd = {};
      const cdNode = catalogNode.children[i];
      for (let j = 0; j < cdNode.children.length; j++) {
        cd[cdNode.children[j].tagName] = cdNode.children[j].textContent;
      }
      cds.push(cd);
    }
    cdFields = Object.keys(cds[0]);
    displayCDs();
}

function displayCDs() {
  let html = "";
  html += "<tr>";
  for (let i = 0; i < cdFields.length; i++)
    html += "<th>" + cdFields[i] + "</th>";
  html += "<th></th>";
  html += "<th></th>";
  html += "</tr>";
  for (let i = 0; i < cds.length; i++) {
    html += "<tr>";
    for (let j = 0; j < cdFields.length; j++)
      html += '<td>' + cds[i][cdFields[j]] + '</td>';
    html += '<td><button onclick="handleEditCDClick(' + i + ')" class="block yellow-btn">edit</button></td>';
    html += '<td><button onclick="handleDeleteCDClick(' + i + ')" class="block red-btn">X</button></td>';
    html += "</tr>";
  }
  const myTable = document.getElementById("myTable");
  myTable.innerHTML = html;
}

function handleDeleteCDClick(i) {
  deleteCD(i);
  displayCDs();
}

function handleSaveClick() {
  saveCDsToLocalStorage();
}

function handleLoadClick() {
  loadCDsFromLocalStorage();
  displayCDs();
}

function deleteCD(i) {
  cds.splice(i, 1);
}

function saveCDsToLocalStorage() {
  const data = { cds, cdFields };
  localStorage.myCDsData = JSON.stringify(data);
}

function loadCDsFromLocalStorage() {
  if (localStorage.getItem("myCDsData")) {
    const data = JSON.parse(localStorage.getItem("myCDsData"));
    cds = data.cds;
    cdFields = data.cdFields;
  }
}
