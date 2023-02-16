import deviceApi from "api/deviceApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkCreateDevice = createAsyncThunk(
    "device/create-device",
    async (params) => {
        const res = await deviceApi.createDevice(params);
        console.log(res);
        return res;
    }
);

export const thunkDeleteDevice = createAsyncThunk(
    "device/delete-device",
    async (params) => {
        const res = await deviceApi.deleteDevice(params);
        console.log(res);
        return res;
    }
);

// export const thunkGetDeviceData = createAsyncThunk(
//     "device/get-device-data",
//     async (params) => {
//         const res = await deviceApi.getDeviceData(params);
//         console.log(res);
//         return res;
//     }
// );

// export const thunkUpdateDeviceData = createAsyncThunk(
//     "device/update-device-data",
//     async (params) => {
//         const res = await deviceApi.updateDeviceData(params);
//         console.log(res);
//         return res;
//     }
// );

const deviceSlice = createSlice({
    name: "device",
    initialState: {
        isGettingDeviceData: false,
        isCreatingDevice: false,
        isUpdatingDevice: false,
        isDeletingDevice: false,
        currentDevice: {},
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

        // //update device
        // [thunkUpdateDeviceData.pending]: (state, action) => {
        //     state.isUpdatingDevice = true;
        // },

        // [thunkUpdateDeviceData.rejected]: (state, action) => {
        //     state.isUpdatingDevice = false;
        // },

        // [thunkUpdateDeviceData.fulfilled]: (state, action) => {
        //     state.isUpdatingDevice = false;
        // },

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
export const { updateCurrentDeviceData } = actions;
export default reducer;
