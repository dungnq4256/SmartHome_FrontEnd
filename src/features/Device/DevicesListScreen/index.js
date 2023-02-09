import BaseLayout from "general/components/BaseLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

DevicesListScreen.propTypes = {};

function DevicesListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <BaseLayout selected="devices-list">
            <h1>Devices List</h1>
        </BaseLayout>
    );
}

export default DevicesListScreen;
