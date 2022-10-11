// Callback from a <input type="file" onchange="onChange(event)">
function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    // The file's text will be printed here
    console.log(e.target.result)
  };

  reader.readAsText(file);
}