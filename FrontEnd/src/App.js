import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import OurServices from './Components/OurServices';
import FooterContent from './Components/FooterContent';
import DiscoverYou from './Components/DiscoverYou';
import OurContact from './Components/OurContact';
import Livestream from './Components/FBLiveStream Folder/LiveStream';
import AboutPastor from './Components/AboutPastor';
import AboutSIPM from './Components/AboutSIPM';
import HomeBiblePost from './Components/BiblePost Pages/HomeBiblePost';
import LivestreamUserDisplay from './Components/FBLiveStream Folder/LiveStreamUserDisplay';
import HomeGallery from './Components/Gallery Pages/HomeGallery';
import HomeYTLiveStream from './Components/YTLiveStream Folder/HomeYTLiveStream';
import HomeFBLiveStream from './Components/FBLiveStream Folder/HomeFBLiveStream';
import YTStreamPost from './Components/YTLiveStream Folder/YTStreamPost';
import FBLiveStream from './Components/FBLiveStream Folder/FBLiveStream';
import HomeBiblePostNew from './Components/BiblePost Pages/HomeBiblePostNew';
import VideoLiveStream from './Components/FBLiveStream Folder/VideoLiveStream';






function App() {
  return (
    <div className="App">
      
         
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ourservices" element={<OurServices />} />
          <Route path="/discoveryou" element={<DiscoverYou />} />
          <Route path="/ourcontact" element={<OurContact />} />
          <Route path="/aboutpastor" element={<AboutPastor />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/aboutsipm" element={<AboutSIPM />} />
          <Route path='/livestreamuserdisplay' element={<LivestreamUserDisplay />} />
          <Route path="/homebiblepost" element={<HomeBiblePost />} />     
          <Route path='/homegallery'  element={<HomeGallery />} />  
          <Route path='/homeytlivestream' element={<HomeYTLiveStream />} /> 
          <Route path='/homefblivestream' element={<HomeFBLiveStream />} />
          <Route path='/ytstreampost' element={<YTStreamPost />} />    
          <Route path='/fblivestream' element={<FBLiveStream />} />
          <Route path='/homebiblepostnew' element={<HomeBiblePostNew />} />
          <Route path='/videolivestream' element={<VideoLiveStream />} />
        </Routes>
      </BrowserRouter>
      
      
      <FooterContent />
    </div>
  );
}

export default App;
