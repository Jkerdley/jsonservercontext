import { Item } from './Item';
import { useState, useEffect, useCallback } from 'react';
import { loadTodos, requestAddTodo, requestDeleteTodoItem, requestEditTodoItem } from './requests';
import { useDebouncedSearch } from './hooks/useDebouncedSearch';
import styles from './Todo.module.css';
import { AppContext } from './context/AppContext';

export const TodoList = () => {
	const [title, setTitle] = useState('');
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchItem, setSearchItem] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [sortAlphabetically, setSortAlphabetically] = useState(false);
	const [sortedTodos, setSortedTodos] = useState([]);

	const fetchTodos = useCallback(() => {
		loadTodos(setLoading, setTodos);
	}, []);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	useEffect(() => {
		setSortedTodos(sortAlphabetically ? [...todos].sort((a, b) => a.title.localeCompare(b.title)) : todos);
	}, [todos, sortAlphabetically]);

	const debouncedSearch = useDebouncedSearch(setFilteredTodos);

	useEffect(() => {
		debouncedSearch(searchItem);
	}, [searchItem, debouncedSearch]);

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			requestAddTodo(title, fetchTodos);
			setTitle('');
		}
	};

	const toggleSortAlphabetically = () => {
		setSortAlphabetically(!sortAlphabetically);
	};

	const contextValue = {
		requestDeleteTodoItem: (id) => requestDeleteTodoItem(id, fetchTodos),
		requestEditTodoItem: (id, title) => requestEditTodoItem(id, title, fetchTodos),
	};

	return (
		<AppContext.Provider value={contextValue}>
			<div className={styles.wrapper}>
				<input
					className={styles.searchItem}
					value={searchItem}
					onChange={(event) => setSearchItem(event.target.value)}
					type="text"
					name="search"
					placeholder="Поиск"
					onKeyDown={handleKeyPress}
				/>
				<input
					className={styles.input}
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					type="text"
					name="title"
					placeholder="Введите задачу"
					onKeyDown={handleKeyPress}
				/>

				<button onClick={() => requestAddTodo(title, fetchTodos)} className={styles.button}>
					Добавить
				</button>
				<button onClick={toggleSortAlphabetically} className={styles.alphabetButton}>
					{sortAlphabetically ? 'Сортировать по умолчанию' : 'Сортировать А->Я'}
				</button>
				<ul>
					{loading ? (
						<div className={styles.loader} />
					) : searchItem.trim() !== '' && filteredTodos.length === 0 ? (
						<p className={styles.nothing}>Ничего не найдено</p>
					) : filteredTodos.length > 0 ? (
						filteredTodos.map((todo) => <Item key={todo.id} title={todo.title} id={todo.id} />)
					) : (
						sortedTodos.map((todo) => <Item key={todo.id} title={todo.title} id={todo.id} />)
					)}
				</ul>
			</div>
		</AppContext.Provider>
	);
};
