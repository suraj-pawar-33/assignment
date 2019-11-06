document.addEventListener('DOMContentLoaded', init);

function init(){


var wrapper = document.getElementById('main');
var counter = 1;
var data = 0;

var colmSrchWord = 0;
var colmHeader = 0;

class Row {
  constructor(obj) {
    this.obj = obj;
  }
  tHead(n, needs){
    let tr = document.createElement('tr');
    for (var item in this.obj) {
      let th = document.createElement('th');
      let p = document.createElement('p');

      p.innerHTML = item;
      p.myVar = n;
      p.addEventListener("click", () => {
        //nothing
      });
      th.appendChild(p);
      if(needs && checkTypeOf(this.obj[item]) != "obj" && checkTypeOf(this.obj[item]) != "arr"){

        let inp = document.createElement('input');
        let spn = document.createElement('span');
        spn.innerHTML = "&#x1F50D;";
        spn.myVar = 40;
        inp.addEventListener("keyup", (ev) => {
          if(typeof this.obj[item] == 'string'){
              colmSrchWord = ev.target.value.toLowerCase();
          }else {
              colmSrchWord = ev.target.value;
          }
              colmHeader = p.innerHTML;
              });
        spn.addEventListener('click', (ev) => {
          inp.value = "";
        });
        th.appendChild(inp);
        th.appendChild(spn);
      }
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
      if(ev.target.myVar == 40){
        filterColumn(this);
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
    this.table.innerHTML = "";
    this.setHeader();
    this.content.forEach((item) => {
      this.table.appendChild(item.tBody());
    });
  }
  setHeader(){
    let header = new Row(this.tArr[0]);

    this.table.appendChild(header.tHead(29, true));
  }

  addRow(){
    let header = new Row(this.tArr);
    this.table.appendChild(header.tHead(30, false));
    this.content[0] = new Row(this.tArr);
    this.table.appendChild(this.content[0].tBody());
  }
}

function filterColumn(table){

  let newContent = table.content.filter((item) => {
    let hValue = item.obj[colmHeader];
    if(typeof hValue == 'string'){
      hValue.toLowerCase();
      return hValue.includes(colmSrchWord);
    }else {
      return hValue == colmSrchWord;
    }

  });

  table.setContent(newContent);
  table.addRows();
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

var searchArr = [];
var sCount = 0;
var seaValue = 0;
var input = document.getElementById("search");
var resultDiv = document.getElementById("results");

input.addEventListener('keyup', (ev) => {
  seaValue = ev.target.value.toLowerCase();
  if(ev.keyCode == 13){
    resultDiv.innerHTML = "";
    saveAll(data);
  }
});



function saveAll(item){

  if(checkTypeOf(item) == "obj"){
    readObj(item);
  }else if(checkTypeOf(item) == "arr"){
    readArray(item);
  }
}

function readObj(item){
  for(let value in item){
    if (checkTypeOf(item[value]) == "obj" || checkTypeOf(item[value]) == "arr") {
      saveAll(item[value]);
    }else {

      if(typeof item[value] == 'string'){
        let p = item[value].toLowerCase();
        if (p.includes(seaValue)) {
          showResult(item);
        }
      }
      else {
        if (item[value] == seaValue) {
          showResult(item);
        }
      }


    }
  }
}

function readArray(data){
    data.forEach(function(value){
      saveAll(value);
    });
  }

  function showResult(item){
    let ul = document.createElement('ul');
    for (var value in item) {
      if (checkTypeOf(item[value]) != "obj" && checkTypeOf(item[value]) != "arr") {
        let li = document.createElement('li');
        li.innerHTML = "<h3>"+ value +"</h3><p>"+ item[value] +"</p>";
        ul.appendChild(li);
      }
    }
    resultDiv.appendChild(ul);
  }

//read data starts
  fetch("https://my-json-server.typicode.com/suraj-pawar-33/tableJson/db")
  .then(response => response.text())
  .then(readThis);
  function readThis(text) {
    data = JSON.parse(text);
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


}
