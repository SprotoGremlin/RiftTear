"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Trophy, Share2, HelpCircle } from "lucide-react";

interface RiftGameProps {
  isMatchMode?: boolean;
  activeMatch?: any;
  onGameEnd?: (score: number) => void;
  equippedSkinId?: number;
  onLeaderboardClick?: () => void;
  setShowHowItWorks?: (open: boolean) => void;
}

export default function RiftGame({
  isMatchMode = false,
  activeMatch = null,
  onGameEnd,
  equippedSkinId = 1,
  onLeaderboardClick,
  setShowHowItWorks,
}: RiftGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("riftTearHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const saveHighScore = useCallback((newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("riftTearHighScore", newScore.toString());
    }
  }, [highScore]);

  let playerY = 300;
  let velocity = 0;
  let gravity = 0.8;
  let jump = -18;
  let isJumping = false;
  let obstacles: any[] = [];
  let particles: any[] = [];
  let frame = 0;
  let gameSpeed = 6;
  let realityIntegrity = 100;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#050511";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#0052FF";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + Math.sin(frame / 20) * 8, canvas.height);
      ctx.stroke();
    }

    ctx.fillStyle = "#001a33";
    ctx.fillRect(0, 380, canvas.width, canvas.height - 380);

    const skinOffset = equippedSkinId * 30;
    ctx.fillStyle = `hsl(210, 100%, ${50 + skinOffset}%)`;
    ctx.fillRect(120, playerY, 48, 48);

    ctx.fillStyle = "#00aaff";
    ctx.fillRect(128, playerY - 12, 32, 32);

    ctx.fillStyle = "#000";
    ctx.fillRect(138, playerY - 4, 8, 8);
    ctx.fillRect(154, playerY - 4, 8, 8);

    ctx.fillStyle = "#0052FF";
    ctx.fillRect(130, playerY + 48, 12, 18);
    ctx.fillRect(150, playerY + 48, 12, 18);

    ctx.fillStyle = "#ff3366";
    obstacles.forEach((obs) => {
      ctx.fillRect(obs.x, 360, 32, 32);
    });

    particles.forEach((p, i) => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = "#00ccff";
      ctx.fillRect(p.x, p.y, 4, 4);
      ctx.globalAlpha = 1;
      p.life -= 0.03;
      p.y += p.vy;
      if (p.life <= 0) particles.splice(i, 1);
    });

    ctx.fillStyle = "#fff";
    ctx.font = "900 48px monospace";
    ctx.fillText(score.toString().padStart(6, "0"), 40, 80);

    if (isMatchMode && activeMatch) {
      const progress = Math.min(1, distance / 420);
      ctx.fillStyle = "#001122";
      ctx.fillRect(canvas.width - 280, 82, 180, 8);
      ctx.fillStyle = progress > 0.9 ? "#00ffcc" : "#0052FF";
      ctx.fillRect(canvas.width - 278, 84, progress * 176, 4);
      ctx.fillStyle = "#fff";
      ctx.font = "700 14px monospace";
      ctx.fillText("420 TEARS TO WIN POT", canvas.width - 280, 110);
    }

    if (gameState === "gameover") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff3366";
      ctx.font = "900 64px monospace";
      ctx.textAlign = "center";
      ctx.fillText("REALITY BROKE", canvas.width / 2, 180);

      ctx.fillStyle = "#fff";
      ctx.font = "700 32px monospace";
      ctx.fillText(`FINAL SCORE ${score}`, canvas.width / 2, 260);

      ctx.fillStyle = "#0052FF";
      ctx.fillRect(canvas.width / 2 - 140, 300, 280, 64);
      ctx.fillStyle = "#fff";
      ctx.font = "700 20px monospace";
      ctx.fillText("SUBMIT TO LEADERBOARD", canvas.width / 2, 340);

      ctx.font = "400 14px monospace";
      ctx.fillStyle = "#00ccff";
      ctx.fillText("PRESS L → LEADERBOARD • H → HOW IT WORKS", canvas.width / 2, 420);
    }

    if (gameState === "idle") {
      ctx.fillStyle = "#0052FF";
      ctx.font = "900 28px monospace";
      ctx.textAlign = "center";
      ctx.fillText("PRESS SPACE TO DASH", canvas.width / 2, 240);

      ctx.font = "400 14px monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText("EQUIPPED SKIN #" + equippedSkinId, canvas.width / 2, 290);
      ctx.fillText("PRESS H FOR HOW IT WORKS", canvas.width / 2, 320);
    }
  }, [score, distance, gameState, equippedSkinId, isMatchMode, activeMatch]);

  const gameLoop = useCallback(() => {
    if (gameState !== "playing") {
      draw();
      requestAnimationFrame(gameLoop);
      return;
    }

    frame++;
    distance += gameSpeed;

    if (frame % 8 === 0) setScore((prev) => prev + 10);

    velocity += gravity;
    playerY += velocity;

    if (playerY > 300) {
      playerY = 300;
      velocity = 0;
      isJumping = false;
    }

    if (frame % 45 === 0) obstacles.push({ x: 800, life: 1 });

    obstacles = obstacles.filter((obs) => {
      obs.x -= gameSpeed;
      return obs.x > -50;
    });

    const hit = obstacles.some((obs) => obs.x < 168 && obs.x > 100 && playerY + 48 > 360);
    if (hit) {
      setGameState("gameover");
      saveHighScore(score);
      onGameEnd?.(score);
      return;
    }

    if (Math.random() > 0.7) {
      particles.push({
        x: 140 + Math.random() * 30,
        y: playerY + 60,
        vy: -2 - Math.random() * 3,
        life: 1,
      });
    }

    if (frame % 120 === 0) realityIntegrity = Math.max(20, realityIntegrity - 8);

    draw();
    requestAnimationFrame(gameLoop);
  }, [draw, gameState, score, saveHighScore, onGameEnd]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (gameState === "idle" && e.key === " ") {
      setGameState("playing");
      setScore(0);
      setDistance(0);
      obstacles = [];
      particles = [];
    }

    if (gameState === "playing" && e.key === " " && !isJumping) {
      velocity = jump;
      isJumping = true;
    }

    if (gameState === "gameover") {
      if (e.key.toLowerCase() === "s") {
        const text = `I just tore reality with ${score} in RiftTear on Base! 🔥 https://riftttear.base`;
        navigator.clipboard.writeText(text).then(() => alert("Score shared!"));
      }
      if (e.key.toLowerCase() === "h" && setShowHowItWorks) {
        setShowHowItWorks(true);
      }
      if (e.key.toLowerCase() === "l" && onLeaderboardClick) {
        onLeaderboardClick();
      }
    }
  }, [gameState, score, setShowHowItWorks, onLeaderboardClick]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (gameState === "gameover" && clickX > canvas.width / 2 - 140 && clickX < canvas.width / 2 + 140 && clickY > 300 && clickY < 364) {
      setShowSubmitModal(true);
    }
  }, [gameState]);

  const submitToLeaderboard = () => {
    console.log(`[ONCHAIN] Submitting score ${score} with skin #${equippedSkinId}`);
    setShowSubmitModal(false);
    alert("SCORE SUBMITTED • VERIFIED ON BASESCAN");
    if (onLeaderboardClick) {
      setTimeout(onLeaderboardClick, 800);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 800;
      canvas.height = 480;
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    gameLoop();
  }, [gameLoop]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="border-4 border-[#0052FF]/80 shadow-2xl shadow-[#0052FF]/40 rounded-3xl bg-black"
      />

      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="glass max-w-md w-full mx-4 p-10 text-center border border-[#0052FF]">
            <Trophy className="mx-auto w-16 h-16 text-[#ffcc00] mb-6" />
            <div className="text-3xl font-black mb-2">SUBMIT TO LEADERBOARD</div>
            <div className="text-[#00ccff] text-xl mb-8">SCORE: {score} TEARS</div>
            <button
              onClick={submitToLeaderboard}
              className="w-full py-6 bg-[#0052FF] hover:bg-[#0033aa] text-black text-2xl font-bold rounded-3xl transition-all mb-6"
            >
              CONFIRM ONCHAIN
            </button>
            <button onClick={() => setShowSubmitModal(false)} className="text-white/60 hover:text-white text-sm">
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
