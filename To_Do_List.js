document.addEventListener('DOMContentLoaded', init);

function init(){

  var counter = 0;
  var ul = document.getElementById("list");
  var input = "";
  var data = [];

  var add_btn = document.getElementById("add-btn");
  var input_btn = document.getElementById("element");
  var sort_btn = document.getElementById("sort");

  input_btn.addEventListener('keyup', checkEnter);
  add_btn.addEventListener('click', createList);
  sort_btn.addEventListener('click', sort);

  function Elements(id, element){
      this.id = id;
      this.element = element;
      this.check = false;
  }

  function sort(ev){

    if(ev.target.sorted == false){
      sortbyTime();
      ev.target.sorted = true;
    }else {
      sortbyName();
      ev.target.sorted = false;
    }
  }



  function checkEnter(ev){

    input = ev.target.value;
      if (ev.keyCode == 13){
          createList();
      }
  }
  function checkPresence(value){
      value = value.toLowerCase();
      let present = data.some((item) => item.element == value);
      return present;
  }

  function createList(ev) {
      let present = checkPresence(input);

      if (input == ""){
           console.log("empty input");
      }else if(present){
          window.alert(input+" is already in the list.");
          input_btn.focus();

      }else{
          let li = getNewLi();
          li.querySelector("div")
              .querySelector("p").innerHTML = input;
          insertLi(li);
      }
  }

  function insertLi(li){

      input = input.toLowerCase();
      data[counter] = new Elements(counter, input);

      ul.insertBefore(li, ul.childNodes[counter]);

      input_btn.value = "";
      input_btn.focus();

      counter++;
  }


  function getNewLi(){
      let li = document.createElement("li");
      li.id = counter;
      li.innerHTML = "<div><p></p></div>";
      li.addEventListener('click', checkEvent);
      li.appendChild(getDelete());
      li.insertBefore(getCheckBox(), li.getElementsByTagName('div')[0]);

      return li;
  }
  function checkEvent(ev){
      if(ev.target.p == 'delete_btn'){
        ev.currentTarget.remove();
        removeData(ev.currentTarget.id);
      }else if (ev.target.p == 'check_btn') {
        togglecheck(ev);
      }
  }

  function getCheckBox(){
      let check = document.createElement("span");
      check.p = 'check_btn';
      check.innerHTML = "";
      check.addEventListener('click', nothing);
      return check;
  }

  function togglecheck(ev){

      if (ev.target.innerHTML == ""){
          data[ev.currentTarget.id].check = true;
          ev.target.innerHTML = "&#10004";
      }else{
          data[ev.currentTarget.id].check = false;
          ev.target.innerHTML = "";
      }
  }
  function sortbyTime(){

    data.sort((a, b) => {
        if(a.id > b.id) return 1;
        else if(a.id < b.id) return -1;
        else return 0;
    });
    changePosition();
  }

  function sortbyName(){
    data.sort((a, b) => {
        if(a.element > b.element) return 1;
        else if(a.element < b.element) return -1;
        else return 0;
    });
    changePosition();
  }

  function changePosition(){
    let i = 0;
    data.forEach((item) => {
      let li = document.getElementById(i++);
      let span = li.getElementsByTagName("span")[0];
      li.getElementsByTagName("p")[0].innerHTML = item.element;
      if(item.check == true){
        span.innerHTML = "&#10004";
      }else {
        span.innerHTML = "";
      }
    });
    console.log("After sort",data);
  }

  function getDelete(){
      let deleteBtn = document.createElement("span");
      deleteBtn.p = "delete_btn";
      deleteBtn.innerHTML = "&#10006";
      deleteBtn.addEventListener('click', nothing);
      return deleteBtn;
  }
  function nothing(){
    //nothing
  }

  function removeData(num){
      data = data.filter(function(item){
        return (item.id != num);
      });
      let i = 0;
      data.forEach((item) => {
        ul.childNodes[i].id = i;
        item.id = i++;
      });
      //to remove the empty cells from the array
      console.log("after delete :",data);
  }
}
