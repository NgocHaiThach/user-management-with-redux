import { getListUserFailure, getListUserStart, getListUserSuccess } from "../redux/userSlice"
import callApi from "../uitls/callApi";

export const getListUser = async(dispatch) => {
   dispatch( getListUserStart);
   try {
    const res = await callApi('https://62f4a6e3535c0c50e75f8938.mockapi.io/api/v1/users', 'GET', null);
    dispatch(getListUserSuccess(res.data));
   }
   catch (err) {
    dispatch(getListUserFailure);
   }
}