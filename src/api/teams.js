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

export const postTeam = async (jwtToken, data) => {
  try {
    console.log(data)
    await teamAPI(jwtToken).post('/', data);
  } catch (error) {
    console.log(error);
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

export const addTeamMember = async (jwtToken, teamId, email) => {
  try {
    const data = JSON.stringify({email});
    console.log(data);
    await teamAPI(jwtToken).post(`/${teamId}/members`, data);
  } catch (error) {
    console.log(error);
  }
}

export const removeTeamMember = async (jwtToken, teamId, email) => {
  try {
    await teamAPI(jwtToken).delete(`/${teamId}/members/${email}`);
  } catch (error) {
    console.log(error);
  }
}

export const postPendingMember = async (jwtToken, teamId, data) => {
  try {
    console.log(teamId)
    console.log(data)
    await teamAPI(jwtToken).post(`/${teamId}/pending_members`, data);
  } catch (error) {
    console.log(error);
  }
}

export const deletePendingMember = async (jwtToken, teamId, email) => {
  try {
    await teamAPI(jwtToken).delete(`/${teamId}/pending_members/${email}`);
  } catch (error) {
    console.log(error);
  }
}

export const deleteTeam = async (jwtToken, teamId) => {
  try {
    await teamAPI(jwtToken).delete(`/${teamId}`);
  } catch (error) {
    console.log(error);
  }
}

export default teamAPI;