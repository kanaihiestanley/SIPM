import { BiblePostContext } from "../content/BiblePostContext";
import { useContext } from "react";


export const useBiblePostContext = () =>{
    const context = useContext(BiblePostContext)

    if (!context){
        throw Error('useBibleContext must be used inside a BiblePostContextProvider ')
    }
    return context
}