import { useState } from "react";
import { RpmIframe } from "./RpmIframe";

function App() {
  const [events, setEvents] = useState<unknown[]>([]);
  const onEvent = (event: unknown) => {
    setEvents((prev) => [...prev, event]);
  };

  const [baseUrl, setBaseUrl] = useState("https://demo.readyplayer.me/avatar");
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
          paddingRight: "32px",
          paddingLeft: "32px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", width: "100%" }}>
          <div>url</div>
          <input
            style={{ width: "100%" }}
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
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
          baseUrl={baseUrl}
          config={{ clearCache: true, token, avatarId }}
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
