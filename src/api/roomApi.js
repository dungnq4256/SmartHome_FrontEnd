import axiosClient from "./axiosClient";

const roomApi = {
    // create room
    createRoom: (params) => {
        const url = '/room/create-room';
        return axiosClient.post(url, params);
    },

    //delete room
    deleteRoom: (params) => {
        const url = '/room/delete-room';
        return axiosClient.delete(url, {params});
    },

    //get room data
    getRoomData: (params) => {
        const url = '/room/detail';
        return axiosClient.get(url, {params});
    },

    // update room data
    updateRoomData: (params) => {
        const url = '/room/update';
        return axiosClient.put(url, params);
    },
};

export default roomApi;
