import { usePomodoro, TimerMode, TimerStatus } from '../context/PomodoroContext';

interface TimerProps {
  onShowSettings: () => void;
}

export function Timer({ onShowSettings }: TimerProps) {
  const { state, startTimer, pauseTimer, resetTimer } = usePomodoro();

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = (): number => {
    switch (state.mode) {
      case TimerMode.WORK:
        return state.settings.workDuration;
      case TimerMode.SHORT_BREAK:
        return state.settings.shortBreakDuration;
      case TimerMode.LONG_BREAK:
        return state.settings.longBreakDuration;
      default:
        return state.settings.workDuration;
    }
  };

  const getProgress = (): number => {
    const total = getTotalDuration();
    return ((total - state.timeRemaining) / total) * 100;
  };

  const getModeTitle = (): string => {
    switch (state.mode) {
      case TimerMode.WORK:
        return 'Focus Time';
      case TimerMode.SHORT_BREAK:
        return 'Short Break';
      case TimerMode.LONG_BREAK:
        return 'Long Break';
      default:
        return 'Focus Time';
    }
  };

  const handlePlayPause = () => {
    if (state.status === TimerStatus.RUNNING) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const circumference = 2 * Math.PI * 140; // radius = 140
  const strokeDashoffset = circumference - (getProgress() / 100) * circumference;

  // Calculate points (each completed pomodoro = 25 points)
  const totalPoints = state.completedPomodoros * 25;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header with Points */}
      <div className="flex justify-between items-center p-6">
        <div className="text-lg font-medium text-gray-700">
          {getModeTitle()}
        </div>
        <div className="bg-tomato-500 text-white px-4 py-2 rounded-full font-bold">
          <div className="text-xs opacity-90">Points</div>
          <div className="text-lg">{totalPoints}</div>
        </div>
      </div>

      {/* Main Timer Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-16">
        {/* Circular Timer with Tomato */}
        <div className="relative mb-8">
          <svg
            className="w-80 h-80 transform -rotate-90"
            viewBox="0 0 320 320"
          >
            {/* Background circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="#ef4444"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          
          {/* Cute Tomato Character */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Tomato Character */}
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-tomato-500 rounded-full relative mx-auto shadow-lg">
                  {/* Tomato stem */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-4 bg-green-500 rounded-t-full"></div>
                    <div className="w-3 h-2 bg-green-600 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"></div>
                  </div>
                  
                  {/* Eyes */}
                  <div className="absolute top-6 left-4 w-3 h-3 bg-white rounded-full">
                    <div className="w-2 h-2 bg-gray-800 rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                  <div className="absolute top-6 right-4 w-3 h-3 bg-white rounded-full">
                    <div className="w-2 h-2 bg-gray-800 rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                  
                  {/* Mouth */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-2 border-b-2 border-gray-700 rounded-full"></div>
                  </div>
                  
                  {/* Tomato highlight */}
                  <div className="absolute top-4 left-6 w-3 h-3 bg-tomato-300 rounded-full opacity-60"></div>
                </div>
              </div>
              
              {/* Time Display */}
              <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
                {formatTime(state.timeRemaining)}
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handlePlayPause}
          className="bg-tomato-500 hover:bg-tomato-600 text-white font-semibold py-4 px-12 rounded-full text-lg transition-colors duration-200 shadow-lg mb-4"
        >
          {state.status === TimerStatus.RUNNING ? 'Pause' : 'Start'}
        </button>

        {/* Reset Button */}
        <button
          onClick={resetTimer}
          className="text-gray-500 hover:text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200 mb-6"
        >
          🔄 Reset
        </button>

        {/* Settings Link */}
        <button
          onClick={onShowSettings}
          className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>
      </div>
    </div>
  );
} 