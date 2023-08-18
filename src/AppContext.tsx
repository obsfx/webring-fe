import { createContext } from "preact";
import { useEffect, useState, useContext } from "preact/hooks";
import { getSiteList } from "@/service";
import { SiteInfo } from "@/types";
import { REPO_PARAM, REF_PARAM, ACTION_PARAM } from "@/constants";
import { WarningBox } from "@/components/WarningBox";
import { ErrorBox } from "@/components/ErrorBox";
import { actions } from "@/param-actions";

interface IAppContext {
  siteList: SiteInfo[];
  loading: boolean;
  error: Error | null;
  fetchSiteList: () => Promise<void>;
}

export const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = (): IAppContext => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext is not initialized");
  }
  return ctx;
};

export const AppContextProvider = ({ children }: { children: any }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const repo = searchParams.get(REPO_PARAM);
  const ref = searchParams.get(REF_PARAM);
  const action = searchParams.get(ACTION_PARAM);

  const [siteList, setSiteList] = useState<SiteInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialize = (siteList: SiteInfo[]) => {
    if (!ref || !action) {
      setSiteList(siteList);
      return;
    }

    const selectedAction = actions[action];
    if (!selectedAction) {
      setSiteList(siteList);
      return;
    }

    const isRedirectSuccess = selectedAction(siteList, ref);
    if (!isRedirectSuccess) {
      throw new Error(
        "Redirection failed. Domain could not be found in the site list."
      );
    }
  };

  const fetchSiteList = async () => {
    setLoading(true);
    try {
      const response = await getSiteList(repo);
      initialize(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!repo) return;
    fetchSiteList();
  }, []);

  const renderChildren = () => {
    if (error) {
      return <ErrorBox>{error.message}</ErrorBox>;
    }

    if (!repo) {
      return (
        <WarningBox>
          Please at least provide a <span>repo</span> query param to fetch site
          list.
        </WarningBox>
      );
    }

    if (ref && action) {
      return <WarningBox>Redirecting...</WarningBox>;
    }

    return children;
  };

  return (
    <AppContext.Provider value={{ siteList, loading, error, fetchSiteList }}>
      {loading && <div>Loading...</div>}
      {renderChildren()}
    </AppContext.Provider>
  );
};
