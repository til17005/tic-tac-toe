function myLoader() {
  setTimeout(showBody, 2250);
}

function showBody() {
  console.log("testing");
  document.getElementById("loader").style.display = "none";
  document.getElementById("myContent").style.display = "block";
}
