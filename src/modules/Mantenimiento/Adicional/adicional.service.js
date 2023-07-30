/* eslint-disable no-underscore-dangle */
import { Mantenimiento } from 'constants/Endpoints';
import { httpClient } from 'utils/axios';

const getAll = async (limit, offset, search = '') =>
    httpClient.get(`${Mantenimiento.Adicionales.getAll}?take=${limit}&skip=${offset}${search && search !== '' ? `&search=${search}` : ''}`);

const create = async (body) => httpClient.post(Mantenimiento.Adicionales.create, body);

const getOne = async (id) => httpClient.get(Mantenimiento.Adicionales.getOne + id);

const update = async (id, body) => httpClient.put(Mantenimiento.Adicionales.update + id, body);

const _delete = async (id) => httpClient.delete(Mantenimiento.Adicionales.delete + id);

export default {
    getAll,
    create,
    getOne,
    update,
    delete: _delete
};
