import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Grid, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import { useAuth, useLoading } from "../shared";
import { useEffect, useState } from "react";

const program_types = {"ST": "تدريب صيفي", "TT": "تدريب تعاوني", "VT": "تطوع"};
const status = {"no": "تقديم","applied": "تم التقديم","accepted": "تم القبول","rejected":"تم الرفض"}

function StudentProgram({ ID, CompanyLogo, CompanyName, programName, ProgramType, ProgramHours, Prerequisite, Outcomes, Status,ApplyProgram }) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="60"
                image={CompanyLogo}
                alt={`Logo of ${CompanyName}`}
                sx={{ objectFit: 'contain', width: '100%', objectPosition: "right" }}
            />
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {CompanyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    اسم البرنامج: {programName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    نوع البرنامج: {program_types[ProgramType]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    عدد الساعات: {ProgramHours}
                </Typography>
                {Prerequisite && (
                    <Typography sx={{ mt: 2 }} variant="body2" component={"div"} color="text.primary">
                        المتطلبات:
                        <Box mt={1}>
                            {Prerequisite.map((item, index) => (
                                <Chip key={ID+"req"+index} label={item} />
                            ))}
                        </Box>
                    </Typography>
                )}
                {Outcomes && (
                    <Typography sx={{ mt: 2 }} variant="body2" component={"div"} color="text.primary">
                        المخرجات:
                        <Box mt={1}>
                            {Outcomes.map((outcome, index) => (
                                <Chip key={ID+"out"+index} label={outcome} />
                            ))}
                        </Box>
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color={Status == "accepted" ? "success" : (Status == "rejected" ? "error" : (Status == "applied" ? "primary" : "info"))} onClick={() => Status == "no" ? ApplyProgram(ID) : null} variant="contained">
                    {status[Status]}
                </Button>
            </CardActions>
        </Card>
    );
}

export default function StudentPrograms(){
    const [Programs,setPrograms] = useState([])
    const [programFilterStatus, setProgramFilterStatus] = useState("")
    const [programFilterType, setProgramFilterType] = useState("")
    const [error, setError] = useState(null)
    const [opensb, setOpensb] = useState(false);
    const Auth = useAuth();
    const Loading = useLoading();
    useEffect(() => {
        async function getData(){
            var response = await fetch("http://masarnetbe.tazerdev.com/programs", {method: 'GET',credentials:'include'})
            if(response.status == 401) {
                Auth.logout()
            }else{
                var responsejson = await response.json()
                setPrograms(responsejson)
            }
        }
        getData()
        setInterval(async () => {
            getData()
        }, 60000);
    },[])
    const handleClosesb = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpensb(false);
    };
    const ApplyProgram = async (ID) => {
        Loading.startLoading()
        try {
            const response = await fetch('http://masarnetbe.tazerdev.com/apply-to-program', {
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    programId: ID
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Loading.endLoading()
                window.location.reload()
            } else {
                Loading.endLoading()
                setError('فشل التقديم على البرنامج: ' + data.message);
                setOpensb(true)
            }
        } catch (error) {
            Loading.endLoading()
            setError('حدث خظأ في التقديم على البرنامج');
            setOpensb(true)
        }
    }
    return(
        <Box sx={{
            p: 3, boxSizing: "border-box", width: "100%"
          }}>
            <Container>
                <Box sx={{width:"40%", mb: 5}}>
                    <Grid container spacing={2} sx={{'& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                select
                                name="programFilterStatus"
                                id="programFilterStatus"
                                label="فرز حسب تصنيف البرنامج"
                                value={programFilterStatus}
                                onChange={(e) => setProgramFilterStatus(e.target.value)}
                                sx={{
                                    ".MuiSvgIcon-root":{
                                        right: "90%"
                                    }
                                }}
                            >
                                <MenuItem key={"ptAll"} value={""}>
                                    جميع الحالات
                                </MenuItem>
                                {Object.keys(status).map((option) => (
                                    <MenuItem key={"pt" + option} value={option}>
                                        {status[option]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                select
                                name="programFilterType"
                                id="programFilterType"
                                label="فرز حسب نوع البرنامج"
                                value={programFilterType}
                                onChange={(e) => setProgramFilterType(e.target.value)}
                                sx={{
                                    ".MuiSvgIcon-root":{
                                        right: "90%"
                                    }
                                }}
                            >
                                <MenuItem key={"ptAll"} value={""}>
                                    جميع الانواع
                                </MenuItem>
                                {Object.keys(program_types).map((option) => (
                                    <MenuItem key={"pt" + option} value={option}>
                                        {program_types[option]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={1} sx={{'& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                {
                    Programs.filter(v => {
                        const currentDate = new Date();
                        const programExpiryDate = new Date(v.expiryDate);
                        if (programExpiryDate < currentDate) {
                            return false;
                        }

                        if (programFilterStatus !== "" && programFilterType !== "") {
                            return v.relation === programFilterStatus && v.programType === programFilterType;
                        } else if (programFilterStatus !== "") {
                            return v.relation === programFilterStatus;
                        } else if (programFilterType !== "") {
                            return v.programType === programFilterType;
                        } else {
                            return true;
                        }
                    }).map((V,I) => (
                    <Grid item xs={4}>
                        <StudentProgram 
                            key={"SP"+I}
                            ID={V.id}
                            CompanyLogo={V.businessImage} 
                            CompanyName={V.businessName} 
                            programName={V.name}
                            ProgramType={V.programType} 
                            ProgramHours={V.programHours} 
                            Prerequisite={V.prerequisite}
                            Outcomes={V.outcomes} 
                            Status={V.relation}
                            ApplyProgram={ApplyProgram}
                        />
                    </Grid>
                    ))
                }
                </Grid>
                <Snackbar open={opensb} autoHideDuration={6000} onClose={handleClosesb}>
                    <Alert
                        onClose={handleClosesb}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    )
}
