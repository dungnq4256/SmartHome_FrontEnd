import AirConditioner from "features/Room/Component/AirConditioner";
import Camera from "features/Room/Component/Camera";
import ElectricalDevice from "features/Room/Component/ElectricalDevice";
import Lamp from "features/Room/Component/Lamp";
import Security from "features/Room/Component/Security";
import Sensor from "features/Room/Component/Sensor";
import { thunkGetRoomsList } from "features/Room/roomSlice";
import BaseLayout from "general/components/BaseLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetDevicesListOfHome } from "../deviceSlice";
import "./style.scss";

DevicesListScreen.propTypes = {};

function DevicesListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentHome } = useSelector((state) => state?.home);
    const { devicesListOfHome, isGettingDevicesList } = useSelector(
        (state) => state?.device
    );
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetRoomsList({ homeId: currentHome._id }));
            await dispatch(
                thunkGetDevicesListOfHome({ homeId: currentHome._id })
            );
        };
        fetchData();
        return () => {};
    }, [currentHome._id]);

    return (
        <BaseLayout selected="devices-list">
            <div className="container-xxl">
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
                ) : devicesListOfHome.length > 0 ? (
                    <div className="rounded-lg">
                        <div className="row">
                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType ===
                                        "Cảm biến nhiệt độ và độ ẩm" ||
                                    device.deviceType === "Cảm biến khói" ||
                                    device.deviceType === "Cảm biến độ sáng" ||
                                    device.deviceType === "Cảm biến động tĩnh"
                            ).length > 0 && (
                                <Sensor
                                    hideRoomName={false}
                                    sensorsList={devicesListOfHome?.filter(
                                        (device) =>
                                            device.deviceType ===
                                                "Cảm biến nhiệt độ và độ ẩm" ||
                                            device.deviceType ===
                                                "Cảm biến khói" ||
                                            device.deviceType ===
                                                "Cảm biến độ sáng" ||
                                            device.deviceType ===
                                                "Cảm biến động tĩnh"
                                    )}
                                />
                            )}
                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType === "Bóng đèn" ||
                                    device.deviceType === "Dải đèn" ||
                                    device.deviceType === "Đèn bàn" ||
                                    device.deviceType === "Đèn ngủ"
                            ).length > 0 && (
                                <Lamp
                                    hideRoomName={false}
                                    lampsList={devicesListOfHome?.filter(
                                        (device) =>
                                            device.deviceType === "Bóng đèn" ||
                                            device.deviceType === "Dải đèn" ||
                                            device.deviceType === "Đèn bàn" ||
                                            device.deviceType === "Đèn ngủ"
                                    )}
                                />
                            )}
                            {devicesListOfHome?.filter(
                                (device) => device.deviceType === "Camera"
                            ).length > 0 &&
                                devicesListOfHome
                                    ?.filter(
                                        (device) =>
                                            device.deviceType === "Camera"
                                    )
                                    .map((item) => (
                                        <Camera
                                            key={item._id}
                                            hideRoomName={false}
                                            deviceItem={item}
                                        />
                                    ))}
                            {devicesListOfHome?.filter(
                                (device) => device.deviceType === "Máy lạnh"
                            ).length > 0 &&
                                devicesListOfHome
                                    ?.filter(
                                        (device) =>
                                            device.deviceType === "Máy lạnh"
                                    )
                                    .map((item) => (
                                        <AirConditioner
                                            key={item._id}
                                            hideRoomName={false}
                                            deviceItem={item}
                                        />
                                    ))}

                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType === "Chuông chống trộm" ||
                                    device.deviceType === "Khóa cửa" ||
                                    device.deviceType === "Két sắt an toàn"
                            ).length > 0 && (
                                <Security
                                    hideRoomName={false}
                                    devicesList={devicesListOfHome?.filter(
                                        (device) =>
                                            device.deviceType ===
                                                "Chuông chống trộm" ||
                                            device.deviceType === "Khóa cửa" ||
                                            device.deviceType ===
                                                "Két sắt an toàn"
                                    )}
                                />
                            )}
                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType === "Quạt" ||
                                    device.deviceType === "Máy lọc không khí" ||
                                    device.deviceType === "Máy hút ẩm"
                            ).length > 0 && (
                                <ElectricalDevice
                                    hideRoomName={false}
                                    devicesList={devicesListOfHome?.filter(
                                        (device) =>
                                            device.deviceType === "Quạt" ||
                                            device.deviceType ===
                                                "Máy lọc không khí" ||
                                            device.deviceType === "Máy hút ẩm"
                                    )}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div>Chưa có thiết bị</div>
                )}
            </div>
        </BaseLayout>
    );
}

export default DevicesListScreen;
