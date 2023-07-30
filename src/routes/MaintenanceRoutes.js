import { lazy } from 'react';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// widget routing
// const WidgetStatistics = Loadable(lazy(() => import('views/widget/Statistics')));
const WidgetData = Loadable(lazy(() => import('views/widget/Data')));

// application routing
// const AppKanban = Loadable(lazy(() => import('views/application/kanban')));
// ==============================|| MAIN ROUTING ||============================== //
// * Importación de modulos
const Acional = Loadable(lazy(() => import('modules/Mantenimiento/Adicional')));
const CampoDeportivo = Loadable(lazy(() => import('modules/Mantenimiento/CampoDeportivo')));
const Deporte = Loadable(lazy(() => import('modules/Mantenimiento/Deporte')));
const TipoReserva = Loadable(lazy(() => import('modules/Mantenimiento/TipoReserva')));

const MaintenanceRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        // {
        //     path: '/mantenimiento/campoDeportivo',
        //     element: <WidgetStatistics />,
        //     children: [
        //         {
        //             path: 'listar',
        //             element: <WidgetStatistics />
        //         },
        //         {
        //             path: 'board',
        //             element: <WidgetData />
        //         }
        //     ]
        // },
        {
            path: '/mantenimiento/campoDeportivo',
            element: <CampoDeportivo />
        },
        {
            path: '/mantenimiento/deporte',
            element: <Deporte />
        },
        {
            path: '/mantenimiento/tipoReserva',
            element: <TipoReserva />
        },
        {
            path: '/mantenimiento/adicional',
            element: <Acional />
        }
    ]
};

export default MaintenanceRoutes;
