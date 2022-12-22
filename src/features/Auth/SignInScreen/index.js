import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import BaseTextField from "general/components/Form/BaseTextField";
import { useFormik } from "formik";
import HeaderLandingPage from "general/components/HeaderLandingPage";
import AppButton from "general/components/AppButton";
import Utils from "general/utils/Utils";
import * as Yup from "yup";
import ToastHelper from "general/helpers/ToastHelper";
import AppResource from "general/constants/AppResource";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { thunkSignIn } from "app/authSlice";
import UserHelper from "general/helpers/UserHelper";
import axios from "axios";
import { LogoBigLight } from "assets/icons/Icons";
SignInScreen.propTypes = {};

const sTag = "[SignInScreen]";

function SignInScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            const params = { ...values };
            let inputPassword = params.password;
            params.password = Utils.sha256(inputPassword);
            try {
                const res = unwrapResult(await dispatch(thunkSignIn(params)));
                if (res) {
                    const displayName = UserHelper.getDisplayName(res.account);
                    ToastHelper.showSuccess(`Xin chào, ${displayName}`);
                    navigate("/dashboard");
                }
            } catch (error) {
                console.log(`${sTag} loggin error: ${error.message}`);
                // ToastHelper.showError('Đăng nhập không thành công');
            }
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .trim()
                .required("Bạn chưa nhập email")
                .email("Email không hợp lệ"),
            password: Yup.string().trim().required("Bạn chưa nhập mật khẩu"),
        }),
    });

    function handleNavigate(url) {
        navigate(url);
    }

    return (
        <div className="SignInScreen min-vh-100 bg-light">
            <div className="LogoSignIn">
               <LogoBigLight/> 
            </div>
            <form className="SignInForm" onSubmit={formik.handleSubmit}>
                <div>
                    <h1 style={{fontWeight:"600", textAlign:"center"}}>Đăng nhập</h1>
                    {/* email input */}
                    <div>
                        <BaseTextField
                            name="email"
                            placeholder="Nhập email..."
                            label="Email"
                            fieldHelper={formik.getFieldHelpers("email")}
                            fieldProps={formik.getFieldProps("email")}
                            fieldMeta={formik.getFieldMeta("email")}
                        />
                    </div>

                    {/* password input */}
                    <div>
                        <BaseTextField
                            name="password"
                            placeholder="Nhập mật khẩu..."
                            label="Mật khẩu"
                            type="password"
                            fieldHelper={formik.getFieldHelpers("password")}
                            fieldProps={formik.getFieldProps("password")}
                            fieldMeta={formik.getFieldMeta("password")}
                        />
                    </div>

                    <div
                        className="text-center font-weight-bolder cursor-pointer text-center"
                        style={{ color: AppResource.colors.featureColor }}
                    >
                        Quên mật khẩu ?
                    </div>

                    {/* sign in button */}
                    <AppButton
                        className="btn-blue w-100 mt-5"
                        text="Đăng nhập"
                    />
                    <div className="text-center mt-5">
                        Bạn chưa có tài khoản?{" "}
                        <span
                            onClick={() => handleNavigate("/sign-up")}
                            className="cursor-pointer"
                            style={{
                                color: AppResource.colors.featureColor,
                                textDecoration: "underline",
                            }}
                        >
                            Đăng ký
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignInScreen;
