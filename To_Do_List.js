
var counter = 0;

var add_btn = document.getElementById("add-btn");
var input_btn = document.getElementById("element");
var ul = document.getElementById("list");
var input = "";
var data = [];


function Elements(id, element){
    this.id = id;
    this.element = element;
    this.pos = 0;
    //this.time = new Date();
}

input_btn.addEventListener('blur', enableAdd);
input_btn.addEventListener('keypress', checkEnter);
add_btn.addEventListener('click', createList);

function checkEnter(ev){
    if (ev.keyCode == 13){
        input = ev.target.value; 
        createList();
    }
}

function enableAdd(ev){
    //add_btn.setAttribute("onclick", "createList()");
    input = ev.target.value; 
}

function checkPresence(value){
    value = value.toLowerCase();
    let present = data.some((item) => item.element == value);
    return present;
}

function createList() {
    
    let present = checkPresence(input);
    
    if (input == ""){
         console.log("empty input");
    }else if(present){
        window.alert(input+" is already in the list.");
        //ev.target.value = "";
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
    //ul.appendChild(li);
    
    input_btn.value = "";
    add_btn.setAttribute("onclick", "");
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
    li.innerHTML = "<div><p>elements</p></div>";
    li.appendChild(getDelete());
    li.insertBefore(getCheckBox(), li.getElementsByTagName('div')[0]);
    
    return li;
}

function getCheckBox(){
    let check = document.createElement("span");
    check.id = "check_" + counter;
    check.innerHTML = "";
    check.addEventListener('click', togglecheck);
    return check;
}

function togglecheck(ev){
    
    if (ev.currentTarget.innerHTML == ""){
        ev.currentTarget.innerHTML = "&#10004";
    }else{
        ev.currentTarget.innerHTML = "";
    }
}

function getDelete(){
    let deleteBtn = document.createElement("span");
    deleteBtn.id = "delete_" + counter;
    deleteBtn.innerHTML = "&#10006";
    deleteBtn.addEventListener('click', removeElement);
    return deleteBtn;
}

function removeElement(ev){
    let id = ev.currentTarget.id.split("_");
    let li = document.getElementById(id[1]);
    removeData(id[1]);
    li.remove();
}


function removeData(num){
    let pos = 0;
    data.forEach((item) => {
        if (item.id == num){ pos = item.pos;}
    });
    data.splice(pos, 1);
}
















