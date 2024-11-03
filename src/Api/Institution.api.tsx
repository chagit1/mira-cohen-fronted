import axios from 'axios';

const apiUrl = 'https://localhost:7201/api/';

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
