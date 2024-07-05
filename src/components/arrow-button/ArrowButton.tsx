import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type TArrowButton = {
	form?: boolean;
	onClick?: OnClick;
};
export const ArrowButton = ({ form, onClick }: TArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: form })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: form })}
			/>
		</div>
	);
};
