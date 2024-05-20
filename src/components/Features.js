import { Apartment, AutoGraphOutlined, Business, BusinessCenter, BusinessOutlined, DevicesOther, FolderShared, HubOutlined, School, SchoolOutlined } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function Features({readmore}) {
  const content = {
    'badge': 'ميزاتنا',
    'header-p1': 'اكتشف ما يميز ',
    'header-p2': 'مسارنت',
    'description': 'مسارنت هي المنصة التي تجمع بين الطلاب الباحثين عن تطوير مهاراتهم، والشركات الراغبة في اكتشاف المواهب الجديدة، والمشرفين الساعين لتوجيه الأجيال القادمة. هذه الميزات تضمن تجربة غنية ومفيدة لجميع الأطراف',    
    'col1-desc': 'فرص تدريبية متميزة - يتيح مسارنت للطلاب الوصول إلى برامج تدريبية عالية الجودة تتناسب مع أهدافهم الأكاديمية والمهنية.',
    'col2-desc': 'اكتشاف المواهب - تستطيع الشركات عبر مسارنت العثور على المواهب الشابة وتقديم فرص تدريبية تسهم في نموها وتطورها.',
    'col3-desc': 'إشراف فعّال - يمكن للمشرفين متابعة تقدم الطلاب وتقييم أدائهم من خلال لوحات بيانات تفاعلية وتحليلات دقيقة، مما يضمن تجربة تعليمية وتدريبية غنية ومثمرة.',
    'col4-desc': 'تواصل مستمر - يسهل مسارنت التواصل المباشر والفعال بين الطلاب، الشركات، والمشرفين، مما يعزز بناء علاقات مهنية قوية ومتينة.',
  };
  
  return (
    <section ref={readmore}>
      <Container maxWidth="lg">
        <Box py={6}>
          <Box textAlign="center" mb={8}>
            <Container maxWidth="sm">
              <Typography variant="overline" color="textSecondary">{content['badge']}</Typography>
              <Typography variant="h3" component="h2" gutterBottom={true}>
                <Typography variant="h3" component="span" color="primary">{content['header-p1']} </Typography>
                <Typography variant="h3" component="span">{content['header-p2']}</Typography>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" paragraph={true}>{content['description']}</Typography>
            </Container>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Box mb={2}>
                    <SchoolOutlined color="#183c4f" fontSize="large" />
                </Box>
                <Typography variant="subtitle1" component="p" color="textSecondary">{content['col1-desc']}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Box mb={2}>
                    <BusinessOutlined color="#183c4f" fontSize="large" />
                </Box>
                <Typography variant="subtitle1" component="p" color="textSecondary">{content['col2-desc']}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Box mb={2}>
                    <AutoGraphOutlined color="#183c4f" fontSize="large" />
                </Box>
                <Typography variant="subtitle1" component="p" color="textSecondary">{content['col3-desc']}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Box mb={2}>
                    <HubOutlined color="#183c4f" fontSize="large" />
                </Box>
                <Typography variant="subtitle1" component="p" color="textSecondary">{content['col4-desc']}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}