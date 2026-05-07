"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MicOff } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";

const agentId = import.meta.env.VITE_RETELL_AGENT_ID as string;
const apiKey = import.meta.env.VITE_RETELL_API_KEY as string;

type CallStatus = "idle" | "connecting" | "active" | "ended" | "error";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RetellCallModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const clientRef = useRef<RetellWebClient | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    async function startCall() {
      setStatus("connecting");
      setTranscript("");
      try {
        const res = await fetch("https://api.retellai.com/v2/create-web-call", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agent_id: agentId }),
        });

        if (cancelled) return;
        if (!res.ok) throw new Error("Failed to create web call");
        const data = await res.json();
        const accessToken: string = data.access_token;

        if (cancelled) return;

        const client = new RetellWebClient();
        clientRef.current = client;

        client.on("call_started", () => { if (!cancelled) setStatus("active"); });
        client.on("call_ended", () => {
          if (cancelled) return;
          setStatus("ended");
          setTimeout(() => { onClose(); setStatus("idle"); }, 1500);
        });
        client.on("error", () => { if (!cancelled) setStatus("error"); });
        client.on("update", (update: any) => {
          if (cancelled) return;
          if (update?.transcript) {
            const last = update.transcript[update.transcript.length - 1];
            if (last?.content) setTranscript(last.content);
          }
        });

        await client.startCall({ accessToken });
      } catch (err) {
        if (cancelled) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
      }
    }

    startCall();

    return () => {
      cancelled = true;
      if (clientRef.current) {
        clientRef.current.stopCall();
        clientRef.current = null;
      }
    };
  }, [open]);

  function handleEnd() {
    clientRef.current?.stopCall();
    clientRef.current = null;
    setStatus("idle");
    onClose();
  }

  function toggleMute() {
    if (!clientRef.current) return;
    if (isMuted) {
      clientRef.current.unmute();
    } else {
      clientRef.current.mute();
    }
    setIsMuted(!isMuted);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleEnd(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0a0500 0%, #120800 100%)", border: "1px solid rgba(251,146,60,0.2)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <img src="/ARIA_LOGO.png" alt="ARIA" style={{ height: "28px" }} />
              </div>
              <button
                onClick={handleEnd}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Waveform */}
            <div className="flex items-center justify-center py-8">
              <div className="flex items-end gap-1.5 h-16">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full"
                    style={{ background: status === "active" ? "#f97316" : "#4b2800" }}
                    animate={
                      status === "active"
                        ? {
                            height: [
                              8 + Math.random() * 40,
                              8 + Math.random() * 40,
                              8 + Math.random() * 40,
                            ],
                          }
                        : { height: 8 }
                    }
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: i * 0.07,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status text */}
            <div className="text-center px-6 pb-2">
              <p className="text-sm font-medium text-white">
                {status === "connecting" && "Connecting to ARIA..."}
                {status === "active" && "ARIA is listening"}
                {status === "ended" && "Call ended"}
                {status === "error" && "Connection failed"}
                {status === "idle" && "Starting..."}
              </p>
              {transcript && status === "active" && (
                <p className="mt-2 text-xs text-neutral-400 line-clamp-2">{transcript}</p>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 px-6 py-6">
              {status === "active" && (
                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center w-12 h-12 rounded-full border transition-all"
                  style={{
                    background: isMuted ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)",
                    borderColor: isMuted ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)",
                    color: isMuted ? "#ef4444" : "#9ca3af",
                  }}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              )}

              <button
                onClick={handleEnd}
                className="flex items-center justify-center w-14 h-14 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #c2410c, #ea580c)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </button>

              {status === "connecting" && (
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-orange-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom trust line */}
            <div className="text-center pb-5">
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                AI-Powered Voice Demo
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
