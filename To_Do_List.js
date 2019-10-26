document.addEventListener('DOMContentLoaded', init);

function init(){
  var add_btn = document.getElementById("add-btn");
  var input_btn = document.getElementById("element");

  input_btn.addEventListener('keypress', checkEnter);
  add_btn.addEventListener('click', createList);

  var counter = 0;
  var ul = document.getElementById("list");
  var input = "";
  var data = [];


  function Elements(id, element){
      this.id = id;
      this.element = element;
      this.pos = 0;
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

      let pos = getLocation();
      ul.insertBefore(li, ul.childNodes[pos]);

      input_btn.value = "";
      input_btn.focus();

      counter++;
  }

  function getLocation(){
      let n = 0;
      let position = 0;
      input = input.toLowerCase();
      data[counter] = new Elements(counter, input);

      data = data.sort((a, b) => {
          if(a.element > b.element) return 1;
          else if(a.element < b.element) return -1;
          else return 0;
      });

      data.forEach((item) => {
          item.pos = n;
          if (item.element == input){position = item.pos;}
          n++;
      });
      console.log(data);

      return position;
  }

  function getNewLi(){
      let li = document.createElement("li");
      li.id = counter;
      li.innerHTML = "<div><p></p></div>";
      li.addEventListener('click', removeElement)
      li.appendChild(getDelete());
      li.insertBefore(getCheckBox(), li.getElementsByTagName('div')[0]);

      return li;
  }
  function removeElement(ev){
      if(ev.target.className == 'delete_btn'){
        ev.currentTarget.remove();
        removeData(ev.currentTarget.id);
      }
  }

  function getCheckBox(){
      let check = document.createElement("span");
      check.className = 'check_btn';
      check.innerHTML = "";
      check.addEventListener('click', togglecheck);
      return check;
  }

  function togglecheck(ev){

      if (ev.target.innerHTML == ""){
          ev.target.innerHTML = "&#10004";
      }else{
          ev.target.innerHTML = "";
      }
  }

  function getDelete(){
      let deleteBtn = document.createElement("span");
      deleteBtn.className = "delete_btn";
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
      //to remove the empty cells from the array

      console.log("Now data :",data.length);
  }
}
