var remove = document.querySelectorAll(".close"); 
for(var i = 0; i < remove.length; i++) {  
    remove[i].addEventListener("click", removeList);  
}

var addBtn = document.querySelector("#add");
addBtn.addEventListener("click", addList);


function removeList() {
    var id = this.getAttribute("id"); 
    itemList.splice(id, 1);  
    showList(); 
}

