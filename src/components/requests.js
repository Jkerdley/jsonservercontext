import { API_URL } from './utils/ApiUrl';

export const loadTodos = async (setLoading, setTodos) => {
	setLoading(true);
	const response = await fetch(API_URL);
	const loadedTodos = await response.json();
	setTodos(loadedTodos);
	setLoading(false);
};

export const requestAddTodo = async (title, loadTodos) => {
	if (title) {
		await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ title, completed: false }),
		});
		loadTodos();
	} else {
		alert('Пожалуйста введите текст задачи');
	}
};

export const requestDeleteTodoItem = async (id, loadTodos) => {
	if (!id) {
		console.error('Идентификатор задачи не указан');
		return;
	}
	await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
	loadTodos();
};

export const requestEditTodoItem = async (id, title, loadTodos) => {
	if (!id) {
		console.error('ID задачи не указан');
		return;
	}
	const newTitle = prompt('Введите новый текст задачи', title);
	if (newTitle) {
		await fetch(`${API_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ title: newTitle }),
		});
		loadTodos();
	}
};
