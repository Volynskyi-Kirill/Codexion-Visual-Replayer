import { Play, Pause, RotateCcw, SkipBack, SkipForward, Radio } from 'lucide-react';
import { useLogStore } from '../store/useLogStore';
import { usePlayback } from '../hooks/usePlayback';

export const PlaybackControls: React.FC = () => {
  const { 
    currentTime, 
    setCurrentTime, 
    maxTime, 
    isPlaying, 
    setIsPlaying, 
    speed, 
    setSpeed,
    goToNextEvent,
    goToPrevEvent,
    isStreaming,
  } = useLogStore();

  usePlayback();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(3) + 's';
  };

  const speeds = [0.5, 1, 2, 5, 10];

  return (
    <div className="controls">
      {isStreaming && (
        <div className="live-banner">
          <Radio size={16} className="live-icon animate-pulse" />
          <span>Live Simulation Running... Receiving Events</span>
        </div>
      )}

      <div className={`slider-container ${isStreaming ? 'opacity-50' : ''}`}>
        <input
          type="range"
          min={0}
          max={maxTime}
          step={1}
          value={currentTime}
          onChange={handleSliderChange}
          className="timeline-slider"
          disabled={isStreaming}
        />
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(maxTime)}</span>
        </div>
      </div>

      <div className={`button-group ${isStreaming ? 'opacity-50' : ''}`}>
        <button onClick={() => setCurrentTime(0)} title="Restart" disabled={isStreaming}>
          <RotateCcw size={20} />
        </button>
        <button onClick={goToPrevEvent} title="Previous Event" disabled={isStreaming}>
          <SkipBack size={20} />
        </button>
        <button onClick={togglePlay} className="play-pause-btn" title={isPlaying ? 'Pause' : 'Play'} disabled={isStreaming}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={goToNextEvent} title="Next Event" disabled={isStreaming}>
          <SkipForward size={20} />
        </button>
        <div className="speed-selector">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={speed === s ? 'active' : ''}
              disabled={isStreaming}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
