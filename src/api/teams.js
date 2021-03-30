import axios from 'axios';

const teamAPI = (jwtToken) => {
  if (!jwtToken) {
      return null;
  }

  return axios.create({
    baseURL: 'https://tk46hrdh2a.execute-api.us-east-2.amazonaws.com/dev/teams',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
}

export const getTeam = async (jwtToken, teamId) => {
  try {
    const result = await teamAPI(jwtToken).get(`/${teamId}`);
		return result.data;
    console.log(result);
  } catch (error) {
    console.log(error);
		return null;
  } 
}

export const putTeam = async (jwtToken, teamId, data) => {
  try {
    console.log(data)
    await teamAPI(jwtToken).put(`/${teamId}`, data);
  } catch (error) {
    console.log(error);
  }
}

export default teamAPI;