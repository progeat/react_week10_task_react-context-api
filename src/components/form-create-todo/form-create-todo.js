import { useState, useContext } from 'react';
import { AppContext } from '../../context';
import { useRequestCreateTodo } from '../../hooks/use-request-create-todos';
import styles from './form-create-todo.module.css';

export const FormCreateTodo = () => {
	const { setTodos } = useContext(AppContext);

	const [newTodo, setNewTodo] = useState('');
	const [messageError, setMessageError] = useState('');

	const { isCreatingFlag, errorCreating, requestCreateTodo } =
		useRequestCreateTodo(setTodos);

	const onSubmit = (event) => {
		event.preventDefault();

		if (newTodo.trim().length < 3) return;
		requestCreateTodo(newTodo.trim());

		setNewTodo('');
	};

	const onChangeNewTodo = ({ target }) => {
		setNewTodo(target.value);
		setMessageError('');
	};

	const onBlurNewTodo = ({ target }) => {
		const valueNewTodo = target.value.trim();

		if (valueNewTodo && valueNewTodo.length < 3) {
			setMessageError('There must be more than 3 characters');
		}
	};

	return (
		<form className={styles['form-new-todo']} onSubmit={onSubmit}>
			{errorCreating && <div className={styles.error}>{errorCreating}</div>}
			{messageError && <div className={styles.error}>{messageError}</div>}
			<input
				type="text"
				name="newTodo"
				value={newTodo}
				className={styles['input-new-todo']}
				placeholder="Task to be done..."
				onChange={onChangeNewTodo}
				onBlur={onBlurNewTodo}
			/>
			<button
				type="submit"
				className={styles['button-new-todo']}
				disabled={isCreatingFlag}
			>
				Add
			</button>
		</form>
	);
};
