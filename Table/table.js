
  fetch('https://my-json-server.typicode.com/suraj-pawar-33/tableJson/db')
  .then(response => response.text())
  .then(readThis);
  function readThis(text) {
    let data = JSON.parse(text);
    createArray(data);
  }



function createArray(file) {
  let value = 0;
  for(let main in file){

  }
  for (var item of file.data) {
    for (header in item) {
      console.log(header,"-",item[header]);
      if(typeof(item[header]) == 'object'){

      }
    }
  }

}
