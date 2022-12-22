import BaseLayout from "general/components/BaseLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

RoomsListScreen.propTypes = {};

function RoomsListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <BaseLayout selected="rooms-list">
            <h1>Rooms List</h1>
        </BaseLayout>
    );
}

export default RoomsListScreen;
