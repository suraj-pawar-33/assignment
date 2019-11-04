// ReadJSON function
  fetch('https://my-json-server.typicode.com/suraj-pawar-33/tableJson/db')
  .then(response => response.text())
  .then(readThis);
  function readThis(text) {
    let data = JSON.parse(text);
    readData(data);
  }

function readData(item) {
  if(checkTypeOf(item) == "obj"){
    readObj(item);
  }else if(checkTypeOf(item) == "arr"){
    readArray(item);
  }
}

function readObj(item){
  for(let value in item){
    console.log(value,"-", item[value]);
    readData(item[value]);
  }
}

function readArray(data){
  data.forEach(function(value){
    readData(value);
  });

}

function checkTypeOf(value) {
  if (value.length != undefined && typeof value != "string") {
    return "arr";
  }else if(value.length == undefined && typeof value != "number"){
    return "obj";
  }else if (typeof value == "string") {
    return "str";
  }else {
    return "num";
  }
}
//end
