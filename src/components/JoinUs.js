import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import LandingNav from './landNav';
import Student from "../assets/Student.svg"
import Supervisor from "../assets/Supervisor.svg"
import Company from "../assets/Company.svg"
import { NavLink } from 'react-router-dom';

function JoinUsCard({img,title,description, actions}) {
  return(
    <Card sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: {xs: "100%", sm: "340px"}, p: 2 }}>
      <CardMedia
        component={"img"}
        sx={{ height: 200, width: "auto", p:2 }}
        image={img}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{alignSelf: "flex-start"}}>
        {actions}
      </CardActions>
    </Card>
  )
}

export default function JoinUs() {

  return(
    <Stack>
      <Box sx={{background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(24,60,79,0.1) 25%, rgba(255,255,255,1) 50%, rgba(24,60,79,0.1) 75%, rgba(255,255,255,1) 100%)", display: "flex", flexDirection: "column", minHeight: "100vh", gap: 10}}>
        <LandingNav />
        <Box sx={{textAlign: "center"}}>
          <Typography variant='h3'>انضم الينا</Typography>
        </Box>
        <Grid container direction={{xs: "column",lg:"row"}} justifyContent="space-evenly" alignItems="center" spacing={2} sx={{maxWidth: "100%"}}>
          <Grid item xs={1} lg={2}>
            <JoinUsCard img={Student} title={"الطلاب"} description={"كطالب يمكنك فقط تسجيل دخولك بحسابك الجامعي الذي تستخدمه لنظام اودس."} actions={
              <Button component={NavLink} to={"/portal"} variant='contained' size='small'>
                تسجيل الدخول
              </Button>
            } />
          </Grid>
          <Grid item xs={1} lg={2}>
            <JoinUsCard img={Company} title={"مؤسسة/شركة"} description={"كمؤسسة/كشركة يمكنكم التواصل معنا لانشاء ملفكم الشخصي. نوفر كذلك تدريب للموظفين على المنصة."}  actions={
              <Button component={NavLink} to={"/contact"} variant='contained' size='small'>
                تواصل معنا
              </Button>
            } />
          </Grid>
          <Grid item xs={1} lg={2}>
            <JoinUsCard img={Supervisor} title={"مشرف/مرشد"} description={"كمشرف/كمرشد يتم انشاء حسابك عن طريق جامعتك يمكنك التواصل معهم للحصول على حسابك."} actions={
              <Button component={NavLink} to={"/portal"} variant='contained' size='small'>
                تسجيل الدخول
              </Button>
            } />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}