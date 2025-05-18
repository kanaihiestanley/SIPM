import { createContext, useReducer } from "react";

export const GalleryPostContext = createContext()

export const GalleryPostReducer = (state, action) => {
    switch (action.type){
        case 'SET_GalleryPOSTS':
            return{
                GalleryPosts: action.payload
            };
        case 'CREATE_GalleryPOST':
            return{
                GalleryPosts: [action.payload, ...state.GalleryPosts]
            };
        case 'DELETE_GalleryPOST':
            return {
            GalleryPosts: state.GalleryPosts.filter((B) => B._id !== action.payload.id)
            };
        case 'UPDATE_GalleryPOST':
            return {
                GalleryPosts: state.GalleryPosts.map((post) => 
                    post._id === action.payload.id ? action.payload.updatedPost : post
                )
            };
        default:
            return state
    }
}

export const GalleryPostContextProvider = ({ children }) => {
    const [state, dispatch ] = useReducer(GalleryPostReducer, {
        GalleryPosts: null
    } )

    // dispatch({type: 'SET_GalleryPOST', payload: [{}, {}]})

    return(
        <GalleryPostContext.Provider value={{...state, dispatch}} >
            { children}
        </GalleryPostContext.Provider>

    )
}