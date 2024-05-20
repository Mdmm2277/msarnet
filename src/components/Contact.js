import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Alert } from '@mui/material';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.terms) {
      setError('يجب أن توافق على الشروط');
      return;
    }

    try {
      const response = await fetch('http://masarnetbe.tazerdev.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('خطأ في إرسال النموذج.');
    }
  };

  const content = {
    header: 'تواصل معنا',
    description: 'نحن هنا للإجابة عن أسئلتكم وتقديم الدعم اللازم. سواء كنت ترغب في الانضمام إلى منصتنا كشركة، أو لديك استفسارات أخرى، فلا تتردد في ملء النموذج أدناه و سنتواصل معك في أقرب وقت ممكن.',
    terms: 'بإرسال هذا النموذج، أنت توافق على شروط الاستخدام وسياسة الخصوصية لمسارنت.',
    primaryAction: 'ارسال',
  };

  return (
    <section>
      <Container maxWidth="sm">
        <Box pt={8} pb={10}>
          <Box mb={6} textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>{content.header}</Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>{content.description}</Typography>
          </Box>
          <Box>
            {error && (
              <Box mb={3}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            {success && (
              <Box mb={3}>
                <Alert severity="success">{success}</Alert>
              </Box>
            )}
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ '& label': { transformOrigin: 'right', left: 'inherit', right: '1.75rem' } }}>
                <Grid item xs={12} sm={6}>
                  <TextField variant="outlined" required fullWidth autoComplete="fname" name="firstName" id="firstName" label="اسمك الاول" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField variant="outlined" required fullWidth name="lastName" id="lastName" label="اسم العائلة" autoComplete="lname" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth name="email" id="email" label="البريد الالكتروني" autoComplete="email" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth name="company" id="company" label="الشركة/المؤسسة" autoComplete="company" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required multiline rows={5} fullWidth autoComplete="message" name="message" id="message" label="الرسالة" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox name="terms" value="1" color="primary" onChange={handleChange} />} label={content.terms} />
                </Grid>
              </Grid>
              <Box my={2}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  {content.primaryAction}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </section>
  );
}
