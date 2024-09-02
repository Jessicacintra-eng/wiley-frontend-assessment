import axios from "axios";

const request = async (requestFunc: () => Promise<any>, rejectWithValue: (value: any) => any) => {
  try {
    const response = await requestFunc();
    return response.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error) 
      ? error.response?.data?.message || 'An unexpected error occurred'
      : 'An unexpected error occurred';
    
    return rejectWithValue(errorMessage);
  }
};

export default request;
