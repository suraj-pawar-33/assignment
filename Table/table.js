document.addEventListener('DOMContentLoaded', init);

function init(){


}




















var div = document.getElementById('main');


class Row {
  constructor(obj) {
    this.obj = obj;
  }
  tHead(){
    let tr = document.createElement('tr');
    for (var item in this.obj) {
      let th = document.createElement('th');
      th.innerHTML = item;
      tr.appendChild(th);
    }
                                      console.log("head row created");
    return tr;
  }
  tBody(){
    let tr = document.createElement('tr');
    for (var item in this.obj) {
      let td = document.createElement('td');
      if (checkTypeOf(this.obj[item]) == "obj" || checkTypeOf(this.obj[item]) == "arr") {
        td.innerHTML = item;
        td.classList.add('link');
        td.addEventListener('click', (ev) => {
          console.log('clicked' , ev.target);
          readData(this.obj[item]);
        });
      }else {
        td.innerHTML = this.obj[item];
      }
      tr.appendChild(td);
    }
                                          console.log("body row created");
    return tr;
  }
}


class Table {
  constructor(tArr) {
    this.tArr = tArr;
    this.table = document.createElement('table');
    this.content = [];
  }
  getTable(){
    return this.table;
  }
  addRows(){
    let i = 1;
    this.content[0] = new Row(this.tArr[0]);
    this.table.appendChild(this.content[0].tHead());
    this.tArr.forEach((item) => {
      this.content[i] = new Row(item);
      this.table.appendChild(this.content[i].tBody());
      i++;
                                                        console.log("rows added");
    });
  }

  addRow(){
    this.content[0] = new Row(this.tArr);
    this.table.appendChild(this.content[0].tHead());
    this.content[1] = new Row(this.tArr);
    this.table.appendChild(this.content[1].tBody());
                                                    console.log("row added");
  }
}




  fetch("https://my-json-server.typicode.com/suraj-pawar-33/tableJson/db")
  .then(response => response.text())
  .then(readThis);
  function readThis(text) {
    let data = JSON.parse(text);
    readData(data.data);
  }

function readData(item) {
  if(checkTypeOf(item) == "obj"){
    let table = new Table(item);
                                          console.log("table created");
    table.addRow();
    div.appendChild(table.getTable());
  }else if(checkTypeOf(item) == "arr"){
    let table = new Table(item);
                                          console.log("tables created");
    table.addRows();
    div.appendChild(table.getTable());
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
