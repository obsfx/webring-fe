import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import "@/styles/main.scss";
import { AppContextProvider } from "./AppContext.js";

export function App() {
  return (
    <LocationProvider>
      <main>
        <Router>
          <AppContextProvider>
            <Route path="/" component={Home} />
          </AppContextProvider>
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
