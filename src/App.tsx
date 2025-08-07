import React, { useState } from 'react';
import { Play, RotateCcw, Maximize2, Info } from 'lucide-react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// sayfa bileşenleri
import Home from './Home'; // index.html'in React karşılığı
import Comic from './Comic';
import VisualGame from './VisualGame';
import Blog from './Blog';

function App() {
  // STATE & CONFIG - return öncesinde tanımlanmalı
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [gamePath, setGamePath] = useState("");

  const gameConfig = {
    title: "MY PYGAME",
    version: "v1.0",
    description: "A classic retro game experience built with Python and Pygame, compiled to WebAssembly for web browsers.",
    controls: [
      "ARROW KEYS - Movement",
      "SPACEBAR - Action/Jump",
      "ESC - Pause Menu",
      "R - Restart Level"
    ],
    gamePasswords: {
      "1234": "/game/index.html",
      "ure341": "/game/rpg_wasm.html",
      "mystic": "/game/webgodot.html"
    }
  };

  // FONKSİYONLAR
  const handleFullscreen = () => {
    const iframe = document.getElementById("game-frame") as HTMLIFrameElement;
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    } else if ((iframe as any)?.webkitRequestFullscreen) {
      (iframe as any).webkitRequestFullscreen();
    } else if ((iframe as any)?.mozRequestFullScreen) {
      (iframe as any).mozRequestFullScreen();
    } else if ((iframe as any)?.msRequestFullscreen) {
      (iframe as any).msRequestFullscreen();
    }
  };

  const restartGame = () => {
    window.location.reload();
  };

  const handleGameLoad = () => {
    setShowPasswordPrompt(true);
  };

  const validatePassword = () => {
    const matchedPath = (gameConfig.gamePasswords as Record<string, string>)[passwordInput.trim()];
    if (matchedPath) {
      setGamePath(matchedPath);
      setIsGameLoaded(true);
      setShowPasswordPrompt(false);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // RENDER (JSX)
  return (
    <Router>
      <div className="flex justify-center gap-4 mt-4">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">🏚️Home</Link>
        <Link to="/comic" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">💑Sevgiliye özel çizgiroman yaptır</Link>
        <Link to="/visualgame" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">👾Sevgiliye özel görsel roman oyunu yaptır</Link>
        <Link to="/blog" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">📜Blog / yazılar</Link>
      </div>

      {/* Sayfa Yönlendirmeleri */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comic" element={<Comic />} />
        <Route path="/visualgame" element={<VisualGame />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <div className="min-h-screen bg-gray-50 font-mono text-gray-900">
        {/* Retro scanlines overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="w-full h-full opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
          }}></div>
        </div>

        {/* Header */}
        <header className="border-b-4 border-gray-300 bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-wider text-gray-900">
                  {gameConfig.title}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{gameConfig.version}</p>
              </div>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 border-2 border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200"
              >
                <Info size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Game Area */}
            <div className="lg:col-span-3">
              <div className="bg-white border-4 border-gray-300 shadow-lg">
                {/* Game Controls */}
                <div className="border-b-2 border-gray-300 p-4 bg-gray-100">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleFullscreen}
                      disabled={!isGameLoaded}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Maximize2 size={16} />
                      FULLSCREEN
                    </button>
                    <button
                      onClick={restartGame}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-gray-400 bg-white hover:bg-gray-50"
                    >
                      <RotateCcw size={16} />
                      RESTART
                    </button>
                    <div className="flex-1"></div>
                    {isGameLoaded && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        RUNNING
                      </div>
                    )}
                  </div>
                </div>

                {/* Game Display */}
                <div className="aspect-video bg-black relative">
                  {!isGameLoaded && !showPasswordPrompt && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">▶</div>
                        <p className="text-xl mb-2">READY TO PLAY</p>
                        <p className="text-sm opacity-75">Click PLAY to start the game</p>
                        <button
                          onClick={handleGameLoad}
                          className="mt-6 px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black"
                        >
                          LAUNCH GAME
                        </button>
                      </div>
                    </div>
                  )}

                  {showPasswordPrompt && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
                      <div className="bg-white border-4 border-gray-300 p-6 shadow-xl w-full max-w-sm text-center">
                        <h2 className="text-lg font-bold mb-4">Oyun şifresini giriniz:</h2>
                        <input
                          type="password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="w-full p-2 border-2 border-gray-300 mb-4 text-center font-mono"
                          placeholder="••••"
                        />
                        {passwordError && (
                          <p className="text-sm text-red-600 mb-2">Hatalı şifre, tekrar deneyin.</p>
                        )}
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={validatePassword}
                            className="px-4 py-2 border-2 border-gray-700 bg-gray-100 hover:bg-gray-200"
                          >
                            GİRİŞ
                          </button>
                          <button
                            onClick={() => {
                              setShowPasswordPrompt(false);
                              setPasswordInput("");
                              setPasswordError(false);
                            }}
                            className="px-4 py-2 border-2 border-gray-300 bg-white hover:bg-gray-50"
                          >
                            İPTAL
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {isGameLoaded && (
                    <iframe
                      id="game-frame"
                      src={gamePath}
                      className="w-full h-full border-0"
                      title={gameConfig.title}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Leaderboard */}
              <div className="bg-white border-4 border-gray-300 shadow-lg">
                <div className="border-b-2 border-gray-300 p-4 bg-gray-100">
                  <h3 className="font-bold text-lg">🏆LEADERBOARD</h3>
                </div>
                <div className="p-6 text-center text-sm text-gray-500 italic opacity-60">
                  Yakında...
                </div>
              </div>

              {/* Game Info */}
              <div className="bg-white border-4 border-gray-300 shadow-lg">
                <div className="border-b-2 border-gray-300 p-4 bg-gray-100">
                  <h3 className="font-bold text-lg">GAME INFO</h3>
                </div>
                <div className="p-4 text-sm text-gray-700">
                  <p className="mb-4">{gameConfig.description}</p>
                  <p>ENGINE: PYGAME + WASM</p>
                  <p>VERSION: {gameConfig.version}</p>
                </div>
              </div>

              {/* Controls */}
              {!isGameLoaded && (
                <div className="bg-white border-4 border-gray-300 shadow-lg">
                  <div className="border-b-2 border-gray-300 p-4 bg-gray-100">
                    <h3 className="font-bold text-lg">CONTROLS</h3>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    {gameConfig.controls.map((control, idx) => (
                      <div key={idx}><code>{control}</code></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Modal */}
        {showInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-4 border-gray-300 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="border-b-2 border-gray-300 p-4 bg-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-xl">GAME INFORMATION</h3>
                <button
                  onClick={() => setShowInfo(false)}
                  className="p-1 border-2 border-gray-400 bg-white hover:bg-gray-50 
                           transition-colors duration-200 focus:outline-none focus:ring-2 
                           focus:ring-gray-500"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-6">
                {/* Game Description */}
                <div>
                  <h4 className="font-bold text-lg mb-3 text-gray-900">ABOUT THIS GAME</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {gameConfig.description}
                  </p>
                </div>

                {/* Controls */}
                <div>
                  <h4 className="font-bold text-lg mb-3 text-gray-900">CONTROLS</h4>
                  <div className="bg-gray-50 border-2 border-gray-200 p-4">
                    <div className="space-y-2">
                      {gameConfig.controls.map((control, index) => (
                        <div key={index} className="text-sm font-mono">
                          <code className="text-gray-800">{control}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Info */}
                <div>
                  <h4 className="font-bold text-lg mb-3 text-gray-900">TECHNICAL SPECIFICATIONS</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border-2 border-gray-200 p-4">
                      <h5 className="font-semibold mb-2">GAME ENGINE</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>ENGINE: Pygame</p>
                        <p>RUNTIME: WebAssembly</p>
                        <p>VERSION: {gameConfig.version}</p>
                        <p>COMPILER: Pygbag</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 border-2 border-gray-200 p-4">
                      <h5 className="font-semibold mb-2">REQUIREMENTS</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>BROWSER: Modern WebAssembly support</p>
                        <p>MEMORY: 512MB+ recommended</p>
                        <p>AUDIO: Web Audio API</p>
                        <p>INPUT: Keyboard required</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="font-bold text-lg mb-3 text-gray-900">GAMEPLAY TIPS</h4>
                  <div className="bg-gray-50 border-2 border-gray-200 p-4">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Make sure your browser supports WebAssembly</li>
                      <li>• Use headphones for the best audio experience</li>
                      <li>• Press ESC to access the pause menu during gameplay</li>
                      <li>• If the game doesn't load, try refreshing the page</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t-4 border-gray-300 bg-white mt-16">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="text-center text-sm text-gray-600">
              <p>POWERED BY PYGAME • COMPILED WITH PYGBAG • RUNNING ON WEBASSEMBLY</p>
              <p className="mt-1">© 2025 - RETRO GAMING EXPERIENCE</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
