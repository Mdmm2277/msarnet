import { Stack } from '@mui/material';
import PortalNav from '../components/PortalNav';
import SupervisorDashboard from '../components/SupervisorDashboard';

export default function SupervisorPortal() {
    return(
        <Stack sx={{flexGrow: 1}}>
            <PortalNav />
            <SupervisorDashboard />
        </Stack>
    )
}