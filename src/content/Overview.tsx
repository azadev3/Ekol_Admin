import React from "react";
import ChartComponent from "./overviewuitils/ChartComponent";
import "../styles/Overview.scss";
import Parts from "./overviewuitils/Parts";
import { useRecoilState } from "recoil";
import { LoadingState } from "../routes/hero/HeroShow";
import Loader from "../Loader";

const Overview: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  React.useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="overview">
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <ChartComponent />
          <div className="other-overviews">
            <span>Digər prototiplər</span>
            <p>Saytınızdakı treklərə sürətli giriş</p>
          </div>
          <Parts />
        </React.Fragment>
      )}
    </main>
  );
};

export default Overview;
