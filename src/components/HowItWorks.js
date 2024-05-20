import { Avatar, Box, Container, Grid, Typography, useTheme } from "@mui/material";
import Register from "../assets/register.svg"
import Research from "../assets/research.svg"
import Analyze from "../assets/analyze.svg"



export default function HowItWorks() {
    var theme = useTheme()
    const classes = {
        number: {
          backgroundColor: theme.palette.background.emphasis,
          color: theme.palette.text.secondary
        },
        img: {
          maxWidth: 256,
          marginBottom: theme.spacing(2)
        },
    };
  const content = {
    'badge': 'خطوات البداية',
    'header-p1': 'طريقك نحو التميز مع ',
    'header-p2': 'مسارنت',
    'description': 'اكتشف كيف تجمع مسارنت بين الطلاب، الشركات، والمشرفين في منظومة متكاملة لتوفير تجربة تعليمية ومهنية غنية.',
    'col1-header': 'التسجيل',
    'col1-desc': 'الجامعة تقوم بتسجيل الطلاب والمشرفين، بينما تحتاج الشركات إلى التواصل معنا مباشرة لإنشاء حساباتها. هذا يضمن تجربة مخصصة تلبي احتياجات كل فئة بفعالية.',
    'col2-header': 'البحث والمطابقة',
    'col2-desc': 'بعد التسجيل وتفعيل الحسابات، يمكن لجميع المستخدمين بدء البحث عن فرص أو مواهب. الطلاب والمشرفين يستكشفون البرامج التدريبية، والشركات تعرض فرصها وتبحث عن المواهب المناسبة.',
    'col3-header': 'التفاعل والتطوير',
    'col3-desc': 'انطلق في رحلة التعلم والنمو. الطلاب يختارون برامج تدريبية تناسب تطلعاتهم، الشركات تتابع وتقيم المتدربين، والمشرفين يوجهون ويدعمون الطلاب، مما يضمن تجربة مفيدة للجميع.',
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={10} textAlign="center">
          <Box mb={8}>
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
            <Grid item xs={12} md={4}>
              <Box p={3} pb={4}>
                <Box display="flex" justifyContent="center" mt={1} mb={4}>
                  <Avatar sx={classes.number}>۱</Avatar>
                </Box>
                <img src={Register} alt="" sx={classes.img} />
                <Typography variant="h6" component="h3" gutterBottom={true}>{content['col1-header']}</Typography>
                <Typography variant="body2" component="p" color="textSecondary">{content['col1-desc']}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box p={3} pb={4}>
                <Box display="flex" justifyContent="center" mt={1} mb={4}>
                  <Avatar sx={classes.number}>۲</Avatar>
                </Box>
                <img src={Research} alt="" sx={classes.img} />
                <Typography variant="h6" component="h3" gutterBottom={true}>{content['col2-header']}</Typography>
                <Typography variant="body2" component="p" color="textSecondary">{content['col2-desc']}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box p={3} pb={4}>
                <Box display="flex" justifyContent="center" mt={1} mb={4}>
                  <Avatar sx={classes.number}>۳</Avatar>
                </Box>
                <img src={Analyze} alt="" sx={classes.img} />
                <Typography variant="h6" component="h3" gutterBottom={true}>{content['col3-header']}</Typography>
                <Typography variant="body2" component="p" color="textSecondary">{content['col3-desc']}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}