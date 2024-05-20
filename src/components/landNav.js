import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import TrainLink from "../assets/TrainLink.png"
import { NavLink } from "react-router-dom";

export default function LandingNav(){
    return (
      <Box sx={{
        "::before":{
          content: '""', position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,.3)", filter: "blur(8px);", zIndex: -1
        }, 
        p: 3, boxSizing: "border-box", width: "100%"
      }}>
        <Container>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
            <Grid item xs={6} md={2}>
              <Stack direction={"row"} sx={{justifyContent: "center", gap: 2}}>
                <Box sx={{height: "5vh"}}>
                  <img src={TrainLink} style={{height: "inherit"}} />
                </Box>
                <Typography variant='h4' sx={{fontWeight: 800, color: "#183c4f"}}>مسارنت</Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack direction={"row"} sx={{justifyContent: "center", gap: 2}}>
                <Button component={NavLink} to={"portal"} variant='contained'>المنصة</Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
}