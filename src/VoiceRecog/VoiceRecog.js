// import { useRef, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import "../App.css";
// import microPhoneIcon from "../SVG/microphone.png";

// function VoiceRecog() {
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   const [isListening, setIsListening] = useState(false);
//   const microphoneRef = useRef(null);
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return (
//       <div className="mircophone-container">
//         Browser is not Support Speech Recognition.
//       </div>
//     );
//   }
//   const handleListing = () => {
//     setIsListening(true);
//     microphoneRef.current.classList.add("listening");
//     SpeechRecognition.startListening({
//       continuous: true,
//     });
//   };
//   const stopHandle = () => {
//     setIsListening(false);
//     microphoneRef.current.classList.remove("listening");
//     SpeechRecognition.stopListening();
//   };
//   const handleReset = () => {
//     stopHandle();
//     resetTranscript();
//   };
//   return (
//     <div className="microphone-wrapper">
//       <div className="mircophone-container">
//         <div
//           className="microphone-icon-container"
//           ref={microphoneRef}
//           onClick={handleListing}
//         >
//           <img src={microPhoneIcon} className="microphone-icon" />
//         </div>
//         <div className="microphone-status">
//           {isListening ? "Listening........." : "Click to start Listening"}
//         </div>
//         {isListening && (
//           <button className="microphone-stop btn" onClick={stopHandle}>
//             Stop
//           </button>
//         )}
//       </div>
//       {transcript && (
//         <div className="microphone-result-container">
//           <div className="microphone-result-text">{transcript}</div>
//           <button className="microphone-reset btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// export default VoiceRecog;
// import { useRef, useState, useEffect } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { Howl } from 'howler'; // Import Howler.js for tones
// import "../App.css";
// import microPhoneIcon from "../SVG/microphone.png";

// // Load audio files (can be different tones for different events)
// const listeningTone = new Howl({
//   src: ['listening.mp3'], // Add your tone file
//   rate: 1 // Default rate
// });
// const stopTone = new Howl({
//   src: ['stop.mp3'], // Add your stop tone file
//   rate: 1 // Default rate
// });
// const resetTone = new Howl({
//   src: ['reset.mp3'], // Add reset tone
//   rate: 1 // Default rate
// });

// // Define voice changer options (pitch changes for different voices)
// const voiceChangers = {
//   male: 0.9,    // Lower pitch for male
//   female: 1.3,  // Higher pitch for female
//   child: 1.6    // Even higher pitch for child
// };

// function VoiceRecog() {
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   const [isListening, setIsListening] = useState(false);
//   const [voiceType, setVoiceType] = useState("male"); // Default voice type
//   const [isPlaying, setIsPlaying] = useState(false);  // Control play button state
//   const microphoneRef = useRef(null);

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return (
//       <div className="mircophone-container">
//         Browser is not Support Speech Recognition.
//       </div>
//     );
//   }

//   const handleListening = () => {
//     setIsListening(true);
//     setIsPlaying(false);  // Disable play button while recording
//     microphoneRef.current.classList.add("listening");

//     // Play listening tone with voice changer effect
//     listeningTone.rate(voiceChangers[voiceType]); // Adjust rate based on voice type
//     listeningTone.play();

//     SpeechRecognition.startListening({
//       continuous: true,
//     });
//   };

//   const stopHandle = () => {
//     setIsListening(false);
//     microphoneRef.current.classList.remove("listening");

//     // Play stop tone
//     stopTone.rate(voiceChangers[voiceType]);
//     stopTone.play();

//     SpeechRecognition.stopListening();
//     setIsPlaying(true);  // Enable play button once listening stops
//   };

//   const handleReset = () => {
//     stopHandle();
//     resetTranscript();

//     // Play reset tone
//     resetTone.rate(voiceChangers[voiceType]);
//     resetTone.play();
//   };

//   const changeVoiceType = (type) => {
//     setVoiceType(type); // Change voice type dynamically (male, female, child)
//   };

//   const playTranscript = () => {
//     if (transcript) {
//       const utterance = new SpeechSynthesisUtterance(transcript);

//       // Adjust pitch based on the selected voice
//       switch (voiceType) {
//         case "male":
//           utterance.pitch = 0.9; // Lower pitch for male
//           break;
//         case "female":
//           utterance.pitch = 2.6; // Higher pitch for female
//           break;
//         case "child":
//           utterance.pitch = 1.9; // Higher pitch for child
//           break;
//         default:
//           utterance.pitch = 1; // Normal pitch
//       }

//       // Speak the transcript
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   return (
//     <div className="microphone-wrapper">
//       <div className="mircophone-container">
//         <div
//           className="microphone-icon-container"
//           ref={microphoneRef}
//           onClick={handleListening}
//         >
//           <img src={microPhoneIcon} className="microphone-icon" alt="Microphone Icon" />
//         </div>
//         <div className="microphone-status">
//           {isListening ? "Listening........." : "Click to start Listening"}
//         </div>
//         {isListening && (
//           <button className="microphone-stop btn" onClick={stopHandle}>
//             Stop
//           </button>
//         )}
//       </div>
//       {transcript && (
//         <div className="microphone-result-container">
//           <div className="microphone-result-text">{transcript}</div>
//           <button className="microphone-reset btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       )}

//       {/* Voice Changer Controls */}
//       <div className="voice-changer">
//         <label>Change Voice: </label>
//         <button onClick={() => changeVoiceType("male")}>Male</button>
//         <button onClick={() => changeVoiceType("female")}>Female</button>
//         <button onClick={() => changeVoiceType("child")}>Child</button>
//       </div>

//       {/* Play Button */}
//       {isPlaying && (
//         <button className="microphone-play btn" onClick={playTranscript}>
//           Play Transcript
//         </button>
//       )}
//     </div>
//   );
// }

// export default VoiceRecog;
// import React, { useRef, useState, useEffect } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import microPhoneIcon from "../SVG/microphone.png";

// const VoiceRecog = () => {
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   const [isListening, setIsListening] = useState(false);
//   const [voiceType, setVoiceType] = useState("male"); // Default voice type
//   const microphoneRef = useRef(null);

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return (
//       <div className="microphone-container">
//         Browser does not support Speech Recognition.
//       </div>
//     );
//   }

//   const handleListening = () => {
//     setIsListening(true);
//     microphoneRef.current.classList.add("listening");
    
//     SpeechRecognition.startListening({
//       continuous: true,
//     });
//   };

//   const stopHandle = () => {
//     setIsListening(false);
//     microphoneRef.current.classList.remove("listening");
//     SpeechRecognition.stopListening();
//   };

//   const handleReset = () => {
//     stopHandle();
//     resetTranscript();
//   };

//   const changeVoiceType = (type) => {
//     setVoiceType(type); // Change voice type dynamically
//   };

//   const playTranscript = () => {
//     if (transcript) {
//       const utterance = new SpeechSynthesisUtterance(transcript);

//       // Adjust pitch based on the selected voice type
//       switch (voiceType) {
//         case "male":
//           utterance.pitch = 0.9; // Lower pitch for male
//           break;
//         case "female":
//           utterance.pitch = 1.3; // Higher pitch for female
//           break;
//         case "child":
//           utterance.pitch = 1.6; // Even higher pitch for child
//           break;
//         default:
//           utterance.pitch = 1; // Normal pitch
//       }

//       // Speak the transcript
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   return (
//     <div className="microphone-wrapper">
//       <div className="microphone-container">
//         <div
//           className="microphone-icon-container"
//           ref={microphoneRef}
//           onClick={handleListening}
//         >
//           <img src={microPhoneIcon} className="microphone-icon" alt="Microphone Icon" />
//         </div>
//         <div className="microphone-status">
//           {isListening ? "Listening........." : "Click to start Listening"}
//         </div>
//         {isListening && (
//           <button className="microphone-stop btn" onClick={stopHandle}>
//             Stop
//           </button>
//         )}
//       </div>
//       {transcript && (
//         <div className="microphone-result-container">
//           <div className="microphone-result-text">{transcript}</div>
//           <button className="microphone-reset btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       )}

//       {/* Voice Changer Controls */}
//       <div className="voice-changer">
//         <label>Change Voice: </label>
//         <button onClick={() => changeVoiceType("male")}>Male</button>
//         <button onClick={() => changeVoiceType("female")}>Female</button>
//         <button onClick={() => changeVoiceType("child")}>Child</button>
//       </div>

//       {/* Play Button */}
//       {transcript && (
//         <button className="microphone-play btn" onClick={playTranscript}>
//           Play Transcript
//         </button>
//       )}
//     </div>
//   );
// };

// export default VoiceRecog;
import React, { useRef, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import microPhoneIcon from "../SVG/microphone.png";
import Speak from "speak-tts"; // Import speak-tts as default

const VoiceRecog = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("Martha"); // Default voice
  const microphoneRef = useRef(null);
  const speak = useRef(null); // Initialize Speak instance

  useEffect(() => {
    const speakInstance = new Speak(); // Create Speak instance

    // Initialize speak-tts
    speakInstance.init({
      volume: 1,
      lang: selectedVoice==="Martha"? "en-GB" : selectedVoice==="Catherine"?"en-AU":selectedVoice==="Samantha"?"hi-IN":selectedVoice==="Grandpa"?"en-US":"en-US",
      rate: 1,
      pitch: selectedVoice==="Martha"? 1.5 : selectedVoice==="Catherine"?1.7:selectedVoice==="Samantha"?1:selectedVoice==="Grandpa"?0.8:1,//Martha,Catherine,Samantha,,Grandpa,MaleVoice // Can also adjust pitch here if needed
      listeners: {
        onvoiceschanged: (voices) => {
          console.log("Available voices: ", voices);
        },
      },
    });

    speak.current = speakInstance; // Assign instance to ref
  }, [selectedVoice]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="microphone-container">
        Browser does not support Speech Recognition.
      </div>
    );
  }

  const handleListening = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  const changeVoice = (voiceName) => {
    setSelectedVoice(voiceName); // Change voice dynamically
  };

  const playTranscript = () => {
    console.log(selectedVoice,"selectedVoice")
    if (transcript) {
      const options = {
        text: transcript,
        voice: selectedVoice==="MaleVoice" ? "Superstar":selectedVoice==="Grandpa"? "Grandpa (English (United States))": selectedVoice==="Samantha"?"Google हिन्दी'":selectedVoice, // Use selected voice
        pitch:selectedVoice==="Martha"? 1.5 : selectedVoice==="Catherine"?1.7:selectedVoice==="Samantha"?1:selectedVoice==="Grandpa"?0.8:1,//Martha,Catherine,Samantha,,Grandpa,MaleVoice // Can also adjust pitch here if needed
        rate: 1, // Can adjust speech rate if needed
      };
      speak.current.speak(options).catch((error) => {
        console.error("Error speaking:", error);
      });
    }
  };

  return (
    <div className="microphone-wrapper" style={{textAlign:"center"}}>
      <div className="microphone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          style={{textAlign:"center"}}
          onClick={handleListening}
        >
          <img src={microPhoneIcon} className="microphone-icon" alt="Microphone Icon" style={{textAlign:"center"}} />
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}

      {/* Voice Changer Controls */}
      <div className="voice-changer">
        <label>Change Voice: </label> 
        <button onClick={() => changeVoice("Martha")}>Martha</button>
        <button onClick={() => changeVoice("Catherine")}>"Catherine"
        </button>
        <button onClick={() => changeVoice("Samantha")}>Samantha</button>
        <button onClick={() => changeVoice("Grandpa")}>Grandpa</button>
        <button onClick={() => changeVoice("MaleVoice")}>Male Voice</button>
      </div>

      {/* Play Button */}
      {transcript && (
        <button className="microphone-play btn" onClick={playTranscript}>
          Play Transcript
        </button>
      )}
    </div>
  );
};

export default VoiceRecog;
