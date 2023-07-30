// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const maintenance = {
    id: 'Mantenimiento',
    title: <FormattedMessage id="mantenimiento" />,
    type: 'group',
    children: [
        // {
        //     id: 'campoDeportivo',
        //     title: <FormattedMessage id="campoDeportivo" />,
        //     // caption: <FormattedMessage id="basic-caption" />,
        //     type: 'collapse',
        //     icon: icons.IconBrush,
        //     children: [
        //         {
        //             id: 'listar',
        //             title: <FormattedMessage id="listar" />,
        //             type: 'item',
        //             url: '/mantenimineto/campoDeportivo/listar',
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        {
            id: 'campoDeportivo',
            title: <FormattedMessage id="Campo Deportivo" />,
            type: 'item',
            url: '/mantenimiento/campoDeportivo',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'deporte',
            title: <FormattedMessage id="Deporte" />,
            type: 'item',
            url: '/mantenimiento/deporte',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'tipoReserva',
            title: <FormattedMessage id="Tipo de Reserva" />,
            type: 'item',
            url: '/mantenimiento/tipoReserva',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'adicional',
            title: <FormattedMessage id="Adicional" />,
            type: 'item',
            url: '/mantenimiento/adicional',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default maintenance;
