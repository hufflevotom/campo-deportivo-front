import { useState } from 'react';

// * Material UI
import { Alert, AlertTitle, Button, Grid } from '@mui/material';

// * Constants
import { gridSpacing } from 'store/constant';

// * Hooks
import useCrudTable from 'hooks/useCrudTable';

// * Services
import adicionalService from './adicional.service';

// * Components
import MainCard from 'ui-component/cards/MainCard';
import CustomMuiTable from 'components/CustomMuiTable';
import AdicionalForm from './adicional.form';

export default function AdicionalTable() {
    const model = 'adicional';

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
            nombre: '',
            precio_hora: ''
        },
        service: adicionalService,
        tabla: {
            columns: [
                {
                    key: 'nombre',
                    label: 'Nombre',
                    align: 'left'
                },
                {
                    key: 'precio_hora',
                    label: 'Precio por hora',
                    align: 'left'
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
                    title={`Lista de ${model}es`}
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
                <AdicionalForm
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
