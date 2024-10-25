import { useCallback } from 'react';
import { debounce } from '../utils/Debounce';
import { API_URL } from '../utils/ApiUrl';

export const useDebouncedSearch = (setFilteredTodos) => {
	return useCallback(
		debounce((searchItem) => {
			if (searchItem) {
				fetch(API_URL)
					.then((response) => response.json())
					.then((todos) => {
						const filteredTodos = todos.filter((todo) =>
							todo.title.toLowerCase().includes(searchItem.toLowerCase()),
						);
						setFilteredTodos(filteredTodos);
					});
			} else {
				setFilteredTodos([]);
			}
		}, 200),
		[setFilteredTodos],
	);
};
