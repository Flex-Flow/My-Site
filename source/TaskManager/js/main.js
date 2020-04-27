const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");

form.addEventListener("submit", function(event){

	event.preventDefault();

	// Берем текст введенный пользователем в поле ввода
	let taskText = input.value.trim();
	
	// Формируем разметку для новой задачи
	const taskHTML = `
	<li class="list-group-item d-flex justify-content-between">
		<span contenteditable="true" class="task-title">${taskText}</span>
		<div>
			<button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
			<button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
		</div>
	</li>`;

	// Добавляем новую задачу на страницу
	tasksList.insertAdjacentHTML("afterBegin", taskHTML);

	// Очищаем поле ввода
	input.value = "";

	// Возвращаем фокус на поле ввода после добавления новой задачи
	input.focus();

	// Скрыввем или показываем запись о том, что список дел пуст
	toggleEmptyListItem();

	// Показать нотификацию
	showNotification("new");

})
	
	// Прослушиваем клик внутри всего списка с задачами
tasksList.addEventListener("click", function(event) {


	// Проверяем что клик произошел по кнопке "Удалить"
	if (event.target.getAttribute("data-action") == "delete-task") {

		// Находим родительский тег li и удаляем его
		event.target.closest(".list-group-item").remove();

		// Скрыввем или показываем запись о том, что список дел пуст
		toggleEmptyListItem();

		// Показать нотификацию
	  showNotification("delete");

	} else if(event.target.getAttribute("data-action") == "ready"){
		// Находим родительский тег li
		const parentElement = event.target.closest(".list-group-item");

		// Добавляем тегу span дополнительный класс
		parentElement.querySelector(".task-title").classList.add("task-title--done");
		// Убираем у тега span атрибут contenteditable
		parentElement.querySelector(".task-title").setAttribute("contenteditable", "false");

		// Перемещаем запись в конец списка
		tasksList.insertAdjacentElement("beforeend", parentElement);

		// Удаляем кнопку готово
		event.target.remove();

		// Нотификация задача готова
		showNotification("ready");

	}

});


function toggleEmptyListItem() {

	if (tasksList.children.length > 1) {
		document.querySelector('#empty-list-item').style.display = "none";
	} else {
		document.querySelector('#empty-list-item').style.display = "block";
	}
	
}

function showNotification(type){

	let newElement = document.createElement("div");

	switch (type) {
		case "new":
			newElement.className = "alert alert-warning";
			newElement.textContent = "Задача добавлена!";
			break;
		case "delete":
			newElement.className = "alert alert-danger";
			newElement.textContent = "Задача удалена!";
			break;
		case "ready":
			newElement.className = "alert alert-primary";
			newElement.textContent = "Задача готова!";
			break;
	}

	document.querySelector("#notifyHolder").insertAdjacentElement("afterbegin", newElement);

	

	setTimeout(function() {
		newElement.style.opacity = "1";
	}, 300);


	setTimeout(function() {
		newElement.style.opacity = "0";
	}, 2300);


	setTimeout(function() {
		newElement.remove();
	}, 2600);


}

