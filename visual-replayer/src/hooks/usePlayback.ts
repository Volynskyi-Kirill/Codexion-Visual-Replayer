import { useEffect, useRef } from 'react';
import { useLogStore } from '../store/useLogStore';

export function usePlayback() {
  const { isPlaying, speed, currentTime, setCurrentTime, maxTime } = useLogStore();
  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== undefined && isPlaying) {
        const deltaTime = time - lastTimeRef.current;
        const newTime = currentTime + deltaTime * speed;
        
        if (newTime >= maxTime) {
          setCurrentTime(maxTime);
        } else {
          setCurrentTime(newTime);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = undefined;
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, currentTime, maxTime, setCurrentTime]);
}
