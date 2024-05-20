import { Stack } from '@mui/material';
import StudentPrograms from '../components/StudentPrograms';
import PortalNav from '../components/PortalNav';

export default function StudentPortal() {
    return(
        <Stack sx={{flexGrow: 1}}>
            <PortalNav />
            <StudentPrograms />
        </Stack>
    )
}