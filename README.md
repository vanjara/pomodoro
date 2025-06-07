# 🍅 Minimalistic Pomodoro Timer

A beautiful, clean, and engaging Pomodoro timer featuring a cute tomato character to boost your productivity using the Pomodoro Technique.

![Pomodoro Timer](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)

## ✨ Features

- **🍅 Cute Tomato Character** - Adorable tomato mascot with eyes, stem, and animations
- **📊 Points System** - Earn 25 points for each completed pomodoro session
- **🎯 Visual Countdown** - Beautiful circular progress indicator with smooth animations
- **⏱️ Smart Timer Management** - Automatic transitions between work, short break, and long break
- **🔊 Audio Notifications** - Gentle sound alerts using Web Audio API
- **⚙️ Customizable Settings** - Adjust work, short break, and long break durations
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🎨 Modern UI** - Clean, minimalistic design with custom tomato color theme

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: React Context API with useReducer
- **Audio**: Web Audio API for notifications
- **Build Tool**: Vite for fast development and building
- **Deployment**: Vercel/Netlify ready

## 📋 Requirements

- Node.js 16+ and npm/yarn
- Modern web browser with JavaScript enabled
- Audio support for notifications (optional)

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/vanjara/pomodoro.git
   cd pomodoro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 The Pomodoro Technique

1. **Work** for 25 minutes (1 Pomodoro) 🍅
2. **Short break** for 5 minutes ☕
3. **Repeat** steps 1-2 three more times
4. **Long break** for 15-30 minutes 🌟
5. **Start over**

## 🎮 How to Use

1. **Click "Start"** to begin your 25-minute focus session
2. **Watch the tomato** as the circular progress ring fills up
3. **Hear the notification** when your session completes
4. **Take your break** as the timer automatically switches modes
5. **Earn points** for each completed pomodoro (25 points each!)
6. **Use "Reset"** to restart the current session anytime
7. **Click "Settings"** to customize timer durations

## ⚙️ Customization

Access the settings to customize:
- **Work Duration**: Default 25 minutes (1-60 minutes)
- **Short Break**: Default 5 minutes (1-30 minutes)  
- **Long Break**: Default 15 minutes (1-60 minutes)
- **Long Break Interval**: After every 4 pomodoros (2-10 sessions)

## 🎨 Design Philosophy

This timer embraces minimalism with a delightful twist - a cute tomato character that makes productivity fun! No unnecessary features, no distractions. Just you, your adorable tomato companion, and the gentle rhythm of focused productivity.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

Ready to deploy to:
- **Vercel**: `npm run build && vercel --prod`
- **Netlify**: `npm run build` and drag `dist` folder
- **GitHub Pages**: Enable in repository settings

## 🤝 Contributing

Feel free to contribute to make this pomodoro timer even more delightful!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

*Built with ❤️ and 🍅 for productive developers*
