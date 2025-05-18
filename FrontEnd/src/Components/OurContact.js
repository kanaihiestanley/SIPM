import React from 'react';
import { Component } from "react";
import OtherFooterContent from "./OtherFooterContent";
import OtherHeaderContent from "./OtherHeaderContent";


class OurContact extends Component{
    render(){
        
        return(
            <div style={{ width: '100%', height: 'auto' }} className="container-fluid ourContactBG">                    
               <OtherHeaderContent /> 
                <div className="sub_page">

                    <div className="hero_area pt-0 mt-0">                        
                        <header className="header_section">
                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg custom_nav-container">
                                    <a className="navbar-brand" href="index.html">
                                        <img src="images/logo.png" alt="" />
                                        <span className="text-left" style={{zIndex: '999', textShadow: '2px 2px 0 #504f4d'}}>
                                            <h1>Solution International Power Mission</h1>
                                        </span>
                                    </a>                               
                                </nav>
                            </div>
                        </header>
                        {/* <!-- end header section --> */}
                    </div>

                    {/* <!-- contact section --> */}

                    <section className="contact_section layout_padding form-group">
                        <div className="design-box">                     
                        </div>
                        <div className="container " style={{zIndex: '999', textShadow: '2px 2px 0 #504f4d'}}>
                            <div className="">
                                <h2 className="">
                                    Prayer Request
                                </h2>
                            </div>
                        </div>
                        <div className="container form-group">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <form action="">
                                        <div>
                                            <input type="text" placeholder="Name" className="form-control" />
                                        </div>
                                        <div>
                                            <input type="email" placeholder="Email" className="form-control mt-2" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Phone" className="form-control mt-2" />
                                        </div>
                                        <div>
                                            <textarea type="textArea" cols="20" rows="4" className="message-box form-control mt-2" placeholder="Message"  />
                                        </div>
                                        <div className="d-flex">                                        
                                            <button className="btn-primary form-control mt-2">
                                                SEND
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="map_container form-group">
                                        <div className="map-responsive">
                                            <h3>How to locate us</h3>
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.455313970033!2d3.3027846741830045!3d6.590190422386426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b91b64779c27d%3A0xcd3523c09a7390da!2sJjag%20Hall%20Event%20Centre!5e0!3m2!1sen!2sng!4v1686836367799!5m2!1sen!2sng" 
                                            width="600" height="600" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="ourLocaton" ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div> 
                <OtherFooterContent />              
            </div>
        )
    }
}

export default OurContact