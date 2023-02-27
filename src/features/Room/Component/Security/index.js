import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";
import { useSelector } from "react-redux";

Security.propTypes = {
    hideRoomName: PropTypes.bool,
    devicesList: PropTypes.array,
};

Security.defaultProps = {
    hideRoomName: true,
    devicesList: [],
};

function Security(props) {
    const { devicesList, hideRoomName } = props;
    const [valueSecurity, setValueSecurity] = useState(true);
    const {roomsList} = useSelector(state => state?.room);
    const renderRoomName = (id) => roomsList?.filter(room => room._id === id)[0]?.roomName;
    console.log(valueSecurity);
    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Thiết bị bảo vệ</div>
                </div>
                <div className="row">
                    {devicesList.map((item, index) => (
                        <div className="Security col-12 col-sm-6" key={index}>
                            <div
                                className="d-flex my-5 p-2 border-1 rounded-xl"
                                style={{
                                    backgroundColor: valueSecurity
                                        ? "#3D99FF"
                                        : "#F0F4F9",
                                }}
                            >
                                <div className="d-flex flex-column p-5">
                                    <div
                                        className="Security_Name"
                                        style={{
                                            color: valueSecurity && "#fff",
                                        }}
                                    >
                                        {item.deviceName}
                                    </div>
                                    <div
                                        className="Security_Type"
                                        style={{
                                            color: valueSecurity && "#dfdfdf",
                                        }}
                                    >
                                        {hideRoomName ? item.deviceType : renderRoomName(item.roomId)}
                                    </div>
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchButton
                                        // value={item.control.status}
                                        value={valueSecurity}
                                        onChange={() =>
                                            setValueSecurity(!valueSecurity)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Security;
