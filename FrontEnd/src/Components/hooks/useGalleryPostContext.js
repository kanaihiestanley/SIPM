import { GalleryPostContext } from "../content/GalleryPostContext";
import { useContext } from "react";


export const useGalleryPostContext = () =>{
    const context = useContext(GalleryPostContext)

    if (!context){
        throw Error('useGalleryContext must be used inside a GalleryContextProvider ')
    }
    return context
}