import axios from '../utils/axios';

export function  getPatientsPorAtender()  {
    return axios({
        method: 'get',
        url : 'patient/porAtender',
    }).then(response => {
        return response.data;
    }).catch(error => {
        return error.message
    })
}