import React from 'react';
import { useEffect } from 'react';
import './ParallaxText.css';

const ParallaxText = () => {
    
  useEffect(() =>{
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
      <div className='left' id='left'>
        <h2>Our Program</h2>
        <p>A frequent, chronological publication of<br /> personal thoughts and Web links.</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type and scrambled 
          it to make a type specimen book. It has survived not only five centuries, but 
          also the leap into electronic typesetting, remaining essentially unchanged. 
          It was popularised in the 1960s with the release of Letraset sheets containing 
          Lorem Ipsum passages, and more recently with desktop publishing software like 
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div className='right' id='right'>
        <p>
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type and scrambled 
          it to make a type specimen book. It has survived not only five centuries, but 
          also the leap into electronic typesetting, remaining essentially unchanged. 
          It was popularised in the 1960s with the release of Letraset sheets containing 
          Lorem Ipsum passages, and more recently with desktop publishing software like 
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>  
  
      <footer>
        <div class="foot" id="foot">
        
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </footer>

      <div className='left' id='left'>
        <h2>Our Program</h2>
        <p>A frequent, chronological publication of<br /> personal thoughts and Web links.</p>
      </div>


    </div>
  );
    
}
  
  export default ParallaxText;
  