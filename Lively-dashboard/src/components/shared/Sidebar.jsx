import React from "react";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/consts/navigation";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthData } from "../../redux/AuthSlice";

const linkClass =
  "flex items-center gap-2 font-bold px-3 py-2 hover:bg-green-800 hover:text-white hover:no-underline hover:font-light active:bg-neutral-600 capitalize rounded-sm text-base";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col bg-white p-3  w-60 ">
      <Link to={"/"}>
        <div className="flex items-center gap-2 px-1 py-3">
          <div>
            <svg
              width="36"
              height="36"
              viewBox="0 0 179 179"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="179" height="179" rx="10" fill="black" />
              <path
                d="M45.2812 100.516V106H28.1016V100.516H45.2812ZM30.375 71.875V106H23.3438V71.875H30.375ZM56.0156 80.6406V106H49.2422V80.6406H56.0156ZM48.8203 74.0312C48.8203 73.0469 49.1641 72.2344 49.8516 71.5938C50.5391 70.9531 51.4609 70.6328 52.6172 70.6328C53.7578 70.6328 54.6719 70.9531 55.3594 71.5938C56.0625 72.2344 56.4141 73.0469 56.4141 74.0312C56.4141 75.0156 56.0625 75.8281 55.3594 76.4688C54.6719 77.1094 53.7578 77.4297 52.6172 77.4297C51.4609 77.4297 50.5391 77.1094 49.8516 76.4688C49.1641 75.8281 48.8203 75.0156 48.8203 74.0312ZM70.2188 101.078L75.8438 80.6406H82.8984L74.3438 106H70.0781L70.2188 101.078ZM66.3516 80.6406L72 101.102L72.1172 106H67.8281L59.2734 80.6406H66.3516ZM97.2656 106.469C95.2969 106.469 93.5312 106.156 91.9688 105.531C90.4062 104.891 89.0781 104.008 87.9844 102.883C86.9062 101.758 86.0781 100.453 85.5 98.9688C84.9219 97.4688 84.6328 95.875 84.6328 94.1875V93.25C84.6328 91.3281 84.9062 89.5703 85.4531 87.9766C86 86.3828 86.7812 85 87.7969 83.8281C88.8281 82.6562 90.0781 81.7578 91.5469 81.1328C93.0156 80.4922 94.6719 80.1719 96.5156 80.1719C98.3125 80.1719 99.9062 80.4688 101.297 81.0625C102.688 81.6562 103.852 82.5 104.789 83.5938C105.742 84.6875 106.461 86 106.945 87.5312C107.43 89.0469 107.672 90.7344 107.672 92.5938V95.4062H87.5156V90.9062H101.039V90.3906C101.039 89.4531 100.867 88.6172 100.523 87.8828C100.195 87.1328 99.6953 86.5391 99.0234 86.1016C98.3516 85.6641 97.4922 85.4453 96.4453 85.4453C95.5547 85.4453 94.7891 85.6406 94.1484 86.0312C93.5078 86.4219 92.9844 86.9688 92.5781 87.6719C92.1875 88.375 91.8906 89.2031 91.6875 90.1562C91.5 91.0938 91.4062 92.125 91.4062 93.25V94.1875C91.4062 95.2031 91.5469 96.1406 91.8281 97C92.125 97.8594 92.5391 98.6016 93.0703 99.2266C93.6172 99.8516 94.2734 100.336 95.0391 100.68C95.8203 101.023 96.7031 101.195 97.6875 101.195C98.9062 101.195 100.039 100.961 101.086 100.492C102.148 100.008 103.062 99.2812 103.828 98.3125L107.109 101.875C106.578 102.641 105.852 103.375 104.93 104.078C104.023 104.781 102.93 105.359 101.648 105.812C100.367 106.25 98.9062 106.469 97.2656 106.469ZM132.562 70V106H125.789V70H132.562ZM145.664 103.141L152.391 80.6406H159.633L149.438 109.82C149.219 110.461 148.922 111.148 148.547 111.883C148.188 112.617 147.695 113.312 147.07 113.969C146.461 114.641 145.688 115.188 144.75 115.609C143.828 116.031 142.695 116.242 141.352 116.242C140.711 116.242 140.188 116.203 139.781 116.125C139.375 116.047 138.891 115.938 138.328 115.797V110.852C138.5 110.852 138.68 110.852 138.867 110.852C139.055 110.867 139.234 110.875 139.406 110.875C140.297 110.875 141.023 110.773 141.586 110.57C142.148 110.367 142.602 110.055 142.945 109.633C143.289 109.227 143.562 108.695 143.766 108.039L145.664 103.141ZM142.852 80.6406L148.359 99.0156L149.32 106.164L144.727 106.656L135.609 80.6406H142.852Z"
                fill="white"
              />
              <path
                d="M111.844 102.742C111.844 101.742 112.188 100.906 112.875 100.234C113.578 99.5625 114.508 99.2266 115.664 99.2266C116.82 99.2266 117.742 99.5625 118.43 100.234C119.133 100.906 119.484 101.742 119.484 102.742C119.484 103.742 119.133 104.578 118.43 105.25C117.742 105.922 116.82 106.258 115.664 106.258C114.508 106.258 113.578 105.922 112.875 105.25C112.188 104.578 111.844 103.742 111.844 102.742Z"
                fill="url(#paint0_linear_285_129)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_285_129"
                  x1="90"
                  y1="52"
                  x2="119"
                  y2="122.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.609693" stop-color="#135E4C" />
                  <stop offset="0.910919" stop-color="#00F93A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-neutral-100 text-4xl">Lively</span>
        </div>
      </Link>

      <div className="py-8 flex flex-1 flex-col gap-0.5 ">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-grey-300">
        <a
          className={classNames("text-black cursor-pointer", linkClass)}
          onClick={() => {
            console.log("logged out console");
            dispatch(clearAuthData());
            localStorage.removeItem("token");
            navigate("/admin");
          }}
        >
          <span className="text-xl">{<HiOutlineLogout />}</span>
          {"logout"}
        </a>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};
function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "text-white bg-green-800 font-light "
          : "text-black",
        linkClass
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;