import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  {
    question: "Name a socio-political challenge of green hydrogen production",
    answers: [
      { text: "Neocolonialism & Exploitation", points: 40 },
      { text: "Ineffective Stakeholder Management", points: 35 },
      { text: "Violation of Indigenous Land & Culture", points: 25 },
    ],
  },
  {
    question: "Name a techno-economic challenge of green hydrogen production",
    answers: [
      { text: "Water Scarcity & Desalination Dependency", points: 40 },
      { text: "Severe Energy Losses (40-50%)", points: 35 },
      { text: "Land Conflict & Disputed Territories", points: 25 },
    ],
  },
  {
    question: "Name one of the three tenets of Energy Justice",
    answers: [
      { text: "Distributional Justice", points: 35 },
      { text: "Procedural Justice", points: 35 },
      { text: "Recognition Justice", points: 30 },
    ],
  },
  {
    question: "Name an ethical theory violated by green hydrogen challenges",
    answers: [
      { text: "Rawl's Theory of Justice", points: 25 },
      { text: "Kantian Ethics", points: 25 },
      { text: "Utilitarianism", points: 20 },
      { text: "Ethics of Care", points: 15 },
      { text: "Buddhist Ethics", points: 15 },
    ],
  },
  {
    question: "Name a country or region used as a case study",
    answers: [
      { text: "Namibia", points: 20 },
      { text: "Morocco / Western Sahara", points: 20 },
      { text: "Colombia (La Guajira)", points: 20 },
      { text: "UK (Whitby Village)", points: 15 },
      { text: "Australia & Canada", points: 15 },
      { text: "Sarawak", points: 10 },
    ],
  },
  {
    question: "Name a Kantian principle discussed in the presentation",
    answers: [
      { text: "Principle of Humanity", points: 40 },
      { text: "Principle of Universality", points: 35 },
      { text: "Kingdom of Ends", points: 25 },
    ],
  },
  {
    question: "Name a recommendation for developing economies like Sarawak",
    answers: [
      { text: "Cooperation, Not Obligation", points: 30 },
      { text: "Local Value Capture", points: 25 },
      { text: "Strengthen Governance & Frameworks", points: 25 },
      { text: "Long-term Development Strategy", points: 20 },
    ],
  },
  {
    question: "Name a trait of Developing Economies discussed",
    answers: [
      { text: "Structural Economic Dependence", points: 35 },
      { text: "Institutional & Governance Constraints", points: 35 },
      { text: "Socio-Cultural Complexity & Inequality", points: 30 },
    ],
  },
  {
    question: "Name a concept from Confucian Ethics discussed in the presentation",
    answers: [
      { text: "Social Harmony", points: 50 },
      { text: "Greed of Wealth Accumulation", points: 30 },
      { text: "Moral Responsibility to Community", points: 20 },
    ],
  },
  {
    question: "Name a principle from Rawl's Theory of Justice discussed",
    answers: [
      { text: "Veil of Ignorance", points: 40 },
      { text: "Difference Principle", points: 35 },
      { text: "First Principle (Basic Liberties)", points: 25 },
    ],
  },
  {
    question: "Name a tenet of Buddhist Ethics applied to green hydrogen",
    answers: [
      { text: "Eliminating Craving & Desire", points: 35 },
      { text: "Doctrine of No Self", points: 35 },
      { text: "Law of Karma", points: 30 },
    ],
  },
  {
    question: "Name an opportunity of green hydrogen production",
    answers: [
      { text: "Achieving Global Energy Equity", points: 40 },
      { text: "Economic Development & Industrialisation", points: 35 },
      { text: "Technology Transfer & Local Skills", points: 25 },
    ],
  },
  {
    question: "Name something green hydrogen requires for production",
    answers: [
      { text: "Renewable Power / Electricity", points: 40 },
      { text: "Fresh / Purified Water", points: 40 },
      { text: "Electrolysers", points: 20 },
    ],
  },
  {
    question: "Name a virtue or concept from Hindu Ethics discussed",
    answers: [
      { text: "Ahimsa (Non-violence)", points: 50 },
      { text: "Santosha (Contentment)", points: 30 },
      { text: "Moksha (Reducing bad Karma)", points: 20 },
    ],
  },
  {
    question: "Name a feature of the Whitby Village hydrogen case study",
    answers: [
      { text: "No proper community consultation", points: 30 },
      { text: "Four-fold injury increase risk", points: 30 },
      { text: "Project was cancelled", points: 25 },
      { text: "Limited cost transparency", points: 15 },
    ],
  },
  {
    question: "Name a type of justice from Aristotle's Theory discussed",
    answers: [
      { text: "Distributive Justice", points: 40 },
      { text: "Compensatory Justice", points: 35 },
      { text: "Retributive Justice", points: 25 },
    ],
  },
];

const TEAM_COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6C5CE7"];
const TEAM_EMOJIS = ["🔴", "🟢", "🟡", "🟣"];
const DEFAULT_TIME = 30;

const GLOBAL_STYLES = `
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
  @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  @keyframes glow{0%,100%{text-shadow:0 0 20px rgba(255,215,0,0.4)}50%{text-shadow:0 0 40px rgba(255,215,0,0.8),0 0 80px rgba(255,215,0,0.4)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes starTwinkle{0%,100%{opacity:0.3}50%{opacity:1}}
  @keyframes boxPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,0.4)}50%{box-shadow:0 0 20px 4px rgba(255,215,0,0.2)}}
  @keyframes timerPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
  @keyframes floatUp{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-120%) scale(1.3)}}
  @keyframes confettiDrop{0%{transform:translateY(-100vh) rotate(0deg)}100%{transform:translateY(100vh) rotate(720deg)}}
`;

/* ══════════════ MUSIC ENGINE ══════════════ */
function useMusicEngine() {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const intervalRef = useRef(null);
  const playingRef = useRef(false);

  const stop = () => {
    playingRef.current = false;
    clearInterval(intervalRef.current);
    nodesRef.current.forEach((n) => { try { n.stop(); } catch (e) {} });
    nodesRef.current = [];
    if (ctxRef.current) { try { ctxRef.current.close(); } catch (e) {} ctxRef.current = null; }
  };

  const start = () => {
    stop();
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;
      playingRef.current = true;

      // Master chain: gain → warm lowpass → destination
      const master = ctx.createGain();
      master.gain.value = 0.14;
      const warmth = ctx.createBiquadFilter();
      warmth.type = "lowpass";
      warmth.frequency.value = 4000;
      warmth.Q.value = 0.4;
      master.connect(warmth);
      warmth.connect(ctx.destination);

      // Lo-fi: 80 BPM, 4-bar loop cycling through jazz chords
      const BPM = 80;
      const beat = 60 / BPM;       // 0.75s
      const bar = beat * 4;         // 3s
      const LOOP = bar * 4;         // 12s — full 4-bar cycle

      // Cmaj7, Am7, Fmaj7, G7 (classic lo-fi progression)
      const chords = [
        [130.8, 164.8, 196.0, 246.9], // Cmaj7
        [110.0, 130.8, 164.8, 196.0], // Am7
        [87.3,  110.0, 130.8, 164.8], // Fmaj7
        [98.0,  123.5, 146.8, 174.6], // G7
      ];
      const bassRoots = [65.4, 55.0, 43.65, 49.0]; // C2, A1, F1, G1

      const playLoop = () => {
        if (!playingRef.current) return;
        const now = ctx.currentTime;

        chords.forEach((chord, barIdx) => {
          const t = now + barIdx * bar;

          // Soft kick on beats 1 & 3
          [0, beat * 2].forEach(o => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.connect(g); g.connect(master);
            osc.frequency.setValueAtTime(90, t + o);
            osc.frequency.exponentialRampToValueAtTime(35, t + o + 0.2);
            g.gain.setValueAtTime(0.45, t + o);
            g.gain.exponentialRampToValueAtTime(0.001, t + o + 0.22);
            osc.start(t + o); osc.stop(t + o + 0.22);
            nodesRef.current.push(osc);
          });

          // Soft snare on beats 2 & 4
          [beat, beat * 3].forEach(o => {
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1);
            const src = ctx.createBufferSource();
            src.buffer = buf;
            const g = ctx.createGain();
            const bp = ctx.createBiquadFilter();
            bp.type = "bandpass"; bp.frequency.value = 900; bp.Q.value = 1.2;
            src.connect(bp); bp.connect(g); g.connect(master);
            g.gain.setValueAtTime(0.09, t + o);
            g.gain.exponentialRampToValueAtTime(0.001, t + o + 0.12);
            src.start(t + o);
            nodesRef.current.push(src);
          });

          // Mellow hi-hats (every half-beat, quiet)
          for (let i = 0; i < 8; i++) {
            const o = i * (beat / 2);
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1);
            const src = ctx.createBufferSource();
            src.buffer = buf;
            const g = ctx.createGain();
            const hp = ctx.createBiquadFilter();
            hp.type = "highpass"; hp.frequency.value = 9000;
            src.connect(hp); hp.connect(g); g.connect(master);
            g.gain.setValueAtTime(i % 2 === 0 ? 0.05 : 0.025, t + o);
            g.gain.exponentialRampToValueAtTime(0.001, t + o + 0.03);
            src.start(t + o);
            nodesRef.current.push(src);
          }

          // Warm chord stab — triangle waves, slow fade
          chord.forEach(freq => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.value = freq;
            osc.detune.value = (Math.random() - 0.5) * 6; // slight warmth/detuning
            osc.connect(g); g.connect(master);
            g.gain.setValueAtTime(0, t + 0.01);
            g.gain.linearRampToValueAtTime(0.07, t + 0.08);
            g.gain.linearRampToValueAtTime(0.04, t + bar - 0.15);
            g.gain.linearRampToValueAtTime(0, t + bar);
            osc.start(t); osc.stop(t + bar);
            nodesRef.current.push(osc);
          });

          // Warm bass note
          const bass = ctx.createOscillator();
          const bg = ctx.createGain();
          bass.type = "sine";
          bass.frequency.value = bassRoots[barIdx];
          bass.connect(bg); bg.connect(master);
          bg.gain.setValueAtTime(0, t);
          bg.gain.linearRampToValueAtTime(0.28, t + 0.06);
          bg.gain.linearRampToValueAtTime(0.18, t + beat);
          bg.gain.linearRampToValueAtTime(0, t + bar - 0.08);
          bass.start(t); bass.stop(t + bar);
          nodesRef.current.push(bass);
        });
      };

      playLoop();
      intervalRef.current = setInterval(playLoop, LOOP * 1000);

    } catch (e) {
      console.log("Audio not available");
    }
  };

  useEffect(() => { return () => stop(); }, []);

  return { start, stop };
}

/* ── Floating score animation ── */
function FloatingScore({ points, color }) {
  return (
    <div style={{
      position: "fixed", top: "45%", left: "50%", transform: "translate(-50%, -50%)",
      fontSize: "clamp(40px, 10vw, 72px)", fontFamily: "'Bebas Neue', sans-serif",
      color, zIndex: 900, pointerEvents: "none",
      animation: "floatUp 0.9s ease-out forwards",
      textShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`,
    }}>+{points}</div>
  );
}

/* ── Timer ring ── */
function Timer({ timeLeft, maxTime, running, onPause, onResume, onReset }) {
  const pct = maxTime > 0 ? timeLeft / maxTime : 0;
  const urgent = timeLeft <= 5 && timeLeft > 0;
  const dead = timeLeft === 0;
  const timerColor = dead ? "#FF3333" : urgent ? "#FF6B6B" : pct > 0.5 ? "#4ECDC4" : "#FFD93D";
  const circumference = 2 * Math.PI * 42;
  const dashOffset = circumference * (1 - pct);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div style={{ position: "relative", width: "96px", height: "96px" }}>
        <svg width="96" height="96" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle cx="50" cy="50" r="42" fill="none" stroke={timerColor} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            style={{
              transition: running ? "stroke-dashoffset 1s linear" : "stroke-dashoffset 0.3s ease",
              filter: urgent && running ? "drop-shadow(0 0 8px rgba(255,100,100,0.6))" : "none",
            }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", flexDirection: "column",
        }}>
          <span style={{
            fontSize: dead ? "26px" : "30px", fontFamily: "'Bebas Neue', sans-serif",
            color: timerColor, lineHeight: 1,
            animation: urgent && running ? "timerPulse 0.5s ease-in-out infinite" : "none",
          }}>{dead ? "⏰" : timeLeft}</span>
          {!dead && (
            <span style={{
              fontSize: "8px", fontFamily: "'Oswald', sans-serif",
              color: "#5a9fd4", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>sec</span>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        {running && <TinyBtn label="⏸" color="#FFD93D" onClick={onPause} />}
        {!running && timeLeft > 0 && !dead && <TinyBtn label="▶" color="#4ECDC4" onClick={onResume} />}
        <TinyBtn label="↺" color="#5a9fd4" onClick={onReset} />
      </div>
    </div>
  );
}

function TinyBtn({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "3px 8px", fontSize: "12px", fontFamily: "'Oswald', sans-serif", fontWeight: 600,
      background: `${color}20`, color, border: `1px solid ${color}50`, borderRadius: "6px",
      cursor: "pointer", lineHeight: 1,
    }}>{label}</button>
  );
}

/* ── Times up overlay ── */
function TimesUpOverlay({ show, onClose }) {
  useEffect(() => {
    if (show) { const t = setTimeout(onClose, 2000); return () => clearTimeout(t); }
  }, [show, onClose]);
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 998, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      animation: "fadeIn 0.15s ease-out",
    }}>
      <div style={{ fontSize: "min(16vw, 120px)", animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>⏰</div>
      <div style={{
        fontSize: "min(10vw, 64px)", fontFamily: "'Righteous', sans-serif", color: "#FF6B6B",
        animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s both",
        textShadow: "0 0 30px rgba(255,100,100,0.5)",
      }}>TIME'S UP!</div>
    </div>
  );
}

/* ── Answer Card ── */
function AnswerCard({ answer, index, revealed, onClick }) {
  return (
    <div onClick={onClick} style={{ position: "relative", height: "58px", cursor: revealed ? "default" : "pointer", perspective: "600px" }}>
      <div style={{
        position: "absolute", inset: 0, transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transformStyle: "preserve-3d", transform: revealed ? "rotateX(180deg)" : "rotateX(0deg)",
      }}>
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          background: "linear-gradient(135deg, #1a3a5c 0%, #0d2137 100%)", border: "2px solid #2a5a8c",
          borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(26px, 4.5vw, 44px)", fontFamily: "'Bebas Neue', sans-serif", color: "#5a9fd4",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
        }}>{index + 1}</div>
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateX(180deg)",
          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", border: "2px solid #e6a800",
          borderRadius: "12px", display: "flex", alignItems: "center", padding: "0 16px",
          boxShadow: "0 4px 20px rgba(255,215,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)",
        }}>
          <span style={{
            flex: 1, fontSize: "clamp(13px, 2.2vw, 20px)", fontFamily: "'Oswald', sans-serif",
            fontWeight: 600, color: "#1a1a2e", textTransform: "uppercase",
          }}>{answer.text}</span>
          <span style={{
            fontSize: "clamp(18px, 2.8vw, 30px)", fontFamily: "'Bebas Neue', sans-serif", color: "#1a1a2e",
            background: "rgba(255,255,255,0.3)", borderRadius: "8px", padding: "2px 10px",
            minWidth: "44px", textAlign: "center",
          }}>{answer.points}</span>
        </div>
      </div>
    </div>
  );
}

function HostBtn({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 14px", fontSize: "clamp(10px, 1.3vw, 13px)", fontFamily: "'Oswald', sans-serif",
      fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}50`,
      borderRadius: "8px", cursor: "pointer", letterSpacing: "0.05em",
    }}>{label}</button>
  );
}

/* ══════════════════════════ MAIN ══════════════════════════ */

export default function FamilyFeud() {
  const [screen, setScreen] = useState("title");
  const [teamNames, setTeamNames] = useState(["Row 1", "Row 2", "Row 3", "Row 4"]);
  const [timerDuration, setTimerDuration] = useState(DEFAULT_TIME);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [currentQ, setCurrentQ] = useState(0);
  const [revealed, setRevealed] = useState([]);
  const [activeTeam, setActiveTeam] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showTimesUp, setShowTimesUp] = useState(false);
  const [floatingScore, setFloatingScore] = useState(null);
  const [musicOn, setMusicOn] = useState(true);
  const intervalRef = useRef(null);
  const floatRef = useRef(null);
  const music = useMusicEngine();

  const question = QUESTIONS[currentQ];

  // Timer tick
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setTimerRunning(false);
            setShowTimesUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerRunning, timeLeft]);

  // Beep last 5s
  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0 && timerRunning) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = timeLeft <= 2 ? 880 : 660;
        gain.gain.value = 0.06;
        osc.start(); osc.stop(ctx.currentTime + 0.08);
      } catch (e) {}
    }
  }, [timeLeft, timerRunning]);

  const showFloat = (pts, teamIdx) => {
    clearTimeout(floatRef.current);
    setFloatingScore({ pts, color: TEAM_COLORS[teamIdx], id: Date.now() });
    floatRef.current = setTimeout(() => setFloatingScore(null), 900);
  };

  const revealAnswer = (idx) => {
    if (revealed.includes(idx)) return;
    setRevealed((p) => [...p, idx]);
    const pts = question.answers[idx].points;
    setScores((prev) => { const n = [...prev]; n[activeTeam] += pts; return n; });
    showFloat(pts, activeTeam);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= QUESTIONS.length) {
      music.stop();
      setScreen("results");
    } else {
      setCurrentQ((p) => p + 1);
      setRevealed([]);
      setTimerRunning(false); setShowTimesUp(false);
      setActiveTeam((p) => (p + 1) % 4);
      setTimeout(() => { setTimeLeft(timerDuration); setTimerRunning(true); }, 600);
    }
  };

  const revealAll = () => {
    setTimerRunning(false);
    question.answers.forEach((_, i) => {
      if (!revealed.includes(i)) setTimeout(() => revealAnswer(i), i * 300);
    });
  };

  const toggleMusic = () => {
    if (musicOn) { music.stop(); setMusicOn(false); }
    else { music.start(); setMusicOn(true); }
  };

  const resetGame = () => {
    music.stop();
    setScreen("title"); setScores([0, 0, 0, 0]); setCurrentQ(0);
    setRevealed([]); setActiveTeam(0);
    setTimerRunning(false); setShowTimesUp(false); setTimeLeft(timerDuration);
    setMusicOn(true);
  };

  const startGame = () => {
    setTimeLeft(timerDuration); setScreen("game");
    music.start();
    setTimeout(() => { setTimeLeft(timerDuration); setTimerRunning(true); }, 800);
  };

  /* ── TITLE ── */
  if (screen === "title") {
    return (
      <div style={{
        height: "100vh", background: "radial-gradient(ellipse at 50% 30%, #1a3a5c 0%, #0a1628 60%, #050d18 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'Bebas Neue', sans-serif", padding: "20px", overflow: "hidden", position: "relative",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600;700&family=Righteous&display=swap" rel="stylesheet" />
        <style>{GLOBAL_STYLES}</style>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: Math.random() * 4 + 1 + "px", height: Math.random() * 4 + 1 + "px",
            background: "#FFD700", borderRadius: "50%", top: Math.random() * 100 + "%", left: Math.random() * 100 + "%",
            animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`, animationDelay: Math.random() * 2 + "s",
          }} />
        ))}
        <div style={{ animation: "float 3s ease-in-out infinite", textAlign: "center", zIndex: 1 }}>
          <div style={{
            fontSize: "clamp(14px, 2vw, 20px)", color: "#5a9fd4", letterSpacing: "0.4em",
            textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Oswald', sans-serif",
          }}>Ethics & Social Responsibility</div>
          <h1 style={{
            fontSize: "clamp(48px, 10vw, 100px)", color: "#FFD700", margin: 0, lineHeight: 0.95,
            animation: "glow 3s ease-in-out infinite", fontFamily: "'Righteous', sans-serif",
          }}>FAMILY</h1>
          <h1 style={{
            fontSize: "clamp(48px, 10vw, 100px)", color: "#FFD700", margin: 0, lineHeight: 0.95,
            animation: "glow 3s ease-in-out infinite", animationDelay: "0.5s", fontFamily: "'Righteous', sans-serif",
          }}>FEUD</h1>
          <div style={{
            fontSize: "clamp(12px, 1.8vw, 18px)", color: "#8ab4d4", marginTop: "12px",
            letterSpacing: "0.2em", fontFamily: "'Oswald', sans-serif",
          }}>GREEN HYDROGEN EDITION ⚡</div>
        </div>
        <div style={{
          marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
          width: "100%", maxWidth: "500px", animation: "slideUp 0.8s ease-out 0.3s both", zIndex: 1,
        }}>
          {teamNames.map((name, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)",
              border: `2px solid ${TEAM_COLORS[i]}40`, borderRadius: "10px", padding: "8px 12px",
            }}>
              <span style={{ fontSize: "18px" }}>{TEAM_EMOJIS[i]}</span>
              <input value={name} onChange={(e) => { const n = [...teamNames]; n[i] = e.target.value; setTeamNames(n); }}
                style={{
                  background: "transparent", border: "none", outline: "none", color: TEAM_COLORS[i],
                  fontSize: "clamp(14px, 2vw, 18px)", fontFamily: "'Oswald', sans-serif", fontWeight: 600, width: "100%",
                }}
              />
            </div>
          ))}
        </div>
        <div style={{
          marginTop: "20px", display: "flex", alignItems: "center", gap: "10px",
          flexWrap: "wrap", justifyContent: "center", animation: "slideUp 0.8s ease-out 0.45s both", zIndex: 1,
        }}>
          <span style={{ fontSize: "14px", fontFamily: "'Oswald', sans-serif", color: "#5a9fd4", letterSpacing: "0.1em", textTransform: "uppercase" }}>⏱ Timer:</span>
          {[15, 20, 30, 45, 60].map((t) => (
            <button key={t} onClick={() => { setTimerDuration(t); setTimeLeft(t); }}
              style={{
                padding: "6px 12px", fontSize: "16px", fontFamily: "'Bebas Neue', sans-serif",
                background: timerDuration === t ? "linear-gradient(135deg, #FFD700, #FFA500)" : "rgba(255,255,255,0.05)",
                color: timerDuration === t ? "#1a1a2e" : "#5a9fd4",
                border: `1px solid ${timerDuration === t ? "#FFD700" : "#2a5a8c"}`,
                borderRadius: "8px", cursor: "pointer", minWidth: "40px",
              }}>{t}s</button>
          ))}
        </div>
        <button onClick={startGame} style={{
          marginTop: "28px", padding: "16px 60px", fontSize: "clamp(20px, 3vw, 28px)",
          fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.15em",
          background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#1a1a2e",
          border: "none", borderRadius: "50px", cursor: "pointer",
          animation: "slideUp 0.8s ease-out 0.6s both, pulse 2s ease-in-out infinite 1.4s",
          boxShadow: "0 4px 30px rgba(255,215,0,0.3)", zIndex: 1,
        }}>START GAME</button>
      </div>
    );
  }

  /* ── RESULTS ── */
  if (screen === "results") {
    const maxScore = Math.max(...scores);
    const winners = scores.reduce((a, s, i) => s === maxScore ? [...a, i] : a, []);
    const sorted = scores.map((s, i) => ({ score: s, idx: i })).sort((a, b) => b.score - a.score);
    return (
      <div style={{
        height: "100vh", background: "radial-gradient(ellipse at 50% 30%, #1a3a5c 0%, #0a1628 60%, #050d18 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'Bebas Neue', sans-serif", padding: "20px", position: "relative", overflow: "hidden",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600;700&family=Righteous&display=swap" rel="stylesheet" />
        <style>{GLOBAL_STYLES}</style>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: Math.random() * 10 + 5 + "px", height: Math.random() * 10 + 5 + "px",
            background: ["#FFD700", "#FF6B6B", "#4ECDC4", "#6C5CE7", "#FF8C00"][Math.floor(Math.random() * 5)],
            borderRadius: Math.random() > 0.5 ? "50%" : "2px", left: Math.random() * 100 + "%",
            animation: `confettiDrop ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: Math.random() * 3 + "s", opacity: 0.7,
          }} />
        ))}
        <div style={{ fontSize: "60px", animation: "slideUp 0.5s ease-out" }}>🏆</div>
        <h1 style={{
          fontSize: "clamp(36px, 8vw, 72px)", color: "#FFD700", margin: "8px 0",
          animation: "glow 2s ease-in-out infinite", fontFamily: "'Righteous', sans-serif", textAlign: "center",
        }}>{winners.length === 1 ? `${teamNames[winners[0]]} WINS!` : "IT'S A TIE!"}</h1>
        <div style={{
          display: "flex", flexDirection: "column", gap: "12px",
          width: "100%", maxWidth: "500px", marginTop: "24px", zIndex: 1,
        }}>
          {sorted.map(({ score, idx }, rank) => (
            <div key={idx} style={{
              display: "flex", alignItems: "center", gap: "16px",
              background: rank === 0 ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.05)",
              border: `2px solid ${rank === 0 ? "#FFD700" : TEAM_COLORS[idx]}40`,
              borderRadius: "12px", padding: "16px 20px",
              animation: `slideUp 0.5s ease-out ${0.2 + rank * 0.15}s both`,
            }}>
              <span style={{ fontSize: "28px", fontFamily: "'Bebas Neue', sans-serif", color: rank === 0 ? "#FFD700" : "#5a9fd4", minWidth: "36px" }}>#{rank + 1}</span>
              <span style={{ fontSize: "20px" }}>{TEAM_EMOJIS[idx]}</span>
              <span style={{ flex: 1, fontSize: "clamp(18px, 3vw, 24px)", color: TEAM_COLORS[idx], fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>{teamNames[idx]}</span>
              <span style={{ fontSize: "clamp(24px, 4vw, 36px)", fontFamily: "'Bebas Neue', sans-serif", color: rank === 0 ? "#FFD700" : "#8ab4d4" }}>{score}</span>
            </div>
          ))}
        </div>
        <button onClick={resetGame} style={{
          marginTop: "32px", padding: "14px 48px", fontSize: "22px", fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "0.12em", background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#1a1a2e",
          border: "none", borderRadius: "50px", cursor: "pointer", boxShadow: "0 4px 30px rgba(255,215,0,0.3)", zIndex: 1,
        }}>PLAY AGAIN</button>
      </div>
    );
  }

  /* ── GAME ── */
  return (
    <div style={{
      height: "100vh", background: "radial-gradient(ellipse at 50% 20%, #1a3a5c 0%, #0a1628 60%, #050d18 100%)",
      fontFamily: "'Bebas Neue', sans-serif", padding: "12px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600;700&family=Righteous&display=swap" rel="stylesheet" />
      <style>{GLOBAL_STYLES}</style>

      <TimesUpOverlay show={showTimesUp} onClose={() => setShowTimesUp(false)} />
      {floatingScore && <FloatingScore key={floatingScore.id} points={floatingScore.pts} color={floatingScore.color} />}

      {/* Top: Scores + Timer */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "10px", marginBottom: "8px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {[0, 1].map((i) => (
            <div key={i} onClick={() => setActiveTeam(i)} style={{
              background: activeTeam === i ? `linear-gradient(135deg, ${TEAM_COLORS[i]}30, ${TEAM_COLORS[i]}15)` : "rgba(255,255,255,0.03)",
              border: `2px solid ${activeTeam === i ? TEAM_COLORS[i] : TEAM_COLORS[i] + "30"}`,
              borderRadius: "10px", padding: "5px 10px", display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", animation: activeTeam === i ? "boxPulse 2s ease-in-out infinite" : "none",
              transition: "all 0.2s",
            }}>
              <span style={{ fontSize: "clamp(11px, 1.4vw, 14px)", color: TEAM_COLORS[i], fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{TEAM_EMOJIS[i]} {teamNames[i]}</span>
              <span style={{ fontSize: "clamp(22px, 3.5vw, 32px)", color: activeTeam === i ? "#FFD700" : "#5a9fd4", fontFamily: "'Bebas Neue', sans-serif" }}>{scores[i]}</span>
            </div>
          ))}
        </div>

        <Timer timeLeft={timeLeft} maxTime={timerDuration} running={timerRunning}
          onPause={() => setTimerRunning(false)}
          onResume={() => setTimerRunning(true)}
          onReset={() => { setTimerRunning(false); setTimeLeft(timerDuration); setShowTimesUp(false); }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {[2, 3].map((i) => (
            <div key={i} onClick={() => setActiveTeam(i)} style={{
              background: activeTeam === i ? `linear-gradient(135deg, ${TEAM_COLORS[i]}30, ${TEAM_COLORS[i]}15)` : "rgba(255,255,255,0.03)",
              border: `2px solid ${activeTeam === i ? TEAM_COLORS[i] : TEAM_COLORS[i] + "30"}`,
              borderRadius: "10px", padding: "5px 10px", display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", animation: activeTeam === i ? "boxPulse 2s ease-in-out infinite" : "none",
              transition: "all 0.2s",
            }}>
              <span style={{ fontSize: "clamp(11px, 1.4vw, 14px)", color: TEAM_COLORS[i], fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{TEAM_EMOJIS[i]} {teamNames[i]}</span>
              <span style={{ fontSize: "clamp(22px, 3.5vw, 32px)", color: activeTeam === i ? "#FFD700" : "#5a9fd4", fontFamily: "'Bebas Neue', sans-serif" }}>{scores[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active team indicator */}
      <div style={{ textAlign: "center", marginBottom: "4px" }}>
        <span style={{
          fontSize: "clamp(11px, 1.3vw, 13px)", fontFamily: "'Oswald', sans-serif",
          color: TEAM_COLORS[activeTeam], fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          {TEAM_EMOJIS[activeTeam]} {teamNames[activeTeam]}'s turn — tap a team to switch
        </span>
      </div>

      {/* Round info */}
      <div style={{ textAlign: "center", marginBottom: "5px" }}>
        <span style={{ fontSize: "clamp(11px, 1.4vw, 14px)", color: "#5a9fd4", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Round {currentQ + 1} of {QUESTIONS.length}
        </span>
      </div>

      {/* Question */}
      <div style={{
        background: "linear-gradient(135deg, #0d2137 0%, #162d4a 100%)", border: "2px solid #2a5a8c",
        borderRadius: "14px", padding: "12px 16px", textAlign: "center", marginBottom: "8px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
        <div style={{
          fontSize: "clamp(15px, 2.5vw, 23px)", color: "#e8f0ff", fontFamily: "'Oswald', sans-serif",
          fontWeight: 600, lineHeight: 1.3,
        }}>{question.question}</div>
      </div>

      {/* Answers */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1, marginBottom: "8px" }}>
        {question.answers.map((ans, i) => (
          <AnswerCard key={`${currentQ}-${i}`} answer={ans} index={i}
            revealed={revealed.includes(i)} onClick={() => revealAnswer(i)} />
        ))}
      </div>

      {/* Host Controls */}
      <div style={{
        background: "rgba(0,0,0,0.3)", borderRadius: "14px", padding: "10px 12px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{
          fontSize: "clamp(9px, 1.1vw, 11px)", color: "#5a9fd4", fontFamily: "'Oswald', sans-serif",
          letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px", textAlign: "center",
        }}>Host Controls</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          <HostBtn label="👁 REVEAL ALL" color="#5a9fd4" onClick={revealAll} />
          <HostBtn label="⏭ NEXT ROUND" color="#4ECDC4" onClick={nextQuestion} />
          <HostBtn label={musicOn ? "🔊 MUSIC ON" : "🔇 MUSIC OFF"} color={musicOn ? "#FFD93D" : "#666"} onClick={toggleMusic} />
        </div>
      </div>
    </div>
  );
}
