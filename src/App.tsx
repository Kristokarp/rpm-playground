import { useState } from "react";
import { RpmIframe } from "./RpmIframe";

function App() {
  const [events, setEvents] = useState<unknown[]>([]);
  const onEvent = (event: unknown) => {
    setEvents((prev) => [...prev, event]);
  };

  const [subdomain, setSubdomain] = useState("demo");
  const [baseDomain, setBaseDomain] = useState(".readyplayer.me");
  const [useHttps, setUseHttps] = useState(true);
  const [token, setToken] = useState("");
  const [avatarId, setAvatarId] = useState("");

  return (
    <div
      style={{
        paddingTop: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <div>Subdomain</div>
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div>Basedomain</div>
          <input
            type="text"
            value={baseDomain}
            onChange={(e) => setBaseDomain(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div>Use HTTPS</div>
          <input
            type="checkbox"
            checked={useHttps}
            onChange={(e) => setUseHttps(e.target.checked)}
          />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <div>Token</div>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <div>AvatarId</div>
          <input
            type="text"
            value={avatarId}
            onChange={(e) => setAvatarId(e.target.value)}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "32px" }}
      >
        <RpmIframe
          style={{
            width: "1100px",
            height: "800px",
            border: "0",
            maxWidth: "100%",
          }}
          subdomain={subdomain}
          baseDomain={baseDomain}
          useHttps={useHttps}
          config={{ language: "en", clearCache: true, token, avatarId }}
          onEventReceived={onEvent}
        />
      </div>

      <div
        style={{
          color: "white",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Events</h2>
        <pre>{JSON.stringify(events, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
