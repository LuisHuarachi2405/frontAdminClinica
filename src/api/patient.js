import axios from '../utils/axios';

export function  cambiarPorAtender()  {
    return axios({
        method: 'put',
        url : 'patient/porAtender',
    }).then(response => {
        return response.data;
    }).catch(error => {
        return error.message
    })
}

export function  cambiarAtendido(patient_id,oa,estado)  {
    return axios({
        method: 'put',
        url : 'patient/update/'+patient_id,
        data: {
            oa: oa,
            state_patient_id: estado
        }
    }).then(response => {
       
    }).catch(error => {
        return error.message
    })
}