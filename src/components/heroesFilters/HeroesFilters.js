import { useSelector, useDispatch } from "react-redux";

import { activeFilter } from "../../actions/index";


// Задача для этого компонента:



// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const dispatch = useDispatch()

    const setFilter = (filter) => {
        dispatch(activeFilter(filter))
    }

    const options = useSelector(state => state.filters.filters)
    const globalFilter = useSelector(state => state.filters.activeFilter)

    const filterButtons = options.map(filter => {
        let category = {
            title: '',
            className: ''
        }
        switch (filter) {
            case 'all':
                category = {
                    title: 'Все',
                    className: 'btn-outline-dark'
                }
                break;
            case 'fire':
                category = {
                    title: 'Огонь',
                    className: 'btn-danger'
                }
                break;
            case 'water':
                category = {
                    title: 'Вода',
                    className: 'btn-primary'
                }
                break;
            case 'wind':
                category = {
                    title: 'Ветер',
                    className: 'btn-success'
                }
                break
            case 'earth':
                category = {
                    title: 'Земля',
                    className: 'btn-secondary'
                }
                break
        }

        const isActive = globalFilter === filter ? 'active' : null

        return (
            <button 
                onClick={(e) => setFilter(e.currentTarget.name)}
                name={filter}
                key={category.className}
                className={`btn ${category.className} ${isActive}`}
                >{category.title}</button>
        )
    }
    )

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterButtons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;