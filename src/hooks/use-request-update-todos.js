import { useState } from 'react';
import config from '../config.json';

export const useRequestUpdateTodos = (setTodos) => {
	const [isUpdatingFlag, setIsUpdatingFlag] = useState(false);
	const [errorUpdating, setErrorUpdating] = useState('');

	const todosEndpoint = config.baseURL + 'todos/';

	const onUpdating = (id, title, completed) => {
		setIsUpdatingFlag(true);

		fetch(`${todosEndpoint}/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title, completed }),
		})
			.then((responseData) => {
				if (!responseData.ok) {
					throw Error('data could not be sent to this resource');
				}

				return responseData.json();
			})
			.then((updatedTodo) => {
				console.log('The task has been updated', updatedTodo);
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo.id === updatedTodo.id ? updatedTodo : todo,
					),
				);
				setErrorUpdating('');
			})
			.catch((error) => {
				console.error(error);
				setErrorUpdating(error.message);
			})
			.finally(() => setIsUpdatingFlag(false));
	};

	return {
		isUpdatingFlag,
		errorUpdating,
		onUpdating,
	};
};
