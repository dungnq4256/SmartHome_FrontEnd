import roomApi from "api/roomApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkCreateRoom = createAsyncThunk(
    "room/create-room",
    async (params) => {
        const res = await roomApi.createRoom(params);
        console.log(res);
        return res;
    }
);

export const thunkDeleteRoom = createAsyncThunk(
    "room/delete-room",
    async (params) => {
        const res = await roomApi.deleteRoom(params);
        console.log(res);
        return res;
    }
);

export const thunkGetRoomData = createAsyncThunk(
    "room/get-room-data",
    async (params) => {
        const res = await roomApi.getRoomData(params);
        console.log(res);
        return res;
    }
);

export const thunkUpdateRoomData = createAsyncThunk(
    "room/update-room-data",
    async (params) => {
        const res = await roomApi.updateRoomData(params);
        console.log(res);
        return res;
    }
);

const roomSlice = createSlice({
    name: "room",
    initialState: {
        isGettingRoomData: false,
        isCreatingRoom: false,
        isUpdatingRoom: false,
        isDeletingRoom: false,
        currentroom: {},
    },
    reducers: {
        updateCurrentRoomData: (state, action) => {
            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    ...action.payload,
                },
            };
        },
    },
    extraReducers: {
        //create new room
        [thunkCreateRoom.pending]: (state, action) => {
            state.isCreatingRoom = true;
        },

        [thunkCreateRoom.rejected]: (state, action) => {
            state.isCreatingRoom = false;
        },

        [thunkCreateRoom.fulfilled]: (state, action) => {
            state.isCreatingRoom = false;
        },

        //update room
        [thunkUpdateRoomData.pending]: (state, action) => {
            state.isUpdatingRoom = true;
        },

        [thunkUpdateRoomData.rejected]: (state, action) => {
            state.isUpdatingRoom = false;
        },

        [thunkUpdateRoomData.fulfilled]: (state, action) => {
            state.isUpdatingRoom = false;
        },

        //delete room
        [thunkDeleteRoom.pending]: (state, action) => {
            state.isDeletingRoom = true;
        },

        [thunkDeleteRoom.rejected]: (state, action) => {
            state.isDeletingRoom = false;
        },

        [thunkDeleteRoom.fulfilled]: (state, action) => {
            state.isDeletingRoom = false;
        },
    },
});

const { reducer, actions } = roomSlice;
export const { updateCurrentRoomData } = actions;
export default reducer;
