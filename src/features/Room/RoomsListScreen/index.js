import { thunkGetDevicesList } from "features/Device/deviceSlice";
import BaseLayout from "general/components/BaseLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeviceItem from "../Component/DeviceItem";
import ModalCreateRoom from "../Component/ModalCreateRoom";
import { thunkGetRoomsList } from "../roomSlice";
import "./style.scss";

RoomsListScreen.propTypes = {};

function RoomsListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentHome } = useSelector((state) => state?.home);
    const { roomsList } = useSelector((state) => state?.room);
    const { devicesList } = useSelector((state) => state?.device);
    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false);
    const [selected, setSelected] = useState(roomsList[0]?._id ?? "");

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetRoomsList({ homeId: currentHome._id }));
            await dispatch(thunkGetDevicesList({ homeId: currentHome._id }));
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
                                    onClick={() => setSelected(room?._id)}
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
                    <div className="rounded-lg">
                        <div className="row">
                            {roomsList?.map(
                                (room, index) =>
                                    selected === room?._id &&
                                    devicesList
                                        ?.filter(
                                            (item) => item.roomId === room._id
                                        )
                                        ?.map((device) => (
                                            <DeviceItem
                                                key={device._id}
                                                deviceName={device.deviceName}
                                                deviceType={device.deviceType}
                                            />
                                        ))
                            )}
                        </div>
                    </div>
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
