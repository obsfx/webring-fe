import { SiteInfo } from "@/types";

export enum Action {
  Prev = "prev",
  Next = "next",
}

export const actions = {
  [Action.Prev]: (siteList: SiteInfo[], currentDomain: string): boolean => {
    const index = siteList.findIndex((site) => site.url === currentDomain);

    if (index === -1) {
      return false;
    }

    const prevIndex = index === 0 ? siteList.length - 1 : index - 1;
    const prevSite = siteList[prevIndex];

    window.location.href = prevSite.url;
    return true;
  },
  [Action.Next]: (siteList: SiteInfo[], currentDomain: string): boolean => {
    const index = siteList.findIndex((site) => site.url === currentDomain);

    if (index === -1) {
      return false;
    }

    const nextIndex = index === siteList.length - 1 ? 0 : index + 1;
    const nextSite = siteList[nextIndex];
    window.location.href = nextSite.url;
    return true;
  },
};
