document.addEventListener('DOMContentLoaded', init);

function init(){


}




















var wrapper = document.getElementById('main');
var counter = 1;

class Row {
  constructor(obj) {
    this.obj = obj;
  }
  tHead(){
    let tr = document.createElement('tr');
    for (var item in this.obj) {
      let th = document.createElement('th');
      th.innerHTML = item;
      th.myVar = 29;
      th.addEventListener("click", () => {
        //nothing
      })
      tr.appendChild(th);
    }
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
          readData(this.obj[item]);
        });
      }else {
        td.innerHTML = this.obj[item];
      }
      tr.appendChild(td);
    }
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
    this.table.addEventListener("click", (ev) => {
      if(ev.target.myVar == 29){
        togleSort(this, ev.target.innerHTML);
      }
    })
    return this.table;
  }
  setRows(){
    let i = 0;
    this.tArr.forEach((item) => {
      this.content[i] = new Row(item);
      i++;
    });
  }
  setContent(content){
    this.content = content;
  }

  addRows(){
    this.table.innerHTML = "";
    this.setHeader();
    this.content.forEach((item) => {
      this.table.appendChild(item.tBody());
    });
  }
  setHeader(){
    let header = new Row(this.tArr[0]);
    this.table.appendChild(header.tHead());
  }

  addRow(){
    let header = new Row(this.tArr);
    this.table.appendChild(header.tHead());
    this.content[0] = new Row(this.tArr);
    this.table.appendChild(this.content[0].tBody());
  }
}
var assd = false;
function togleSort(table, header){
  if(assd == false){
    sortRows(table, header)
    assd = true;
  }else {
    unSortRows(table, header);
    assd = false;
  }

}

function sortRows(table, header){
  let i = 0;
  let newContent = table.content.sort((a, b) => {
    if(a.obj[header] > b.obj[header]) return 1;
    else if(a.obj[header] < b.obj[header]) return -1;
    else return 0;
  });
  table.setContent(newContent);
  table.addRows();
}

function unSortRows(table, header){
  let i = 0;
  let newContent = table.content.sort((a, b) => {
    if(a.obj[header] < b.obj[header]) return 1;
    else if(a.obj[header] > b.obj[header]) return -1;
    else return 0;
  });
  table.setContent(newContent);
  table.addRows();
}


  fetch("https://my-json-server.typicode.com/suraj-pawar-33/tableJson/db")
  .then(response => response.text())
  .then(readThis);
  function readThis(text) {
    let data = JSON.parse(text);
    console.log("data received...");
    readData(data);
  }

function readData(item) {
  if(checkTypeOf(item) == "obj"){
    let table = new Table(item);
    table.addRow();
    setDiv(table.getTable());
  }else if(checkTypeOf(item) == "arr"){
    let table = new Table(item);
    table.setRows();
    table.addRows();
    setDiv(table.getTable());
  }
}

function setDiv(elem){
  let div = getDiv();
  div.appendChild(elem);
  wrapper.appendChild(div);
}

function getDiv(){
  let div = document.createElement("div");
  div.classList.add('table_box');
  let span = document.createElement("span");
  span.id = "close_table";
  span.classList.add("close");
  span.innerHTML = "&times;"
  span.addEventListener("click", () => {
    //nothing
  });

  div.appendChild(span);
  div.style.paddingTop = (50 * counter) + "px";
  div.style.zIndex = counter + "";
  counter++;

  div.addEventListener('click', (ev) => {
    if(ev.target == span){
      ev.currentTarget.remove();
      counter--;
    }
  });
  return div;
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
