import { thunkGetDevicesListOfHome } from "features/Device/deviceSlice";
import { thunkGetRoomsList } from "features/Room/roomSlice";
import BaseLayout from "general/components/BaseLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DevicesOfHome from "../DevicesOfHome";
import InforOfHome from "../InforOfHome";
import MembersOfHome from "../MembersOfHome";
import RoomsOfHome from "../RoomsOfHome";

HomeScreen.propTypes = {};
function HomeScreen(props) {
    const { currentHome } = useSelector(
        (state) => state?.home
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetRoomsList({ homeId: currentHome._id }));
            await dispatch(thunkGetDevicesListOfHome({ homeId: currentHome._id }));
        };
        fetchData();
        return () => {};
    }, [currentHome._id]);

    return (
        <BaseLayout selected="home">
            <div className="HomeScreen flex-column-fluid">
                <InforOfHome />
                <MembersOfHome />
                <RoomsOfHome />
                <DevicesOfHome />
                
            </div>
        </BaseLayout>
    );
}

export default HomeScreen;
