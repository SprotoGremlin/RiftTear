"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface RiftGameProps {
  isMatchMode?: boolean;
  activeMatch?: {
    id: string;
    bet: string;
  } | null;
  onGameEnd?: (score: number) => void;
  equippedSkinId?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'rift' | 'tear' | 'block';
  glitchOffset: number;
}

const RiftGame: React.FC<RiftGameProps> = ({ 
  isMatchMode = false, 
  activeMatch = null, 
  onGameEnd,
  equippedSkinId = 1 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [isGlitching, setIsGlitching] = useState(false);

  const gameRef = useRef({
    player: { x: 120, y: 0, vy: 0, width: 42, height: 48, onGround: true },
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    distance: 0,
    speed: 6.2,
    frame: 0,
    lastSpawn: 0,
    groundOffset: 0,
    screenTears: [] as { y: number; life: number }[],
    chromatic: 0,
  });

  const triggerMassiveGlitch = useCallback(() => {
    setIsGlitching(true);
    const game = gameRef.current;
    game.chromatic = 18;
    game.screenTears.push({ y: Math.random() * 400, life: 12 });
    game.screenTears.push({ y: Math.random() * 400, life: 9 });
    
    for (let i = 0; i < 28; i++) {
      game.particles.push({
        x: 180 + Math.random() * 120,
        y: 280 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 9,
        vy: (Math.random() - 0.5) * 7 - 2,
        life: 22 + Math.random() * 18,
        color: ['#0052FF', '#3c8aff', '#0000FF', '#ffffff'][Math.floor(Math.random() * 4)],
        size: 2.5 + Math.random() * 3.5,
      });
    }
    setTimeout(() => setIsGlitching(false), 280);
  }, []);

  const jump = useCallback(() => {
    const game = gameRef.current;
    if (game.player.onGround && gameState === 'playing') {
      game.player.vy = -13.5;
      game.player.onGround = false;
      
      for (let i = 0; i < 14; i++) {
        game.particles.push({
          x: game.player.x + 18,
          y: game.player.y + game.player.height - 4,
          vx: (Math.random() - 0.5) * 4.5,
          vy: Math.random() * -3.5 - 1.5,
          life: 14 + Math.random() * 10,
          color: '#3c8aff',
          size: 1.8 + Math.random() * 1.6,
        });
      }
      triggerMassiveGlitch();
    }
  }, [gameState, triggerMassiveGlitch]);

  const resetGame = useCallback(() => {
    const game = gameRef.current;
    game.player = { x: 120, y: 320, vy: 0, width: 42, height: 48, onGround: true };
    game.obstacles = [];
    game.particles = [];
    game.distance = 0;
    game.speed = 6.2;
    game.frame = 0;
    game.lastSpawn = 0;
    game.groundOffset = 0;
    game.screenTears = [];
    game.chromatic = 0;
    setScore(0);
    setGameState('playing');
  }, []);

  const endGame = useCallback(() => {
    const finalScore = Math.floor(gameRef.current.distance);
    setScore(finalScore);
    
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }

    if (isMatchMode && onGameEnd) {
      onGameEnd(finalScore);
    }

    triggerMassiveGlitch();
    setGameState('gameover');
  }, [highScore, isMatchMode, onGameEnd, triggerMassiveGlitch]);

  const shareScore = useCallback(() => {
    const text = `I just scored ${score} in RiftTear on Base! 🔥 Join the tear: https://riftttear.base`;
    navigator.clipboard.writeText(text);
    alert("Score copied to clipboard! Share it on X or Discord.");
  }, [score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (gameState === 'playing') jump();
        else if (gameState === 'idle' || gameState === 'gameover') resetGame();
      }
      if (e.key.toLowerCase() === 'r' && gameState === 'gameover') {
        resetGame();
      }
      if (e.key.toLowerCase() === 'g') {
        triggerMassiveGlitch();
      }
      if (e.key.toLowerCase() === 's' && gameState === 'gameover' && isMatchMode) {
        shareScore();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (gameState === 'playing') jump();
      else if (gameState === 'idle' || gameState === 'gameover') resetGame();
    };

    window.addEventListener('keydown', handleKeyDown);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (canvas) canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, [gameState, jump, resetGame, triggerMassiveGlitch, shareScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = 920;
    canvas.height = 520;

    let raf: number;
    const game = gameRef.current;

    const drawPlayer = (x: number, y: number, glitch: number, skinId: number) => {
      ctx.save();

      // Skin-based visual customization (NFT utility)
      let bodyColor = '#0052FF';
      let eyeColor = '#ffffff';
      let extraGlitch = 0;

      if (skinId === 2) { // Rare
        bodyColor = '#3c8aff';
        extraGlitch = 1;
      } else if (skinId === 3) { // Epic
        bodyColor = '#001a66';
        extraGlitch = 2;
      } else if (skinId === 4) { // Legendary
        bodyColor = '#ffcc00';
        eyeColor = '#000000';
        extraGlitch = 4;
      }

      const offsets = [
        { ox: -glitch * 0.6, oy: 0, color: '#ff0033' },
        { ox: glitch * 0.4, oy: 0, color: '#00ffcc' },
        { ox: 0, oy: 0, color: bodyColor },
      ];

      offsets.forEach((layer, idx) => {
        ctx.fillStyle = layer.color;
        ctx.globalAlpha = idx === 2 ? 1 : 0.65;
        
        const px = x + layer.ox;
        const py = y + layer.oy;

        ctx.fillRect(px + 6, py + 12, 30, 32);
        ctx.fillRect(px + 10, py + 2, 24, 18);

        ctx.fillStyle = eyeColor;
        ctx.fillRect(px + 15, py + 7, 5, 5);
        ctx.fillRect(px + 24, py + 7, 5, 5);

        if (glitch + extraGlitch > 3) {
          ctx.fillStyle = '#0000FF';
          ctx.fillRect(px + 14, py + 6, 8, 2);
          ctx.fillRect(px + 23, py + 6, 8, 2);
        }
      });

      // Legendary extra visual (crown-like glitch lines)
      if (skinId === 4) {
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 12, y - 2);
        ctx.lineTo(x + 18, y + 4);
        ctx.lineTo(x + 24, y - 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    const spawnObstacle = () => {
      const types: Obstacle['type'][] = ['rift', 'tear', 'block'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      const obs: Obstacle = {
        x: canvas.width + 40,
        y: type === 'block' ? 260 + Math.random() * 80 : 340,
        width: type === 'rift' ? 18 : type === 'tear' ? 26 : 32,
        height: type === 'rift' ? 110 : type === 'tear' ? 38 : 42,
        type,
        glitchOffset: Math.random() * 8 - 4,
      };
      game.obstacles.push(obs);
    };

    const update = () => {
      if (gameState !== 'playing') return;

      game.frame++;
      game.distance += game.speed * 0.12;
      game.speed = Math.min(9.8, 6.2 + game.distance * 0.0032);

      const p = game.player;
      p.vy += 0.72;
      p.y += p.vy;
      
      const groundY = 368;
      if (p.y >= groundY) {
        p.y = groundY;
        p.vy = 0;
        p.onGround = true;
      } else {
        p.onGround = false;
      }

      game.groundOffset = (game.groundOffset + game.speed) % 48;

      if (game.frame - game.lastSpawn > Math.max(38, 72 - game.speed * 3.8)) {
        spawnObstacle();
        game.lastSpawn = game.frame;
        if (Math.random() < 0.42) {
          setTimeout(spawnObstacle, 180);
        }
      }

      game.obstacles = game.obstacles.filter((obs) => {
        obs.x -= game.speed;
        
        const px = p.x;
        const py = p.y;
        const hit = 
          px + p.width > obs.x && 
          px < obs.x + obs.width &&
          py + p.height > obs.y && 
          py < obs.y + obs.height;

        if (hit) {
          endGame();
          return false;
        }
        return obs.x > -80;
      });

      game.particles = game.particles.filter((part) => {
        part.x += part.vx;
        part.y += part.vy;
        part.vy += 0.18;
        part.life -= 1;
        part.vx *= 0.982;
        return part.life > 0;
      });

      game.screenTears = game.screenTears.filter((tear) => {
        tear.life -= 1;
        return tear.life > 0;
      });

      if (game.chromatic > 0) game.chromatic *= 0.86;

      const newScore = Math.floor(game.distance);
      if (newScore !== score) setScore(newScore);

      if (Math.random() < 0.018) {
        game.chromatic = Math.max(game.chromatic, 4);
      }
    };

    const draw = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#001a33';
      ctx.lineWidth = 1;
      for (let x = -48; x < canvas.width; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x + (game.groundOffset % 48), 0);
        ctx.lineTo(x + (game.groundOffset % 48), canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = '#002255';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const y = 80 + i * 92;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y + Math.sin(game.frame / 18 + i) * 6);
        ctx.stroke();
      }

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 368, canvas.width, 160);

      ctx.strokeStyle = '#0052FF';
      ctx.lineWidth = 1.5;
      for (let x = -48; x < canvas.width + 48; x += 48) {
        const gx = x + game.groundOffset;
        ctx.beginPath();
        ctx.moveTo(gx, 368);
        ctx.lineTo(gx, 520);
        ctx.stroke();
        
        ctx.strokeStyle = '#3c8aff';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(gx - 1, 368);
        ctx.lineTo(gx - 1, 520);
        ctx.stroke();
        ctx.strokeStyle = '#0052FF';
        ctx.lineWidth = 1.5;
      }

      game.obstacles.forEach((obs) => {
        const glitch = Math.sin(game.frame / 3 + obs.glitchOffset) * 1.5 + game.chromatic * 0.3;

        if (obs.type === 'rift') {
          ctx.strokeStyle = '#0052FF';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(obs.x + glitch, obs.y);
          ctx.lineTo(obs.x + 3 + glitch * 0.6, obs.y + obs.height);
          ctx.stroke();

          ctx.strokeStyle = '#3c8aff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(obs.x - 2 + glitch, obs.y + 12);
          ctx.lineTo(obs.x + 1 + glitch * 0.7, obs.y + obs.height - 8);
          ctx.stroke();

          ctx.fillStyle = 'rgba(0, 82, 255, 0.25)';
          ctx.fillRect(obs.x - 8, obs.y, 22, obs.height);
        } 
        else if (obs.type === 'tear') {
          ctx.fillStyle = '#0000FF';
          ctx.fillRect(obs.x + glitch, obs.y, obs.width, obs.height);
          
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(obs.x + glitch + 4, obs.y + 6, obs.width - 8, 4);
          
          ctx.strokeStyle = '#3c8aff';
          ctx.lineWidth = 2;
          ctx.strokeRect(obs.x + glitch - 1, obs.y - 1, obs.width + 2, obs.height + 2);
        } 
        else {
          ctx.fillStyle = '#001133';
          ctx.fillRect(obs.x + glitch * 0.5, obs.y, obs.width, obs.height);
          
          ctx.fillStyle = '#0052FF';
          ctx.fillRect(obs.x + glitch * 0.8, obs.y + 4, obs.width - 6, 8);
          ctx.fillRect(obs.x + glitch, obs.y + 22, obs.width - 4, 6);
          
          ctx.strokeStyle = '#3c8aff';
          ctx.lineWidth = 2;
          ctx.strokeRect(obs.x + glitch, obs.y, obs.width, obs.height);
        }
      });

      const glitchAmount = game.chromatic * 0.7 + (isGlitching ? 6 : 0);
      drawPlayer(game.player.x, game.player.y, glitchAmount, equippedSkinId);

      game.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.2, p.life / 26);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      game.screenTears.forEach((tear) => {
        const alpha = tear.life / 14;
        ctx.globalAlpha = alpha * 0.7;
        ctx.beginPath();
        ctx.moveTo(0, tear.y);
        ctx.lineTo(canvas.width, tear.y + Math.sin(game.frame / 4) * 3);
        ctx.stroke();
        
        ctx.strokeStyle = '#0052FF';
        ctx.beginPath();
        ctx.moveTo(0, tear.y + 2);
        ctx.lineTo(canvas.width * 0.6, tear.y + 5);
        ctx.stroke();
        ctx.strokeStyle = '#ffffff';
      });
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 18px monospace';
      ctx.fillText(`SCORE ${Math.floor(game.distance).toString().padStart(5, '0')}`, 32, 42);
      
      ctx.fillStyle = '#0052FF';
      ctx.fillText(`SPEED ${(game.speed * 10).toFixed(0)}`, 32, 66);

      if (isMatchMode && activeMatch) {
        ctx.fillStyle = '#0052FF';
        ctx.font = '700 16px monospace';
        ctx.fillText(`MATCH POT: ${(parseFloat(activeMatch.bet) * 2).toFixed(2)} ETH`, canvas.width - 280, 42);
        
        ctx.fillStyle = '#ffcc00';
        ctx.fillText(`WIN THRESHOLD: 420+`, canvas.width - 280, 66);

        // Win threshold progress bar
        const progress = Math.min(1, game.distance / 420);
        ctx.fillStyle = '#001122';
        ctx.fillRect(canvas.width - 280, 82, 180, 8);
        ctx.fillStyle = progress > 0.9 ? '#00ffcc' : '#0052FF';
        ctx.fillRect(canvas.width - 278, 84, progress * 176, 4);
      }

      const integrity = Math.max(12, 100 - (game.speed - 6.2) * 18);
      ctx.fillStyle = '#001122';
      ctx.fillRect(canvas.width - 180, 28, 148, 12);
      ctx.fillStyle = integrity > 45 ? '#0052FF' : '#ff3366';
      ctx.fillRect(canvas.width - 178, 30, (integrity / 100) * 144, 8);

      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText('REALITY INTEGRITY', canvas.width - 178, 22);
    };

    const loop = () => {
      update();
      draw();

      if (gameState === 'playing') {
        raf = requestAnimationFrame(loop);
      } else if (gameState === 'gameover') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (isMatchMode) {
          ctx.fillStyle = '#0052FF';
          ctx.font = 'bold 52px monospace';
          ctx.fillText('REALITY TORN', 280, 210);
          
          ctx.fillStyle = '#ffffff';
          ctx.font = '700 22px monospace';
          ctx.fillText(`FINAL TEAR: ${score.toString().padStart(5, '0')}`, 310, 270);
          
          if (score >= 420) {
            ctx.fillStyle = '#00ffcc';
            ctx.fillText('POT CLAIMABLE', 330, 310);
          } else {
            ctx.fillStyle = '#ff3366';
            ctx.fillText('BETTER LUCK NEXT RIFT', 290, 310);
          }

          // Share button hint
          ctx.fillStyle = '#0052FF';
          ctx.font = '14px monospace';
          ctx.fillText('PRESS S TO SHARE YOUR TEAR', 280, 360);
        } else {
          ctx.fillStyle = '#ff3366';
          ctx.font = 'bold 64px monospace';
          ctx.fillText('REALITY', 260, 198);
          ctx.fillText('FRACTURED', 232, 268);

          ctx.fillStyle = '#ffffff';
          ctx.font = '700 22px monospace';
          ctx.fillText(`FINAL TEAR: ${score.toString().padStart(5, '0')}`, 310, 330);
        }

        ctx.fillStyle = '#0052FF';
        ctx.font = '16px monospace';
        ctx.fillText('PRESS SPACE OR TAP TO RESTART', 278, 390);
        ctx.fillText('PRESS R TO RESTART', 338, 415);
      } else {
        ctx.fillStyle = 'rgba(0, 82, 255, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0052FF';
        ctx.font = 'bold 42px monospace';
        ctx.fillText('PRESS SPACE TO TEAR REALITY', 178, 248);

        ctx.fillStyle = '#ffffff';
        ctx.font = '16px monospace';
        ctx.fillText('JUMP = SPACE / TAP  •  MASSIVE GLITCH = G  •  HOW TO PLAY = H', 178, 290);
      }
    };

    if (gameState === 'playing') {
      raf = requestAnimationFrame(loop);
    } else {
      draw();
    }

    return () => cancelAnimationFrame(raf);
  }, [gameState, score, jump, resetGame, endGame, triggerMassiveGlitch, highScore, isMatchMode, activeMatch, equippedSkinId, shareScore]);

  // Keyboard handlers for share and how to play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's' && gameState === 'gameover' && isMatchMode) {
        shareScore();
      }
      if (e.key.toLowerCase() === 'h' && gameState === 'idle') {
        // Trigger parent modal if available (simplified for component)
        alert("HOW TO PLAY: Press SPACE to jump • G for massive glitch • Avoid obstacles • Highest score wins the pot!");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isMatchMode, shareScore]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-xl border border-[#0052FF]/40 shadow-[0_0_80px_-10px_#0052FF]"
          style={{ 
            imageRendering: 'pixelated',
            filter: isGlitching ? 'contrast(1.15) saturate(1.4)' : 'none'
          }}
        />

        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
          <div className="px-4 py-1.5 bg-black/70 border border-[#0052FF]/60 text-xs tracking-[2px] font-mono text-[#0052FF]">
            HIGH TEAR: {highScore.toString().padStart(5, '0')}
          </div>
          
          {gameState === 'playing' && (
            <button
              onClick={triggerMassiveGlitch}
              className="px-5 py-2 text-xs tracking-[2px] border border-[#0052FF] hover:bg-[#0052FF] hover:text-black transition-all font-mono"
            >
              TEAR REALITY [G]
            </button>
          )}
        </div>

        {gameState === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="text-center">
              <div className="text-[11px] tracking-[4px] text-[#0052FF] mb-2">BASE • ONCHAINKIT • WAGMI</div>
              <div className="text-7xl font-black tracking-[-3px] text-white">RIFTTEAR</div>
              <div className="mt-4 text-xs text-[#0052FF] tracking-[1px]">PRESS H FOR HOW TO PLAY</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-3 text-xs tracking-[1.5px] text-white/50 font-mono">
        SPACE = JUMP &nbsp;•&nbsp; G = GLITCH &nbsp;•&nbsp; R = RESTART &nbsp;•&nbsp; S = SHARE (GAME OVER) &nbsp;•&nbsp; H = HOW TO PLAY
        {isMatchMode && <span className="text-[#0052FF]">• MATCH MODE ACTIVE</span>}
      </div>
    </div>
  );
};

export default RiftGame;
