import { useLogStore } from './store/useLogStore';
import { CircularHub } from './components/CircularHub';
import { PlaybackControls } from './components/PlaybackControls';
import './App.css';

function App() {
  const { setLogs, metadata } = useLogStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setLogs(text);
  };

  return (
    <div className="app-container">
      <h1>Codexion Visual Replayer</h1>
      
      {!metadata ? (
        <div className="upload-section">
          <input type="file" id="file-upload" onChange={handleFileChange} accept=".txt,.log" hidden />
          <label htmlFor="file-upload" className="upload-btn">
            Select Simulation Log
          </label>
          <p>Drag and drop or click to upload a .txt or .log file</p>
        </div>
      ) : (
        <div className="replayer-content">
          <PlaybackControls />
          <div className="hub-wrapper">
            <CircularHub />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
