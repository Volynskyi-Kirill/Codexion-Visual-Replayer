import { useLogStore } from './store/useLogStore';
import { CircularHub } from './components/CircularHub';
import './App.css';

function App() {
  const { setLogs, metadata, currentTime, setCurrentTime, maxTime } = useLogStore();

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
          <input type="file" onChange={handleFileChange} accept=".txt,.log" />
          <p>Select a simulation log file to begin.</p>
        </div>
      ) : (
        <div className="replayer-content">
          <div className="controls">
            <input 
              type="range" 
              min={0} 
              max={maxTime} 
              value={currentTime} 
              onChange={(e) => setCurrentTime(Number(e.target.value))} 
              style={{ width: '100%' }}
            />
            <div className="time-info">
              <span>Time: {currentTime}ms / {maxTime}ms</span>
            </div>
          </div>
          
          <CircularHub />
        </div>
      )}
    </div>
  );
}

export default App;
