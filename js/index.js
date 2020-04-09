/*
 name: todolist
 purpose: keep a list of todo item
 version: 1.0
 author: George Louis
 date: 3/12/2018
*/
window.onload = function() {
	//variables
	var form = document.getElementById("form");
	var input = document.getElementById("input");
	var btn = document.getElementById("btn");
	var list = document.getElementById("list");	
	var btnClr = document.getElementById("btnClr");	
	var btnClrAll = document.getElementById("btnClrAll");	
	var id = 1;
	// listItem = {item: "todo item", checked: flase}
	var liItem = "";
	var todoList = [];

	//button event listener
	btn.addEventListener("click", addTodoItem);

	//list event listener
	list.addEventListener("click", boxChecked);

	//event listener for clear list
	btnClr.addEventListener("click", clearList);

	btnClrAll.addEventListener("click", clearAllList);

	if(localStorage.length <= 0) {
		btnClr.style.display = "none"; //hide clear btn	
		btnClrAll.style.display = "none"; //hide clear btn	
		console.log("button");
	}

	//checking localstorage has data
	if(localStorage.length > 0) {
		displayList();
	}


	//add todo item to list
	function addTodoItem() {
		if(input.value === "") {
			alert("You must enter some value!");
		}
		else {
			if(list.style.borderTop === "") {
				console.log("here!")
				list.style.borderTop = "2px solid white";
				btnClr.style.display = "inline";
				btnClrAll.style.display = "inline";
			}
			var text = input.value;	
			var item = `<li id="li-${id}">${text}<input id="box-${id}" 			class="checkboxes" type="checkbox"></li>`;				
			list.insertAdjacentHTML('beforeend', item);	
			liItem = {item: text, checked: false};
			todoList.push(liItem);		
			id++;
			addToLocalStorage()
			form.reset();
		}
	}

	//adding string through style to list itme
	function boxChecked(event) {
		const element = event.target;
		if(element.type === "checkbox") {
			const number = element.id.split('-')[1]-1;
			todoList = JSON.parse(localStorage.getItem("todoList"));
			console.log(element.checked);
			todoList[number].checked = element.checked;
			if (todoList[number].checked === true){
				element.parentNode.style.textDecoration = "line-through";
			} else {
				element.parentNode.style.textDecoration = "";
			}
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
	}

	//adding data to local storage
	function addToLocalStorage() {
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
		else {
			alert("browser doesn't support local storage!");
		}
	}

	//display all todo list
	function displayList() {
		list.style.borderTop = "2px solid white";
		todoList = JSON.parse(localStorage.getItem("todoList"));
		todoList.forEach(function(element) {
			console.log(element.item)
			var text = element.item;
			var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
			list.insertAdjacentHTML("beforeend", item);
			//if we got a checked box, then style
			var li = document.getElementById("li-"+id);
			console.log(element.checked);
			// console.log(element.checked === false);
			if(element.checked === true) {
				li.style.textDecoration = "line-through";
			} else if (element.checked === false) {
				li.style.textDecoration = "";
			}
			li.childNodes[1].checked = element.checked;
			id++;
		});
	}


	//clear list event listener
	function clearList() {
		todoList = JSON.parse(localStorage.getItem("todoList"));
		var newList = [];
		todoList.forEach(function(element) {
			//if we got a checked box, then style
			if(element.checked === false) {
				newList.push(element);
			}
		})
		if (newList.length > 0) {
			list.innerHTML = "";
			id = 1;
			localStorage.setItem("todoList", JSON.stringify(newList));
			displayList();
		} else {
			clearAllList();
		}
	};

	//clear list event listener
	function clearAllList() {
		todoList = [];
		localStorage.clear();
		list.innerHTML = "";
		btnClr.style.display = "none";
		btnClrAll.style.display = "none";
		list.style.borderTop = "";
	}
}