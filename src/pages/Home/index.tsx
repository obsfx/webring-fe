import { Layout } from "@/components/Layout";
import { SiteList } from "@/components/SiteList";

export function Home() {
  return (
    <div class="home">
      <Layout>
        <SiteList />
      </Layout>
    </div>
  );
}
