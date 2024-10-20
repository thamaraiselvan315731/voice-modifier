import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import PitchShift from 'pitch-shift';

const VoiceChanger = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceMode, setVoiceMode] = useState('normal');
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStreamSource, setMediaStreamSource] = useState(null);
  const [pitchShifter, setPitchShifter] = useState(null);

  // Initialize audio context and pitch shifter
  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);
  }, []);

  // Initialize pitch shifter only when audio context is available
  useEffect(() => {
    if (audioContext) {
      const shifter = PitchShift(audioContext);
      if (shifter) {
        setPitchShifter(shifter);
      } else {
        console.error('PitchShift initialization failed.');
      }
    }
  }, [audioContext]);

  // Function to start recording using getUserMedia
  const startRecording = async () => {
    if (!audioContext || !pitchShifter) {
      console.error('Audio context or pitch shifter is not initialized.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContext.createMediaStreamSource(stream);
      setMediaStreamSource(source);

      if (source && pitchShifter) {
        source.connect(pitchShifter); // Connect the microphone source to the pitch shifter
        pitchShifter.connect(audioContext.destination); // Connect the pitch shifter to speakers
      }

      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone: ', err);
    }
  };

  // Stop recording and disconnect nodes
  const stopRecording = () => {
    if (mediaStreamSource && audioContext) {
      mediaStreamSource.disconnect();
      setIsRecording(false);
    }
  };

  // Apply voice effect based on the selected mode
  const applyVoiceEffect = () => {
    if (!pitchShifter) {
      console.error('Pitch shifter is not initialized.');
      return;
    }

    switch (voiceMode) {
      case 'male':
        pitchShifter.setPitch(-5); // Lower the pitch
        break;
      case 'female':
        pitchShifter.setPitch(5); // Raise the pitch
        break;
      case 'child':
        pitchShifter.setPitch(10); // Very high pitch for child-like voice
        break;
      default:
        pitchShifter.setPitch(0); // Normal pitch
    }
  };

  // Update pitch effect when mode changes
  useEffect(() => {
    applyVoiceEffect();
  }, [voiceMode]);

  return (
    <div className="voice-changer">
      <h1>Voice Changer</h1>

      <div>
        <label>Select Voice Mode: </label>
        <select value={voiceMode} onChange={(e) => setVoiceMode(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="child">Child</option>
        </select>
      </div>

      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default VoiceChanger;
