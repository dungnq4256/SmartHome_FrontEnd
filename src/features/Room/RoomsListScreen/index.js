import { thunkGetDevicesList } from "features/Device/deviceSlice";
import BaseLayout from "general/components/BaseLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AirConditioner from "../Component/AirConditioner";
import Camera from "../Component/Camera";
import Lamp from "../Component/Lamp";
import ModalCreateRoom from "../Component/ModalCreateRoom";
import Security from "../Component/Security";
import Sensor from "../Component/Sensor";
import { thunkGetRoomData, thunkGetRoomsList } from "../roomSlice";
import "./style.scss";

RoomsListScreen.propTypes = {};

function RoomsListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentHome } = useSelector((state) => state?.home);
    const { roomsList, currentRoom, isGettingRoomData } = useSelector(
        (state) => state?.room
    );
    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false);
    const [selected, setSelected] = useState(roomsList[0]?._id ?? "");

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetRoomsList({ homeId: currentHome._id }));
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
                            {roomsList?.map((room, index) => (
                                <div
                                    key={index}
                                    className={`ButtonNavigateRoom ${
                                        selected === room?._id &&
                                        "ButtonNavigateRoom_active"
                                    }`}
                                    onClick={() => {
                                        setSelected(room?._id);
                                        dispatch(
                                            thunkGetRoomData({
                                                roomId: room?._id,
                                            })
                                        );
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
                    {isGettingRoomData ? (
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
                            <div className="row">
                                <AirConditioner />
                            {currentRoom?.devicesList?.filter(
                                    (device) =>
                                        device.deviceType === "Cảm biến nhiệt độ và độ ẩm" ||
                                        device.deviceType === "Cảm biến khói" ||
                                        device.deviceType === "Cảm biến độ sáng" ||
                                        device.deviceType === "Cảm biến động tĩnh"
                                ).length > 0 && (
                                    <Sensor
                                        sensorsList={currentRoom?.devicesList?.filter(
                                            (device) =>
                                                device.deviceType ===
                                                    "Cảm biến nhiệt độ và độ ẩm" ||
                                                device.deviceType ===
                                                    "Cảm biến khói" ||
                                                device.deviceType ===
                                                    "Cảm biến độ sáng" ||
                                                device.deviceType === "Cảm biến động tĩnh"
                                        )}
                                    />
                                )}
                                {currentRoom?.devicesList?.filter(
                                    (device) =>
                                        device.deviceType === "Bóng đèn" ||
                                        device.deviceType === "Dải đèn" ||
                                        device.deviceType === "Đèn bàn" ||
                                        device.deviceType === "Đèn ngủ"
                                ).length > 0 && (
                                    <Lamp
                                        lampsList={currentRoom?.devicesList?.filter(
                                            (device) =>
                                                device.deviceType ===
                                                    "Bóng đèn" ||
                                                device.deviceType ===
                                                    "Dải đèn" ||
                                                device.deviceType ===
                                                    "Đèn bàn" ||
                                                device.deviceType === "Đèn ngủ"
                                        )}
                                    />
                                )}
                                {currentRoom?.devicesList?.filter(
                                    (device) => device.deviceType === "Camera"
                                ).length > 0 &&
                                    currentRoom?.devicesList
                                        ?.filter(
                                            (device) =>
                                                device.deviceType === "Camera"
                                        )
                                        .map((item) => (
                                            <Camera
                                                key={item._id}
                                                deviceName={item.deviceName}
                                                deviceType={item.deviceType}
                                            />
                                        ))}
                                {currentRoom?.devicesList?.filter(
                                    (device) =>
                                        device.deviceType ===
                                            "Chuông chống trộm" ||
                                        device.deviceType === "Khóa cửa" ||
                                        device.deviceType === "Két sắt an toàn"
                                ).length > 0 && (
                                    <Security
                                        devicesList={currentRoom?.devicesList?.filter(
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
                            </div>
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
