import { useState, useContext } from 'react';
import { AppContext } from '../../context';
import { useRequestDeleteTodos, useRequestUpdateTodos } from '../../hooks';
import styles from './item.module.css';

export const Item = ({ id, title, completed }) => {
	const { setTodos } = useContext(AppContext);

	const [editId, setEditId] = useState('');
	const [editInputValue, setEditInputValue] = useState(title);
	const { isDeletingFlag, errorDeleting, onDelete } = useRequestDeleteTodos(setTodos);
	const { isUpdatingFlag, errorUpdating, onUpdating } = useRequestUpdateTodos(setTodos);

	const errorItem = errorUpdating || errorDeleting;

	return (
		<li className={styles.item + ' ' + (completed && styles['item-completed'])}>
			{errorItem && <div className={styles.error}>{errorItem}</div>}
			{editId ? (
				<input
					autoFocus
					type="text"
					size="75"
					className={styles['input-edit']}
					value={editInputValue}
					onChange={({ target }) => setEditInputValue(target.value)}
				/>
			) : (
				<span>{title}</span>
			)}
			<div className={styles['item_button-wrapp']}>
				{editId ? (
					<button
						className={styles['item_button-edit']}
						onClick={() => {
							onUpdating(id, editInputValue, completed);
							setEditId('');
						}}
					>
						confirm
					</button>
				) : (
					<button
						className={styles['item_button-edit']}
						onClick={() => setEditId(id)}
					>
						edit
					</button>
				)}
				<button
					className={styles['item_button-complete']}
					onClick={() => onUpdating(id, title, (completed = !completed))}
					disabled={isUpdatingFlag}
				>
					complete
				</button>
				<button
					className={styles['item_button-delete']}
					onClick={() => onDelete(id)}
					disabled={isDeletingFlag}
				>
					delete
				</button>
			</div>
		</li>
	);
};
