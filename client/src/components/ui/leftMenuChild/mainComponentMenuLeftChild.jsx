import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserId, getUserById, loadUsersList} from "../../../store/users";
import BasicInformationSvg from "../../../svgFile/leftPaneMenuChildrenSvg/basicInformationSvg";
import AddCardPageSvg from "../../../svgFile/leftPaneMenuChildrenSvg/addCardPageSvg";
import CategorySvg from './../../../svgFile/leftPaneMenuChildrenSvg/categorySvg';
import AddCategorySvg from './../../../svgFile/leftPaneMenuChildrenSvg/addCategorySvg';
import RateCategorySvg from './../../../svgFile/leftPaneMenuChildrenSvg/rateCategorySvg';
import AddRateCategorySvg from './../../../svgFile/leftPaneMenuChildrenSvg/addRateCategorySvg';

const MainComponentMenuLeftChild = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  
  useEffect(() => {
    dispatch(loadUsersList())
   
}, []);
  const handleMain = () => {
    navigate("/home/main/mainlist")
  }
  const handleAddCardPage = () => {
    navigate("/home/main/addcard")
  }
  const handleShowCategoryPage = () => {
    navigate("/home/main/incomecategoryspage")
  }

  const handleAddCategoryPage = () => {
    navigate("/home/main/addincomecategory")
  }

  const handleRateCategoryPage = () => {
    navigate("/home/main/ratecategoryspage")
  }

  const handleAddRateCategoryPage = () => {
    navigate("/home/main/addratecategory")
  }

  return (
    <>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu-email">
          <div className="main-wrap__item-child-menu--icon-wrap">
            <i className="material-icons">email</i>
          </div>
          <div className="main-wrap__item-child-menu--text">{user ? user.email : "Loading..."}</div>
        </div>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu main-wrap__item-child-menu" onClick={handleMain }>
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <BasicInformationSvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">Основные сведения</div>
      </div>

      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu" onClick={handleAddCardPage}>
          <div className="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
               <AddCardPageSvg />
              </div>
            </div>
          </div>
          <div className="main-wrap__item-child-menu--text">Добавить доход(карту)</div>
        </div>
        <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu" onClick={handleShowCategoryPage}>
          <div className="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
              <CategorySvg />
              </div>
            </div>
          </div>
          <div className="main-wrap__item-child-menu--text">Категории дохода</div>
        </div>
        <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu" onClick={handleAddCategoryPage}>
          <div className="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
               <AddCategorySvg />
              </div>
            </div>
          </div>
          <div className="main-wrap__item-child-menu--text">Добавить категорию дохода</div>
        </div>
        <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu" onClick={handleRateCategoryPage}>
          <div className="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
               <RateCategorySvg />
              </div>
            </div>
          </div>
          <div className="main-wrap__item-child-menu--text">
            Категории расхода
          </div>
        </div>
        <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu" onClick={handleAddRateCategoryPage}>
          <div className="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
              <AddRateCategorySvg />
              </div>
            </div>
          </div>
          <div className="main-wrap__item-child-menu--text">Добавить категорию расхода</div>
        </div>

      {/* 
       
       
      
        <div class="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu">
          <div class="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  class="injected-svg"
                  data-src="assets/images/svg/ic_folder_load_24px.svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 5h-8.586l-2-2H3a1 1 0 00-1 1v16a1 1 0 001 1h18a1 1 0 001-1V6a1 1 0 00-1-1zm-6.783 7.304a1.05 1.05 0 011.478 0 1.031 1.031 0 010 1.464l-2.956 2.93a1.054 1.054 0 01-1.478 0l-2.955-2.93a1.028 1.028 0 010-1.464 1.05 1.05 0 011.477 0L11 13.509V8.976A.989.989 0 0112 8a.99.99 0 011 .976v4.534l1.217-1.206z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="main-wrap__item-child-menu--text">Квитанции</div>
        </div>
        <div class="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu">
          <div class="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  class="injected-svg"
                  data-src="assets/images/svg/service-points.svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.373 11.702c.43-1.363.627-2.424.627-3.035C17 6.18 14.854 4 12 4S7 6.18 7 8.667c0 .611.198 1.672.627 3.035a29.994 29.994 0 001.669 4.127c.672 1.363 1.388 2.54 2.041 3.345.267.329.49.555.663.699.172-.144.396-.37.663-.699.653-.804 1.369-1.982 2.041-3.345a30.01 30.01 0 001.669-4.127zM19 8.667C19 12.349 14.66 22 12 22S5 12.349 5 8.667C5 4.985 8.134 2 12 2s7 2.985 7 6.667z"
                    fill="#fff"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 10a1 1 0 100-2 1 1 0 000 2zm3-1a3 3 0 11-6 0 3 3 0 016 0z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="main-wrap__item-child-menu--text">
            Пункты обслуживания
          </div>
        </div>
        <div class="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu">
          <div class="main-wrap__item-child-menu--icon-wrap">
            <div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  class="injected-svg"
                  data-src="assets/images/svg/ic_notification_24px.svg"
                >
                  <path d="M14.826 13.607c.093-.175.212-.335.352-.476l1.93-1.93a3.048 3.048 0 00.387-3.836l-.23-.348a1 1 0 00-.281-.281l-.347-.23A3.043 3.043 0 0014.954 6c-.805 0-1.575.312-2.156.892l-2.14 2.142a2 2 0 01-.52.375l-3.231 1.615 6.069 6.069 1.85-3.486z"></path>
                  <path d="M11.384 5.478A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-1.912 1.913a1.998 1.998 0 00-.374.519l-2.26 4.516c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l4.516-2.258a2 2 0 00.52-.375l1.912-1.912zM6.485 17.669a2 2 0 002.829 0l-2.829-2.83a2 2 0 000 2.83z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="main-wrap__item-child-menu--text">Лента уведомлений</div>
        </div> */}
    </>
  );
};

export default MainComponentMenuLeftChild;
