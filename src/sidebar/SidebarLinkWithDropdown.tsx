import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ToggleSidebarState, TooltipForLinkState } from "./Sidebar";
import { IoMdInformationCircleOutline } from "react-icons/io";

type dropdownItemType = {
  title: string;
  to: string;
};

type props = {
  isDropdown?: boolean;
  to: string;
  linkTitle: string;
  linkIcon?: any;
  dropdownItem?: dropdownItemType[];
};

const SidebarLinkWithDropdown: React.FC<props> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const location = useLocation();
  const isMatchedLocationForActiveClass = props.dropdownItem?.find((item: dropdownItemType) => {
    return location.pathname === item.to;
  })?.to;

  const [toggleSidebar, setToggleSidebar] = useRecoilState(ToggleSidebarState);

  const [tooltip, setTooltip] = useRecoilState(TooltipForLinkState);

  return (
    <React.Fragment>
      <div className="link-area">
        {props.to && !props.isDropdown ? (
          <NavLink
            onMouseEnter={() => {
              if (!props.isDropdown && toggleSidebar) {
                setTooltip(() => ({
                  [props.linkTitle]: true,
                }));
              }
            }}
            onMouseLeave={() => {
              setTooltip(() => ({
                [props.linkTitle]: false,
              }));
            }}
            to={props.to}
            className="dropdown-sidebar-item">
            <article className="left-title">
              <span className="icon">{props.linkIcon}</span>
              <span className="linktitle">{props.linkTitle}</span>
            </article>
            {props.isDropdown ? (
              <FaAngleDown className="caret" style={{ transform: open ? "rotate(180deg)" : "" }} />
            ) : (
              ""
            )}
          </NavLink>
        ) : (
          <div
            className={`dropdown-sidebar-item ${
              props.isDropdown && isMatchedLocationForActiveClass ? "active-dropdown" : ""
            }`}
            onClick={() => {
              if (props.isDropdown && !toggleSidebar) {
                handleOpen();
              } else if (toggleSidebar) {
                setToggleSidebar(false);
                setOpen(true);
              }
            }}
            onMouseEnter={() => {
              if (!props.isDropdown && toggleSidebar) {
                setTooltip(() => ({
                  [props.linkTitle]: true,
                }));
              }
            }}
            onMouseLeave={() => {
              setTooltip(() => ({
                [props.linkTitle]: false,
              }));
            }}>
            <article className="left-title">
              <span className="icon">{props.linkIcon}</span>
              <span className="linktitle">{props.linkTitle}</span>
            </article>
            {props.isDropdown ? (
              <FaAngleDown className="caret" style={{ transform: open ? "rotate(180deg)" : "" }} />
            ) : (
              ""
            )}
          </div>
        )}

        {props.isDropdown
          ? open && (
              <div className="submenu">
                {props.dropdownItem?.map((item: dropdownItemType, i: number) => (
                  <NavLink key={i} to={item.to} className="dropdown-sidebar-item-inner" onClick={handleOpen}>
                    {item.title}
                  </NavLink>
                ))}
              </div>
            )
          : ""}
      </div>
      <div className={`tooltip-msg ${tooltip[props.linkTitle] ? "active" : ""}`}>
        <IoMdInformationCircleOutline className="info-icon" />
        <span className="title-tooltip">{props.linkTitle}</span>
      </div>
    </React.Fragment>
  );
};

export default SidebarLinkWithDropdown;
