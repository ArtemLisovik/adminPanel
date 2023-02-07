const initialState = {
    filters: [],
    activeFilter: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'FILTERS':
            return {
                ...state,
                filters: action.payload
            }
        case 'ACTIVE_FILTER': 
            return {
                ...state,
                activeFilter: action.payload
        }
        default: return state
    }
}

export default filters;