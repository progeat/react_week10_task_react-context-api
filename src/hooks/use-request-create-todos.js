import { useState } from 'react';
import config from '../config.json';

export const useRequestCreateTodo = (setTodos) => {
	const [isCreatingFlag, setIsCreatingFlag] = useState(false);
	const [errorCreating, setErrorCreating] = useState('');

	const todosEndpoint = config.baseURL + 'todos/';

	const requestCreateTodo = (todoTitle) => {
		setIsCreatingFlag(true);

		fetch(todosEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: todoTitle, completed: false }),
		})
			.then((responseData) => {
				if (!responseData.ok) {
					throw Error('data could not be sent to this resource');
				}

				return responseData.json();
			})
			.then((newTodo) => {
				console.log('A new task has been added', newTodo);
				setTodos((prevTodos) => [...prevTodos, newTodo]);
				setErrorCreating('');
			})
			.catch((error) => {
				console.error(error);
				setErrorCreating(error.message);
			})
			.finally(() => setIsCreatingFlag(false));
	};

	return {
		isCreatingFlag,
		errorCreating,
		requestCreateTodo,
	};
};
