import { Box, Button, Link, Stack, Typography } from "@mui/material";
import TrainLink from "../assets/TrainLink.png"
import { NavLink } from "react-router-dom";

export default function ErrorPage(){
    return(
        <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
            <Stack sx={{alignItems: "center", justifyContent: "center", flexGrow: 1, gap: 3}}>
                <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{height: "10vh"}}>
                        <img src={TrainLink} style={{height: "inherit"}} />
                    </Box>
                    <Typography variant='h2' sx={{fontWeight: 800, color: "#183c4f"}}>404</Typography>
                    <Typography variant='h4' sx={{fontWeight: 700, color: "#183c4f"}}>عذرًا، الصفحة التي تبحث عنها غير متوفرة.</Typography>
                    <Typography variant='h6' sx={{color: "#183c4f"}}>إذا كنت تعتقد أن هذا الخطأ لا ينبغي أن يحدث، يرجى التواصل مع الدعم الفني <Link href="mailto:contact@masarnet.com">هنا</Link></Typography>    
                </Stack>
                <Button component={NavLink} to={"/"} variant="outlined">الذهاب الى الصفحة الرئيسية</Button>
            </Stack>
        </Box>
    )
}