export const backend = process.env.REACT_APP_BACKEND_URL;
export const pathPublic = process.env.REACT_APP_PUBLIC_PATH_URL;

//* Módulo de Mantenimiento
export const Mantenimiento = {
    Adicionales: {
        getAll: `${backend}mantenimiento/adicional`,
        create: `${backend}mantenimiento/adicional`,
        getOne: `${backend}mantenimiento/adicional/`,
        update: `${backend}mantenimiento/adicional/`,
        delete: `${backend}mantenimiento/adicional/`
    },
    CampoDeportivo: {
        getAll: `${backend}mantenimiento/campoDeportivo`,
        create: `${backend}mantenimiento/campoDeportivo`,
        getOne: `${backend}mantenimiento/campoDeportivo/`,
        update: `${backend}mantenimiento/campoDeportivo/`,
        delete: `${backend}mantenimiento/campoDeportivo/`,
        uploadImage: `${backend}mantenimiento/campoDeportivo/imagen/`
    },
    Deporte: {
        getAll: `${backend}mantenimiento/deporte`,
        create: `${backend}mantenimiento/deporte`,
        getOne: `${backend}mantenimiento/deporte/`,
        update: `${backend}mantenimiento/deporte/`,
        delete: `${backend}mantenimiento/deporte/`
    },
    TipoReserva: {
        getAll: `${backend}mantenimiento/tipoReserva`,
        create: `${backend}mantenimiento/tipoReserva`,
        getOne: `${backend}mantenimiento/tipoReserva/`,
        update: `${backend}mantenimiento/tipoReserva/`,
        delete: `${backend}mantenimiento/tipoReserva/`
    }
};
