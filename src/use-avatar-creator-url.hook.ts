import { AvatarCreatorConfig } from "./types";
import { useMemo } from "react";

export const useAvatarCreatorUrl = (
  baseUrl: string,
  config?: AvatarCreatorConfig
): string => {
  return useMemo(() => {
    let url = baseUrl;
    url += "?frameApi";
    if (config?.clearCache) url += "&clearCache";
    if (config?.quickStart) url += "&quickStart";
    if (config?.bodyType) url += `&bodyType=${config?.bodyType}`;
    if (config?.token) url += `&token=${config?.token}`;
    if (config?.avatarId) url += `&id=${config?.avatarId}`;

    return url;
  }, [baseUrl, config]);
};
