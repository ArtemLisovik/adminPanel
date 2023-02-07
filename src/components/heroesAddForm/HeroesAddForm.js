import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useHttp } from '../../hooks/http.hook'
import { filtersFetching, createHero } from '../../actions/index'
// import {heroesFetching, heroesFetched, heroesFetchingError}  from '../../actions/index'


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [hero, setHero] = useState({
        id: Math.round(Math.random()),
        name: '',
        descr: '',
        element: ''
    })

    const dispatch = useDispatch()
    const { request } = useHttp()

    const handlerChange = (event) => {
        setHero(state => ({
            ...state,
            [event.target.name]: event.target.value
        }))
    }

    const handlerSubmit = (event) => {
        event.preventDefault()

        if (hero.name && hero.descr && hero.element) {
            request('http://localhost:3002/heroes', 'POST', JSON.stringify(hero))
                .then(dispatch(createHero(hero)))
                .finally(setHero({
                id: Math.round(Math.random()),
                name: '',
                descr: '',
                element: ''
            }))
        }
    }

    useEffect(() => {
        request('http://localhost:3002/filters')
            .then(res => dispatch(filtersFetching(res)))
    }, [])

    const options = useSelector(state => state.filters.filters).filter(option => option !== 'all')
    const viewOptions = options.map((option, index) => {
        let filterName = ''
        switch (option) {
            case "fire": filterName = 'Огонь'
                break;
            case "water": filterName = 'Вода'
                break;
            case "wind": filterName = 'Ветер'
                break;
            case "earth": filterName = 'Земля'
                break;
            default: filterName = 'Нет элемнта'
                break;
        }
        return (
            <option key={index} value={option}>{filterName}</option>
        )
    })




    return (
        <form onSubmit={(e) => handlerSubmit(e)} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    onChange={(e) => handlerChange(e)}
                    value={hero.name}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    value={hero.descr}
                    onChange={(e) => handlerChange(e)}
                    required
                    name="descr"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    onChange={(e) => handlerChange(e)}
                    value={hero.element}
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    <option >Я владею элементом...</option>
                    {viewOptions}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;