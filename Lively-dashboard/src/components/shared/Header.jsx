import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import { Menu, Popover, Transition } from "@headlessui/react";
import {
  HiOutlinePlusSm,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Header() {
  var name = "";
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(`user object`);
  if (user) {
    name = user.name;
    console.log(name);
  }
  const getInitial = (name) => {
    return name ? name.charAt(0) : "";
  };

  const profile = (name) => {
    if (!name) {
      return <Link to="/admin">Login</Link>;
    }
    const Name = name.charAt(0).toUpperCase() + name.slice(1);
    return Name;
  };

  return (
    <div className="bg-white h-16 px-4 flex items-center  justify-between">
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Complaints
                    </strong>
                    <div className="mt-2 py-1 text-sm underline">
                      <Link to="/complaints">View Complaints</Link>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlinePlusSm fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">Admin</strong>
                    <div className="mt-2 py-1 text-sm underline">
                      <Link to="/newAdmin"> Add Admin</Link>
                    </div>
                    <strong className="text-gray-700 font-medium">
                      Notifications
                    </strong>

                    <div className="mt-2 py-1 text-sm underline">
                      <Link to="/notifications"> Add Notification</Link>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        {/* <div>
          {profile(name)}
          <div></div>
        </div> */}
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              {name ? (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green text-white text-2xl ">
                  {getInitial(profile(name))}
                </div>
              ) : (
                <Link to="/admin">Login</Link>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/profile")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    <div className="text-gray-700 font-medium">
                      {profile(name)}
                    </div>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
