import { Stack } from '@mui/material';
import PortalNav from '../components/PortalNav';
import AdminApplications from '../components/AdminApplications';

export default function AdminPortal() {
    return(
        <Stack sx={{flexGrow: 1}}>
            <PortalNav />
            <AdminApplications />
        </Stack>
    )
}