import { CloudUploadOutlined, Delete } from '@mui/icons-material';
import { Alert, Box, Button, Chip, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const pages = {
    Student: "Student",
    Supervisor: "Supervisor",
    Business: "Business",
    Resend: "Resend",
    Expired: "Expired"
}
const VerifySupervisor = ({Verified, token}) => {
    const [file, setFile] = useState(null);
    const [Password,setPassword] = useState("")
    const [error, setError] = useState(null)
    const [Successfull, setSuccessfull] = useState(Verified)
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(Password == "") return
        setError(null)
        try {
            const formData = new FormData();
            if(file){
                formData.append('image', file);
            }
            formData.append('password', Password);
            const response = await fetch(`http://masarnetbe.tazerdev.com/verify/${token}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessfull(true)
            } else {
                setError('فشل التفعيل: ' + data.message);
            }
        } catch (error) {
            setError('حدث خظأ في تفعيل حسابكم');
        }
    };

    if(Successfull){
        return (
            <Box pt={8} pb={10} sx={{ width: "100%" }}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h2">تم تأكيد حسابك</Typography>
                </Box>
                <Box>
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                        <Typography variant="body1" component="div">يمكنك تسجيل دخولك ببريدكم الألكتروني و كلمة المرور</Typography>
                    </Grid>
                    <Box my={2} sx={{textAlign: "center"}}>
                        <Button onClick={() => navigate("/portal")} variant="text">العودة لتسجيل الدخول</Button>
                    </Box>
                </Box>
            </Box>
        )
    }else{
        return (
            <Box pt={8} pb={10} sx={{ width: "100%" }}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h2">تفعيل الحساب</Typography>
                </Box>
                {
                    error? 
                    <Box mb={3}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                    :
                    <></>
                }
                <Box>
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                        <TextField variant="outlined" value={Password} required fullWidth name="password" id="password" type='password' label="كلمة المرور" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                    <Button
                        variant="contained"
                        component="label"
                        role={undefined}
                        sx={{ mt: 2, mb: 2, gap: 3 }}
                        tabIndex={1}
                        endIcon={<CloudUploadOutlined />}
                    >
                        ارفق صورة شخصية (غير اجباري)
                        <input
                            type="file"
                            hidden
                            onChange={(e) => {setFile(e.target.files[0])}}
                            accept="image/*"
                        />
                    </Button>
                    {file && (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Chip
                                label={file.name}
                                onDelete={() => {setFile(null)}}
                                color="primary"
                                variant="outlined"
                            />
                        </Box>
                    )}
                    <Box my={2} sx={{textAlign: "center"}}>
                        <Button variant="contained" onClick={handleSubmit}>تفعيل الحساب</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}

const VerifyBusiness = ({Verified, token}) => {
    const [file, setFile] = useState(null);
    const [Password,setPassword] = useState("")
    const [error, setError] = useState(null)
    const [Successfull, setSuccessfull] = useState(Verified)
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(Password == "") return
        if(file == null) return
        setError(null)
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('password', Password);
            const response = await fetch(`http://masarnetbe.tazerdev.com/verify/${token}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessfull(true)
            } else {
                setError('فشل التفعيل: ' + data.message);
            }
        } catch (error) {
            setError('حدث خظأ في تفعيل حسابكم');
        }
    };

    if(Successfull){
        return (
            <Box pt={8} pb={10} sx={{ width: "100%" }}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h2">تم تأكيد حسابك</Typography>
                </Box>
                <Box>
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                        <Typography variant="body1" component="div">يمكنك تسجيل دخولك ببريدكم الألكتروني و كلمة المرور</Typography>
                    </Grid>
                    <Box my={2} sx={{textAlign: "center"}}>
                        <Button onClick={() => navigate("/portal")} variant="text">العودة لتسجيل الدخول</Button>
                    </Box>
                </Box>
            </Box>
        )
    }else{
        return (
            <Box pt={8} pb={10} sx={{ width: "100%" }}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h2">تفعيل الحساب</Typography>
                </Box>
                {
                    error? 
                    <Box mb={3}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                    :
                    <></>
                }
                <Box>
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                        <TextField variant="outlined" value={Password} required fullWidth name="password" id="password" type='password' label="كلمة المرور" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                    <Button
                        variant="contained"
                        component="label"
                        role={undefined}
                        sx={{ mt: 2, mb: 2, gap: 3 }}
                        tabIndex={1}
                        endIcon={<CloudUploadOutlined />}
                    >
                        ارفق شعار الشركة
                        <input
                            type="file"
                            hidden
                            onChange={(e) => {setFile(e.target.files[0])}}
                            accept="image/*"
                        />
                    </Button>
                    {file && (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Chip
                                label={file.name}
                                onDelete={() => {setFile(null)}}
                                color="primary"
                                variant="outlined"
                            />
                        </Box>
                    )}
                    <Box my={2} sx={{textAlign: "center"}}>
                        <Button variant="contained" onClick={handleSubmit}>تفعيل الحساب</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}

const VerifiedStudent = () => {
    const navigate = useNavigate();

    return (
        <Box pt={8} pb={10} sx={{ width: "100%" }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h5" component="h2">تم تأكيد حسابك</Typography>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                    <Typography variant="body1" component="div">يمكنك تسجيل دخولك برقمك الجامعي و كلمة مرور اودس</Typography>
                </Grid>
                <Box my={2} sx={{textAlign: "center"}}>
                    <Button onClick={() => navigate("/portal")} variant="contained">تسجيل الدخول</Button>
                </Box>
            </Box>
        </Box>
    )
}

const VerifyResend = () => {
    const [Email,setEmail] = useState("")
    const [error, setError] = useState(null)
    const [Successfull, setSuccessfull] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(Email == "") return
        setError(null)
        try {
            const response = await fetch('http://masarnetbe.tazerdev.com/send-new-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: Email
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessfull(true)
            } else {
                setError('فشل ارسال التأكيد: ' + data.message);
            }
        } catch (error) {
            setError('حدث خظأ في ارسال التأكيد');
        }
    };

    if(Successfull){
        return (
            <Box pt={8} pb={10} sx={{ width: "100%" }}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h2">تم الأرسال</Typography>
                </Box>
                <Box>
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                        <Typography variant="body1" component="div">تم ارسال رسالة تأكيد الحساب على بريدك الألكتروني</Typography>
                        <Typography variant="body1" component="div">يرجى الذهاب اليه و اكمال الاجرائات</Typography>
                    </Grid>
                    <Box my={2} sx={{textAlign: "center"}}>
                        <Button onClick={() => navigate("/portal")} variant="text">العودة لتسجيل الدخول</Button>
                    </Box>
                </Box>
            </Box>
        )
    }else{
        return (
            <Box pt={8} pb={10} sx={{ width: "100%" }}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h2">اعادة ارسال التفعيل</Typography>
                </Box>
                {
                    error? 
                    <Box mb={3}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                    :
                    <></>
                }
                <Box>
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                        <TextField variant="outlined" value={Email} required fullWidth name="email" id="email" label="البريد الألكتروني" onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                    <Box my={2} sx={{textAlign: "center"}}>
                        <Button variant="contained" onClick={handleSubmit}>تجديد الرابط</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}

const VerifyExpired = ({setCurrentPage}) => {
    return (
        <Box pt={8} pb={10} sx={{ width: "100%" }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h5" component="h2">انتهاء الصلاحية</Typography>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                    <Typography variant="body1" component="div">عفوا! الرابط تم انتهاء صلاحيته</Typography>
                    <Typography variant="body1" component="div">يمكنك طلب تجديد الرابط من هن الزر ادناه</Typography>
                </Grid>
                <Box my={2} sx={{textAlign: "center"}}>
                    <Button onClick={() => setCurrentPage(pages.Resend)} variant="contained">تجديد الرابط</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default function Verify() {
    let { token } = useParams();
    const [CurrentPage, setCurrentPage] = useState(null)
    const [Verified, setVerified] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://masarnetbe.tazerdev.com/check-token/${token}`).then((x) => {
            
            if(x.status == 404){
                navigate("/404")
            }else if(x.status == 410){
                setCurrentPage(pages.Expired)
            }else{
                x.json().then(d => {
                    if(d["message"] == "Already Verified"){
                        if(d["type"] == "student"){
                            setCurrentPage(pages.Student)
                        }else if(d["type"] == "supervisor"){
                            setVerified(true)
                            setCurrentPage(pages.Supervisor)
                        }else if(d["type"] == "business"){
                            setVerified(true)
                            setCurrentPage(pages.Business)
                        }
                    }else{
                        if(d["type"] == "student"){
                            fetch(`http://masarnetbe.tazerdev.com/verify/${token}`, {
                                method: 'POST',
                            }).then((z) => {
                                if(z.status == 404){
                                    navigate("/404")
                                }else if(z.status == 410){
                                    setCurrentPage(pages.Expired)
                                }else{
                                    if(d["type"] == "student"){
                                        setCurrentPage(pages.Student)
                                    }
                                }
                            })
                        }else{
                            setCurrentPage(d["type"] == "supervisor" ? pages.Supervisor : pages.Business)
                        }
                    }
                })
            }
        })
    },[token])

    return(
        <section style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Container maxWidth="xs" sx={{ position: "relative", display: "flex" }}>
                {
                    CurrentPage == pages.Expired?
                    <VerifyExpired setCurrentPage={setCurrentPage} />
                    :
                    <>
                    {
                        CurrentPage == pages.Resend?
                        <VerifyResend />
                        :
                        <>
                            {
                                CurrentPage == pages.Student?
                                <VerifiedStudent />
                                :
                                <>
                                {
                                    CurrentPage == pages.Business?
                                    <VerifyBusiness Verified={Verified} token={token} />
                                    :
                                    <>
                                        {
                                            CurrentPage == pages.Supervisor?
                                            <VerifySupervisor Verified={Verified} token={token} />
                                            :
                                            <></>
                                        }
                                    </>
                                }
                                </>
                            }
                        </>
                    }
                    </>
                }
            </Container>
        </section>
    )
}