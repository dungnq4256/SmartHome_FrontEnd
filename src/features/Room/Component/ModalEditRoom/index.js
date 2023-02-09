import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Utils from "general/utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToastHelper from "general/helpers/ToastHelper";
import BaseTextField from "general/components/Form/BaseTextField";
import { thunkUpdateRoomData } from "features/Room/roomSlice";
import { thunkGetHomeData } from "features/Home/homeSlice";

ModalEditRoom.propTypes = {
    homeId: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    roomItem: PropTypes.object,
};

ModalEditRoom.defaultProps = {
    homeId: "",
    show: false,
    onClose: null,
    roomItem: {},
};

function ModalEditRoom(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // MARK: --- Params ---
    const { show, onClose, homeId, roomItem } = props;
    const [showing, setShowing] = useState(true);

    const { isUpdatingRoom } = useSelector((state) => state?.room);
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: async (values) => {
            const params = { homeId: homeId, roomId: roomItem._id, ...values };
            try {
                const res = await dispatch(thunkUpdateRoomData(params));
                if (res.payload.result === "success") {
                    handleClose();
                    formik.handleReset();
                    ToastHelper.showSuccess("Sửa thông tin phòng thành công");
                    await dispatch(thunkGetHomeData({ homeId: homeId }));
                }
            } catch (err) {
                console.log(`${err.message}`);
            }
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .trim()
                .required("Bạn chưa nhập tên phòng"),
        }),
    });

    useEffect(() => {
        if (roomItem) {
            formik.getFieldHelpers("name").setValue(roomItem?.roomName);
        }
    }, [roomItem]);

    // MARK: --- Functions ---
    function handleClose() {
        if (onClose) {
            onClose();
        }
    }
    return (
        <div className="ModalEditRoom">
            <Modal
                className=""
                show={show && showing}
                size="lg"
                onHide={handleClose}
                centered
                onExited={() => {}}
            >
                {/* header */}
                <Modal.Header className="px-5 py-5 d-flex align-items-center justify-content-center position-relative">
                    <Modal.Title className="">Thêm phòng mới</Modal.Title>
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
                        <div>
                            <div>
                                <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                    <div>
                                        <BaseTextField
                                            require={true}
                                            name="name"
                                            placeholder="Nhập tên phòng mới..."
                                            label="Tên phòng"
                                            fieldHelper={formik.getFieldHelpers(
                                                "name"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "name"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "name"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            {`Huỷ`}
                        </Button>
                        <Button
                            className={`font-weight-bold flex-grow-1 col ml-3 AppButton`}
                            variant="primary"
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >
                            {isUpdatingRoom ? (
                                <div className="my-auto">
                                    <span className="spinner spinner-loader spinner-white"></span>
                                </div>
                            ) : (
                                <div>Lưu lại</div>
                            )}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditRoom;
