import { useState } from 'react';
import { usePomodoro } from '../context/PomodoroContext';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const { state, updateSettings } = usePomodoro();
  const [workMinutes, setWorkMinutes] = useState(Math.floor(state.settings.workDuration / 60));
  const [shortBreakMinutes, setShortBreakMinutes] = useState(Math.floor(state.settings.shortBreakDuration / 60));
  const [longBreakMinutes, setLongBreakMinutes] = useState(Math.floor(state.settings.longBreakDuration / 60));
  const [longBreakInterval, setLongBreakInterval] = useState(state.settings.longBreakInterval);

  const handleSave = () => {
    updateSettings({
      workDuration: workMinutes * 60,
      shortBreakDuration: shortBreakMinutes * 60,
      longBreakDuration: longBreakMinutes * 60,
      longBreakInterval: longBreakInterval,
    });
    onClose();
  };

  const handleReset = () => {
    setWorkMinutes(25);
    setShortBreakMinutes(5);
    setLongBreakMinutes(15);
    setLongBreakInterval(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Work Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tomato-500 focus:border-transparent"
            />
          </div>

          {/* Short Break Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Break Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={shortBreakMinutes}
              onChange={(e) => setShortBreakMinutes(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Long Break Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Break Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Long Break Interval */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Break Interval (pomodoros)
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleReset}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Reset to Default
          </button>
          
          <div className="space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 