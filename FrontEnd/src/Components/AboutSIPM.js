import React from 'react';
import { useEffect } from "react";
import OtherHeaderContent from "./OtherHeaderContent";
import firstSlide from './images/pastorAndwife-images/SIPM LOGO.PNG';
import secondSlide from './images/Bible quotes/what-should-we-meditate-on.jpg';
import thirdSlide from './images/Bible quotes/be-still-know-vector-bible-260nw-2005204649.webp';
import fortSlide from './images/Bible quotes/Lamentations-3-25-KJV-Christian-Bible-Quotes-DP-6.webp';

const AboutSIPM = () => {
    useEffect(() =>{
        
        const bottomDiv = document.getElementById('foot');
        
        const handleScroll = () => {
          
          const bottomDivPos = bottomDiv.offsetTop;
    
          const windowPos = window.pageYOffset;
        
          
          if(windowPos > bottomDivPos - 500) {
            bottomDiv.classList.add('animation-top');
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return() => {
          window.addEventListener('scroll', handleScroll);
        };
      }, []);
    
        
        return(
            <div>
                <OtherHeaderContent />
                <h1 style={{position: 'relative', top: '50px', zIndex: '9', paddingLeft: '5px', textShadow: '3px 3px 0 #e64741'}}>Solution International Power Mission</h1>
                <div className="container-fluid slide-container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 ">
                            <footer>
                                <div className="" id="foot">
                                    <div className="jumbotron">    
                                        <div className="">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </p>
                                            <a className="btn btn-primary btn-lg" href="/AboutPastor" role="button">Check About Pastor & Mrs Ekundayo</a>
                                        </div>
                                    </div> 

                                </div> 
                            </footer>
                        </div> 




                        <div className="card-section-pastor col-lg-7 col-md-7 col-sm-12">
                        <div className="card">
                                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner ">
                                            
                                            <div className="carousel-item active">
                                                <img src={firstSlide} className="d-block w-100 card-img-top" alt="firstSlide" />                                               
                                            </div>
                                           
                                            <div className="carousel-item">
                                                <img src={secondSlide} className="d-block w-100 card-img-top" alt="firstSlide" />                                                
                                            </div>

                                            <div className="carousel-item">
                                                <img src={thirdSlide} className="d-block w-100 card-img-top" alt="firstSlide" />                                                
                                            </div>

                                            <div className="carousel-item">
                                                <img src={fortSlide} className="d-block w-100 card-img-top" alt="firstSlide" />                                                
                                            </div>

                                        </div>
                                        <button className='carousel-control-prev' type='button' data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                            <span className='carousel-control-prev-icon' aria-hidden="true"></span>
                                            <span className='visually-hidden'>Previous</span>
                                        </button>
                                        <button className='carousel-control-next' type='button' data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                            <span className='carousel-control-next-icon' aria-hidden="true"></span>
                                            <span className='visually-hidden'>Previous</span>
                                        </button>
                                    </div> 
                                </div>
                        </div> 
                    </div> 
                </div>

            </div>
        )
    
}

export default AboutSIPM