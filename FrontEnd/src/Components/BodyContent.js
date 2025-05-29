import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from "axios";
import { NavLink } from "react-router-dom";
import firstSlide from './images/Bible quotes/bible-flyer-1.jpeg';
import secondSlide from './images/Bible quotes/61Hy-RvPotL._AC_UF1000,1000_QL80_.jpg';
import thirdSlide from './images/Bible quotes/Exodus+1511.jpg';
import firstFlyer from './images/Bible quotes/bible-flyer-1.jpeg';
import secondFlyer from './images/Bible quotes/bible-flyer-2.jpeg';
import thirdFlyer from './images/Bible quotes/bible-flyer-3.jpeg';
// import BibleDetails from "./BiblePostDetails";


import blogIcon from './images/blog-icon.png'

 const BodyContent = () => {


    const [firstBiblePost, setFirstBiblePost] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);

  // GET ALL POST LIST
    useEffect(() => {
        axios.get('http://localhost:4000/api/sipmRoute/')
        .then((response) => {
            const posts = response.data;
            if (posts && posts.length > 0) {
            setFirstBiblePost(posts[0]);  // Set the first post
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

        const truncateText = (text, limit) => {
            const words = text.split(' ');
            if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
            }
            return text;
        };



        return(
            <div className="BodyContent">
                <section id="OurBlog">
                    <div className="container">
                    <h2 className="text-center">Our Program</h2>
                    <p className="text-center">
                        A frequent Communication with God <br /> Gives Rise to Physical Answers
                    </p>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="each-block">
                            <div className="icon mb-2">
                            <img src={blogIcon} alt="blog-icon" className="img-fluid" />
                            </div>
                            <div className="blog-intro">
                            <h3>Prayer meeting (Wednesday's)...</h3>
                            <p>
                                The key to effective prayer meeting is intentional preparation to communicate with God through prayer.
                                <br />
                                Come lets gather in community, to praise God on a one-to-one basis, as the Holy Spirit moves us...
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="each-block">
                            <div className="icon mb-2">
                            <img src={blogIcon} alt="blog-icon" className="img-fluid" />
                            </div>
                            <div className="blog-intro">
                            <h3>Solution Time (Thursday's)...</h3>
                            <p>Which time is perfect to tender our challenges than now.</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="each-block">
                            <div className="icon mb-2">
                            <img src={blogIcon} alt="blog-icon" className="img-fluid" />
                            </div>
                            <div className="blog-intro">
                            <h3>Sunday service (Sunday's)...</h3>
                            <p>
                                Let Come to God's presence with praise and thanksgiving in our heart.
                                <br />
                                Come lets approach his presence with a tender heart.
                                <br />
                                Let Your tender heart hear the WORD Raw and Fresh.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="text-center learnmore mt-4">
                        <NavLink className="nav-link active" to="/OurContact">
                        <span>Contact Us</span>
                        </NavLink>
                    </div>
                    </div>
                </section>

                <hr />

                {/* MONTHLY FLYERS, BIBLE POST, INSPIRATION */}
                <div className="container">
                    <div className="row justify-content-center g-4">
                    {/* Monthly Flyer Carousel */}
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card">
                        <div id="carouselExampleAutoplaying1" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="6000">
                                <img src={firstFlyer} className="d-block w-100 card-img-top" alt="Slide 1" />
                                <div className="card-body">
                                <p className="card-text"><strong>Feb 2024 a Month of Wealthy Ground</strong></p>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <img src={secondFlyer} className="d-block w-100 card-img-top" alt="Slide 2" />
                                <div className="card-body">
                                <p className="card-text"><strong>Feb 2024 a Month of Wealthy Ground</strong></p>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="4000">
                                <img src={thirdFlyer} className="d-block w-100 card-img-top" alt="Slide 3" />
                                <div className="card-body">
                                <p className="card-text"><strong>Feb 2024 a Month of Wealthy Ground</strong></p>
                                </div>
                            </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying1" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                            <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying1" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* Bible Post */}
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card">
                        <div className="card-body">
                            {firstBiblePost ? (
                            <>
                                <h2><strong>{firstBiblePost.title}</strong></h2>
                                <hr />
                                <p>{showFullContent ? firstBiblePost.description : truncateText(firstBiblePost.description, 100)}</p>
                                <p><strong>{firstBiblePost.bibleVerse}</strong></p>
                                <NavLink to="/" className="btn btn-primary" onClick={() => setShowFullContent(!showFullContent)}>
                                {showFullContent ? 'Read Less' : 'Read More...'}
                                </NavLink>
                            </>
                            ) : (
                            <div>No data found</div>
                            )}
                        </div>
                        </div>
                    </div>

                    {/* Inspiration Carousel */}
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card">
                        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={firstSlide} className="d-block w-100 card-img-top" alt="Slide 1" />
                                <div className="card-body">
                                <p className="card-text"><strong>When God is involved</strong></p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={secondSlide} className="d-block w-100 card-img-top" alt="Slide 2" />
                                <div className="card-body">
                                <p className="card-text"><strong>Keep calm and see the wonderous hand of God</strong></p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={thirdSlide} className="d-block w-100 card-img-top" alt="Slide 3" />
                                <div className="card-body">
                                <p className="card-text"><strong>What God can't do, doesn't EXIST</strong></p>
                                </div>
                            </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                            <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Footer */}
                <footer id="Contact" className="mt-5 py-4 bg-dark text-white text-center">
                    <div className="container">
                    <p>If You Want More On Your Spiritual Wellbeing,<br />Feel Free To Watch Us Live on Every Service.</p>
                    <NavLink className="btn btn-outline-light my-3" to="/">
                        <i className="fa fa-envelope-o"></i> Go-Live
                    </NavLink>
                    <div>
                        <ul className="list-inline mt-3">
                        <li className="list-inline-item">
                            <NavLink className="fa fa-facebook text-white" to="/"></NavLink>
                        </li>
                        <li className="list-inline-item">
                            <NavLink className="fa fa-twitter text-white" to="/"></NavLink>
                        </li>
                        <li className="list-inline-item">
                            <NavLink className="fa fa-linkedin text-white" to="/"></NavLink>
                        </li>
                        <li className="list-inline-item">
                            <NavLink className="fa fa-envelope-o text-white" to="/"></NavLink>
                        </li>
                        <li className="list-inline-item">
                            <NavLink className="fa fa-google-plus text-white" to="/"></NavLink>
                        </li>
                        </ul>
                    </div>
                    </div>
                </footer>
                </div>

        )
    
}

export default BodyContent