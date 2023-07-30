/* eslint-disable no-underscore-dangle */
import { Mantenimiento } from 'constants/Endpoints';
import { httpClient } from 'utils/axios';

const getAll = async (limit, offset, search = '') =>
    httpClient.get(
        `${Mantenimiento.CampoDeportivo.getAll}?take=${limit}&skip=${offset}${search && search !== '' ? `&search=${search}` : ''}`
    );

const create = async (body) => httpClient.post(Mantenimiento.CampoDeportivo.create, body);

const getOne = async (id) => httpClient.get(Mantenimiento.CampoDeportivo.getOne + id);

const update = async (id, body) => httpClient.put(Mantenimiento.CampoDeportivo.update + id, body);

const uploadImage = async (id, body) => httpClient.put(Mantenimiento.CampoDeportivo.uploadImage + id, body);

const _delete = async (id) => httpClient.delete(Mantenimiento.CampoDeportivo.delete + id);

export default {
    getAll,
    create,
    getOne,
    update,
    uploadImage,
    delete: _delete
};
