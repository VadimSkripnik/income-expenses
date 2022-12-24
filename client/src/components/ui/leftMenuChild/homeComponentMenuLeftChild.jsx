import React from "react";

const HomeComponentMenuLeftChild = () => {
  return (
    <>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu">
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="injected-svg"
                data-src="assets/images/svg/add-24px.svg"
              >
                <path d="M11 4a1 1 0 112 0v16a1 1 0 11-2 0V4z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.993 11A.997.997 0 003 12c0 .557.445 1 .993 1h16.014A.997.997 0 0021 12c0-.556-.445-1-.993-1H3.993z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">
          Подключить лицевой счет
        </div>
      </div>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu">
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="injected-svg"
                data-src="assets/images/svg/ic_settings_24px.svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.723 11.699c0 .876.563 1.613 1.346 1.885a.478.478 0 01.314.573 8.925 8.925 0 01-.728 1.793.477.477 0 01-.628.19c-.598-.283-1.353-.281-2.125.23a1.099 1.099 0 00-.302.302c-.528.802-.509 1.587-.19 2.195a.473.473 0 01-.168.63 8.964 8.964 0 01-2.084.884.475.475 0 01-.57-.313 1.995 1.995 0 00-1.887-1.353c-.878 0-1.618.567-1.887 1.353a.474.474 0 01-.57.313 8.946 8.946 0 01-2.109-.897.473.473 0 01-.168-.628c.314-.607.33-1.388-.198-2.187a1.095 1.095 0 00-.302-.301c-.76-.502-1.509-.511-2.104-.238a.477.477 0 01-.624-.193 8.99 8.99 0 01-.723-1.79.479.479 0 01.308-.571 1.994 1.994 0 001.324-1.877c0-.867-.552-1.6-1.323-1.877a.48.48 0 01-.308-.572c.198-.704.48-1.372.833-1.994a.478.478 0 01.595-.196A2.002 2.002 0 007.04 4.44a.47.47 0 01.198-.582 8.937 8.937 0 012.004-.842.482.482 0 01.575.315 1.994 1.994 0 001.884 1.345c.876 0 1.613-.563 1.885-1.346a.479.479 0 01.574-.314 8.98 8.98 0 011.975.826.478.478 0 01.196.597 2.04 2.04 0 00-.076 1.297 1.988 1.988 0 001.403 1.396 2.04 2.04 0 001.291-.081.477.477 0 01.598.195c.354.622.637 1.289.836 1.993a.48.48 0 01-.315.574 1.995 1.995 0 00-1.345 1.885zm-12.024 0a5.002 5.002 0 1010.004 0 5.002 5.002 0 00-10.004 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">Мои лицевые счета</div>
      </div>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu main-wrap__item-child-menu--only-text">
        <div className="main-wrap__item-child-menu--text">Выберите счет:</div>
      </div>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu">
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="injected-svg"
                data-src="assets/images/svg/contracts.svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 4a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4zm-4 2H9a1 1 0 000 2h6a1 1 0 100-2zM9 9h6a1 1 0 110 2H9a1 1 0 110-2zm2 3H9a1 1 0 100 2h2a1 1 0 100-2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">
          <div className="ws-layout-column ws-align-items-start account-side-bar-info">
            <span className="account-side-bar-info__number">
              030115510625100000
            </span>
            <span className="account-side-bar-info__balance account-side-bar-info__balance--zero">
              0.00 руб.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponentMenuLeftChild;
