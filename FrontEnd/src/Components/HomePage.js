import React from 'react';
import { Component } from "react";
import HeaderContent from "./HeaderContent";
import BodyContent from "./BodyContent";
import Banner from "./Banner";

class HomePage extends Component{
    render(){
        return(
            <div>
                <HeaderContent />
                <Banner />
                <BodyContent />
            </div>

        )
    }
}

export default HomePage