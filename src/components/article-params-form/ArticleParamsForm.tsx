import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from '../separator';
import { Text } from 'components/text';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useState, useRef, useEffect, FormEvent } from 'react';

type TArticleParamsForm = {
	articleState: ArticleStateType; // НАЧАЛЬНОЕ СОСТОЯНИЕ
	setArticleState: (data: ArticleStateType) => void; // ИЗМЕНЕНИЕ СОСТОЯНИЯ
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: TArticleParamsForm) => {
	// НАЧАЛЬНОЕ СОСТОЯНИЕ
	const [form, setForm] = useState(false); // ФОРМА
	const [state, setState] = useState(articleState); // НАСТРОЙКИ

	// ФОРМА
	const formRef = useRef<HTMLFormElement | null>(null);

	// ЗАКРЫТИЕ ФОРМЫ ПРИ КЛИКЕ ВНЕ ФОРМЫ
	function handleClickOutside(evt: MouseEvent) {
		if (formRef.current && !formRef.current.contains(evt.target as Node)) {
			setForm(false);
		}
	}

	// ЗАКРЫТИЕ ФОРМЫ ПРИ НАЖАТИИ НА ESCAPE
	function handleKeyDown(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			setForm(false);
		}
	}

	// ДОБАВЛЕНИЕ И УДАЛЕНИИ ОБРАБОТЧИКОВ СОБЫИТИЙ
	useEffect(() => {
		if (form) {
			// ДОБАВЛЯЕМ ОБРАБОТЧИКИ
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			// УДАЛЯЕМ ОБРАБОТЧИКИ
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			// УДАЛЯЕМ ОБРАБОТЧИКИ
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [form]);

	// ОТПРАВКА ФОРМЫ
	function handleSubmit(evt: FormEvent) {
		evt.preventDefault();
		setArticleState(state);
	}

	// СБРОС НАСТРОЕК
	function handleReset() {
		setState(defaultArticleState);
		setArticleState(defaultArticleState);
	}

	// ОТКРЫТИЕ-ЗАКРЫТИЕ ФОРМЫ
	function toggleForm() {
		setForm((prevForm) => !prevForm);
	}

	return (
		<>
			<ArrowButton form={form} onClick={toggleForm} />{' '}
			{/*ОТКРЫТИЕ-ЗАКРЫТИЕ ФОРМЫ*/}
			<aside
				className={clsx(styles.container, { [styles.container_open]: form })}>
				{' '}
				{/*САЙДБАР С НАСТРОЙКАМИ*/}
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					ref={formRef}>
					<Text
						as='h1'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>

					{/*ШРИФТ*/}
					<Select
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={(select) => {
							setState({ ...state, fontFamilyOption: select });
						}}
						title='Шрифт'></Select>

					{/*РАЗМЕР ШРИФТА*/}
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(select) => {
							setState({ ...state, fontSizeOption: select });
						}}
						title='Размер шрифта'></RadioGroup>

					{/*ЦВЕТ ШРИФТА*/}
					<Select
						options={fontColors}
						selected={state.fontColor}
						onChange={(select) => {
							setState({ ...state, fontColor: select });
						}}
						title='Цвет шрифта'></Select>

					{/*РАЗДЕЛИТЕЛЬНАЯ ЧЕРТА*/}
					<Separator></Separator>

					{/*ЦВЕТ ФОНА*/}
					<Select
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={(select) => {
							setState({ ...state, backgroundColor: select });
						}}
						title='Цвет фона'></Select>

					{/*ШИРИНА КОНТЕНТА*/}
					<Select
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={(select) => {
							setState({ ...state, contentWidth: select });
						}}
						title='Ширина контента'></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
