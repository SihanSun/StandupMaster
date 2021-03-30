import axios from 'axios';

const userAPI = (jwtToken) => {
  if (!jwtToken) {
      return null;
  }

  return axios.create({
    baseURL: 'https://tk46hrdh2a.execute-api.us-east-2.amazonaws.com/dev/users',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
}

export const getUsers = async (jwtToken, userEmail) => {
  try {
    const result = await userAPI(jwtToken).get(`/${userEmail}`);
		return result.data;
  } catch (error) {
    console.log(error);
		return null;
  } 
}

export const putUsers = async (jwtToken, data) => {
  try {
    await userAPI(jwtToken).put(`/${userEmail}`, data);
  } catch (error) {
    console.log(error);
  }
}

export default userAPI;