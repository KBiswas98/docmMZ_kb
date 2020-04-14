import axios from 'axios';
import {
    Host
} from '../../config/settings/Connection';

import {
    resetDataStore
} from './dataStore'
import {
    resetDoctor
} from './doctoreAction'
import {
    resetQuestion
} from './questionAction'


export const addUserToRedux = (data) => {
    return {
        type: "AUTHENTICATED",
        data: data
    };
};

export const addUserFullData = (data) => {
    return {
        type: "FULLDATA",
        data: data
    };
};


const SAVE_USER = 'SAVE_USER'
const ERROR = 'HAVEING_ERROR'
const LOADING = 'LOADING'
const REMOVE_USER = 'REMOVE_USER'
const SAVE_APPOINTMENT = 'SAVE_APPOINTMENT'
const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT'


const saveNewUser = (data, type) => {
    return {
        type: SAVE_USER,
        userData: data,
        userType: type.localeCompare('doctor') === 0
    }
}

const haveingError = (err) => {
    return {
        type: ERROR,
        error: err
    }
}

const startLoading = () => {
    return {
        type: LOADING
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

const setAppointment = (appointment) => {
    return {
        type: SAVE_APPOINTMENT,
        payload: appointment
    }
}

const removeAppointment = (id) => {
    return {
        type: REMOVE_APPOINTMENT,
        payload: id
    }
}

export const resetStore = () => {
    return async dispatch => {
        await dispatch(removeUser())
        await dispatch(resetDoctor())
        await dispatch(resetDataStore())
        await dispatch(resetQuestion())
    }
}

export const LoginPatient = (data, success, faild) => {

    return async dispatch => {

        // setup loading screen
        dispatch(startLoading())

        // setting header 
        const config = {
            'Content-Type': 'application/json',
        };

        console.log(data)

        await axios
            .post(`${Host}/patient/authenticate`, data, config)
            .then((result) => {
                console.log(result.data)
                if (result.data.status) {
                    const data = result.data.user;

                    const _data = {
                        id: data._id,
                        email: data.email,
                        phone: data.phone,
                        name: data.name === undefined ? 'No name' : data.name
                    }

                    dispatch(saveNewUser(_data, 'patient'))
                    success({
                        status: true,
                        message: 'patient add successfully.'
                    })
                } else {
                    faild({
                        status: false,
                        message: result.data.error
                    })
                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }

}

export const LoginDoctor = (data, success, faild) => {

    return async dispatch => {

        // setup loading screen
        await dispatch(startLoading())

        // setting header 
        const config = {
            'Content-Type': 'application/json',
        };

        await axios
            .post(`${Host}/doctors/authenticate`, data, config)
            .then((result) => {
                if (result.data.status) {
                    const data = result.data.user;

                    const _data = {
                        id: data._id,
                        first_name: data.basic.first_name,
                        email: data.email,
                        phone: data.phone
                    }

                    dispatch(saveNewUser(_data, 'doctor'))
                    success({
                        status: true,
                        message: 'Doctor add successfully.'
                    })
                } else {
                    faild({
                        status: false,
                        message: result.data.error
                    })
                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }

}

export const GetAppointmentData = (id) => {
    return dispatch => {
        dispatch(startLoading())
        console.log('works...')
        axios
            .get(`${Host}/patient/getinfo/${id}`)
            .then((result) => {
                if (result.status) {
                    console.log(result.data.data.appointments);
                    dispatch(setAppointment(result.data.data.appointments))
                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }
}

export const RemoveAppointmentData = (id) => {
    return async dispatch => {

        const config = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const _data = {
            byPatient: 'true',
            byDoctor: 'false',
            reason: 'Have some important work',
            id: id,
        };

        await axios
            .post(`${Host}/appointment/cancel`, _data, config)
            .then((result) => {
                if (result.status) {
                    console.log('Successfully cancel your appointment.')
                    dispatch(removeAppointment(id))
                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }
}