// import React from "react";
// import AppLoader from "../components/ui/hoc/appLoader";
// import Aside from "../components/ui/aside";
// import { Outlet } from "react-router-dom";

// const Home = () => {
//   return (
//     <>
//       <h1>Home</h1>

//       <div className="wrapper">
//         <div className="container mt-5">
//           <div className="left ">
//             <Aside />
//           </div>
//           <main>
//             <div>
//               <AppLoader>
//                 <Outlet />
//               </AppLoader>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React from "react";
// import AppLoader from "../components/ui/hoc/appLoader";
import Aside from "../components/ui/aside";
import Footer from "../components/ui/footer";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="ws-layout-row ws-align-items-start-stretch main-wrap">
        <Aside />

        <div className="ws-layout-column ws-align-items-start ws-flex-grow-1 main-wrap__content">
          <div className="main-wrap__container">
            <div className="ws-layout-column ws-align-items-start ws-flex-grow-1 main-wrap__content-panel">
              <div className="cabinet-container cabinet-main">
                <div className="cabinet-main__content-wrap">
                  <div className="cabinet-main__content cabinet-main-content cabinet-content">
                    <div className="cabinet-main__account"></div>
                    {/* <AppLoader> */}
                      <Outlet />
                    {/* </AppLoader> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>

        <div className="Toastify"></div>
      </div>
    </>
  );
};
export default Home;
