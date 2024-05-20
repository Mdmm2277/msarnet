// import { makeStyles } from '@material-ui/core/styles';

import { Box, Container, Divider, Link, Stack, Typography } from "@mui/material";
import TrainLink from "../assets/TrainLink.png"

export default function Footer() {

    return (
        <footer>
            <Divider />
            <Container maxWidth="lg">
                <Box py={6} display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between">
                    <Stack direction={"row"} sx={{justifyContent: "center", gap: 2, alignItems: "center"}}>
                        <Box sx={{height: "4vh"}}>
                            <img src={TrainLink} style={{height: "inherit"}} />
                        </Box>
                        <Typography variant='h6' sx={{fontWeight: 800, color: "#183c4f"}}>مسارنت</Typography>
                    </Stack>
                    <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>© مسارنت , جميع الحقوق محفوظة 2024</Typography>
                </Box>
            </Container>
        </footer>
    )
}
