import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";
import {
    CircularInput,
    CircularTrack,
    CircularProgress,
    CircularThumb,
} from "react-circular-input";

AirConditioner.propTypes = {
    deviceItem: PropTypes.object,
};

AirConditioner.defaultProps = {
    deviceItem: null,
};

function AirConditioner(props) {
    const { deviceItem } = props;
    const [valueAirConditioner, setValueAirConditioner] = useState(true);
    const [value, setValue] = useState(0.25);
    console.log(valueAirConditioner);
    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Máy lạnh</div>
                </div>
                <div className="row">
                    <div className="AirConditioner col-12 col-sm-6">
                        <div className="d-flex my-5 p-2 border-1 rounded-xl">
                            <div className="d-flex flex-column p-5">
                                <div
                                    className="AirConditioner_Name"
                                    style={{
                                        color: valueAirConditioner && "#fff",
                                    }}
                                ></div>
                                <div className="AirConditioner_Type"></div>
                            </div>
                            <div className="d-flex flex-fill justify-content-end">
                                <CircularInput
                                    value={value}
                                    onChange={setValue}
                                >
                                    <CircularTrack />
                                    <CircularProgress />
                                    <CircularThumb 
                                    r="15"
                                    fill="white"
              stroke="rgb(61, 153, 255)"
              strokeWidth="5"/>
                                </CircularInput>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AirConditioner;
