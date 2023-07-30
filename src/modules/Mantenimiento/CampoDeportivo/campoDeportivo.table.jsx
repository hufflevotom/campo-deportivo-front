// * Material UI
import { Alert, AlertTitle, Button, Grid } from '@mui/material';

// * Constants
import { gridSpacing } from 'store/constant';

// * Hooks
import useCrudTable from 'hooks/useCrudTable';

// * Services
import campoDeportivoService from './campoDeportivo.service';

// * Components
import MainCard from 'ui-component/cards/MainCard';
import CustomMuiTable from 'components/CustomMuiTable';
import CampoDeportivoForm from './campoDeportivo.form';
import { useState } from 'react';
import { pathPublic } from 'constants/Endpoints';

export default function CampoDeportivoTable() {
    const model = 'campo Deportivo';

    const [alert, setAlert] = useState(null);

    const showAlert = (type, title, message) => {
        setAlert({ type, title, message });
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    const {
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
    } = useCrudTable({
        model: {
            id: null,
            createdAt: '',
            updatedAt: '',
            deletedAt: null,
            estado: '',
            alias: '',
            titulo: '',
            descripcion: '',
            eventos: true
        },
        service: campoDeportivoService,
        tabla: {
            columns: [
                {
                    key: 'imagen',
                    label: 'Imagen',
                    align: 'left',
                    width: 100,
                    render: (row) => {
                        // TODO: Cambiar por la url de la imagen
                        const imgUrl = row.imagenUrl;
                        const src = imgUrl ? pathPublic + imgUrl : 'https://via.placeholder.com/100x100';
                        return <img src={src} alt={row.titulo} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />;
                    }
                },
                {
                    key: 'alias',
                    label: 'Alias',
                    align: 'left'
                },
                {
                    key: 'titulo',
                    label: 'Titulo',
                    align: 'left'
                },
                {
                    key: 'eventos',
                    label: 'Eventos',
                    align: 'left',
                    render: (row) => (row.eventos ? 'Si' : 'No')
                }
            ],
            actions: {
                info: false,
                edit: true,
                delete: true
            }
        },
        showAlert
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    title="Lista de campos deportivos"
                    content={false}
                    secondary={
                        <Button variant="text" size="small" onClick={addNewRegister}>
                            {`Agregar ${model}`}
                        </Button>
                    }
                >
                    <CustomMuiTable
                        columns={columns}
                        rows={rows}
                        isLoading={isLoading}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        total={total}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        alert={alert}
                    />
                </MainCard>
                {alert && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '300px',
                            zIndex: 9999
                        }}
                    >
                        <Alert severity={alert.type}>
                            <AlertTitle>{alert.title}</AlertTitle>
                            {alert.message}
                        </Alert>
                    </div>
                )}
            </Grid>
            {showForm ? (
                <CampoDeportivoForm
                    traerDatos={getData}
                    open={showForm}
                    datoSeleccionado={selectedRow}
                    setOpen={setShowForm}
                    tipo={formType}
                    showAlert={showAlert}
                />
            ) : null}
        </Grid>
    );
}
