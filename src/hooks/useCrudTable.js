/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';

import { IconButton, Stack } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function useCrudTable({ model, tabla, service, getAll = null, _delete = null, showAlert }) {
    const [isLoading, setIsLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showDetails, setShowDetails] = useState(false);
    const [formType, setFormType] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(model);

    const showInfo = (dato) => {
        setSelectedRow(dato);
        setShowDetails(true);
    };

    const addNewRegister = () => {
        setSelectedRow({ ...model });
        setFormType('agregar');
        setShowForm(true);
    };

    const editRegister = (record) => {
        setSelectedRow(record);
        setFormType('editar');
        setShowForm(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const getData = async () => {
        //* Iniciar loading
        setIsLoading(true);

        //* Obtener parametros de paginacion
        // TODO: pendiente de paginacion
        // const limit = rowsPerPage;
        // const offset = page * rowsPerPage;
        const limit = 100;
        const offset = 0;
        const paginate = [limit, offset, getAll?.params?.search || ''];

        //* Obtener parametros adicionales
        const params = getAll ? (getAll.params.paginate ? [...paginate, ...getAll.params.values] : getAll.params.values) : [];

        //* Invocar servicio
        const response = getAll ? await getAll.func(...params) : await service.getAll(...paginate);

        //* Obtener data y total de registros
        let data = [];
        let totalData = 0;
        // if (response.data?.body?.length === 2 && typeof response.data.body[1] === 'number' && Array.isArray(response.data.body[0])) {
        //     data =
        //         getAll && getAll.response && typeof getAll.response === 'function'
        //             ? getAll.response(response.data.body[0])
        //             : response.data.body[0].map((e, i) => ({
        //                   ...e,
        //                   key: i
        //               }));
        //     totalData = response.data.body[1];
        // } else {
        data =
            getAll && getAll.response && typeof getAll.response === 'function'
                ? getAll.response(response.data.body)
                : response.data.body.map((e, i) => ({
                      ...e,
                      key: i
                  }));

        totalData = response.data.body.length;
        // }

        //* Detener loading
        setIsLoading(false);

        //* Actualizar data
        setRows([...data]);
        setTotal(totalData);
    };

    const deleteRegister = async (record) => {
        setIsLoading(true);
        const respuesta = _delete ? _delete.func(record.id) : await service.delete(record.id);
        if (respuesta.data.statusCode === 200) {
            getData();
            showAlert('success', 'Registro Eliminado', 'Eliminado con exito');
        } else {
            showAlert('error', 'Error al Eliminar', 'Por favor vuelva a intentarlo');
        }
        setIsLoading(false);
    };

    const columns = [
        ...tabla.columns,
        {
            key: 'action',
            label: tabla.actions.title || 'Action',
            align: 'left',
            width:
                50 +
                (tabla.actions.info ? 50 : 0) +
                (tabla.actions.edit ? 50 : 0) +
                (tabla.actions.delete ? 50 : 0) +
                (tabla.actions.aditionalActions ? tabla.actions.aditionalActions.length * 50 : 0),
            render: (record) => (
                <Stack direction="row" justifyContent="center" alignItems="center">
                    {tabla.actions.aditionalActions?.map((act) => (
                        <IconButton
                            color="primary"
                            size="large"
                            onClick={() => act.onClick(record)}
                            disabled={act.disabled ? act.disabled(record) : false}
                        >
                            {act.icon}
                        </IconButton>
                    ))}
                    {tabla.actions.info && (
                        <IconButton
                            color="primary"
                            size="large"
                            onClick={() => {
                                showInfo(record);
                            }}
                            disabled={tabla.actions.infoDisabled ? tabla.actions.infoDisabled(record) : false}
                        >
                            <VisibilityOutlined />
                        </IconButton>
                    )}
                    {tabla.actions.edit && (
                        <IconButton
                            color="primary"
                            size="large"
                            onClick={() => {
                                editRegister(record);
                            }}
                            disabled={tabla.actions.editDisabled ? tabla.actions.editDisabled(record) : false}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    )}
                    {tabla.actions.delete && (
                        <IconButton
                            color="inherit"
                            size="large"
                            onClick={() => {
                                deleteRegister(record);
                            }}
                            disabled={tabla.actions.deleteDisabled ? tabla.actions.deleteDisabled(record) : false}
                        >
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    )}
                </Stack>
            )
        }
    ];

    useEffect(() => {
        getData();
    }, []);
    // TODO: pendiente de la paginacion }, [rowsPerPage, page]);

    return {
        addNewRegister,
        isLoading,
        columns,
        rows,
        rowsPerPage,
        page,
        total,
        handleChangePage,
        handleChangeRowsPerPage,
        formType,
        showForm,
        setShowForm,
        selectedRow,
        getData
    };
}
