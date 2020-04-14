import axios from 'axios';
import {
    Host
} from '../../config/settings/Connection';


const SAVE_USER = 'SAVE_USER'

const saveNewUser = (data, type) => {
    return {
        type: SAVE_USER,
        payload: data,
        userType: type.localeCompare('doctor') === 0
    }
}


export const _LoginPatient = (data, success, faild) => {

    return async dispatch => {

        // setup loading screen
        // dispatch(startLoading())

        // setting header 
        const config = {
            'Content-Type': 'application/json',
        };

        await axios
            .post(`${Host}/patient/authenticate`, data, config)
            .then((result) => {
                console.log(result.data)
                if (result.data.status) {
                    const data = result.data;
                    console.log(data)
                    let c = []
                    c.push(data)
                    dispatch(saveNewUser(c, 'patient'))
                    // success({
                    //     status: true,
                    //     message: 'patient add successfully.'
                    // })
                } else {
                    faild({
                        status: false,
                        message: result.data.error
                    })
                }
            })
            .catch((err) => {
                // dispatch(haveingError(err))
            });
    }

}