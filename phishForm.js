document.getElementById("subBtn").addListener("click", checkFunc);

function checkFunc(){
  var emailString = document.getElementById("email").value;
  var nameString = document.getElementById("name").value;
  var numberString = document.getElementById("numnber").value;
  console.log(emailString + " " + nameString + " " + numberString);
}
