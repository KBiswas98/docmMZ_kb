import axios from 'axios';
import {
    Host
} from '../../config/settings/Connection';

const GET_DOCTORS = 'GET_DOCTORS';
const GETTING_DOCTORS = 'GETTING_DOCTORS';
const ERROR = 'ERROR';
const RESET_DOCTOR = 'RESET_DOCTOR'
const TMP_DOC_STORE = 'TMP_DOC_STORE';

const setDoctors = (doctors, searchable) => {
    return {
        type: GET_DOCTORS,
        isSearching: searchable,
        payload: doctors,
    };
};

const startDoctorLoading = () => {
    return {
        type: GETTING_DOCTORS,
    };
};

const haveingError = error => {
    return {
        type: ERROR,
        error: error,
    };
};

const tempDocStore = (data) => {
    return {
        type: TMP_DOC_STORE,
        payload: data
    }
}

export const resetDoctor = () => {
    return {
        type: RESET_DOCTOR
    }
}

export const fetchDoctors = () => {
    return async dispatch => {
        await dispatch(startDoctorLoading());
        await axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then(response => {
                console.log(response);
                dispatch(setDoctors(response.data));
            })
            .catch(err => {
                dispatch(haveingError(err));
            });
    };
};

export const fetchDoctorLite = (search, _page, mode) => {
    console.log(`Search: ${search} and page: ${_page} and mode: ${mode}`)
    return async dispatch => {
        const params = {
            match: JSON.stringify({
                is_superDoc: mode,
            }),
            pageNo: _page.toString(),
            size: '5',
            name: search.toString().split(' ')[0],
        };

        dispatch(startDoctorLoading());
        let searchable = search.length !== 0
        console.log(searchable)

        await axios.post(`${Host}/doctors/searchlite`, params)
            .then(result => {
                if (result.status) {
                    console.log(result.data.data)
                    dispatch(setDoctors(result.data.data, searchable))
                }
            })
            .catch(err => {
                dispatch(haveingError(err))
            });
    };
};

export const GettingDoctorProfiles = (id) => {
    return dispatch => {
        dispatch(startDoctorLoading())
        axios
            .get(`${Host}/doctors/getdoc/${id}`)
            .then(result => {
                if (result.status) {
                    dispatch(tempDocStore(result.data.data))
                }
            })
            .catch(err => {
                dispatch(haveingError(err))
            });
    }
}