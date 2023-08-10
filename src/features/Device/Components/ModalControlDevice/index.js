import {
    setIsOpenControlDeviceModal,
    thunkControlDevice,
} from "features/Device/deviceSlice";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ToggleSwitchControl from "general/components/ToggleSwitchControl";
import { parseInt } from "lodash";
import AppData from "general/constants/AppData";
import { useEffect } from "react";

ModalControlDevice.propTypes = {
    tab: PropTypes.string,
    light: PropTypes.object,
    airConditioner: PropTypes.object,
    fan: PropTypes.object,
};

ModalControlDevice.defaultProps = {};

function ModalControlDevice(props) {
    const { tab, light, airConditioner, fan } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpenControlDeviceModal, devicesListOfHome } = useSelector(
        (state) => state?.device
    );
    const [isTab, setIsTab] = useState(tab || "light-sensor");
    const [lightAutomatic, setLightAutomatic] = useState(
        light?.automatic || {}
    );
    const [intensityAirControl, setIntensityAirControl] = useState(
        airConditioner?.control?.intensity || 4400
    );
    const [intensityFanControl, setIntensityFanControl] = useState(
        fan?.control?.intensity || 4400
    );
    const [airAutomatic, setAirAutomatic] = useState(
        airConditioner?.automatic || {}
    );
    const [fanAutomatic, setFanAutomatic] = useState(fan?.automatic || {});

    useEffect(() => {
        setIntensityAirControl(airConditioner?.control?.intensity);
        setIntensityFanControl(fan?.control?.intensity);
        setAirAutomatic(airConditioner?.automatic);
        setFanAutomatic(fan?.automatic);
    }, []);

    // MARK: --- Functions ---
    function handleClose() {
        dispatch(setIsOpenControlDeviceModal(false));
    }
    return (
        <div className="ModalControlDevice">
            <Modal
                className=""
                show={isOpenControlDeviceModal}
                size="lg"
                onHide={handleClose}
                centered
                onExited={() => {}}
            >
                {/* header */}
                <Modal.Header className="px-5 py-5 d-flex align-items-center justify-content-center position-relative">
                    <Modal.Title className="">
                        Điều khiển thiết bị tự động
                    </Modal.Title>
                    <div
                        className="btn btn-xs btn-icon btn-light btn-hover-secondary cursor-pointer position-absolute right-0 mr-5"
                        onClick={handleClose}
                    >
                        <i className="far fa-times"></i>
                    </div>
                </Modal.Header>
                {/* body */}
                <Modal.Body className="bg-light">
                    <form className="w-100">
                        <div className="row">
                            <div className="col-6">
                                <div
                                    className={`TabControl p-3 text-center fs-4 fw-bold shadow-sm rounded-sm cursor-pointer w-100 ${
                                        isTab === "light-sensor" &&
                                        "TabControl_active"
                                    }`}
                                    onClick={() => setIsTab("light-sensor")}
                                >
                                    Cảm biến ánh sáng
                                </div>
                            </div>
                            <div className="col-6">
                                <div
                                    className={`TabControl p-3 text-center fs-4 fw-bold shadow-sm rounded-sm cursor-pointer w-100 ${
                                        isTab === "timer" && "TabControl_active"
                                    }`}
                                    onClick={() => setIsTab("timer")}
                                >
                                    Hẹn giờ
                                </div>
                            </div>
                        </div>
                        {light && (
                            <div className="d-flex mt-5 p-4 p-lg-6 border-1 bg-white shadow-sm rounded">
                                <div className="d-flex flex-column">
                                    <div className="fs-5 fw-bold">
                                        {light?.deviceName}
                                    </div>

                                    {isTab === "light-sensor" ? (
                                        <div className="d-flex mt-3 align-items-center">
                                            <div className="fs-6 me-3">
                                                Giá trị cường độ ánh sáng:
                                            </div>
                                            <input
                                                type="number"
                                                disabled={
                                                    light?.control?.lightAuto
                                                }
                                                value={
                                                    lightAutomatic?.lightValue ??
                                                    4095
                                                }
                                                min={300}
                                                max={4095}
                                                onChange={(e) =>
                                                    setLightAutomatic({
                                                        ...lightAutomatic,
                                                        lightValue:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column mt-3 align-items-start">
                                            <div className="fs-6 me-3">
                                                Tự động trong khoảng:
                                            </div>
                                            <div className="mt-3">
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        light?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        lightAutomatic?.hourFrom ??
                                                        0
                                                    }
                                                    min={0}
                                                    max={23}
                                                    onChange={(e) =>
                                                        setLightAutomatic({
                                                            ...lightAutomatic,
                                                            hourFrom:
                                                                e.target.value,
                                                        })
                                                    }
                                                />{" "}
                                                :{" "}
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        light?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        lightAutomatic?.minuteFrom ??
                                                        0
                                                    }
                                                    min={0}
                                                    max={59}
                                                    onChange={(e) =>
                                                        setLightAutomatic({
                                                            ...lightAutomatic,
                                                            minuteFrom:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                {"   "}-{">"}
                                                {"   "}
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        light?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        lightAutomatic?.hourTo ??
                                                        0
                                                    }
                                                    min={0}
                                                    max={23}
                                                    onChange={(e) =>
                                                        setLightAutomatic({
                                                            ...lightAutomatic,
                                                            hourTo: e.target
                                                                .value,
                                                        })
                                                    }
                                                />{" "}
                                                :{" "}
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        light?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        lightAutomatic?.minuteTo ??
                                                        0
                                                    }
                                                    min={0}
                                                    max={59}
                                                    onChange={(e) =>
                                                        setLightAutomatic({
                                                            ...lightAutomatic,
                                                            minuteTo:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchControl
                                        value={
                                            isTab === "light-sensor"
                                                ? light?.control?.lightAuto
                                                : light?.control?.timerAuto
                                        }
                                        onChange={() =>
                                            isTab === "light-sensor"
                                                ? dispatch(
                                                      thunkControlDevice({
                                                          deviceId: light?._id,
                                                          control: {
                                                              ...light?.control,
                                                              lightAuto:
                                                                  !light
                                                                      ?.control
                                                                      ?.lightAuto,
                                                              timerAuto: false,
                                                          },
                                                          automatic: {
                                                              ...light?.automatic,
                                                              lightValue:
                                                                  parseInt(
                                                                      lightAutomatic?.lightValue
                                                                  ),
                                                          },
                                                      })
                                                  )
                                                : dispatch(
                                                      thunkControlDevice({
                                                          deviceId: light?._id,
                                                          control: {
                                                              ...light?.control,
                                                              lightAuto: false,
                                                              timerAuto:
                                                                  !light
                                                                      ?.control
                                                                      ?.timerAuto,
                                                          },
                                                          automatic: {
                                                              ...light?.automatic,
                                                              hourFrom:
                                                                  parseInt(
                                                                      lightAutomatic?.hourFrom
                                                                  ),
                                                              minuteFrom:
                                                                  parseInt(
                                                                      lightAutomatic?.minuteFrom
                                                                  ),
                                                              hourTo: parseInt(
                                                                  lightAutomatic?.hourTo
                                                              ),
                                                              minuteTo:
                                                                  parseInt(
                                                                      lightAutomatic?.minuteTo
                                                                  ),
                                                          },
                                                      })
                                                  )
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {airConditioner && (
                            <div className="d-flex mt-5 p-4 p-lg-6 border-1 bg-white shadow-sm rounded">
                                <div className="d-flex flex-column">
                                    <div className="fs-5 fw-bold">
                                        {airConditioner?.deviceName}
                                    </div>

                                    {isTab === "light-sensor" ? (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-8 fs-6">
                                                    Điều chỉnh nhiệt độ (°C):
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        style={{
                                                            width: "6.3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            airConditioner
                                                                ?.control
                                                                ?.lightAuto ||
                                                            airConditioner
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            ((intensityAirControl -
                                                                800) /
                                                                7200) *
                                                                16 +
                                                                16 ?? 22
                                                        }
                                                        min={16}
                                                        max={32}
                                                        onChange={(e) =>
                                                            setIntensityAirControl(
                                                                ((parseInt(
                                                                    e.target
                                                                        .value
                                                                ) -
                                                                    16) /
                                                                    16) *
                                                                    7200 +
                                                                    800
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className="fs-6 col-8">
                                                    Giá trị cường độ ánh sáng:
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        type="number"
                                                        disabled={
                                                            airConditioner
                                                                ?.control
                                                                ?.lightAuto
                                                        }
                                                        value={
                                                            airAutomatic?.lightValue ??
                                                            4095
                                                        }
                                                        min={300}
                                                        max={4095}
                                                        onChange={(e) =>
                                                            setAirAutomatic({
                                                                ...airAutomatic,
                                                                lightValue:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-8 fs-6">
                                                    Điều chỉnh nhiệt độ (°C):
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        style={{
                                                            width: "6rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            airConditioner
                                                                ?.control
                                                                ?.lightAuto ||
                                                            airConditioner
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            ((intensityAirControl -
                                                                800) /
                                                                7200) *
                                                                16 +
                                                                16 ?? 22
                                                        }
                                                        min={16}
                                                        max={32}
                                                        onChange={(e) =>
                                                            setIntensityAirControl(
                                                                ((parseInt(
                                                                    e.target
                                                                        .value
                                                                ) -
                                                                    16) /
                                                                    16) *
                                                                    7200 +
                                                                    800
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column mt-3 align-items-start">
                                                <div className="fs-6 me-3">
                                                    Tự động trong khoảng:
                                                </div>
                                                <div className="mt-3">
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            airConditioner
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            airAutomatic?.hourFrom ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setAirAutomatic({
                                                                ...airAutomatic,
                                                                hourFrom:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            airConditioner
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            airAutomatic?.minuteFrom ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setAirAutomatic({
                                                                ...airAutomatic,
                                                                minuteFrom:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                    {"   "}-{">"}
                                                    {"   "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            airConditioner
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            airAutomatic?.hourTo ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setAirAutomatic({
                                                                ...airAutomatic,
                                                                hourTo: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            airConditioner
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            airAutomatic?.minuteTo ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setAirAutomatic({
                                                                ...airAutomatic,
                                                                minuteTo:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchControl
                                        value={
                                            isTab === "light-sensor"
                                                ? airConditioner?.control
                                                      ?.lightAuto
                                                : airConditioner?.control
                                                      ?.timerAuto
                                        }
                                        onChange={() =>
                                            isTab === "light-sensor"
                                                ? dispatch(
                                                      thunkControlDevice({
                                                          deviceId:
                                                              airConditioner?._id,
                                                          control: {
                                                              ...airConditioner?.control,
                                                              intensity:
                                                                  intensityAirControl,
                                                              lightAuto:
                                                                  !airConditioner
                                                                      ?.control
                                                                      ?.lightAuto,
                                                              timerAuto: false,
                                                          },
                                                          automatic: {
                                                              ...airConditioner?.automatic,
                                                              lightValue:
                                                                  parseInt(
                                                                      airAutomatic?.lightValue
                                                                  ),
                                                          },
                                                      })
                                                  )
                                                : dispatch(
                                                      thunkControlDevice({
                                                          deviceId:
                                                              airConditioner?._id,
                                                          control: {
                                                              ...airConditioner?.control,
                                                              intensity:
                                                                  intensityAirControl,
                                                              lightAuto: false,
                                                              timerAuto:
                                                                  !airConditioner
                                                                      ?.control
                                                                      ?.timerAuto,
                                                          },
                                                          automatic: {
                                                              ...airConditioner?.automatic,
                                                              hourFrom:
                                                                  parseInt(
                                                                      airAutomatic?.hourFrom
                                                                  ),
                                                              minuteFrom:
                                                                  parseInt(
                                                                      airAutomatic?.minuteFrom
                                                                  ),
                                                              hourTo: parseInt(
                                                                  airAutomatic?.hourTo
                                                              ),
                                                              minuteTo:
                                                                  parseInt(
                                                                      airAutomatic?.minuteTo
                                                                  ),
                                                          },
                                                      })
                                                  )
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {fan && (
                            <div className="d-flex mt-5 p-4 p-lg-6 border-1 bg-white shadow-sm rounded">
                                <div className="d-flex flex-column">
                                    <div className="fs-5 fw-bold">
                                        {fan?.deviceName}
                                    </div>

                                    {isTab === "light-sensor" ? (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-8 fs-6">
                                                    Chọn chế độ:
                                                </div>
                                                <div className="col-4">
                                                    <select
                                                        className="p-1"
                                                        name="selectFanOption"
                                                        id=""
                                                    >
                                                        {AppData.fanOptions.map(
                                                            (option) => (
                                                                <option
                                                                    className="p-1"
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                    selected={
                                                                        parseInt(
                                                                            option.value
                                                                        ) ===
                                                                        intensityFanControl
                                                                    }
                                                                    onClick={() =>
                                                                        setIntensityFanControl(
                                                                            parseInt(
                                                                                option.value
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        option.text
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className="fs-6 col-8">
                                                    Giá trị cường độ ánh sáng:
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        type="number"
                                                        disabled={
                                                            fan?.control
                                                                ?.lightAuto
                                                        }
                                                        value={
                                                            fanAutomatic?.lightValue ??
                                                            4095
                                                        }
                                                        min={300}
                                                        max={4095}
                                                        onChange={(e) =>
                                                            setFanAutomatic({
                                                                ...fanAutomatic,
                                                                lightValue:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-8 fs-6">
                                                    Chọn chế độ:
                                                </div>
                                                <div className="col-4">
                                                    <select
                                                        disabled={
                                                            fan?.control
                                                                ?.lightAuto ||
                                                            fan?.control
                                                                ?.timerAuto
                                                        }
                                                        className="p-1"
                                                        name="selectFanOption"
                                                        id=""
                                                    >
                                                        {AppData.fanOptions.map(
                                                            (option) => (
                                                                <option
                                                                    className="p-1"
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                    selected={
                                                                        parseInt(
                                                                            option.value
                                                                        ) ===
                                                                        intensityFanControl
                                                                    }
                                                                    onClick={() =>
                                                                        setIntensityFanControl(
                                                                            parseInt(
                                                                                option.value
                                                                            )
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        option.text
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column mt-3 align-items-start">
                                                <div className="fs-6 me-3">
                                                    Tự động trong khoảng:
                                                </div>
                                                <div className="mt-3">
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            fan?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            fanAutomatic?.hourFrom ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setFanAutomatic({
                                                                ...fanAutomatic,
                                                                hourFrom:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            fan?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            fanAutomatic?.minuteFrom ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setFanAutomatic({
                                                                ...fanAutomatic,
                                                                minuteFrom:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                    {"   "}-{">"}
                                                    {"   "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            fan?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            fanAutomatic?.hourTo ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setFanAutomatic({
                                                                ...fanAutomatic,
                                                                hourTo: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            fan?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            fanAutomatic?.minuteTo ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setFanAutomatic({
                                                                ...fanAutomatic,
                                                                minuteTo:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchControl
                                        value={
                                            isTab === "light-sensor"
                                                ? fan?.control?.lightAuto
                                                : fan?.control?.timerAuto
                                        }
                                        onChange={() =>
                                            isTab === "light-sensor"
                                                ? dispatch(
                                                      thunkControlDevice({
                                                          deviceId: fan?._id,
                                                          control: {
                                                              ...fan?.control,
                                                              intensity:
                                                                  intensityFanControl,
                                                              lightAuto:
                                                                  !fan?.control
                                                                      ?.lightAuto,
                                                              timerAuto: false,
                                                          },
                                                          automatic: {
                                                              ...fan?.automatic,
                                                              lightValue:
                                                                  parseInt(
                                                                      fanAutomatic?.lightValue
                                                                  ),
                                                          },
                                                      })
                                                  )
                                                : dispatch(
                                                      thunkControlDevice({
                                                          deviceId: fan?._id,
                                                          control: {
                                                              ...fan?.control,
                                                              intensity:
                                                                  intensityFanControl,
                                                              lightAuto: false,
                                                              timerAuto:
                                                                  !fan?.control
                                                                      ?.timerAuto,
                                                          },
                                                          automatic: {
                                                              ...fan?.automatic,
                                                              hourFrom:
                                                                  parseInt(
                                                                      fanAutomatic?.hourFrom
                                                                  ),
                                                              minuteFrom:
                                                                  parseInt(
                                                                      fanAutomatic?.minuteFrom
                                                                  ),
                                                              hourTo: parseInt(
                                                                  fanAutomatic?.hourTo
                                                              ),
                                                              minuteTo:
                                                                  parseInt(
                                                                      fanAutomatic?.minuteTo
                                                                  ),
                                                          },
                                                      })
                                                  )
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </Modal.Body>
                {/* footer */}
                <Modal.Footer>
                    <div className="w-100 d-flex row">
                        <Button
                            className="font-weight-bold flex-grow-1 col mr-3 AppButton"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            {`Đóng`}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalControlDevice;
