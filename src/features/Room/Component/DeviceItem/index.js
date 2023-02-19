import React from "react";
import PropTypes from "prop-types";

DeviceItem.propTypes = {
    deviceName: PropTypes.string,
    deviceType: PropTypes.string,
    deviceControl: PropTypes.func,
};

DeviceItem.defaultProps = {
    deviceName: "",
    deviceType: "",
    deviceControl: null,
};

function DeviceItem(props) {
    const { deviceName, deviceType, deviceControl } = props;
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                <div className="fs-5 fw-bold mb-3">{deviceName}</div>
                <div className="fs-5 fw-bold mb-3">Loại: {deviceType}</div>
            </div>
        </div>
    );
}

export default DeviceItem;
