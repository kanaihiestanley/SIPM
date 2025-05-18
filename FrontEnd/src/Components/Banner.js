import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import firstSlide from './images/BannerImage/Banner1.webp';
import secondSlide from './images/BannerImage/Banner2.webp';
import thirdSlide from './images/BannerImage/Banner3.webp';
import forthSlide from './images/BannerImage/Banner4.webp';
// import sipmLogo from './images/Sipm-Logo.jpg'
// import mouseIcon from './images/mouse-icon.png';


class Banner extends Component{
    render(){     
     
       return(        
            <div className="" >                
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride='carousel'>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval='1000'>
                            <img src={firstSlide} className="d-block w-100" alt="firstSlide" />
                            <h1 className='slidetext'>Come Let Us Reason Together, Says The LORD</h1>
                        </div>
                        <div className="carousel-item" data-bs-interval='1000'>
                            <img src={secondSlide} className="d-block w-100" alt="secondSlide" />
                            <h1 className='slidetext'>Study to show thy self worthy</h1>
                        </div>
                        <div className="carousel-item" data-bs-interval='1000'>
                            <img src={thirdSlide} className="d-block w-100" alt="thirdSlide" />
                            <h1 className='slidetext'>Thy word is a light to my Path</h1>
                        </div>
                        <div className="carousel-item" data-bs-interval='1000'>
                            <img src={forthSlide} className="d-block w-100" alt="forthSlide" />
                            <h1 className='slidetext'>Come Unto me all You, That are Heavy Ladden and i will give You Rest</h1>
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button' data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className='carousel-control-prev-icon' aria-hidden="true"></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button' data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className='carousel-control-next-icon' aria-hidden="true"></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                </div>
                {/* <div className='bannerLogo'>
                    <img src={sipmLogo} alt='logo'/>
                </div> */}
                                     
            </div>
       ) 
    }
}

export default Banner