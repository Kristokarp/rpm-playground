import { AvatarCreatorConfig } from "./types";
import { useMemo } from "react";

export const useAvatarCreatorUrl = (
  subdomain: string,
  config?: AvatarCreatorConfig,
  baseDomain?: string,
  useHttps = true
): string => {
  return useMemo(() => {
    let url = `${useHttps ? "https" : "http"}://${subdomain}${
      baseDomain ?? ".readyplayer.me"
    }`;

    if (config?.language) url += `/${config.language}`;
    url += `/avatar?frameApi&source=rpm-playground`;
    if (config?.clearCache) url += "&clearCache";
    if (config?.quickStart) url += "&quickStart";
    if (config?.bodyType) url += `&bodyType=${config?.bodyType}`;
    if (config?.token) url += `&token=${config?.token}`;
    if (config?.avatarId) url += `&id=${config?.avatarId}`;

    return url;
  }, [subdomain, baseDomain, config, useHttps]);
};
