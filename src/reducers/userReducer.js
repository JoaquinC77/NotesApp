import {
    INICIANDO_SESION,
    INICIO_SESION_ERROR,
    INICIO_SESION_EXITO,
    CREANDO_USUARIO,
    CREANDO_USUARIO_ERROR,
    CREANDO_USUARIO_EXITO,
    USUARIO_AUTENTICADO,
    USUARIO_AUTENTICADO_ERROR,
    CERRANDO_SESION_EXITO,
    CERRANDO_SESION_ERROR,
    CERRANDO_SESION
} from "../types";

const initialState = {
    autenticado: false,
    token: null,
    cargando: false,
    error: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case INICIANDO_SESION:
        case CREANDO_USUARIO:
        case CERRANDO_SESION:
            return {
                ...state,
                cargando: true,
            };
        case INICIO_SESION_ERROR:
        case CREANDO_USUARIO_ERROR:
        case CERRANDO_SESION_ERROR:
            return {
                ...state,
                cargando: false,
                error: action.payload,
            };
        case CREANDO_USUARIO_EXITO:
            return{
                ...state,
                cargando: false,
                error: action.payload
            }
        case INICIO_SESION_EXITO: {
            return {
                ...state,
                cargando: false,
                error: false,
                autenticado: true,
                token: action.payload,
            };
        }
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                cargando: false,
                error: false,
                autenticado: action.payload
            }
        case USUARIO_AUTENTICADO_ERROR:
            return{
                ...state,
                cargando: false,
                autenticado: false
            }
        case CERRANDO_SESION_EXITO: {
            return{
                ...state,
                cargando: false,
                error: false,
                autenticado: false,
                token: null,
            }
        }
        default:
            return state;
    }
};

export default userReducer;