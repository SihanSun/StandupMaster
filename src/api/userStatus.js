import axios from 'axios';

const userStatusAPI = (jwtToken) => {
  if (!jwtToken) {
      return null;
  }

  return axios.create({
    baseURL: 'https://tk46hrdh2a.execute-api.us-east-2.amazonaws.com/dev/user-status',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`,
    }
  });
}

export const getStatus = async (jwtToken, userEmail) => {
  try {
    console.log(userEmail);
    const result = await userStatusAPI(jwtToken).get(`/${userEmail}`);
		return result.data;
  } catch (error) {
    console.log(error);
		return null;
  } 
}

export const putStatus = async (jwtToken, userEmail, data) => {
  try {
    await userStatusAPI(jwtToken).put(`/${userEmail}`, data);
  } catch (error) {
    console.log(error);
  }
}

export default userStatusAPI;