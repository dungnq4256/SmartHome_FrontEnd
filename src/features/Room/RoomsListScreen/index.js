import { thunkGetDevicesListOfHome } from "features/Device/deviceSlice";
import BaseLayout from "general/components/BaseLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AirConditioner from "../Component/AirConditioner";
import Camera from "../Component/Camera";
import ElectricalDevice from "../Component/ElectricalDevice";
import Lamp from "../Component/Lamp";
import ModalCreateRoom from "../Component/ModalCreateRoom";
import PowerSwitch from "../Component/PowerSwitch";
import Security from "../Component/Security";
import Sensor from "../Component/Sensor";
import { thunkGetRoomData, thunkGetRoomsList } from "../roomSlice";
import "./style.scss";

RoomsListScreen.propTypes = {};

function RoomsListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentHome } = useSelector((state) => state?.home);
    // const { roomsList, currentRoom, isGettingRoomData } = useSelector(
    //     (state) => state?.room
    // );
    const { devicesListOfHome, isGettingDevicesList } = useSelector(
        (state) => state?.device
    );
    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false);
    const [selected, setSelected] = useState(() =>
        currentHome.length > 0 ? currentHome?.roomsList[0]?._id : ""
    );
    const deviceListOfCurrentRoom = devicesListOfHome?.filter(
        (device) => device.roomId === selected
    );

    useEffect(() => {
        document.title = "Trang danh sách phòng | SHOME";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(
                thunkGetDevicesListOfHome({ homeId: currentHome._id })
            );
        };
        fetchData();
        return () => {};
    }, [currentHome._id]);

    return (
        <BaseLayout selected="rooms-list">
            <div className="container-xxl">
                <div className="d-flex flex-column">
                    <div
                        className="d-flex p-3 rounded-lg shadow"
                        style={{ backgroundColor: "#fff" }}
                    >
                        <div className="d-flex">
                            {currentHome?.roomsList?.map((room, index) => (
                                <div
                                    key={index}
                                    className={`ButtonNavigateRoom ${
                                        selected === room?._id &&
                                        "ButtonNavigateRoom_active"
                                    }`}
                                    onClick={() => {
                                        setSelected(room?._id);
                                    }}
                                >
                                    {room?.roomName}
                                </div>
                            ))}
                        </div>
                        <div className="d-flex flex-fill justify-content-end align-items-center">
                            <button
                                className="ButtonPrimary"
                                onClick={() => setShowModalCreateRoom(true)}
                            >
                                Thêm phòng
                            </button>
                        </div>
                    </div>
                    {isGettingDevicesList ? (
                        <div className="d-flex mt-15 justify-content-center align-items-center">
                            <div
                                className="spinner-border text-primary"
                                style={{ width: "3rem", height: "3rem" }}
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg">
                            {deviceListOfCurrentRoom.length > 0 ? (
                                <div className="row">
                                    {deviceListOfCurrentRoom?.filter(
                                        (device) =>
                                            device.deviceType ===
                                                "Cảm biến nhiệt độ" ||
                                            device.deviceType ===
                                                "Cảm biến khói" ||
                                            device.deviceType ===
                                                "Cảm biến độ ẩm" ||
                                            device.deviceType ===
                                                "Cảm biến động tĩnh"
                                    ).length > 0 && (
                                        <Sensor
                                            sensorsList={deviceListOfCurrentRoom?.filter(
                                                (device) =>
                                                    device.deviceType ===
                                                        "Cảm biến nhiệt độ" ||
                                                    device.deviceType ===
                                                        "Cảm biến khói" ||
                                                    device.deviceType ===
                                                        "Cảm biến độ ẩm" ||
                                                    device.deviceType ===
                                                        "Cảm biến động tĩnh"
                                            )}
                                        />
                                    )}
                                    {deviceListOfCurrentRoom?.filter(
                                        (device) =>
                                            device.deviceType === "Bóng đèn" ||
                                            device.deviceType === "Dải đèn" ||
                                            device.deviceType === "Đèn bàn" ||
                                            device.deviceType === "Đèn ngủ"
                                    ).length > 0 && (
                                        <Lamp
                                            lampsList={deviceListOfCurrentRoom?.filter(
                                                (device) =>
                                                    device.deviceType ===
                                                        "Bóng đèn" ||
                                                    device.deviceType ===
                                                        "Dải đèn" ||
                                                    device.deviceType ===
                                                        "Đèn bàn" ||
                                                    device.deviceType ===
                                                        "Đèn ngủ"
                                            )}
                                        />
                                    )}
                                    {deviceListOfCurrentRoom?.filter(
                                        (device) =>
                                            device.deviceType === "Camera"
                                    ).length > 0 &&
                                        deviceListOfCurrentRoom
                                            ?.filter(
                                                (device) =>
                                                    device.deviceType ===
                                                    "Camera"
                                            )
                                            .map((item) => (
                                                <Camera
                                                    key={item._id}
                                                    deviceItem={item}
                                                />
                                            ))}
                                    {deviceListOfCurrentRoom?.filter(
                                        (device) =>
                                            device.deviceType === "Máy lạnh"
                                    ).length > 0 &&
                                        deviceListOfCurrentRoom
                                            ?.filter(
                                                (device) =>
                                                    device.deviceType ===
                                                    "Máy lạnh"
                                            )
                                            .map((item) => (
                                                <AirConditioner
                                                    key={item._id}
                                                    deviceItem={item}
                                                />
                                            ))}

                                    {deviceListOfCurrentRoom?.filter(
                                        (device) =>
                                            device.deviceType ===
                                                "Chuông chống trộm" ||
                                            device.deviceType === "Khóa cửa" ||
                                            device.deviceType ===
                                                "Két sắt an toàn"
                                    ).length > 0 && (
                                        <Security
                                            devicesList={deviceListOfCurrentRoom?.filter(
                                                (device) =>
                                                    device.deviceType ===
                                                        "Chuông chống trộm" ||
                                                    device.deviceType ===
                                                        "Khóa cửa" ||
                                                    device.deviceType ===
                                                        "Két sắt an toàn"
                                            )}
                                        />
                                    )}
                                    {deviceListOfCurrentRoom?.filter(
                                        (device) =>
                                            device.deviceType === "Quạt" ||
                                            device.deviceType ===
                                                "Máy lọc không khí" ||
                                            device.deviceType === "Máy hút ẩm"
                                    ).length > 0 && (
                                        <ElectricalDevice
                                            devicesList={deviceListOfCurrentRoom?.filter(
                                                (device) =>
                                                    device.deviceType ===
                                                        "Quạt" ||
                                                    device.deviceType ===
                                                        "Máy lọc không khí" ||
                                                    device.deviceType ===
                                                        "Máy hút ẩm"
                                            )}
                                        />
                                    )}
                                    {deviceListOfCurrentRoom?.filter(
                                        (device) =>
                                            device.deviceType === "Công tắc" ||
                                            device.deviceType ===
                                                "Ổ cắm"
                                    ).length > 0 && (
                                        <PowerSwitch
                                            devicesList={deviceListOfCurrentRoom?.filter(
                                                (device) =>
                                                device.deviceType === "Công tắc" ||
                                                device.deviceType ===
                                                    "Ổ cắm"
                                            )}
                                        />
                                    )}
                                </div>
                            ) : (
                                selected.length > 0 && (
                                    <div className="d-flex justify-content-center align-items-center fs-4 mt-30">
                                        Chưa có thiết bị
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ModalCreateRoom
                onClose={() => setShowModalCreateRoom(false)}
                show={showModalCreateRoom}
                homeId={currentHome?._id}
            />
        </BaseLayout>
    );
}

export default RoomsListScreen;
