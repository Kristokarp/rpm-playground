import { CSSProperties, FC, useEffect, useRef } from "react";
import { AvatarCreatorConfig } from "./types";
import { JSONTryParse } from "./utils";
import { useAvatarCreatorUrl } from "./use-avatar-creator-url.hook";

const MESSAGE_EVENT = "message";
const RPM_TARGET = "readyplayerme";
const IFRAME_READY_EVENT = "v1.frame.ready";

type Props = {
  subdomain: string;
  baseDomain?: string;
  useHttps?: boolean;
  className?: string;
  style?: CSSProperties;
  config?: AvatarCreatorConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEventReceived?: (event: any) => void;
};

export const RpmIframe: FC<Props> = ({
  subdomain,
  baseDomain,
  useHttps,
  className,
  style,
  config,
  onEventReceived,
}) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const url = useAvatarCreatorUrl(subdomain, config, baseDomain, useHttps);

  const subscribeToAvatarCreatorEvents = () => {
    if (!frameRef.current?.contentWindow) return;

    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        target: RPM_TARGET,
        type: "subscribe",
        eventName: "v1.**",
      }),
      "*"
    );
  };

  const subscribe = (event: MessageEvent) => {
    const avatarCreatorEvent = JSONTryParse(event.data);

    if (avatarCreatorEvent?.source !== RPM_TARGET) return;

    if (avatarCreatorEvent?.eventName === IFRAME_READY_EVENT) {
      subscribeToAvatarCreatorEvents();
      return;
    }

    onEventReceived?.(avatarCreatorEvent);
  };

  useEffect(() => {
    window.addEventListener(MESSAGE_EVENT, subscribe);

    return () => {
      window.removeEventListener(MESSAGE_EVENT, subscribe);
    };
  }, []);

  return (
    <iframe
      title="RPM Playground"
      ref={frameRef}
      src={url}
      style={style}
      className={className}
      allow="camera *; clipboard-write"
    />
  );
};
