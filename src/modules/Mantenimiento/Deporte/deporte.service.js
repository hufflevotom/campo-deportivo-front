/* eslint-disable no-underscore-dangle */
import { Mantenimiento } from 'constants/Endpoints';
import { httpClient } from 'utils/axios';

const getAll = async (limit, offset, search = '') =>
    httpClient.get(`${Mantenimiento.Deporte.getAll}?take=${limit}&skip=${offset}${search && search !== '' ? `&search=${search}` : ''}`);

const create = async (body) => httpClient.post(Mantenimiento.Deporte.create, body);

const getOne = async (id) => httpClient.get(Mantenimiento.Deporte.getOne + id);

const update = async (id, body) => httpClient.put(Mantenimiento.Deporte.update + id, body);

const _delete = async (id) => httpClient.delete(Mantenimiento.Deporte.delete + id);

export default {
    getAll,
    create,
    getOne,
    update,
    delete: _delete
};
