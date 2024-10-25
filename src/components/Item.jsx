import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import styles from './Item.module.css';

export const Item = ({ title, id }) => {
	const { requestDeleteTodoItem, requestEditTodoItem } = useContext(AppContext);
	return (
		<li className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.title}>{title}</div>
				<button className={styles.editButton} onClick={() => requestEditTodoItem(id, title)}>
					Ред.
				</button>
				<button className={styles.button} onClick={() => requestDeleteTodoItem(id)}>
					X
				</button>
			</div>
		</li>
	);
};
