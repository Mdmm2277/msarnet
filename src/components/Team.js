import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { GitHub, LinkedIn, X } from '@mui/icons-material';
import Mohammed from "../assets/Mohammed.jpg"
import Badr from "../assets/Badr.jpg"
import Abdalrhman from "../assets/Abdulrhman.jpg"

function TeamMember({img,name,description, github, linkdin, x}) {

  return(
    <Grid item xs={12} sm={6} md={4} sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Avatar alt="" src={img} sx={{width: "8rem", height: "8rem"}} />
      <Typography variant="h6" component="h6" gutterBottom={true}>{name}</Typography>
      <Typography variant="body1" color="textSecondary" component="p">{description}</Typography>
      <Box>
        <IconButton component={"a"} href={github} target={"_blank"}>
          <GitHub />
        </IconButton>
        <IconButton component={"a"} href={linkdin} target={"_blank"}>
          <LinkedIn />
        </IconButton>
        <IconButton component={"a"} href={x} target={"_blank"}>
          <X />
        </IconButton>
      </Box>
    </Grid>
  )
}

export default function Team() {

  const content = {
    'badge': 'فريقنا',
    'header-p1': 'تعرف على فريق ',
    'header-p2': 'مسارنت',
    'description': 'وراء كل رحلة ناجحة فريق متميز يعمل بجد وإخلاص. فريق مسارنت هو مجموعة من الخبراء المتحمسين، ملتزمين بتوفير أفضل الفرص التدريبية وتحقيق التواصل الفعّال بين الطلاب، الشركات، والمشرفين.',
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box pt={8} pb={12} textAlign="center">
          <Box mb={9}>
            <Container maxWidth="sm">
              <Typography variant="overline" color="textSecondary" paragraph={true}>{content['badge']}</Typography>
              <Typography variant="h3" component="h2" gutterBottom={true}>
                <Typography variant="h3" component="span" color="primary">{content['header-p1']} </Typography>
                <Typography variant="h3" component="span">{content['header-p2']}</Typography>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" paragraph={true}>{content['description']}</Typography>
            </Container>
          </Box>
          <Grid container spacing={6}>
            <TeamMember img={Mohammed} name={"محمد الشريف"} description={"مطور ويب ، مطور تطبيقات"} github={"https://github.com/Mdmm2277"} linkdin={"https://www.linkedin.com/in/mohammed-eid-alsharif-5218b5290/"} x={"https://x.com/Alsharif__Mo1"} />
            <TeamMember img={Badr} name={"بدر العرفج"} description={"مطور برمجيات"} github={"https://github.com/cnvrd"} linkdin={"https://www.linkedin.com/in/bader-naif-alarfaj-798271132/"} x={"https://x.com/cnvrdle"} />
            <TeamMember img={Abdalrhman} name={"عبدالرحمن بوجير"} description={"مطور برمجيات"} github={"https://github.com/xoflix"} linkdin={"https://www.linkedin.com/in/abdulrhman-bujier-389b17215"} x={"https://x.com/AbdulrhmanSB7"} />
          </Grid>
        </Box>
      </Container>
    </section>
  );
}