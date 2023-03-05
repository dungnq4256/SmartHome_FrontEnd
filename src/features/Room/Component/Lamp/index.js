import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkControlDevice } from "features/Device/deviceSlice";

Lamp.propTypes = {
    lampsList: PropTypes.array,
    hideRoomName: PropTypes.bool,
};

Lamp.defaultProps = {
    lampsList: [],
    hideRoomName: true,
};

function Lamp(props) {
    const { lampsList, hideRoomName } = props;
    const dispatch = useDispatch();
    const {roomsList} = useSelector(state => state?.room);
    const renderRoomName = (id) => roomsList?.filter(room => room._id === id)[0]?.roomName;
    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Thiết bị đèn</div>
                </div>
                <div className="row">
                    {lampsList.map((item, index) => (
                        <div className="Lamp col-12 col-sm-6" key={index}>
                            <div
                                className="d-flex my-5 p-2 border-1 rounded-xl"
                                style={{
                                    backgroundColor: item.control.status
                                        ? "#3D99FF"
                                        : "#F0F4F9",
                                }}
                            >
                                <div className="d-flex flex-column p-5">
                                    <div
                                        className="Lamp_Name"
                                        style={{ color: item.control.status && "#fff" }}
                                    >
                                        {item.deviceName}
                                    </div>
                                    <div className="Lamp_Type"
                                        style={{ color: item.control.status && "#dfdfdf" }}
                                    >
                                        {hideRoomName ? item.deviceType : renderRoomName(item.roomId)}
                                    </div>
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchButton
                                        value={item.control.status}
                                        onChange={async () => {
                                            await dispatch(
                                                thunkControlDevice({
                                                    deviceId: item._id,
                                                    control: {
                                                        status: !(item.control.status),
                                                    },
                                                })
                                            );
                                        }}
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

export default Lamp;
