// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { getIsLoggedIn } from "../../store/users";
// import MenuHome from "./menuComponents/menuHome";
// import MenuMain from "./menuComponents/menuMain";
// import MenuInfo from "./menuComponents/menuInfo";
// import MenuUsers from "./menuComponents/menuUsers";

// const Aside = () => {
//   const arr = ["home", "main", "users", "info"];
//   const [data, setData] = useState("info");
//   const isLoggedIn = useSelector(getIsLoggedIn());

//   const handleClick = (element) => {
//     setData(element.props.children);
//   };

//   return (
//     <div className="aside">
//       {isLoggedIn && (
//         <>
//           {arr.map(
//             (el) =>
//               (el = (
//                 <h2 key={el} onMouseEnter={() => handleClick(el)}>
//                   {el}
//                 </h2>
//               ))
//           )}
//         </>
//       )}
//       {data === "home" && <MenuHome />}
//       {data === "main" && <MenuMain />}
//       {data === "info" && <MenuInfo />}
//       {data === "users" && <MenuUsers />}
//     </div>
//   );
// };

// export default Aside;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import HomeComponentMenuLeft from "./leftMenu/homeComponentMenuLeft";
import LogoComponentMenuLeft from "./leftMenu/logoComponentMenuLeft";
import MainComponentMenuLeft from "./leftMenu/mainComponentMenuLeft";
import SupportComponentMenuLeft from "./leftMenu/supportComponentMenuLeft";
import ProfileComponentMenuLeft from "./leftMenu/profileComponentMenuLeft";
import HomeComponentMenuLeftChild from "./leftMenuChild/homeComponentMenuLeftChild";
import MainComponentMenuLeftChild from "./leftMenuChild/mainComponentMenuLeftChild";
import SupportComponentMenuLeftChild from "./leftMenuChild/supportComponentMenuLeftChild";
import ProfileComponentMenuLeftChild from "./leftMenuChild/profileComponentMenuLeftChild";

const Aside = () => {
  const [data, setData] = useState("home");
  
  const isLoggedIn = useSelector(getIsLoggedIn());

  const handleClick = (element) => {
    setData(element);
  };

  return (
    <>
      {isLoggedIn && (
        <div className="ws-layout-column ws-align-items-start-center main-wrap__left-panel">
          <LogoComponentMenuLeft />
           <HomeComponentMenuLeft mouseEnter={handleClick} params={"home"}/>
          <MainComponentMenuLeft  mouseEnter={handleClick} params={"main"} />
          <SupportComponentMenuLeft mouseEnter={handleClick} params={"info"} />
          <ProfileComponentMenuLeft mouseEnter={handleClick} params={"users"} />
        </div>
      )}

      <div className=" main-wrap__left-child-panel">
        {data === "home" && <HomeComponentMenuLeftChild />}
        {data === "main" && <MainComponentMenuLeftChild />}
        {data === "info" && <SupportComponentMenuLeftChild />}
        {data === "users" && <ProfileComponentMenuLeftChild />}
      </div>
    </>
  );
};

export default Aside;
