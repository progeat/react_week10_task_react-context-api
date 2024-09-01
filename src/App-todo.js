import { HeaderApp, BodyApp, Loader } from './components';
import { AppContext } from './context';
import { useRequestGetTodos } from './hooks';
import styles from './app-todo.module.css';

export const TodoApp = () => {
	const { todos, setTodos, isLoading, errorGetting } = useRequestGetTodos();

	return (
		<AppContext.Provider value={{ todos, setTodos, errorGetting }}>
			<div className={styles.app}>
				<HeaderApp>TODO List App</HeaderApp>
				{isLoading ? <Loader /> : <BodyApp />}
			</div>
		</AppContext.Provider>
	);
};
