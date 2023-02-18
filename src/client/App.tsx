import React, { useEffect, FC } from "react";
import { SubDomainRoutes, MainRoute } from "routers/index";
import Plausible from "plausible-tracker";

export interface AppProps {
  data?: any;
}

const App: FC<AppProps> = ({ data = "" }) => {
  useEffect(() => {
    const { enableAutoPageviews } = Plausible({
      domain: window.location.hostname,
      trackLocalhost: true,
    });

    enableAutoPageviews();
  }, []);

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <SubDomainRoutes data={data} />
    </div>
  );
}

export default App;
