import { ImageResponse } from "next/og";
import { company, profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.roles.join(" · ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0c0e",
          color: "#ececee",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#ececee",
              color: "#0b0c0e",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SC
          </div>
          <div style={{ fontSize: 26, color: "#9a9aa3" }}>sandipchapagain.com.np</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#3fd1ba", letterSpacing: 2 }}>{profile.roles.join("  •  ")}</div>
          <div style={{ fontSize: 88, fontWeight: 700, marginTop: 16, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 32, color: "#c9c9cf", marginTop: 20 }}>
            {`Nepal · Founder of ${company.name}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
