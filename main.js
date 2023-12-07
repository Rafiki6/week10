const byIdRevese = (a,b) => b.id - a.id;
const  buttomComponent = (onclick,name,type ="primary") =>
`<button onclick="${onclick}" class="btn btn-${type}">${name}</button>`;

function cardComponent(item){
    return `<div class="card">` + 
    buttomComponent(`deletebyId(${item.id})`,"X", "danger")+
    buttomComponent(`editById(${item.id}, '${item.courseName}')`,item.courseName)
}
function draw(data){//RENDER
    //PUT LATEST DATA IN LOCAL STORAGE
    localStorage.cachedData =JSON.stringify(data);
    //SORT AND ADD ALL ITEMS TO THE CARD LIST
    cardList.innerHTML = data.sort(byIdRevese).map(cardComponent).join("");

}
function editById(id,name){
    eidtItemId.value = id;
    editItemTitle.value = name;
}
function clear(){
    editItemId.value="";
    editItemTitle.value="";
}
function read(){
    clear();
    fetch("http://localhost:8081/api/courses",{
        method: "GET"})
        .then(response => response.json())
        .then(draw);
}
// POST AKA CREATE
function create(title){
    const item = {
        "courseName" : title,
        "dept" : "CompSci",
        "courseNum" : "401",
        "instructor": "Kevin Long",
        "startDate" : "Dec 4",
        "numDays"   : 5
    }
    fetch("http://localhost:8081/api/courses",{
    method : "POST",
    headers : {"content-type" : "application/json"},
    body : JSON.stringify(item)})
    .then(response => response.json())
    .then(read)
   
}
function updatedById(id,courseName){
    const item = {"courseName":courseName};
    fetch("http://localhost:8081/api/courses/" + id,{
        method : "PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(item)
    }).then(read)
}
function deletebyId(id){
    fetch("http://localhost:8081/api/courses/" + id,{
        method:"DELETE"
    }).then(read)
}
document.addEventListener("DOMContentLoaded", e =>{
    if(localStorage.cachedData == undefined){
        read()//GET
    }else{
        draw(JSON.parse(localStorage.cachedData))
    }

  
    saveEditButton.addEventListener("click",e =>{
        if(editItemId.value == ""){
            create(editItemTitle.value);//POST
        }else{
            updatedById(editItemId.value,editItemTitle.value);
        }
    });
    newItemButton.addEventListener("click",clear);
})