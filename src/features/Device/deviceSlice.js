import deviceApi from "api/deviceApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkCreateDevice = createAsyncThunk(
    "device/create",
    async (params) => {
        const res = await deviceApi.createDevice(params);
        console.log(res);
        return res;
    }
);

export const thunkDeleteDevice = createAsyncThunk(
    "device/delete",
    async (params) => {
        const res = await deviceApi.deleteDevice(params);
        console.log(res);
        return res;
    }
);

export const thunkGetDeviceData = createAsyncThunk(
    "device/detail",
    async (params) => {
        const res = await deviceApi.getDeviceData(params);
        console.log(res);
        return res;
    }
);

export const thunkGetDevicesList = createAsyncThunk(
    "device/find",
    async (params) => {
        const res = await deviceApi.getDevicesList(params);
        console.log(res);
        return res;
    }
);

export const thunkUpdateDeviceData = createAsyncThunk(
    "device/update",
    async (params) => {
        const res = await deviceApi.updateDeviceData(params);
        console.log(res);
        return res;
    }
);

const deviceSlice = createSlice({
    name: "device",
    initialState: {
        isGettingDeviceData: false,
        isGettingDevicesList: false,
        isCreatingDevice: false,
        isUpdatingDevice: false,
        isDeletingDevice: false,
        currentDevice: {},
        devicesList: [],
    },
    reducers: {
        updateCurrentDeviceData: (state, action) => {
            return {
                ...state,
                currentDevice: {
                    ...state.currentDevice,
                    ...action.payload,
                },
            };
        },
        updateDevicesListData: (state, action) => {
            return {
                ...state,
                devicesList: [
                    ...state.devicesList,
                    ...action.payload,
                ],
            };
        },
    },
    extraReducers: {
        //create new device
        [thunkCreateDevice.pending]: (state, action) => {
            state.isCreatingDevice = true;
        },

        [thunkCreateDevice.rejected]: (state, action) => {
            state.isCreatingDevice = false;
        },

        [thunkCreateDevice.fulfilled]: (state, action) => {
            state.isCreatingDevice = false;
        },

        //get device data
        [thunkGetDeviceData.pending]: (state, action) => {
            state.isGettingDeviceData = true;
        },

        [thunkGetDeviceData.rejected]: (state, action) => {
            state.isGettingDeviceData = false;
        },

        [thunkGetDeviceData.fulfilled]: (state, action) => {
            state.isGettingDeviceData = false;
            const { result, deviceData } = action.payload;
            if (result === "success") {
                state.currentDevice = deviceData;
            }
        },

        //get devices list
        [thunkGetDevicesList.pending]: (state, action) => {
            state.isGettingDevicesList = true;
        },

        [thunkGetDevicesList.rejected]: (state, action) => {
            state.isGettingDevicesList = false;
        },

        [thunkGetDevicesList.fulfilled]: (state, action) => {
            state.isGettingDevicesList = false;
            const { result, devicesList } = action.payload;
            if (result === "success") {
                state.devicesList = devicesList;
            }
        },

        //update device
        [thunkUpdateDeviceData.pending]: (state, action) => {
            state.isUpdatingDevice = true;
        },

        [thunkUpdateDeviceData.rejected]: (state, action) => {
            state.isUpdatingDevice = false;
        },

        [thunkUpdateDeviceData.fulfilled]: (state, action) => {
            state.isUpdatingDevice = false;
        },

        //delete device
        [thunkDeleteDevice.pending]: (state, action) => {
            state.isDeletingDevice = true;
        },

        [thunkDeleteDevice.rejected]: (state, action) => {
            state.isDeletingDevice = false;
        },

        [thunkDeleteDevice.fulfilled]: (state, action) => {
            state.isDeletingDevice = false;
        },
    },
});

const { reducer, actions } = deviceSlice;
export const { updateCurrentDeviceData, updateDevicesListData } = actions;
export default reducer;
