import axios from 'axios';

const meetingRecordAPI = (jwtToken) => {
    if (!jwtToken) {
        return null;
    }

    return axios.create({
        baseURL: 'https://tk46hrdh2a.execute-api.us-east-2.amazonaws.com/dev/meeting-records',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        }
    });
}

export const addRecord = async (jwtToken, teamId, timestamp) => {
    const data = JSON.stringify({dateTime: timestamp});
    try {
        await meetingRecordAPI(jwtToken).post(`/${teamId}`, data);
    } catch (error) {
        console.log('fail to add record');
        console.log(error);
    }
}

export const getRecord = async (jwtToken, teamId) => {
    try {
        const result = await meetingRecordAPI(jwtToken).get(`/${teamId}`);
        return result.data;
    } catch (error) {
        console.log('fail to get record');
        console.log(error);
        return [];
    }
}