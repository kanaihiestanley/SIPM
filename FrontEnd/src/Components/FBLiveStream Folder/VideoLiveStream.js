// import React, { useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import OtherHeaderContent from '../OtherHeaderContent';

// const socket = io('http://localhost:5000');

// const VideoLiveStream = () => {
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   let localStream;
//   let pc;

//   useEffect(() => {
//     socket.on('video-offer', handleVideoOffer);
//     socket.on('video-answer', handleVideoAnswer);
//     socket.on('ice-candidate', handleNewICECandidate);

//     startLocalStream();

//     return () => {
//       socket.off('video-offer');
//       socket.off('video-answer');
//       socket.off('ice-candidate');
//     };
//   }, []);

//   const startLocalStream = async () => {
//     try {
//       localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localVideoRef.current.srcObject = localStream;

//       pc = new RTCPeerConnection();
//       localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
      
//       pc.onicecandidate = event => {
//         if (event.candidate) {
//           socket.emit('ice-candidate', event.candidate);
//         }
//       };

//       pc.ontrack = event => {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       };
//     } catch (error) {
//       console.error('Error accessing media devices.', error);
//     }
//   };

//   const handleVideoOffer = async (offer) => {
//     if (!pc) startLocalStream();
//     await pc.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);
//     socket.emit('video-answer', answer);
//   };

//   const handleVideoAnswer = async (answer) => {
//     await pc.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   const handleNewICECandidate = async (candidate) => {
//     try {
//       await pc.addIceCandidate(new RTCIceCandidate(candidate));
//     } catch (error) {
//       console.error('Error adding received ICE candidate', error);
//     }
//   };

//   const startCall = async () => {
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);
//     socket.emit('video-offer', offer);
//   };

//   return (
//     <div className='row' style={{ padding: '10px', margin: '5px' }}>

//       <OtherHeaderContent />
      
//       <div style={{paddingTop: "50px"}}>
//         <video ref={localVideoRef} autoPlay muted style={{ width: '50%' }}></video>
//         <video ref={remoteVideoRef} autoPlay style={{ width: '50%' }}></video>
//         <button onClick={startCall}>Start Call</button>
//       </div>
//     </div>
//   );
// };

// export default VideoLiveStream;





// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import OtherHeaderContent from '../OtherHeaderContent';
// import axios from 'axios';

// const socket = io('http://localhost:5000');

// const VideoLiveStream = () => {
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);
//   const [isRecording, setIsRecording] = useState(false);
//   let localStream;
//   let pc;

//   useEffect(() => {
//     socket.on('video-offer', handleVideoOffer);
//     socket.on('video-answer', handleVideoAnswer);
//     socket.on('ice-candidate', handleNewICECandidate);

//     startLocalStream();

//     return () => {
//       socket.off('video-offer');
//       socket.off('video-answer');
//       socket.off('ice-candidate');
//     };
//   }, []);

//   const startLocalStream = async () => {
//     try {
//       localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localVideoRef.current.srcObject = localStream;

//       pc = new RTCPeerConnection();
//       localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
      
//       pc.onicecandidate = event => {
//         if (event.candidate) {
//           socket.emit('ice-candidate', event.candidate);
//         }
//       };

//       pc.ontrack = event => {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       };
//     } catch (error) {
//       console.error('Error accessing media devices.', error);
//     }
//   };

//   const handleVideoOffer = async (offer) => {
//     if (!pc) startLocalStream();
//     await pc.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);
//     socket.emit('video-answer', answer);
//   };

//   const handleVideoAnswer = async (answer) => {
//     await pc.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   const handleNewICECandidate = async (candidate) => {
//     try {
//       await pc.addIceCandidate(new RTCIceCandidate(candidate));
//     } catch (error) {
//       console.error('Error adding received ICE candidate', error);
//     }
//   };

//   const startCall = async () => {
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);
//     socket.emit('video-offer', offer);
//   };

//   const startRecording = () => {
//     setIsRecording(true);
//     recordedChunksRef.current = [];
//     mediaRecorderRef.current = new MediaRecorder(localStream, {
//       mimeType: 'video/webm; codecs=vp9',
//     });

//     mediaRecorderRef.current.ondataavailable = event => {
//       if (event.data.size > 0) {
//         recordedChunksRef.current.push(event.data);
//       }
//     };

//     mediaRecorderRef.current.onstop = saveRecording;

//     mediaRecorderRef.current.start();
//   };

//   const pauseRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.pause();
//     }
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//     }
//   };

//   const saveRecording = () => {
//     const blob = new Blob(recordedChunksRef.current, {
//       type: 'video/webm',
//     });

//     const formData = new FormData();
//     formData.append('video', blob, 'recording.webm');

//     axios.post('http://localhost:5000/api/livestreamposts', formData)
//       .then(response => console.log(response))
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className='row' style={{ padding: '10px', margin: '5px' }}>
//       <OtherHeaderContent />
//       <div style={{paddingTop: "50px"}}>
//         <video ref={localVideoRef} autoPlay muted style={{ width: '50%' }}></video>
//         <video ref={remoteVideoRef} autoPlay style={{ width: '50%' }}></video>
//         <button className='btn btn-success' onClick={startCall}>Start Video Streams</button>
//         {'\u00A0'}
//         <button className='btn btn-secondary' onClick={startRecording} disabled={isRecording}>Start Recording</button>
//         {'\u00A0'}
//         <button className='btn btn-primary' onClick={pauseRecording} disabled={!isRecording}>Pause Recording</button>
//         {'\u00A0'}
//         <button className='btn btn-danger' onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
//       </div>
//     </div>
//   );
// };

// export default VideoLiveStream;




import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import OtherHeaderContent from '../OtherHeaderContent';
import axios from 'axios';

const socket = io('http://localhost:5000');

const VideoLiveStream = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallPaused, setIsCallPaused] = useState(false);
  const [counter, setCounter] = useState(0);
  const counterRef = useRef(counter);
  const intervalRef = useRef(null);
  let localStream;
  let pc;

  useEffect(() => {
    socket.on('video-offer', handleVideoOffer);
    socket.on('video-answer', handleVideoAnswer);
    socket.on('ice-candidate', handleNewICECandidate);

    startLocalStream();

    return () => {
      socket.off('video-offer');
      socket.off('video-answer');
      socket.off('ice-candidate');
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

  const startLocalStream = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = localStream;

      pc = new RTCPeerConnection();
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

      pc.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('ice-candidate', event.candidate);
        }
      };

      pc.ontrack = event => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const handleVideoOffer = async (offer) => {
    if (!pc) startLocalStream();
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('video-answer', answer);
  };

  const handleVideoAnswer = async (answer) => {
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleNewICECandidate = async (candidate) => {
    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error adding received ICE candidate', error);
    }
  };

  const startCall = async () => {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('video-offer', offer);
    setIsCallActive(true);
    startCounter();
  };

  const pauseCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.enabled = !track.enabled);
      setIsCallPaused(prevState => !prevState);
      if (isCallPaused) {
        startCounter();
      } else {
        pauseCounter();
      }
    }
  };

  const stopCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      pc.close();
      setIsCallActive(false);
      setIsCallPaused(false);
      stopCounter();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    recordedChunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(localStream, {
      mimeType: 'video/webm; codecs=vp9',
    });

    mediaRecorderRef.current.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = saveRecording;

    mediaRecorderRef.current.start();
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const saveRecording = () => {
    const blob = new Blob(recordedChunksRef.current, {
      type: 'video/webm',
    });

    const formData = new FormData();
    formData.append('video', blob, 'recording.webm');

    axios.post('http://localhost:5000/api/livestreamposts', formData)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  const startCounter = () => {
    intervalRef.current = setInterval(() => {
      setCounter(counterRef.current + 1);
    }, 1000);
  };

  const pauseCounter = () => {
    clearInterval(intervalRef.current);
  };

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    setCounter(0);
  };

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <OtherHeaderContent />
      <div style={{paddingTop: "50px"}}>
        <video ref={localVideoRef} autoPlay muted style={{ width: '50%' }}></video>
        <video ref={remoteVideoRef} autoPlay style={{ width: '50%' }}></video>
        <button className='btn btn-success' onClick={startCall} disabled={isCallActive}>Start Video Streams</button>
        {'\u00A0'}
        <button className='btn btn-warning' onClick={pauseCall} disabled={!isCallActive}>{isCallPaused ? 'Resume Video Streams' : 'Pause Video Streams'}</button>
        {'\u00A0'}
        <button className='btn btn-danger' onClick={stopCall} disabled={!isCallActive}>Stop Video Streams</button>
        {'\u00A0'}
        <button className='btn btn-secondary' onClick={startRecording} disabled={isRecording}>Start Recording</button>
        {'\u00A0'}
        <button className='btn btn-primary' onClick={pauseRecording} disabled={!isRecording}>Pause Recording</button>
        {'\u00A0'}
        <button className='btn btn-danger' onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
        <div>
          <h3>Counter: {counter} seconds</h3>
        </div>
      </div>
    </div>
  );
};

export default VideoLiveStream;
