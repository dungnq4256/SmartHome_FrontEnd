import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    thunkControlDevice,
    thunkGetHumidity,
    thunkGetTemperature,
} from "features/Device/deviceSlice";
import { thunkGetRoomData } from "features/Room/roomSlice";

Sensor.propTypes = {
    sensorsList: PropTypes.array,
    hideRoomName: PropTypes.bool,
};

Sensor.defaultProps = {
    sensorsList: [],
    hideRoomName: true,
};

function Sensor(props) {
    const dispatch = useDispatch();
    const { sensorsList, hideRoomName } = props;
    const [temperature, setTemperature] = useState("");
    const [humidity, setHumidity] = useState("");
    const { roomsList } = useSelector((state) => state?.room);
    const renderRoomName = (id) =>
        roomsList?.filter((room) => room._id === id)[0]?.roomName;

    useEffect(() => {
        setInterval(() => {
            const fetchData = async () => {
                const res1 = await dispatch(
                    thunkGetTemperature({
                        deviceId: "6404163f8828ecf1fae97a76",
                    })
                );
                const res2 = await dispatch(
                    thunkGetHumidity({ deviceId: "64041d3ff0d9cdb60940944a" })
                );
                setTemperature(res1.payload.temperature);
                setHumidity(res2.payload.humidity);
            };
            fetchData();
        }, 10000);

        return () => {};
    }, []);

    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Cảm biến</div>
                </div>
                <div className="row">
                    {sensorsList.map((item, index) =>
                        item.deviceType === "Cảm biến nhiệt độ" ? (
                            <div className="Sensor col-12 col-sm-6" key={index}>
                                <div
                                    className="d-flex my-5 p-2 border-1 rounded-xl"
                                    style={{
                                        backgroundColor: "#F0F4F9",
                                    }}
                                >
                                    <div className="d-flex flex-column p-5">
                                        <div className="Sensor_Name">
                                            Nhiệt độ: {temperature || "__"} °C
                                        </div>
                                        <div className="Sensor_Type">
                                            {!hideRoomName &&
                                                renderRoomName(item.roomId)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : item.deviceType === "Cảm biến độ ẩm" ? (
                            <div className="Sensor col-12 col-sm-6" key={index}>
                                <div
                                    className="d-flex my-5 p-2 border-1 rounded-xl"
                                    style={{
                                        backgroundColor: "#F0F4F9",
                                    }}
                                >
                                    <div className="d-flex flex-column p-5">
                                        <div className="Sensor_Name">
                                            Độ ẩm: {humidity || "__"} %
                                        </div>
                                        <div className="Sensor_Type">
                                            {!hideRoomName &&
                                                renderRoomName(item.roomId)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="Sensor col-12 col-sm-6" key={index}>
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
                                            className="Sensor_Name"
                                            style={{
                                                color:
                                                    item.control.status &&
                                                    "#fff",
                                            }}
                                        >
                                            {item.deviceName}
                                        </div>
                                        <div
                                            className="Sensor_Type"
                                            style={{
                                                color:
                                                    item.control.status &&
                                                    "#dfdfdf",
                                            }}
                                        >
                                            {hideRoomName
                                                ? item.deviceType
                                                : renderRoomName(item.roomId)}
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
                                                            status: !item
                                                                .control.status,
                                                        },
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sensor;
