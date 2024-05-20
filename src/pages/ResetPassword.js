import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('كلمتا المرور غير متطابقتين');
            return;
        }

        try {
            const response = await fetch(`http://masarnetbe.tazerdev.com/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess(result.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('خطأ في إعادة تعيين كلمة المرور.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box pt={8} pb={10}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h2">إعادة تعيين كلمة المرور</Typography>
                </Box>
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
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="password" type="password" label="كلمة المرور الجديدة" onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="confirmPassword" type="password" label="تأكيد كلمة المرور" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Box my={2}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            إعادة تعيين كلمة المرور
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default ResetPassword;
