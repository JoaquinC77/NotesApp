import {
    INICIANDO_SESION,
    INICIO_SESION_ERROR,
    INICIO_SESION_EXITO,
    CREANDO_USUARIO,
    CREANDO_USUARIO_ERROR,
    CREANDO_USUARIO_EXITO,
    USUARIO_AUTENTICADO,
    USUARIO_AUTENTICADO_ERROR,
    CERRANDO_SESION,
    CERRANDO_SESION_EXITO,
    CERRANDO_SESION_ERROR,
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import tokenAuth from "../config/authToken";

export const crearUserAction = (user) => {
    return async (dispatch) => {
        dispatch({ type: CREANDO_USUARIO });

        try {
            await clienteAxios.post("/api/auth/register", user);

            dispatch({
                type: CREANDO_USUARIO_EXITO,
                payload: false,
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario creado con exito",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            dispatch({ type: CREANDO_USUARIO_ERROR, payload: true });
            console.log(error);
        }
    };
};

export const usuarioAutenticado = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        if (token) {
            tokenAuth(token);

            dispatch({ type: USUARIO_AUTENTICADO, payload: true });
            return;
        }

        dispatch({ type: USUARIO_AUTENTICADO_ERROR});
    };
};

export const iniciarSesionAction = (user) => {
    return async (dispatch) => {
        dispatch({ type: INICIANDO_SESION, payload: true });

        try {
            const respuesta = await clienteAxios.post("/api/auth/login", user);

            if (respuesta.data?.token) {
                const { token } = respuesta.data;

                localStorage.setItem("token", token);
                dispatch({ type: INICIO_SESION_EXITO, payload: token });

                console.log("porque no estamos llegando aqui");
                usuarioAutenticado();

                return;
            }

            dispatch({ type: INICIO_SESION_ERROR, payload: true });
        } catch (error) {
            console.log(error);
            dispatch({ type: INICIO_SESION_ERROR, payload: true });
        }
    };
};

export const cerrarSesionAction = () => {
    return (dispatch) => {
        dispatch({ type: CERRANDO_SESION });

        const existeToken = localStorage.getItem("token");

        if (!existeToken) {
            dispatch({ type: CERRANDO_SESION_ERROR });
            return;
        }

        localStorage.removeItem("token");
        dispatch({
            type: CERRANDO_SESION_EXITO,
        });
    };
};
