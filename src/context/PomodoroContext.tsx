import React, { createContext, useContext, useReducer, useEffect } from 'react';

export enum TimerMode {
  WORK = 'work',
  SHORT_BREAK = 'short-break',
  LONG_BREAK = 'long-break',
}

export enum TimerStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
}

export interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

export interface PomodoroState {
  mode: TimerMode;
  status: TimerStatus;
  timeRemaining: number;
  completedPomodoros: number;
  settings: PomodoroSettings;
}

type PomodoroAction =
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'TICK' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<PomodoroSettings> };

const defaultSettings: PomodoroSettings = {
  workDuration: 25 * 60, // 25 minutes
  shortBreakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  longBreakInterval: 4, // Long break after every 4 pomodoros
};

const initialState: PomodoroState = {
  mode: TimerMode.WORK,
  status: TimerStatus.IDLE,
  timeRemaining: defaultSettings.workDuration,
  completedPomodoros: 0,
  settings: defaultSettings,
};

function pomodoroReducer(state: PomodoroState, action: PomodoroAction): PomodoroState {
  switch (action.type) {
    case 'START_TIMER':
      return { ...state, status: TimerStatus.RUNNING };
    
    case 'PAUSE_TIMER':
      return { ...state, status: TimerStatus.PAUSED };
    
    case 'RESET_TIMER':
      const duration = state.mode === TimerMode.WORK 
        ? state.settings.workDuration
        : state.mode === TimerMode.SHORT_BREAK
        ? state.settings.shortBreakDuration
        : state.settings.longBreakDuration;
      
      return {
        ...state,
        status: TimerStatus.IDLE,
        timeRemaining: duration,
      };
    
    case 'TICK':
      if (state.status !== TimerStatus.RUNNING) return state;
      
      const newTimeRemaining = Math.max(0, state.timeRemaining - 1);
      
      if (newTimeRemaining === 0) {
        return { ...state, timeRemaining: 0 };
      }
      
      return { ...state, timeRemaining: newTimeRemaining };
    
    case 'COMPLETE_SESSION':
      const newCompletedPomodoros = state.mode === TimerMode.WORK 
        ? state.completedPomodoros + 1 
        : state.completedPomodoros;
      
      let nextMode: TimerMode;
      if (state.mode === TimerMode.WORK) {
        const shouldTakeLongBreak = newCompletedPomodoros % state.settings.longBreakInterval === 0;
        nextMode = shouldTakeLongBreak ? TimerMode.LONG_BREAK : TimerMode.SHORT_BREAK;
      } else {
        nextMode = TimerMode.WORK;
      }
      
      const nextDuration = nextMode === TimerMode.WORK 
        ? state.settings.workDuration
        : nextMode === TimerMode.SHORT_BREAK
        ? state.settings.shortBreakDuration
        : state.settings.longBreakDuration;
      
      return {
        ...state,
        mode: nextMode,
        status: TimerStatus.IDLE,
        timeRemaining: nextDuration,
        completedPomodoros: newCompletedPomodoros,
      };
    
    case 'UPDATE_SETTINGS':
      const newSettings = { ...state.settings, ...action.payload };
      let updatedTimeRemaining = state.timeRemaining;
      
      // Update current timer if we're in idle state
      if (state.status === TimerStatus.IDLE) {
        updatedTimeRemaining = state.mode === TimerMode.WORK 
          ? newSettings.workDuration
          : state.mode === TimerMode.SHORT_BREAK
          ? newSettings.shortBreakDuration
          : newSettings.longBreakDuration;
      }
      
      return {
        ...state,
        settings: newSettings,
        timeRemaining: updatedTimeRemaining,
      };
    
    default:
      return state;
  }
}

interface PomodoroContextType {
  state: PomodoroState;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  completeSession: () => void;
  updateSettings: (settings: Partial<PomodoroSettings>) => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  // Timer effect
  useEffect(() => {
    let interval: number;
    
    if (state.status === TimerStatus.RUNNING) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.status]);

  // Auto-complete session when time reaches 0
  useEffect(() => {
    if (state.timeRemaining === 0 && state.status === TimerStatus.RUNNING) {
      // Play notification sound
      playNotificationSound();
      dispatch({ type: 'COMPLETE_SESSION' });
    }
  }, [state.timeRemaining, state.status]);

  const startTimer = () => dispatch({ type: 'START_TIMER' });
  const pauseTimer = () => dispatch({ type: 'PAUSE_TIMER' });
  const resetTimer = () => dispatch({ type: 'RESET_TIMER' });
  const completeSession = () => dispatch({ type: 'COMPLETE_SESSION' });
  const updateSettings = (settings: Partial<PomodoroSettings>) => 
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });

  return (
    <PomodoroContext.Provider value={{
      state,
      startTimer,
      pauseTimer,
      resetTimer,
      completeSession,
      updateSettings,
    }}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
}

// Simple notification sound using Web Audio API
function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log('Audio notification not available');
  }
} 