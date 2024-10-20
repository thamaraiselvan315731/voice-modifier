import React, { useState } from 'react';
import * as Tone from 'tone';
import './App.css';

function App() {
  const [mic, setMic] = useState(null);
  const [pitchShift, setPitchShift] = useState(null);
  const [isMicOpen, setIsMicOpen] = useState(false);

  // Open the microphone and set up Tone.js UserMedia
  const openMic = async () => {
    if (!isMicOpen) {
      const userMic = new Tone.UserMedia();
      try {
        await userMic.open();
        console.log("Microphone access granted");
        setMic(userMic);
        setIsMicOpen(true);
      } catch (error) {
        console.error("Microphone access denied", error);
      }
    }
  };

  // Change the pitch based on user selection
  const changeVoice = async (type) => {
    if (!mic) {
      alert('Please allow microphone access first.');
      return;
    }

    // Disconnect the existing effect if it exists
    if (pitchShift) {
      pitchShift.dispose();
    }

    let shift;
    switch (type) {
      case 'male':
        shift = -5; // Lower the pitch to sound more like a male
        break;
      case 'female':
        shift = 15; // Raise the pitch to sound more like a female
        break;
      case 'child':
        shift = 6; // Higher pitch for child-like voice
        break;
      default:
        shift = 0;
    }

    const newPitchShift = new Tone.PitchShift(shift).toDestination();
    mic.connect(newPitchShift); // Connect the mic to the pitch shift
    setPitchShift(newPitchShift);
  };

  return (
    <div className="App">
      <h1>Voice Changer App</h1>
      <div>
        <button onClick={openMic} className="mic-btn">
          {isMicOpen ? 'Microphone Opened' : 'Open Microphone'}
        </button>
      </div>
      <div className="controls">
        <button onClick={() => changeVoice('male')} className="voice-btn">Male Voice</button>
        <button onClick={() => changeVoice('female')} className="voice-btn">Female Voice</button>
        <button onClick={() => changeVoice('child')} className="voice-btn">Child Voice</button>
      </div>
    </div>
  );
}

export default App;
