import {
    CARGANDO_NOTAS,
    CARGANDO_NOTAS_ERROR,
    CARGANDO_NOTAS_EXITO,
    CREANDO_NOTA,
    CREANDO_NOTA_ERROR,
    CREANDO_NOTA_EXITO,
    EDITANDO_NOTA,
    EDITAR_NOTA_ERROR,
    EDITAR_NOTA_EXITO,
    ELIMINANDO_NOTA,
    ELIMINANDO_NOTA_ERROR,
    ELIMINANDO_NOTA_EXITO,
    OBTENER_NOTA,
    OBTENER_NOTA_ERROR,
    OBTENER_NOTA_EXITO,
} from "../types";

const initialState = {
    error: false,
    cargando: false,
    notas: [],
    nota: null,
};

const notasReducer = (state = initialState, action) => {
    switch (action.type) {
        case CARGANDO_NOTAS:
        case OBTENER_NOTA:
        case EDITANDO_NOTA:
        case CREANDO_NOTA:
        case ELIMINANDO_NOTA:
            return {
                ...state,
                cargando: true,
            };
        case CARGANDO_NOTAS_ERROR:
        case OBTENER_NOTA_ERROR:
        case EDITAR_NOTA_ERROR:
        case CREANDO_NOTA_ERROR:
        case ELIMINANDO_NOTA_ERROR:
            return {
                ...state,
                cargando: false,
                error: action.payload,
            };
        case CARGANDO_NOTAS_EXITO:
            return {
                ...state,
                cargando: false,
                error: false,
                notas: action.payload,
            };
        case OBTENER_NOTA_EXITO:
            return {
                ...state,
                cargando: false,
                error: false,
                nota: action.payload,
            };
        case EDITAR_NOTA_EXITO:
            return {
                ...state,
                cargando: false,
                error: false,
                nota: action.payload,
                notas: state.notas.map((nota) =>
                    nota._id === action.payload._id ? action.payload : nota
                ),
            };
        case CREANDO_NOTA_EXITO:
            return {
                ...state,
                cargando: false,
                error: false,
                notas: [...state.notas, action.payload],
            };
        case ELIMINANDO_NOTA_EXITO:
            return { 
                ...state,
                cargando: false,
                error: false,
                nota: null,
                notas: state.notas.filter((nota) => nota._id !== action.payload._id)
            };
        default:
            return state;
    }
};


export default notasReducer;