import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import "./style.scss";

Camera.propTypes = {
    deviceName: PropTypes.string,
    deviceType: PropTypes.string,
};

Camera.defaultProps = {
    deviceName: "",
    deviceType: "",
};

function Camera(props) {
    const { deviceName, deviceType } = props;
    let startWebCam = function () {
        let video = document.getElementById("video"),
            vendorURL = window.URL || window.webkitURL;

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    console.log("Something went wrong");
                });
        }
    };
    useEffect(() => {
        startWebCam();
        return () => {};
    }, []);

    return (
        <div className="Camera col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3 align-items-end">
                    <div className="Camera_Name me-1">{deviceName}</div>
                </div>
                <div>
                    <video
                        className="rounded-xl"
                        id="video"
                        height="100%"
                        width="100%"
                        autoPlay
                    ></video>
                </div>
            </div>
        </div>
    );
}

export default Camera;
