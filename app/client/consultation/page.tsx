"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, RefreshCw, Image as ImageIcon } from "lucide-react";

interface ConsultationResult {
  face_shape:    string;
  hair_type:     string;
  recommendations: Recommendation[];
}

interface Recommendation {
  style:       string;
  reason:      string;
  difficulty:  "Easy" | "Moderate" | "Advanced";
  maintenance: "Low" | "Medium" | "High";
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.1, 1], delay: i * 0.12 }
  }),
};

export default function ConsultationPage() {
  const [preview,   setPreview]   = useState<string | null>(null);
  const [file,      setFile]      = useState<File | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [result,    setResult]    = useState<ConsultationResult | null>(null);
  const [dragOver,  setDragOver]  = useState(false);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    // Simulation delay
    await new Promise(r => setTimeout(r, 2000));
    setResult({
      face_shape: "Oval",
      hair_type:  "Straight – Medium",
      recommendations: [
        { style: "Soft Balayage Layers",   reason: "Frames oval faces beautifully, adds dimension.", difficulty: "Moderate", maintenance: "Low"    },
        { style: "Textured Bob",            reason: "Modern and elegant, suits your hair texture.",  difficulty: "Easy",     maintenance: "Medium"  },
        { style: "Beachy Waves with Lob",   reason: "Effortless and versatile for your lifestyle.", difficulty: "Easy",     maintenance: "Low"    },
      ],
    });
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ECEAE4",
      paddingTop: "140px",
      paddingBottom: "100px",
      paddingLeft: "24px",
      paddingRight: "24px",
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <motion.div variants={fadeUp} custom={0} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            border: "1px solid rgba(26,24,20,0.1)",
            backgroundColor: "#F5F4F0",
            marginBottom: "24px",
          }}>
            <Sparkles style={{ width: "12px", height: "12px", color: "#A08060" }} />
            <span style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#A08060",
            }}>
              AI-Powered
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "48px",
            fontWeight: 300,
            color: "#1A1814",
            marginBottom: "24px",
          }}>
            AI Hair Consultation
          </motion.h1>
          
          <motion.p variants={fadeUp} custom={2} style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "15px",
            color: "#4A4440",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Upload your photo to discover styles tailored exclusively to your face shape, features, and hair texture. Let our AI be your personal creative director.
          </motion.p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "32px",
        }}>
          
          {/* ── Upload Panel ── */}
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{
            backgroundColor: "#F5F4F0",
            border: "1px solid rgba(26,24,20,0.12)",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "24px",
              fontWeight: 300,
              color: "#1A1814",
              marginBottom: "32px",
            }}>
              Upload Your Portrait
            </h2>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                flex: 1,
                minHeight: "320px",
                border: preview ? "none" : `1px dashed ${dragOver ? "rgba(160,128,96,0.6)" : "rgba(26,24,20,0.2)"}`,
                backgroundColor: dragOver ? "rgba(160,128,96,0.05)" : "#ECEAE4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "all 0.3s",
              }}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Upload" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <>
                  <Upload style={{ width: "24px", height: "24px", color: "rgba(26,24,20,0.4)", marginBottom: "16px" }} />
                  <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "14px", color: "#1A1814", marginBottom: "8px" }}>
                    Drop your photo here
                  </p>
                  <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.1em", color: "#8A7F78", textTransform: "uppercase" }}>
                    or click to browse
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
              {preview && (
                <button
                  onClick={() => { setPreview(null); setFile(null); setResult(null); }}
                  style={{
                    padding: "16px 24px",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(26,24,20,0.2)",
                    color: "#1A1814",
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw style={{ width: "14px", height: "14px" }} />
                  Reset
                </button>
              )}
              <button
                disabled={!file || loading}
                onClick={analyze}
                style={{
                  flex: 1,
                  padding: "16px 24px",
                  backgroundColor: !file ? "rgba(26,24,20,0.05)" : "#1A1814",
                  border: "none",
                  color: !file ? "rgba(26,24,20,0.3)" : "#F5F4F0",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: !file || loading ? "not-allowed" : "pointer",
                  transition: "background 0.3s",
                }}
              >
                {loading ? "Analysing..." : "Analyse Composition"}
                {!loading && <Sparkles style={{ width: "14px", height: "14px" }} />}
              </button>
            </div>
          </motion.div>

          {/* ── Results Panel ── */}
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" style={{
            backgroundColor: "#F5F4F0",
            border: "1px solid rgba(26,24,20,0.12)",
            padding: "40px",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "24px",
              fontWeight: 300,
              color: "#1A1814",
              marginBottom: "32px",
            }}>
              Curated Styles
            </h2>

            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", opacity: 0.5 }}>
                <div style={{ height: "40px", backgroundColor: "rgba(26,24,20,0.05)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
                <div style={{ height: "100px", backgroundColor: "rgba(26,24,20,0.05)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
                <div style={{ height: "100px", backgroundColor: "rgba(26,24,20,0.05)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
              </div>
            )}

            {!loading && !result && (
              <div style={{
                height: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}>
                <ImageIcon style={{ width: "48px", height: "48px", color: "rgba(26,24,20,0.1)" }} />
                <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "14px", color: "#8A7F78", textAlign: "center", maxWidth: "250px" }}>
                  Your bespoke style recommendations will appear here.
                </p>
              </div>
            )}

            {!loading && result && (
              <div>
                <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
                  <div style={{ flex: 1, padding: "16px", border: "1px solid rgba(26,24,20,0.1)" }}>
                    <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7F78", marginBottom: "4px" }}>
                      Face Shape
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", color: "#1A1814" }}>
                      {result.face_shape}
                    </p>
                  </div>
                  <div style={{ flex: 1, padding: "16px", border: "1px solid rgba(26,24,20,0.1)" }}>
                    <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7F78", marginBottom: "4px" }}>
                      Hair Type
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", color: "#1A1814" }}>
                      {result.hair_type}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {result.recommendations.map((rec, i) => (
                    <div key={i} style={{
                      padding: "24px",
                      backgroundColor: i === 0 ? "#E5E2DB" : "transparent",
                      border: "1px solid rgba(26,24,20,0.1)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", color: "#1A1814" }}>
                          {rec.style}
                        </h4>
                        <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "#A08060", textTransform: "uppercase" }}>
                          Option 0{i + 1}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "13px", color: "#4A4440", lineHeight: 1.6, marginBottom: "16px" }}>
                        {rec.reason}
                      </p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 8px", border: "1px solid rgba(26,24,20,0.1)", color: "#8A7F78" }}>
                          {rec.difficulty}
                        </span>
                        <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 8px", border: "1px solid rgba(26,24,20,0.1)", color: "#8A7F78" }}>
                          {rec.maintenance} Maintenance
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
