import React from "react";
import BaseLayout from "general/components/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import BootstrapTable from "react-bootstrap/Table";
import "./style.scss";
import ToastHelper from "general/helpers/ToastHelper";
import BaseTextField from "general/components/Form/BaseTextField";
import { useState } from "react";
import { useEffect } from "react";
import {
    thunkConfirmJoinHome,
    thunkDeleteMember,
    thunkGetHomeData,
    thunkRefuseJoinHome,
    thunkUpdateHomeData,
} from "features/Home/homeSlice";
import { thunkGetAccountInfor } from "app/authSlice";
import UserHelper from "general/helpers/UserHelper";
import ModalCreateRoom from "features/Room/Component/ModalCreateRoom";
import { thunkDeleteRoom } from "features/Room/roomSlice";
import DialogModal from "general/components/DialogModal";
import ModalEditRoom from "features/Room/Component/ModalEditRoom";

HomeScreen.propTypes = {};
function HomeScreen(props) {
    const { currentAccount } = useSelector((state) => state?.auth);
    const { currentHome } = useSelector((state) => state?.home);
    const { isDeletingRoom } = useSelector((state) => state?.room);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [showModalDeleteRoom, setShowModalDeleteRoom] = useState(false);
    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false);
    const [showModalEditRoom, setShowModalEditRoom] = useState(false);
    const accountList = currentHome?.accountList;
    const memberList = accountList?.filter(
        (account) => account.status === "owner"
    );
    const requestingList = accountList?.filter(
        (account) => account.status === "requesting"
    );
    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
        },
        onSubmit: async (values) => {
            const params = { _id: currentHome._id, ...values };
            console.log(params);
            try {
                const res = await dispatch(thunkUpdateHomeData(params));
                if (res) {
                    ToastHelper.showSuccess("Sửa thông tin thành công");
                    await dispatch(
                        thunkGetHomeData({ homeId: currentHome._id })
                    );
                    await dispatch(thunkGetAccountInfor());
                    setIsEditMode(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required("Bạn chưa nhập tên"),
            address: Yup.string().trim().required("Bạn chưa nhập địa chỉ"),
        }),
    });

    const handleDeleteRoom = async() => {
        const res = await dispatch(thunkDeleteRoom({
            homeId : currentHome._id,
            roomId : selectedRoom._id
        }));
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(
                `Xóa [${selectedRoom?.roomName}] thành công`
            );
            await dispatch(
                thunkGetHomeData({ homeId: currentHome._id })
            );
        }
    }

    useEffect(() => {
        if (currentHome) {
            formik.getFieldHelpers("name").setValue(currentHome?.name);
            formik.getFieldHelpers("address").setValue(currentHome?.address);
        }
    }, [currentHome, isEditMode]);

    return (
        <BaseLayout selected="home">
            <div className="HomeScreen flex-column-fluid">
                <div className="container-xxl">
                    <div className="card card-flush mb-9">
                        <div className="card-header d-flex justify-content-between">
                            <div className="font-weight-bolder font-size-h3 text-remaining">
                                Thông tin nhà
                            </div>
                            <div>
                                {!isEditMode && (
                                    <button
                                        className="ButtonPrimary"
                                        onClick={() => setIsEditMode(true)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                )}
                                {isEditMode && (
                                    <div>
                                        <button
                                            className="ButtonPrimary px-8 me-3"
                                            style={{
                                                backgroundColor: "#13b713",
                                            }}
                                            onClick={formik.handleSubmit}
                                        >
                                            Lưu
                                        </button>
                                        <button
                                            className="ButtonDanger px-8"
                                            onClick={() => setIsEditMode(false)}
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Tên nhà
                                </div>
                                {!isEditMode && (
                                    <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                        {currentHome?.name}
                                    </div>
                                )}
                                {isEditMode && (
                                    <div className="col-lg-8 pb-1">
                                        <BaseTextField
                                            name="name"
                                            placeholder="Nhập tên nhà..."
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
                                )}
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Địa chỉ
                                </div>
                                {!isEditMode && (
                                    <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                        {currentHome?.address}
                                    </div>
                                )}
                                {isEditMode && (
                                    <div className="col-lg-8 pb-1">
                                        <BaseTextField
                                            name="address"
                                            placeholder="Nhập địa chỉ nhà..."
                                            fieldHelper={formik.getFieldHelpers(
                                                "address"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "address"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "address"
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl">
                    <div className="row mb-9">
                        <div className="col-12 col-md-6">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="font-weight-bolder font-size-h3 text-remaining">
                                        Danh sách thành viên
                                    </div>
                                    {memberList?.length > 0 ? (
                                        <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                            Tổng cộng: {memberList?.length}{" "}
                                            thành viên
                                        </div>
                                    ) : (
                                        <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                            Danh sách trống
                                        </div>
                                    )}
                                </div>
                                <div className="card-body p-0">
                                    {memberList?.length > 0 && (
                                        <div className="d-flex flex-column">
                                            {memberList?.map((item) => (
                                                <div
                                                    className="d-flex justify-content-between m-3"
                                                    key={item?._id}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={
                                                                item?.avatar ||
                                                                UserHelper.getRandomAvatarUrl()
                                                            }
                                                            onError={(e) => {
                                                                e.target.onerror =
                                                                    null;
                                                                e.target.src =
                                                                    UserHelper.getRandomAvatarUrl();
                                                            }}
                                                            style={{
                                                                height: "35px",
                                                                width: "35px",
                                                                objectFit:
                                                                    "cover",
                                                                marginRight:
                                                                    "1rem",
                                                                borderRadius:
                                                                    "5px",
                                                            }}
                                                            alt="Ảnh đại diện"
                                                        />
                                                        <div className="fs-6 fw-bold">
                                                            {item?.fullname}
                                                        </div>
                                                    </div>
                                                    {currentAccount?._id !==
                                                        item?._id && (
                                                        <div className="d-flex align-items-center">
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-danger btn-hover-danger"
                                                                onClick={async () => {
                                                                    await dispatch(
                                                                        thunkDeleteMember(
                                                                            {
                                                                                homeId: currentHome?._id,
                                                                                accountId:
                                                                                    item?._id,
                                                                            }
                                                                        )
                                                                    );
                                                                    await dispatch(
                                                                        thunkGetHomeData(
                                                                            {
                                                                                homeId: currentHome._id,
                                                                            }
                                                                        )
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-trash p-0 icon-1x" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="font-weight-bolder font-size-h3 text-remaining">
                                        Danh sách yêu cầu
                                    </div>
                                    {requestingList?.length > 0 ? (
                                        <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                            Tổng cộng: {requestingList?.length}{" "}
                                            người
                                        </div>
                                    ) : (
                                        <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                            Danh sách trống
                                        </div>
                                    )}
                                </div>
                                <div className="card-body p-0">
                                    {requestingList?.length > 0 && (
                                        <div className="d-flex flex-column">
                                            {requestingList?.map((item) => (
                                                <div
                                                    className="d-flex justify-content-between m-3"
                                                    key={item?._id}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={
                                                                item?.avatar ||
                                                                UserHelper.getRandomAvatarUrl()
                                                            }
                                                            onError={(e) => {
                                                                e.target.onerror =
                                                                    null;
                                                                e.target.src =
                                                                    UserHelper.getRandomAvatarUrl();
                                                            }}
                                                            style={{
                                                                height: "35px",
                                                                width: "35px",
                                                                objectFit:
                                                                    "cover",
                                                                marginRight:
                                                                    "1rem",
                                                                borderRadius:
                                                                    "5px",
                                                            }}
                                                            alt="Ảnh đại diện"
                                                        />
                                                        <div className="fs-6 fw-bold">
                                                            {item?.fullname}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <a
                                                            className="btn btn-icon btn-sm btn-light-primary btn-hover-primary mr-2"
                                                            onClick={async () => {
                                                                await dispatch(
                                                                    thunkConfirmJoinHome(
                                                                        {
                                                                            homeId: currentHome?._id,
                                                                            accountId:
                                                                                item?._id,
                                                                        }
                                                                    )
                                                                );
                                                                await dispatch(
                                                                    thunkGetHomeData(
                                                                        {
                                                                            homeId: currentHome._id,
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <i className="fas fa-plus p-0 icon-1x" />
                                                        </a>
                                                        <a
                                                            className="btn btn-icon btn-sm btn-light-danger btn-hover-danger"
                                                            onClick={async () => {
                                                                await dispatch(
                                                                    thunkRefuseJoinHome(
                                                                        {
                                                                            homeId: currentHome._id,
                                                                            accountId:
                                                                                item._id,
                                                                        }
                                                                    )
                                                                );
                                                                await dispatch(
                                                                    thunkGetHomeData(
                                                                        {
                                                                            homeId: currentHome._id,
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <i className="far fa-trash p-0 icon-1x" />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl">
                    <div className="card card-flush mb-9">
                        <div className="card-header d-flex justify-content-between">
                            <div>
                                <div className="font-weight-bolder font-size-h3 text-remaining">
                                    Danh sách phòng
                                </div>
                                {currentHome?.roomsList?.length > 0 ? (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Tổng cộng:{" "}
                                        {currentHome?.roomsList?.length} phòng
                                    </div>
                                ) : (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Danh sách trống
                                    </div>
                                )}
                            </div>
                            <button
                                className="ButtonPrimary"
                                onClick={() => setShowModalCreateRoom(true)}
                            >
                                Thêm phòng
                            </button>
                        </div>
                        <div className="card-body p-0">
                            {currentHome?.roomsList?.length > 0 && (
                                <BootstrapTable striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên phòng</th>
                                            <th>Thực hiện</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentHome?.roomsList?.map(
                                            (item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.roomName}</td>
                                                    <td>
                                                        <div>
                                                            <button
                                                                className="ButtonPrimary px-8 me-3"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#13b713",
                                                                }}
                                                                onClick={(e) => {
                                                                    setSelectedRoom(item);
                                                                    setShowModalEditRoom(true);
                                                                }}
                                                            >
                                                                Sửa
                                                            </button>
                                                            <button className="ButtonDanger px-8"
                                                                onClick={(e) => {
                                                                    setSelectedRoom(item);
                                                                    setShowModalDeleteRoom(true);
                                                                }}
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </BootstrapTable>
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
            <ModalEditRoom
                onClose={() => setShowModalEditRoom(false)}
                show={showModalEditRoom}
                homeId={currentHome?._id}
                roomItem = {selectedRoom}
            />
            <DialogModal
                title="Xóa phòng"
                description={`Bạn có chắc muốn xóa [${selectedRoom?.roomName}]`}
                show={showModalDeleteRoom}
                close= {!isDeletingRoom}
                onClose={() => setShowModalDeleteRoom(false)}
                onExecute={handleDeleteRoom}
            />
        </BaseLayout>
    );
}

export default HomeScreen;
