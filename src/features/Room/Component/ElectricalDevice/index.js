import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkControlDevice } from "features/Device/deviceSlice";
import ToggleSwitchControl from "general/components/ToggleSwitchControl";

ElectricalDevice.propTypes = {
    deviceItem: PropTypes.object,
    hideRoomName: PropTypes.bool,
};

ElectricalDevice.defaultProps = {
    deviceItem: null,
    hideRoomName: true,
};

function ElectricalDevice(props) {
    const { deviceItem, hideRoomName } = props;
    const dispatch = useDispatch();
    const [mode, setMode] = useState(deviceItem?.control?.intensity);
    const [controlED, setControlED] = useState(deviceItem?.control?.status);
    const { roomsList } = useSelector((state) => state?.room);
    const renderRoomName = (id) =>
        roomsList?.filter((room) => room._id === id)[0]?.roomName;

        useEffect(() => {
            const handleControlED = async () => {
                await dispatch(
                    thunkControlDevice({
                        deviceId: deviceItem._id,
                        control: {
                            status: controlED,
                            intensity: mode,
                        },
                    })
                );
            };
            handleControlED();
    
            return () => {};
        }, [controlED]);
    
        useEffect(() => {
            const handleControlEDD = async () => {
                deviceItem?.control?.status &&
                    (await dispatch(
                        thunkControlDevice({
                            deviceId: deviceItem._id,
                            control: {
                                status: true,
                                intensity: mode,
                            },
                        })
                    ));
            };
            handleControlEDD();
    
            return () => {};
        }, [mode]);

    return (
        <div className="ElectricalDevice col-12">
            <div
                className="d-flex my-5 p-2 border-1 rounded-xl"
                style={{
                    backgroundColor: "#F0F4F9",
                }}
            >
                <div className="d-flex flex-column p-5">
                    <div className="ElectricalDevice_Name">
                        {deviceItem?.deviceName}{" "}
                        {!hideRoomName && (
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    color: "#bdbdbd",
                                }}
                            >
                                {" - "}
                                {renderRoomName(deviceItem?.roomId)}
                            </span>
                        )}
                    </div>
                    <div className="ElectricalDevice_Type">
                        <p className="mt-2 mb-1">Chế độ</p>
                        <div>
                            <button
                                className={`${
                                    mode === 200
                                        ? "ButtonPrimary"
                                        : "ButtonCancel"
                                } me-2`}
                                onClick={() => setMode(200)}
                            >
                                1
                            </button>
                            <button
                                className={`${
                                    mode === 500
                                        ? "ButtonPrimary"
                                        : "ButtonCancel"
                                } me-2`}
                                onClick={() => setMode(500)}
                            >
                                2
                            </button>
                            <button
                                className={`${
                                    mode === 800
                                        ? "ButtonPrimary"
                                        : "ButtonCancel"
                                } me-2`}
                                onClick={() => setMode(800)}
                            >
                                3
                            </button>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-fill justify-content-end">
                    <ToggleSwitchControl
                        value={controlED}
                        onChange={() => setControlED(!controlED)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ElectricalDevice;
