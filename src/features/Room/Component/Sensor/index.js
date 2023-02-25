import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";

Sensor.propTypes = {
    sensorsList: PropTypes.array,
};

Sensor.defaultProps = {
    sensorsList: [],
};

function Sensor(props) {
    const { sensorsList } = props;
    const [valueSensor, setValueSensor] = useState(true);
    console.log(valueSensor);
    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Cảm biến</div>
                </div>
                <div className="row">
                    {sensorsList.map((item, index) =>
                        item.deviceType === "Cảm biến nhiệt độ và độ ẩm" ? (
                            <div className="Sensor col-12 col-sm-6" key={index}>
                                <div
                                    className="d-flex my-5 p-2 border-1 rounded-xl"
                                    style={{
                                        backgroundColor: "#F0F4F9",
                                    }}
                                >
                                    <div className="d-flex flex-column p-5">
                                        <div
                                            className="Sensor_Name"
                                        >
                                            Nhiệt độ: 21 °C
                                        </div>
                                        <div className="Sensor_Name">
                                            Độ ẩm: 70 % 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="Sensor col-12 col-sm-6" key={index}>
                                <div
                                    className="d-flex my-5 p-2 border-1 rounded-xl"
                                    style={{
                                        backgroundColor: valueSensor
                                            ? "#2459FF"
                                            : "#F0F4F9",
                                    }}
                                >
                                    <div className="d-flex flex-column p-5">
                                        <div
                                            className="Sensor_Name"
                                            style={{
                                                color: valueSensor && "#fff",
                                            }}
                                        >
                                            {item.deviceName}
                                        </div>
                                        <div className="Sensor_Type">
                                            {item.deviceType}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-fill justify-content-end">
                                        <ToggleSwitchButton
                                            // value={item.control.status}
                                            value={valueSensor}
                                            onChange={() =>
                                                setValueSensor(!valueSensor)
                                            }
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
