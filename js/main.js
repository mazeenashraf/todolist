var taskInput = document.getElementById("taskInput");
var addToDo = document.getElementById("addToDo");
var mySelect = document.getElementById("mySelect");
var searchInput = document.getElementById("searchInput");
var allToDo = [];

if (localStorage.getItem("todoList") != null) {
  allToDo = JSON.parse(localStorage.getItem("todoList"));
  displayData(allToDo);
}

addToDo.addEventListener("click", function () {
  var task = {
    taskDetails: taskInput.value,
    isCompleted: false,
    id: `${Math.random() * 10000} - ${Math.random() * 10000}`, // generate random id
  };
  allToDo.push(task);
  localStorage.setItem("todoList", JSON.stringify(allToDo));
  displayData(allToDo);
  clearInput()
});

function displayData(arr) {
  var cartona = ``;

  for (var task of arr) {
    cartona += `
            <div id="hambozo" class="col-11 todo ${
              task.isCompleted == true ? "completed" : ""
            } ">
            <div class="row bg-dark">
              <div class="col-8 py-3 fs-5"> ${task.taskDetails} </div>
              <div onclick="beCompleted('${
                task.id
              }')" class="col-2 py-3 bg-success d-flex justify-content-center">
                <i class="fa-solid fa-check fs-3 d-flex align-items-center"></i>
              </div>
              <div onclick="deleteToDo('${
                task.id
              }')" class="col-2 py-3 bg-danger d-flex justify-content-center">
                <i class="fa-solid fa-trash fs-3 d-flex align-items-center"></i>
              </div>
            </div>
          </div>
        `;
  }

  document.getElementById("todos-container").innerHTML = cartona;
}

function beCompleted(id) {
  var foundedIndex = allToDo.findIndex(function (task) {
    return task.id == id;
  });

  console.log(foundedIndex);

  allToDo[foundedIndex].isCompleted =
    allToDo[foundedIndex].isCompleted == true ? false : true;

//   displayData(allToDo);
displayAccordingToSelectValue()
}

mySelect.addEventListener("change", function () {
  console.log(mySelect.options[mySelect.selectedIndex]);

  displayAccordingToSelectValue();
});

function displayAccordingToSelectValue() {
  switch (mySelect.options[mySelect.selectedIndex].value) {
    case "all":
      displayData(allToDo);
      break;
    case "completed":
      var completedTask = allToDo.filter(function (task) {
        return task.isCompleted == true;
      });
      displayData(completedTask);
      localStorage.setItem("todoList", JSON.stringify(allToDo));

      break;
    case "uncompleted":
      var unCompletedTask = allToDo.filter(function (task) {
        return task.isCompleted == false;
      });
      displayData(unCompletedTask);
      localStorage.setItem("todoList", JSON.stringify(allToDo));

      break;

    default:
      break;
  }
}

function deleteToDo(id) {
  var index = allToDo.findIndex(function (task) {
    return task.id == id;
  });

  allToDo.splice(index, 1);

  displayData(allToDo);

  localStorage.setItem("todoList", JSON.stringify(allToDo));
}

searchInput.addEventListener("input", function (e) {
  // console.log();
  var term = e.target.value;

  var searchResult = [];

  for (var i = 0; i < allToDo.length; i++) {
    if (allToDo[i].taskDetails.toLowerCase().includes(term.toLowerCase())) {
        searchResult.push( allToDo[i] )
    }
  }
  displayData(searchResult)
});


function clearInput() {
    taskInput.value = null;

}