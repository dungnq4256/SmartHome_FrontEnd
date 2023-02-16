import axiosClient from "./axiosClient";

const deviceApi = {
    // create device
    createDevice: (params) => {
        const url = '/device/create-device';
        return axiosClient.post(url, params);
    },

    //delete device
    deleteDevice: (params) => {
        const url = '/device/delete-device';
        return axiosClient.delete(url, {params});
    },

    //get device data
    getDeviceData: (params) => {
        const url = '/device/detail';
        return axiosClient.get(url, {params});
    },

    // update device data
    updateDeviceData: (params) => {
        const url = '/device/update';
        return axiosClient.put(url, params);
    },
};

export default deviceApi;
