import { useAppContext } from "@/AppContext";
import { SiteItem } from "./SiteItem";

export function SiteList() {
  const { siteList } = useAppContext();

  return (
    <div>
      {siteList.map((site, idx) => (
        <SiteItem key={idx} site={site} />
      ))}
    </div>
  );
}
