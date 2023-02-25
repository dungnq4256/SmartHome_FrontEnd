import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";

Lamp.propTypes = {
    lampsList: PropTypes.array,
};

Lamp.defaultProps = {
    lampsList: [],
};

function Lamp(props) {
    const { lampsList } = props;
    const [valueLamp, setValueLamp] = useState(true);
    console.log(valueLamp);
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
                                    backgroundColor: valueLamp
                                        ? "#2459FF"
                                        : "#F0F4F9",
                                }}
                            >
                                <div className="d-flex flex-column p-5">
                                    <div
                                        className="Lamp_Name"
                                        style={{ color: valueLamp && "#fff" }}
                                    >
                                        {item.deviceName}
                                    </div>
                                    <div className="Lamp_Type">
                                        {item.deviceType}
                                    </div>
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchButton
                                        // value={item.control.status}
                                        value={valueLamp}
                                        onChange={() =>
                                            setValueLamp(!valueLamp)
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

export default Lamp;
