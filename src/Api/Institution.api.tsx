import axios from 'axios';

// const apiUrl = 'https://localhost:7201/api/';
axios.defaults.baseURL = process.env.REACT_APP_MIRA_COHEN;
const apiUrl = process.env.REACT_APP_MIRA_COHEN;

export const addInstitution = async (institutionData: any) => {
  console.log("aa",institutionData.userId);     console.log("bb",institutionData);
  
  debugger
  try {
    debugger
    const response = await axios.post(`${apiUrl}Institution/Add`, {
      ...institutionData
    });
    return response.data;
  } catch (error) {
    console.error('Error adding institution:', error);
    throw error;
  }
};

export const getAllInstitution = async () => {
  try {
    const response = await axios.get(`${apiUrl}Institution`);
    return response.data?.$values || []; // להבטיח קבלת מערך של ערכים
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return [];
  }
};
