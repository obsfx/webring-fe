import { RAW_GITHUB_CONTENT_BASE_URL, TARGET_FILENAME } from "@/constants";
import { SiteInfo } from "@/types";

export const getSiteList = async (targetRepo: string): Promise<SiteInfo[]> => {
  try {
    const response = await fetch(
      `${RAW_GITHUB_CONTENT_BASE_URL}/${targetRepo}/${TARGET_FILENAME}`
    );
    const json = await response.json();
    return json as SiteInfo[];
  } catch (error) {
    throw new Error(error);
  }
};
