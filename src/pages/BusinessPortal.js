import { Stack } from '@mui/material';
import PortalNav from '../components/PortalNav';
import BusinessPrograms from '../components/BusinessPrograms';

export default function BusinessPortal() {
    return(
        <Stack sx={{flexGrow: 1, position: "relative"}}>
            <PortalNav />
            <BusinessPrograms />
        </Stack>
    )
}