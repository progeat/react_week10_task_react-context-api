import { FormCreateTodo } from '../index';
import styles from './header-app.module.css';

export const HeaderApp = ({ children }) => {
	return (
		<div className={styles['header-app']}>
			<h1 className={styles['title-app']}>{children}</h1>
			<FormCreateTodo />
		</div>
	);
};
