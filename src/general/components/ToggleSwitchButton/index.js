import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";
import { thunkControlDevice } from "features/Device/deviceSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

ToggleSwitchButton.propTypes = {
    deviceItem: PropTypes.object,
};
ToggleSwitchButton.defaultProps = {
    deviceItem: null,
};

function ToggleSwitchButton(props) {
    const { deviceItem } = props;
    const dispatch = useDispatch();
    const [controlDevice, setControlDevice] = useState(deviceItem?.control?.status);

    useEffect(() => {
        const handleControlAC = async () => {
            if (!controlDevice) {
                await dispatch(
                    thunkControlDevice({
                        deviceId: deviceItem._id,
                        control: {
                            status: true,
                        },
                    })
                );
            } else {
                await dispatch(
                    thunkControlDevice({
                        deviceId: deviceItem._id,
                        control: {
                            status: false,
                        },
                    })
                );
            }
        };
        handleControlAC();

        return () => {};
    }, [controlDevice]);

    return (
        <div className="d-flex">
            <label className="switchh my-auto">
                <input
                    type="checkbox"
                    checked={controlDevice ?? false}
                    onChange={() => setControlDevice(!controlDevice)}
                />
                <span className="sliderr"></span>
            </label>
        </div>
    );
}

export default ToggleSwitchButton;
