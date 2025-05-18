import { createContext, useReducer } from "react";

export const BiblePostContext = createContext()

export const BiblePostReducer = (state, action) => {
    switch (action.type){
        case 'SET_BIBLEPOSTS':
            return{
                BiblePosts: action.payload
            };
        case 'CREATE_BIBLEPOST':
            return{
                BiblePosts: [action.payload, ...state.BiblePosts]
            };
        case 'DELETE_BIBLEPOST':
            return {
            BiblePosts: state.BiblePosts.filter((B) => B._id !== action.payload.id)
            };
        case 'UPDATE_BIBLEPOST':
            return {
                BiblePosts: state.BiblePosts.map((post) => 
                    post._id === action.payload.id ? action.payload.updatedPost : post
                )
            };
        default:
            return state
    }
}

export const BiblePostContextProvider = ({ children }) => {
    const [state, dispatch ] = useReducer(BiblePostReducer, {
        BiblePosts: null
    } )

    // dispatch({type: 'SET_BIBLEPOST', payload: [{}, {}]})

    return(
        <BiblePostContext.Provider value={{...state, dispatch}} >
            { children}
        </BiblePostContext.Provider>

    )
}