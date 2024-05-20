import { Box, Button, Container, Grid, Typography } from '@mui/material';
import LandingNav from '../components/landNav';
import LPImage from "../assets/LPImage.svg"
import { useNavigate } from 'react-router-dom';

export default function Landing({ scrollToSection,readmore }){
    const navigate = useNavigate();

    return(
        <Box sx={{background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(24,60,79,0.1) 25%, rgba(255,255,255,1) 50%, rgba(24,60,79,0.1) 75%, rgba(255,255,255,1) 100%)", display: "flex", flexDirection: "column", height: "100vh"}}>
            <LandingNav />
            <Container maxWidth="xl" sx={{display: "flex",flexDirection: "column",flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
                <Grid container direction="row" justifyContent="space-around" alignItems="center" spacing={0} sx={{height: "90%", maxWidth: "90%"}}>
                    <Grid item sx={{height: "100%", display:"flex", flexDirection: "column", justifyContent: "center", maxWidth: {xs: "100%",sm: "80%",lg:"45%"}, gap: 3}}>
                        <Box>
                            <Typography variant='h3' sx={{fontWeight: 700, color: "#183c4f"}}>نقطة التقاء الطموح بالفرص</Typography>
                        </Box>
                    <Typography variant='h6' sx={{color: "#183c4f"}}><span style={{fontWeight: 700}}>مسارنت</span>  تربط بين العلم والمهنة، مفتاح آفاق النماء والابتكار. هذا هو المكان الذي تلتقي فيه الإمكانيات بمستقبلها، حيث تتحول الأحلام إلى إنجازات.</Typography>
                    <Box sx={{alignSelf: "flex-start", display: "flex", gap: 2}}>
                        <Button variant='contained' sx={{background: "#183c4f"}} onClick={() => {navigate("/portal")}}>انضم الينا الان!</Button>
                        <Button variant='outlined' onClick={() => scrollToSection(readmore)}>قرائة المزيد</Button>
                    </Box>
                    </Grid>
                    <Grid item sx={{height: "100%", flexDirection: "column", justifyContent: "center", maxWidth: {xs: "100%",sm: "80%",lg:"45%"}, display: {xs: "none",lg: "flex"}}}>
                        <Box sx={{height: "40vh", maxWidth: "100%"}}>
                            <img src={LPImage} style={{height: "inherit"}} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}