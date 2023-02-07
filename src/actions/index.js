export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const createHero = (hero) => ({
    type: 'CREATE_HERO',
    payload: hero
})

export const deleteHero = (heroId) => ({
    type: 'DELETE_HERO',
    payload: heroId
})

export const filtersFetching = (filters) => {
    return {
        type: 'FILTERS',
        payload: filters
    }
}

export const nameAddedHero = (name) => {
    return {
        type: 'NAME_CREATED_HERO',
        name
    }
}

export const activeFilter = (filter) => {
    return {
        type: 'ACTIVE_FILTER',
        payload: filter
    }
}