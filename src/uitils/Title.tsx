import React from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useLocation, useMatch } from "react-router-dom";

type props = {
  title: string;
  description: string;
  to: string;
};

const Title: React.FC<props> = (props) => {
  const location = useLocation();
  const isTrue = location.pathname.includes("create");
  const ifLocationApplyVacations = location.pathname === "/applyvacations";
  const ifLocationApplyVacationsInner = useMatch(`/applyvacations/:innerid`);
  const ifLocationAppeals = location.pathname === "/appeals";
  const ifLocationInnerAppeals = useMatch(`/appeals/:inneridappeals`);
  const ifLocationEmails = location.pathname === "/emails";

  return (
    <div className="title">
      <section className="texts">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </section>
      {!isTrue && !ifLocationApplyVacations && !ifLocationApplyVacationsInner && !ifLocationAppeals && !ifLocationInnerAppeals && !ifLocationEmails && (
        <Link to={props?.to} className="add-data-btn">
          <IoAdd className="addicon" />
          <span>Əlavə et</span>
        </Link>
      )}
    </div>
  );
};

export default Title;
