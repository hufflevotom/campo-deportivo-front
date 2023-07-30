import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// * Material UI
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

// * Services
import deporteService from './deporte.service';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4
};

function DeporteForm({ datoSeleccionado, open, setOpen, tipo, traerDatos, showAlert }) {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        imagenUrl: ''
    });
    const [loadSave, setLoadSave] = useState(false);

    const obtenerDatos = async () => {
        try {
            const respuesta = await deporteService.getOne(datoSeleccionado.id);
            if (respuesta.data.statusCode === 200) {
                setFormData({ ...respuesta.data.body });
            } else {
                showAlert('error', 'Error', `Ocurrió un error al obtener los datos: ${respuesta.data.message}`);
            }
        } catch (e) {
            showAlert('error', 'Error', `Ocurrió un error al obtener los datos: ${e.response.data.message}`);
        }
    };

    const guardar = async () => {
        setLoadSave(true);
        const nombre = formData.nombre;
        const descripcion = formData.descripcion;

        if (!nombre || !descripcion) {
            // openNotification('Datos Incompletos', 'Complete todos los campos para guardar', 'Alerta');
            setLoadSave(false);
            return;
        }

        const data = {
            nombre,
            descripcion,
            imagenUrl: formData.imagenUrl
        };

        try {
            if (tipo === 'editar') {
                const respuesta = await deporteService.update(datoSeleccionado.id, data);
                if (respuesta.data.statusCode === 200) {
                    traerDatos({
                        current: 1,
                        pageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 20]
                    });
                    showAlert('success', 'Editado Correctamente', 'El Deporte se editó correctamente');
                    setOpen(false);
                    setLoadSave(false);
                } else {
                    showAlert('error', 'Error', `Ocurrió un error al editar: ${respuesta.data.message}`);
                }
            } else {
                const respuesta = await deporteService.create(data);
                if (respuesta.data.statusCode === 200) {
                    traerDatos({
                        current: 1,
                        pageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 20]
                    });
                    showAlert('success', 'Guardado Correctamente', 'El Deporte se registró correctamente');
                    setOpen(false);
                    setLoadSave(false);
                } else {
                    showAlert('error', 'Error', `Ocurrió un error al guardar: ${respuesta.data.message}`);
                }
            }
        } catch (e) {
            showAlert('error', 'Error', `Ocurrió un error al guardar: ${e.response.data.message}`);
            setLoadSave(false);
        }
    };

    useEffect(() => {
        if (tipo !== 'agregar') {
            obtenerDatos();
        }
    }, []);

    return (
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style} component="form" autoComplete="off">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '10px' }}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: '15px' }}>
                        {`${tipo === 'agregar' ? 'Agregar' : 'Editar'} Deporte`}
                    </Typography>
                    {/* Form */}
                    <TextField
                        label="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData((currFormData) => ({ ...currFormData, nombre: e.target.value }))}
                    />
                    {/* //* text area descripcion */}
                    <TextField
                        multiline
                        rows={3}
                        label="Descripción"
                        value={formData.descripcion}
                        onChange={(e) => setFormData((currFormData) => ({ ...currFormData, descripcion: e.target.value }))}
                    />
                    {/* End Form */}
                    <div style={{ display: 'flex', gap: '20px', alignSelf: 'end', marginTop: '15px' }}>
                        <Button variant="contained" size="small" onClick={guardar} color="primary" disabled={loadSave}>
                            Guardar
                        </Button>
                        <Button variant="contained" size="small" onClick={() => setOpen(false)} color="secondary" disabled={loadSave}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

DeporteForm.propTypes = {
    datoSeleccionado: PropTypes.object,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    tipo: PropTypes.string.isRequired,
    traerDatos: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
};

export default DeporteForm;
