import React from 'react';
import { Component } from "react";
import sipmLogo from './images/Sipm-Logo.png';
// import { NavLink } from 'react-router-dom';





class HeaderContent extends Component{
    render(){        
        return(            
            <div> 
                <div className="position-fixed bannerLogo" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{zIndex: '99999'}} ><img src={sipmLogo} alt='logo'/></div>
                    <div className="offcanvas offcanvas-end fw-10 fw-bold" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">                        
                        <img src={sipmLogo} className='offcanvasLogo' alt='logo'/>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>                               
                            </li>
                            <li className="nav-item">                                
                                <a className="nav-link" href="/OurServices">Our Program</a>                                
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/DiscoverYou">Discover You</a>                              
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/OurContact">Contact Us</a>  
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    About Us
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item fw-bold text-primary" href="/AboutSIPM">About SIPM</a></li>
                                    <li><a className="dropdown-item fw-bold text-primary" href="/AboutPastor">About Pastor Yinka</a></li>
                                    
                                </ul>
                            </li>                           
                            <li className="nav-item">
                                <a className="nav-link" href="/HomeBiblePost">Bible Post Dashboard</a> 
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/HomeGallery">Gallery Dashboard</a>                                
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Stream LIVE Service
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item fw-bold text-primary" href="/LiveStream">Live Stream Dashboard</a></li>
                                    <li><a className="dropdown-item fw-bold text-primary" href="/LivestreamUserDisplay">Live Streaming</a></li>
                                    
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Stream The Word
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item fw-bold text-primary" href="/HomeYTLiveStream">Youtube Dashboard</a></li>
                                    <li><a className="dropdown-item fw-bold text-primary" href="/YTStreamPost">Watch Messenges</a></li>
                                    
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Stream Facebook
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item fw-bold text-primary" href="/HomeFBLiveStream">Facebook Dashboard</a></li>
                                    <li><a className="dropdown-item fw-bold text-primary" href="/FBLiveStream">Go Live</a></li>
                                    
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div> 
                <div className="SubHeaderBanner"></div>
            </div>               
        )
    }
}

export default HeaderContent