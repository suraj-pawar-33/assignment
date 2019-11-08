

document.addEventListener('DOMContentLoaded', init);

function init(){

  fetch("https://my-json-server.typicode.com/suraj-pawar-33/tableJson/db")
  .then(response => response.text())
  .then(readThis);
}

var wrapper = document.getElementById('main');
var counter = 1;

class Row {
  constructor(obj) {
    this.obj = obj;
    this.row = 0;
  }
  tHead(n){
    let tr = document.createElement('tr');
    for (var item in this.obj) {
      let th = document.createElement('th');
      let p = document.createElement('p');

      p.innerHTML = item;
      p.myVar = n;
      p.addEventListener("click", () => {});
      th.appendChild(p);
      tr.appendChild(th);
    }
    return tr;
  }

  tBody(){
    this.row = document.createElement('tr');
    for (var item in this.obj) {
      let td = document.createElement('td');
      if (checkTypeOf(this.obj[item]) == "obj" || checkTypeOf(this.obj[item]) == "arr") {
        td.innerHTML = item;
        td.classList.add('link');
        td.addEventListener('click', (ev) => {
          readData(this.obj[ev.target.innerHTML]);
        });
      }else {
        td.innerHTML = this.obj[item];
      }
      this.row.appendChild(td);
    }

    return this.row;
  }
}


class Table {
  constructor(tArr) {
    this.tArr = tArr;
    this.table = document.createElement('table');
    this.content = [];
    this.assd = false;
  }
  getTable(){
    this.table.addEventListener("click", (ev) => {
      if(ev.target.myVar == 29){
        this.togleSort(ev.target.innerHTML);
      }
    });
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
    this.setHeader();
    this.content.forEach((item) => {
      this.table.appendChild(item.tBody());
    });
  }

  showRows(){
    this.table.innerHTML = "";
    this.setHeader();
    this.content.forEach((item) => {
      this.table.appendChild(item.row);
    });
  }


  setHeader(){
    let header = new Row(this.tArr[0]);
    this.table.appendChild(header.tHead(29));
  }

  addRow(){
    let header = new Row(this.tArr);
    this.table.appendChild(header.tHead(30));
    this.content[0] = new Row(this.tArr);
    this.table.appendChild(this.content[0].tBody());
  }

  setDiv(){
    let div = this.getDiv(true);
    div.appendChild(this.getTable());
    wrapper.appendChild(div);
  }

  setDivSmall(){
    let div = this.getDiv(false);
    div.appendChild(this.getTable());
    wrapper.appendChild(div);
  }

  getDiv(needs){
    let div = document.createElement("div");
    div.classList.add('table_box');
    let span = document.createElement("span");
    span.id = "close_table";
    span.classList.add("close");
    span.innerHTML = "&times;"
    span.addEventListener("click", () => {});

    let inp = document.createElement('input');
    inp.classList.add("tSearch");
    inp.addEventListener("keyup", (ev) => {

      let searchKey = ev.target.value.toString().toLowerCase();

      for (let item of this.content) {
        let notPresent = true;
          for (var value in item.obj) {
            let key = item.obj[value].toString().toLowerCase();
              if(key.includes(searchKey)){
                notPresent = false;
              }
          }
          if(notPresent){
            item.row.classList.add("display_none");
          }else {
            item.row.classList.remove("display_none");
          }
        }
    });
    if (needs) {
      div.appendChild(inp);
    }

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

  togleSort(header){
    if(this.assd == false){
      this.sortRows(header)
      this.assd = true;
    }else {
      this.unSortRows(header);
      this.assd = false;
    }
  }

  sortRows(header){
    let i = 0;
    this.content.sort((a, b) => {
      if(a.obj[header] > b.obj[header]) return 1;
      else if(a.obj[header] < b.obj[header]) return -1;
      else return 0;
    });
    this.showRows();
  }

  unSortRows(header){
    let i = 0;
    this.content.sort((a, b) => {
      if(a.obj[header] < b.obj[header]) return 1;
      else if(a.obj[header] > b.obj[header]) return -1;
      else return 0;
    });
    this.showRows();
  }
}

//read data starts
function readThis(text) {
  let jsondata = JSON.parse(text);
  console.log("data received...");
  for (let item in jsondata) {
    readData(jsondata[item]);
  }

}

function readData(item) {
  if(checkTypeOf(item) == "obj"){
    let table = new Table(item);
    table.addRow();
    table.setDivSmall();
  }else if(checkTypeOf(item) == "arr"){
    let table = new Table(item);
    table.setRows();
    table.addRows();
    table.setDiv();

  }
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
