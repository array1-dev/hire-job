import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const urlAPI = process.env.NEXT_PUBLIC_URL_API;


const GetUsersRequest = () => {
    return {
        type: "GET_USERS_REQUEST"
    };
}

const getALlUsers = (data) => {
    return {
        type: "GET_USERS",
        payload: data
    };
}

const getUsers = (data) => {
    return {
        type: "GET_USER",
        payload: data
    };
}

const getSkills = (data) => {
    return {
        type: "GET_SKILLS",
        payload: data
    };
}

const getPortfolio = (data) => {
    return {
        type: "GET_PORTFOLIO",
        payload: data
    };
}


const getExperience = (data) => {
    return {
        type: "GET_EXPERIENCE",
        payload: data
    };
}

const getResponse = (data) => {
    return {
        type: "GET_RESPONSE",
        payload: data
    };
}

const GetUsersError = (error) => {
    return {
        type: "GET_USERS_ERROR",
        payload: error
    };
}

export const GetAllUsers = ({ sort, page = 1, limit, search, isActive }) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "GET",
            url: `/api/users${search ? `?search=${search}` : '?search='}${isActive ? `&isActive=${isActive}` : ''}${sort ? `&sort=${sort}` : ''}${page && limit ? `&page=${page}&limit=${limit}` : ''}`,
        }).then((res) => {
            dispatch(getALlUsers(res.data.data));
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));

        })
    }
}

export const GetBySlug = (slug) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "GET",
            url: `/api/users/slug?slug=${slug}`,
        }).then((res) => {
            dispatch(getUsers(res.data.data));
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
        })
    }
}

export const GetSkills = (token) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "GET",
            url: `${urlAPI}/skills/`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch(getSkills(res.data.data));
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
        })
    }
}

export const GetPortfolio = (token, slug) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "GET",
            url: `${urlAPI}/portfolio/user/${slug}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch(getPortfolio(res.data.data));
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
        })
    }
}

export const GetUserExperience = (token) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "GET",
            url: `${urlAPI}/experiences/`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch(getExperience(res.data.data));
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
        })
    }
}

export const AddExperience = (token, data) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "POST",
            url: `${urlAPI}/experiences/`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        }).then((res) => {
            dispatch(getResponse(res.data));
            toast.success(`${res.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
}

export const AddSkill = (token, data) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "POST",
            url: `${urlAPI}/skills/`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        }).then((res) => {
            dispatch(getResponse(res.data));
            toast.success(`${res.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
            toast.error(`${err.response.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
}

export const RemoveExperience = (token, id) => {
    return (dispatch) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(GetUsersRequest())
                axios({
                    method: "DELETE",
                    url: `${urlAPI}/experiences/${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    dispatch(getResponse(res.data));
                    toast.success(`${res.data.message}`, {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }).catch((err) => {
                    dispatch(GetUsersError(err.response.data));
                    toast.error(`${err.response.data.message}`, {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
        }).catch(error => {
            dispatch(GetUsersError(error.response.data));
            toast.error(`${err.response.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })

    }
}

export const RemoveSkill = (token, id) => {
    return (dispatch) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "DELETE",
                    url: `${urlAPI}/skills/${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {

                    dispatch(getResponse(res.data));
                    toast.success(`${res.data.message}`, {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }).catch((err) => {
                    dispatch(GetUsersError(err.response.data));
                    toast.error(`${err.response.data.message}`, {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
        }).catch(error => {
            dispatch(GetUsersError(error.response.data));
            toast.error(`${err.response.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })

    }
}

export const AddPortfolio = (token, data) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "POST",
            url: `${urlAPI}/portfolio/`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        }).then((res) => {
            dispatch(getResponse(res.data));
            toast.success(`${res.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
            toast.error(`${err.response.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
}

export const RemovePortfolio = (token, id) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "DELETE",
            url: `${urlAPI}/portfolio/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch(getResponse(res.data));
            toast.success(`${res.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
            toast.error(`${err.response.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
}



export const UpdateUser = (token, data) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "PATCH",
            url: `${urlAPI}/users`,
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            dispatch(getResponse(res.data));
            toast.success(`${res.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch((err) => {
            dispatch(GetUsersError(err.response.data));
            toast.error(`${err.response.data.message}`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })

    }
}

