import BaseLayout from "general/components/BaseLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

HomeScreen.propTypes = {};

function HomeScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <BaseLayout selected="home">
            <h1>Doashboard</h1>
        </BaseLayout>
    );
}

export default HomeScreen;
