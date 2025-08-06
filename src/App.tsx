import React, { useState } from 'react';
import { Play, RotateCcw, Maximize2, Info } from 'lucide-react';

function App() {
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
    gamePath: "/game/index.html"
  };

  const handleGameLoad = () => {
    setIsGameLoaded(true);
  };

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

  return (
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
              className="p-2 border-2 border-gray-300 bg-white hover:bg-gray-100 
                       transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-gray-400"
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
                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-400 
                             bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200 focus:outline-none focus:ring-2 
                             focus:ring-gray-500"
                  >
                    <Maximize2 size={16} />
                    FULLSCREEN
                  </button>

                  <button
                    onClick={restartGame}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-400 
                             bg-white hover:bg-gray-50 transition-colors duration-200 
                             focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                {!isGameLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">▶</div>
                      <p className="text-xl mb-2">READY TO PLAY</p>
                      <p className="text-sm opacity-75">Click PLAY to start the game</p>
                      <button
                        onClick={handleGameLoad}
                        className="mt-6 px-8 py-3 border-2 border-white text-white 
                                 hover:bg-white hover:text-black transition-colors duration-300
                                 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        LAUNCH GAME
                      </button>
                    </div>
                  </div>
                )}

                {isGameLoaded && (
                  <iframe
                    id="game-frame"
                    src={gameConfig.gamePath}
                    className="w-full h-full border-0"
                    title={gameConfig.title}
                    onLoad={handleGameLoad}
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
              <div className="p-6">
                <p className="text-sm text-gray-500 italic text-center opacity-60">
                  Yakında...
                </p>
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-white border-4 border-gray-300 shadow-lg">
              <div className="border-b-2 border-gray-300 p-4 bg-gray-100">
                <h3 className="font-bold text-lg">GAME INFO</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {gameConfig.description}
                </p>
                <div className="text-xs text-gray-600">
                  <p>STATUS: <span className="text-green-600 font-semibold">READY</span></p>
                  <p>ENGINE: PYGAME + WASM</p>
                  <p>VERSION: {gameConfig.version}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            {!isGameLoaded && (
              <div className="bg-white border-4 border-gray-300 shadow-lg">
                <div className="border-b-2 border-gray-300 p-4 bg-gray-100">
                  <h3 className="font-bold text-lg">CONTROLS</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {gameConfig.controls.map((control, index) => (
                      <div key={index} className="text-sm">
                        <code className="text-gray-800">{control}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* System Requirements */}
            <div className="bg-white border-4 border-gray-300 shadow-lg">
              <div className="border-b-2 border-gray-300 p-4 bg-gray-100">
                <h3 className="font-bold text-lg">SYSTEM</h3>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-600 space-y-1">
                  <p>BROWSER: Modern WebAssembly support</p>
                  <p>MEMORY: 512MB+ recommended</p>
                  <p>AUDIO: Web Audio API</p>
                  <p>INPUT: Keyboard required</p>
                </div>
              </div>
            </div>
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
  );
}

export default App; 
