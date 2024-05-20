import { Avatar, Box, Button, ButtonGroup, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import TrainLink from "../assets/TrainLink.png"
import { NavLink } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { useAuth } from "../shared";
import { useEffect, useState } from "react";

export default function PortalNav(){
    const Auth = useAuth()
    const [userImage,setuserImage] = useState("")
    const [userName,setuserName] = useState("")

    useEffect(() => {
        async function fetchdata(){
            var image = await Auth.getUserImage()
            if(image == false){
                setuserImage("")
            }else{
                setuserImage(image)
            }
            var name = await Auth.getUserData().name
            setuserName(name)
        }
        fetchdata();
    },[Auth.LoggedIn])
    return (
      <Box sx={{
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
                        <ButtonGroup>
                            <Avatar
                                alt={userName}
                                src={userImage}
                            />
                            <IconButton component={NavLink} to={"/"} onClick={() => {Auth.logout()}}>
                                <LogoutOutlined />
                            </IconButton>
                        </ButtonGroup>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
      </Box>
    );
}