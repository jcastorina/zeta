var online = document.getElementById('online').innerText
var friends = online.split(',')
var selector = document.getElementById("friendSelector");

//create form and event handlers
for(var i in friends){
    var div = document.createElement("div")
    var lab = document.createElement("label");
    lab.setAttribute("style", "color:#CCCCCC")
    var input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.setAttribute("name", friends[i])
    input.setAttribute("id", friends[i])
    input.onclick = addFriends;
    lab.appendChild(input);
    lab.append(friends[i])
    div.appendChild(lab);
    selector.appendChild(div);
}

//feedback to toggle name display color when selected
function addFriends(){
    var form = this.form;
    if(form.elements[this.name].parentElement.style.color === "rgb(204, 204, 204)"){
        form.elements[this.name].parentElement.style.color = "rgb(0, 255, 0)"
    } else {
        form.elements[this.name].parentElement.style.color = "rgb(204, 204, 204)"
    }
}
