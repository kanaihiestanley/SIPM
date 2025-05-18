import React from 'react';
import { Component } from "react";

class FooterContent extends Component{
    render(){
        const today = new Date();
        const year = today.getFullYear();
        return(
                    
            <div className="copyright">
                <p> @ Copyrights {year} Designed by iTropcalTech a sub of iTropcalStan</p>
            
            </div>
        )
    }
}

export default FooterContent