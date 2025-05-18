import React from 'react';
import { useEffect } from "react";
import "./OurServicesText.css";
import OtherHeaderContent from "./OtherHeaderContent";




//style={{ width: '100%', height: '400px' }}
const OurServces = () => {
    
    useEffect(() => {
        const leftDiv = document.getElementById('left');
        const rightDiv = document.getElementById('right');
        const bottomDiv = document.getElementById('foot');
        
        const handleScroll = () => {
          const leftDivPos = leftDiv.offsetTop;
          const rightDivPos = rightDiv.offsetTop;
          const bottomDivPos = bottomDiv.offsetTop;
    
          const windowPos = window.pageYOffset;
        
          if (windowPos > leftDivPos - 500){
            leftDiv.classList.add('animation-left');
          }
          if(windowPos > rightDivPos - 500){
            rightDiv.classList.add('animation-right');
          } 
          if(windowPos > bottomDivPos - 500) {
            bottomDiv.classList.add('animation-top');
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return() => {
          window.addEventListener('scroll', handleScroll);
        };
      }, []);
    
          
      return (
        <div className='slide-container'>
            <OtherHeaderContent />
            <div className='left' id='left' style={{width: '900px'}} >
                <h2 className="text-danger" style={{zIndex: '999', textShadow: '1px 1px 0 #504f4d'}}>Our Program</h2>
                <p className="text-danger" style={{zIndex: '999', textShadow: '1px 1px 0 #504f4d'}}>A frequent, Communication with God Give Rise to Physical Answers</p>
                <div className="jumbotron">    
                    <div className="container">       
                        <h1>Welcome to Our Sunday Services</h1>       
                        <p><strong>Every Sunday By 8.30AM</strong></p>   
                    </div>
                    <hr />
                    <p>
                        <b><i>Immersing yourself in scripture breathes new life into your prayers </i></b>
                        To experience God's presence is to experience the shining of God's face (Psalm 67:1).
                        Believers always live in God's presence, and he note all their deeds (Mal 3:16).
                        He has promised to be with us until he comes again (Matt 28:20).
                        <br/>When we immerse ourselves in Scripture, it becomes the language and pattern of our dialogue with God,
                        Scripture meditation not only train us to hear God speak, but its themes also permeate our response to God in prayer. 
                        Prayer then becomes a back-and-forth conversation with out transcendent, yet intimate FATHER-CREATOR, who desires to 
                        act in great power in us
                    </p>
                    
                </div> 
    
    
                
            </div>
            <div className='right' id='right' style={{width: '900px', marginLeft: '600px'}}>
                <div className="jumbotron">    
                    <div className="container">       
                        <h1>Welcome to Our Prayer Meetings!</h1>       
                        <p><strong>Every Wednesday 5.30PM</strong></p> 
                    </div>
                    <hr />
                    <p>
                        The Key to effective prayer meetings is intentional preparation, COME lets guide 
                        and show you how to prepare for a spiritual rich timein community prayer.
                        Prayeris a surge of the heart, it is a simple look turned toward heaven, its a cry 
                        of recognition and of Love, embracing both trial and joy.
                        Prayer is the raising of one's mind and heart to God or the requesting of good things from God.
                        <br />
                        As a devout member of our church community, I find great solace and inspiration in the collective 
                        act of prayer meetings. These gatherings serve as a powerful avenue for us to come together, united
                        in faith and purpose, as we lift our voices in supplication and gratitude. The prayer meetings not 
                        only provide a sacred space for communion with the divine but also foster a sense of fellowship
                        among us, reinforcing the bonds that strengthen our spiritual journey. Through these moments of 
                        shared devotion, we not only seek guidance and blessings but also offer support and love to one another, 
                        creating a harmonious tapestry of faith that resonates within the walls of our church.
                    </p>
                </div> 

            </div>  
        
            <footer>
                <div className="foot" id="foot">
                    <div className="jumbotron">    
                        <div className="container">
                            <h1>Welcome to Our Solution Time</h1>       
                            <p><strong>Every Thursday's 9.00AM</strong></p>  
                        </div>
                        <hr />
                        <p>
                            The Church offers spiritual solutions that transcend the material realm, providing a sanctuary 
                            for individuals seeking guidance, solace, and a deeper connection with the divine. Through prayer, 
                            meditation, and communal worship, the Church fosters a sense of spiritual well-being, offering a 
                            refuge from the challenges of everyday life. Its teachings inspire moral growth, compassion, and 
                            a sense of purpose, guiding believers on a transformative journey towards inner peace and a
                             harmonious relationship with the sacred. In times of uncertainty, the Church stands as a beacon 
                             of spiritual light, encouraging individuals to cultivate a profound understanding of themselves, 
                             their fellow beings, and the transcendent forces that shape their existence.
                        </p>
                    </div> 

                </div> 
            </footer>
        
            
    
    
        </div>
      );
    
}

export default OurServces