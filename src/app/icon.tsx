import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, hsl(243 75% 52%), hsl(260 70% 62%))",
          borderRadius: "7px",
        }}
      >
        <div style={{ fontSize: 19, lineHeight: 1 }}>🔔</div>
      </div>
    ),
    { ...size }
  );
}
