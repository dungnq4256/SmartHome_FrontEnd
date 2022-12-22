import { LogoDark, ShowSideBar, ShowSideBarActive } from "assets/icons/Icons";
import UserHelper from "general/helpers/UserHelper";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../../../assets/images/avatar.png";
import BasePopup from "../BasePopup";
import "./style.scss";

HeaderLandingPage.propTypes = {
    loggedIn: PropTypes.bool,
    showSideBarMobile: PropTypes.bool,
};

HeaderLandingPage.defaultProps = {
    loggedIn: false,
    showSideBarMobile: false,
};

function HeaderLandingPage(props) {
    const { showSideBarMobile } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedIn = UserHelper.checkAccessTokenValid();
    let [showPopupLogOut, setShowPopupLogOut] = useState(false);
    let [showSideBar, setShowSideBar] = useState(showSideBarMobile);

    //Logout
    // const handleLogOut = async () => {
    //     const result = await dispatch(thunkSignOut());
    //     setShowPopupLogOut(!showPopupLogOut);
    //     navigate("/");
    // };

    const handleShowPopupLogOut = () => {
        setShowPopupLogOut(!showPopupLogOut);
    };
    const sendData = () => {
        props.parentCallback(showSideBar);
    };
    const handleShowSideBar = () => {
        setShowSideBar(!showSideBar);
        sendData();
    };
    function handleNavigate(url) {
        navigate(url);
    }
    return (
        <div
            className="HeaderLandingPage d-flex align-items-center sticky-top shadow-sm px-5 py-3 ps-5 bg-body"
            style={{ height: "60px" }}
        >
            <div
                className="btnShowSideBar d-flex d-lg-none ms-1 me-3"
                onClick={handleShowSideBar}
            >
                {!showSideBar && <ShowSideBar />}
                {showSideBar && <ShowSideBarActive />}
            </div>
            <NavLink to="/" className="d-flex d-lg-none align-items-center">
                <LogoDark />
            </NavLink>

            <div className="d-flex flex-fill justify-content-end">
                <input type="checkbox" id="dropdownMenu-loggedIn" />
                <label
                    className="m-0"
                    htmlFor="dropdownMenu-loggedIn"
                    id="overlay-button"
                >
                    <img
                        src={avatar}
                        style={{
                            height: "40px",
                            marginRight: "2rem",
                            borderRadius: "5px",
                        }}
                        alt="Ảnh đại diện"
                    />
                </label>
                <div id="overlay">
                    <ul className="d-flex flex-column justify-content-center align-items-center ps-0 m-0 text-start">
                        <li>
                            <div className="d-flex align-items-center ms-2 py-4">
                                <img
                                    src={avatar}
                                    style={{
                                        height: "50px",
                                        borderRadius: "8px",
                                    }}
                                    alt=""
                                />
                                <div className="d-flex flex-column ms-3">
                                    <div className="fs-6 fw-bold pt-2">
                                        Nguyễn Quang Dũng
                                    </div>
                                    <div className="fs-6 pt-1">
                                        dunghlhh@gmail.com
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <NavLink className="dropdownMenuItem" to="#">
                                <i className="far fa-user-circle mr-4"></i>
                                Thông tin cá nhân
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="dropdownMenuItem" to="#">
                                <i className="fas fa-house-user mr-4"></i>
                                Quản lý nhà
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="dropdownMenuItem" to="#">
                                <i className="far fa-unlock-alt mr-4"></i>
                                Đổi mật khẩu
                            </NavLink>
                        </li>
                        <li className="border-bottom-0">
                            <div
                                className="dropdownMenuItem"
                                onClick={handleShowPopupLogOut}
                            >
                                <i className="far fa-sign-out mr-4"></i>
                                Đăng xuất
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {showPopupLogOut && (
                <BasePopup
                    title="Đăng xuất"
                    icon="fas fa-sign-out-alt"
                    description="Bạn có chắc chắn muốn đăng xuất?"
                    funcOut={handleShowPopupLogOut}
                />
            )}
        </div>
    );
}

export default HeaderLandingPage;
