import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkControlDevice } from "features/Device/deviceSlice";

ElectricalDevice.propTypes = {
    devicesList: PropTypes.array,
    hideRoomName: PropTypes.bool,
};

ElectricalDevice.defaultProps = {
    devicesList: [],
    hideRoomName: true,
};

function ElectricalDevice(props) {
    const { devicesList, hideRoomName } = props;
    const dispatch = useDispatch();
    const [mode, setMode] = useState(1);
    const { roomsList } = useSelector((state) => state?.room);
    const renderRoomName = (id) =>
        roomsList?.filter((room) => room._id === id)[0]?.roomName;
    return (
        <div className="col-12">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Thiết bị điện</div>
                </div>
                <div className="row">
                    {devicesList.map((item, index) => (
                        <div
                            className="ElectricalDevice col-12 col-md-6"
                            key={index}
                        >
                            <div
                                className="d-flex my-5 p-2 border-1 rounded-xl"
                                style={{
                                    backgroundColor: "#F0F4F9",
                                }}
                            >
                                <div className="d-flex flex-column p-5">
                                    <div className="ElectricalDevice_Name">
                                        {item.deviceName}{" "}
                                        {!hideRoomName && <span
                                            style={{
                                                fontSize: "0.85rem",
                                                fontWeight: "500",
                                                color: "#bdbdbd",
                                            }}
                                        >
                                            {" - "}
                                            {renderRoomName(item.roomId)}
                                        </span>}
                                    </div>
                                    <div className="ElectricalDevice_Type">
                                        <p className="mt-2 mb-1">Chế độ</p>
                                        <div>
                                            <button
                                                className={`${
                                                    mode === 1
                                                        ? "ButtonPrimary"
                                                        : "ButtonCancel"
                                                } me-2`}
                                                onClick={() => setMode(1)}
                                            >
                                                1
                                            </button>
                                            <button
                                                className={`${
                                                    mode === 2
                                                        ? "ButtonPrimary"
                                                        : "ButtonCancel"
                                                } me-2`}
                                                onClick={() => setMode(2)}
                                            >
                                                2
                                            </button>
                                            <button
                                                className={`${
                                                    mode === 3
                                                        ? "ButtonPrimary"
                                                        : "ButtonCancel"
                                                } me-2`}
                                                onClick={() => setMode(3)}
                                            >
                                                3
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchButton
                                        deviceItem={item}
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

export default ElectricalDevice;
