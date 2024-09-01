import { useState } from 'react';
import config from '../config.json';

export const useRequestDeleteTodos = (setTodos) => {
	const [isDeletingFlag, setIsDeleting] = useState(false);
	const [errorDeleting, setErrorDeleting] = useState('');

	const todosEndpoint = config.baseURL + 'todos/';

	const onDelete = (id) => {
		setIsDeleting(true);

		fetch(`${todosEndpoint}/${id}`, {
			method: 'DELETE',
		})
			.then((responseData) => {
				if (!responseData.ok) {
					throw Error('data could not be sent to this resource');
				}

				return responseData.json();
			})
			.then((deletedTodo) => {
				console.log('The task has been deleted', deletedTodo);
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
				setErrorDeleting('');
			})
			.catch((error) => {
				console.error(error);
				setErrorDeleting(error.message);
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		isDeletingFlag,
		errorDeleting,
		onDelete,
	};
};
