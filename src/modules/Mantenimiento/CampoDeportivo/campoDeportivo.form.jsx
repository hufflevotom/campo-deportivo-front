import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// * Material UI
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Switch,
    TextField,
    Typography
} from '@mui/material';

// * Services
import campoDeportivoService from './campoDeportivo.service';
import deporteService from '../Deporte/deporte.service';
import CustomMuiUploadImage from 'components/CustomMuiUploadImage';

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

function CampoDeportivoForm({ datoSeleccionado, open, setOpen, tipo, traerDatos, showAlert }) {
    const [formData, setFormData] = useState({
        alias: '',
        titulo: '',
        descripcion: '',
        eventos: false,
        deporteId: 0
    });
    const [loadSave, setLoadSave] = useState(false);
    const [deportes, setDeportes] = useState([]);
    const [imagenURL, setImagenURL] = useState(null);
    const [imagen, setImagen] = useState(null);

    const obtenerDeportes = async (searchText) => {
        try {
            const respuesta = await deporteService.getAll(20, 0, searchText);
            if (respuesta.data.statusCode === 200) {
                setDeportes(
                    respuesta.data.body.map((deporte) => ({ ...deporte, key: deporte.id, value: deporte.id, label: deporte.nombre }))
                );
            } else {
                showAlert('error', 'Error', `Ocurrió un error al obtener los datos: ${respuesta.data.message}`);
            }
        } catch (e) {
            showAlert('error', 'Error', `Ocurrió un error al obtener los datos: ${e.response.data.message}`);
        }
    };

    const obtenerDatos = async () => {
        try {
            const respuesta = await campoDeportivoService.getOne(datoSeleccionado.id);
            if (respuesta.data.statusCode === 200) {
                await obtenerDeportes(respuesta.data.body.deportes[0]?.nombre || '');
                setFormData({ ...respuesta.data.body, deporteId: respuesta.data.body.deportes[0]?.id || null });
            } else {
                showAlert('error', 'Error', `Ocurrió un error al obtener los datos: ${respuesta.data.message}`);
            }
        } catch (e) {
            showAlert('error', 'Error', `Ocurrió un error al obtener los datos: ${e.response.data.message}`);
        }
    };

    const guardar = async () => {
        setLoadSave(true);
        const alias = formData.alias;
        const titulo = formData.titulo;
        const descripcion = formData.descripcion;
        const eventos = formData.eventos;
        const deporteId = formData.deporteId;

        if (!alias || !titulo || !descripcion || !deporteId) {
            showAlert('error', 'Datos Incompletos', 'Complete todos los campos para guardar');
            setLoadSave(false);
            return;
        }

        const data = {
            alias,
            titulo,
            descripcion,
            eventos,
            deporteId
        };

        try {
            if (tipo === 'editar') {
                const respuesta = await campoDeportivoService.update(datoSeleccionado.id, data);
                if (respuesta.data.statusCode === 200) {
                    if (imagen) {
                        const formData = new FormData();
                        formData.append('imagen', imagen);
                        await campoDeportivoService.uploadImage(datoSeleccionado.id, formData);
                    }
                    traerDatos({
                        current: 1,
                        pageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 20]
                    });
                    showAlert('success', 'Editado Correctamente', 'El Campo Deportivo se editó correctamente');
                    setOpen(false);
                    setLoadSave(false);
                } else {
                    showAlert('error', 'Error', `Ocurrió un error al editar: ${respuesta.data.message}`);
                }
            } else {
                const respuesta = await campoDeportivoService.create(data);
                if (respuesta.data.statusCode === 200) {
                    if (imagen) {
                        const formData = new FormData();
                        formData.append('imagen', imagen);
                        await campoDeportivoService.uploadImage(respuesta.data.body.id, formData);
                    }
                    traerDatos({
                        current: 1,
                        pageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 20]
                    });
                    showAlert('success', 'Guardado Correctamente', 'El Campo Deportivo se registró correctamente');
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
        obtenerDeportes();
    }, []);

    return (
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style} component="form" autoComplete="off">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '10px 10px 10px 0' }}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: '10px' }}>
                        {`${tipo === 'agregar' ? 'Agregar' : 'Editar'} Campo Deportivo`}
                    </Typography>
                    {/* Form */}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                        <div
                            style={{
                                width: '20%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px',
                                marginTop: '10px'
                            }}
                        >
                            <FormControlLabel
                                label="Eventos"
                                labelPlacement="end"
                                control={
                                    <Switch
                                        color="primary"
                                        checked={formData.eventos}
                                        onChange={(e) => setFormData((currFormData) => ({ ...currFormData, eventos: e.target.checked }))}
                                    />
                                }
                            />
                            <CustomMuiUploadImage
                                url={imagenURL}
                                saveCallback={(file) => {
                                    setImagenURL(URL.createObjectURL(file));
                                    setImagen(file);
                                }}
                                cleanCallback={() => {
                                    setImagenURL(null);
                                    setImagen(null);
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '80%' }}>
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <TextField
                                    label="Titulo"
                                    fullWidth
                                    value={formData.titulo}
                                    onChange={(e) => setFormData((currFormData) => ({ ...currFormData, titulo: e.target.value }))}
                                />
                                <TextField
                                    label="Alias"
                                    fullWidth
                                    value={formData.alias}
                                    onChange={(e) => setFormData((currFormData) => ({ ...currFormData, alias: e.target.value }))}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="deporteLabel">Deporte</InputLabel>
                                    <Select
                                        label="Deporte"
                                        labelId="deporteLabel"
                                        value={formData.deporteId}
                                        onChange={(e) => {
                                            setFormData((currFormData) => ({ ...currFormData, deporteId: e.target.value }));
                                        }}
                                    >
                                        {deportes.map((deporte) => (
                                            <MenuItem key={deporte.key} value={deporte.value}>
                                                {deporte.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <TextField
                                multiline
                                rows={3}
                                label="Descripcion"
                                value={formData.descripcion}
                                onChange={(e) => setFormData((currFormData) => ({ ...currFormData, descripcion: e.target.value }))}
                            />
                        </div>
                    </div>

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

CampoDeportivoForm.propTypes = {
    datoSeleccionado: PropTypes.object,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    tipo: PropTypes.string.isRequired,
    traerDatos: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
};

export default CampoDeportivoForm;
