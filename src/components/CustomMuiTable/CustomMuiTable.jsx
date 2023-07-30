/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const CustomMuiTable = ({ columns, rows, isLoading = false, rowsPerPage, page, total, handleChangePage, handleChangeRowsPerPage }) => (
    <>
        <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.key}
                                align={column.align}
                                padding={column.disablePadding ? 'none' : 'normal'}
                                width={column.width}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <TableRow
                            style={{
                                height: 53
                            }}
                        >
                            <TableCell colSpan={columns.length} align="center">
                                Cargando...
                            </TableCell>
                        </TableRow>
                    ) : rows.length > 0 ? (
                        rows.map((row, index) => (
                            <TableRow hover key={index}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={`${column.key}-${index}`}
                                        align={column.align}
                                        padding={column.disablePadding ? 'none' : 'normal'}
                                    >
                                        {column.render ? column.render(row) : row[column.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow
                            style={{
                                height: 53
                            }}
                        >
                            <TableCell colSpan={columns.length} align="center">
                                No se encontraron datos
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={total} // TODO: Agregar paginación
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Registros por página"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
    </>
);

CustomMuiTable.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired
};

export default CustomMuiTable;
