import { SiteInfo } from "@/types";

export function SiteItem({ site }: { site: SiteInfo }) {
  return (
    <div className="site-item">
      <img
        alt="favicon"
        src={`https://www.google.com/s2/favicons?domain=${site.url}`}
      />

      <a href={site.url} target="_blank">
        {site.title}
      </a>
      <span>{site.url}</span>
    </div>
  );
}
