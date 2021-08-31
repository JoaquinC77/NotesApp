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
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

export const cargandoNotasAction = () => {
    return async (dispatch) => {
        dispatch({ type: CARGANDO_NOTAS });

        try {
            const resultado = await clienteAxios.get(
                "https://server-notas-joaquinc77.vercel.app/api/notas/"
            );
            const notas = resultado.data;
            dispatch({ type: CARGANDO_NOTAS_EXITO, payload: notas });
        } catch (error) {
            console.log(error);
            dispatch({ type: CARGANDO_NOTAS_ERROR, payload: true });
        }
    };
};

export const cargarNotaAction = (nota) => {
    return (dispatch) => {
        dispatch({ type: OBTENER_NOTA });

        try {
            dispatch({ type: OBTENER_NOTA_EXITO, payload: nota });
        } catch (error) {
            dispatch({ type: OBTENER_NOTA_ERROR, payload: true });
        }
    };
};

export const editarNotas = (notaNueva) => {
    return async (dispatch) => {
        dispatch({ type: EDITANDO_NOTA });

        const { title, text } = notaNueva;

        try {
            const notaEditada = await clienteAxios.put(
                `https://server-notas-joaquinc77.vercel.app/api/notas/${notaNueva._id}`,
                { title, text }
            );

            dispatch({ type: EDITAR_NOTA_EXITO, payload: notaEditada.data });
        } catch (error) {
            dispatch({ type: EDITAR_NOTA_ERROR, payload: true });
        }
    };
};

export const crearNotaAction = (nuevaNota) => {
    return async (dispatch) => {
        dispatch({ type: CREANDO_NOTA });

        try {
            const resultado = await clienteAxios.post(
                "https://server-notas-joaquinc77.vercel.app/api/notas/",
                nuevaNota
            );

            dispatch({ type: CREANDO_NOTA_EXITO, payload: resultado.data });
        } catch (error) {
            console.log(error);
            dispatch({ type: CREANDO_NOTA_ERROR, payload: true });
        }
    };
};

export const eliminarNotaAction = (nota) => {
    return async (dispatch) => {
        dispatch({ type: ELIMINANDO_NOTA });

        try {
            const resultado = await Swal.fire({
                title: "¿Estas Seguro?",
                text: "Deseas eliminar la nota",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, a la basura!",
            }).then((result) => result);

            if (resultado.isConfirmed) {
                await clienteAxios.delete(`https://server-notas-joaquinc77.vercel.app/api/notas/${nota._id}`);

                dispatch({ type: ELIMINANDO_NOTA_EXITO, payload: nota });

                Swal.fire(
                    "Eliminada!",
                    "Nota eliminada correctamente",
                    "success"
                );
            }

        } catch (error) {
            console.log(error);
            dispatch({ type: ELIMINANDO_NOTA_ERROR, payload: true });
        }
    };
};
