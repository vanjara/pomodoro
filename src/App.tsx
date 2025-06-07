import { useState } from 'react'
import { PomodoroProvider } from './context/PomodoroContext'
import { Timer } from './components/Timer'
import { Settings } from './components/Settings'

function App() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <PomodoroProvider>
      <div className="relative">
        {/* Main Timer */}
        <Timer onShowSettings={() => setShowSettings(true)} />

        {/* Settings Modal */}
        <Settings 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      </div>
    </PomodoroProvider>
  )
}

export default App
