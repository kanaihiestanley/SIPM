import React from 'react';
import { useEffect } from "react";
import OtherHeaderContent from "./OtherHeaderContent";
import firstSlide from './images/pastorAndwife-images/pastor4.jpg';
import secondSlide from './images/pastorAndwife-images/pastor-wife2.jpg';
import thirdSlide from './images/pastorAndwife-images/pastor3.jpg';
import forthSlide from './images/pastorAndwife-images/pastor1.jpg';
import fiftSlide from './images/pastorAndwife-images/pastorAnWife4.PNG';
import sixtSlide from './images/pastorAndwife-images/pastor5.JPG';
import seventSlide from './images/pastorAndwife-images/pastorAndWife3.JPG';
import eightSlide from './images/pastorAndwife-images/pastorAndWife.jpg';


const AboutPastor = () =>{
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
                <h1 style={{position: 'relative', top: '50px', zIndex: '9', paddingLeft: '5px', textShadow: '3px 3px 0 #e64741'}}>Who Is Pastor & Mrs. Olayinka & Omolara Ekundayo</h1>
                <div className="container-fluid slide-container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
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
                                            <a className="btn btn-primary btn-lg" href="/AboutSIPM" role="button">Check About SIPM</a>
                                        </div>
                                    </div> 

                                </div> 
                            </footer>
                        </div> 




                        <div className="card-section-pastor col-lg-7 col-md-7 col-sm-12">
                        <div className="card">
                                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner" style={{backgroundColor: "#c1c0c7"}}>
                                            
                                            <div className="carousel-item active" style={{width: '1000px'}}>
                                                <img src={firstSlide} className="d-block w-100 card-img-top" alt="firstSlide" />                                                
                                            </div>

                                            <div className="carousel-item" style={{width: '500px'}}>
                                                <img src={secondSlide} className="d-block w-100 card-img-top" alt="firstSlide" />                                                
                                            </div>

                                            <div className="carousel-item" style={{width: '700px'}}>
                                                <img src={thirdSlide}  className="d-block w-100 card-img-top" alt="firstSlide" />                                               
                                            </div>

                                            <div className="carousel-item" style={{width: '700px'}}>
                                                <img src={forthSlide}  className="d-block w-100 card-img-top" alt="firstSlide" />                                               
                                            </div>

                                            <div className="carousel-item" style={{width: '800px'}}>
                                                <img src={fiftSlide}  className="d-block w-100 card-img-top" alt="firstSlide" />                                               
                                            </div>

                                            <div className="carousel-item" style={{width: '1000px'}}>
                                                <img src={sixtSlide}  className="d-block w-100 card-img-top" alt="firstSlide" />                                               
                                            </div>

                                            <div className="carousel-item" style={{width: '1000px'}}>
                                                <img src={seventSlide}  className="d-block w-100 card-img-top" alt="firstSlide" />                                               
                                            </div>

                                            <div className="carousel-item" style={{width: '450px'}}>
                                                <img src={eightSlide}  className="d-block w-100 card-img-top" alt="firstSlide" />                                               
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

export default AboutPastor