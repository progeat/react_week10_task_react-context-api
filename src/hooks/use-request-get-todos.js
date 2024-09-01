import { useEffect, useState } from 'react';
import config from '../config.json';

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorGetting, setErrorGetting] = useState('');

	const todosEndpoint = config.baseURL + 'todos/';

	useEffect(() => {
		setIsLoading(true);

		fetch(todosEndpoint)
			.then((responseData) => {
				if (!responseData.ok) {
					throw Error('could not fetch the data for that resourse');
				}

				return responseData.json();
			})
			.then((todosData) => {
				setTodos(todosData);
				setErrorGetting('');
			})
			.catch((error) => {
				console.error(error);
				setErrorGetting(error.message);
			})
			.finally(() => setIsLoading(false));
	}, [todosEndpoint]);

	return {
		setTodos,
		todos,
		isLoading,
		errorGetting,
	};
};
