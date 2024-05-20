import { Add } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, Chip, Container, Fab, Grid, MenuItem, Modal, Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLoading } from "../shared";

const program_types = {"ST": "تدريب صيفي", "TT": "تدريب تعاوني", "VT": "تطوع"};

export default function CreatePrograms() {
    const [modalOpen, setModalOpen] = useState(false);
    const [programName,setProgramName] = useState('')
    const [programType, setProgramType] = useState('');
    const [programHours, setProgramHours] = useState(200);
    const [prerequisite, setPrerequisite] = useState([]);
    const [outcomes, setOutcomes] = useState([]);
    const [expiryDate, setExpiryDate] = useState('');
    const [error, setError] = useState(null)
    const Loading = useLoading()

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleCreateProgram = async () => {
        if (programName == '' || programType == '' || outcomes.length === 0 || expiryDate === ''){
            setError("ليست جميع البينات المطلوبة معطاه")
            return
        }
        Loading.startLoading()
        try {
            const response = await fetch('http://masarnetbe.tazerdev.com/business/create-program', {
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    programName: programName,
                    programType: programType,
                    programHours: programHours,
                    prerequisite: prerequisite,
                    outcomes: outcomes,
                    expiryDate: expiryDate
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Loading.endLoading()
                window.location.reload();
                closeModal()
            } else {
                Loading.endLoading()
                setError('فشل انشاء البرنامج: ' + data.message);
            }
        } catch (error) {
            Loading.endLoading()
            setError('حدث خظأ في انشاء البرنامج');
        }
    };

    return (
        <Container >
            <Fab color="primary" sx={{ position: "absolute", bottom: "2rem", right: "2rem" }} onClick={openModal}>
                <Add />
            </Fab>
            <Modal open={modalOpen} onClose={closeModal}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", bgcolor: "#fff", boxShadow: 24, p: 4, borderRadius: 5, width: 400 }}>
                    <Box mb={3} textAlign="center">
                        <Typography variant="h5" component="h2">اضافة برنامج تدريبي</Typography>
                    </Box>
                    {
                        error? 
                        <Box mb={3}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                        :
                        <></>
                    }
                    <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } , mb:2 } } >
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="programName" id="programName" label="اسم البرنامج" onChange={(e) => setProgramName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                select
                                name="programType"
                                id="programType"
                                label="نوع البرنامج"
                                value={programType}
                                onChange={(e) => setProgramType(e.target.value)}
                                sx={{
                                    ".MuiSvgIcon-root":{
                                        right: "90%"
                                    }
                                }}
                            >
                                {Object.keys(program_types).map((option) => (
                                    <MenuItem key={"pt" + option} value={option}>
                                        {program_types[option]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="h2">عدد الساعات:</Typography>
                            <Slider
                                defaultValue={200}
                                valueLabelDisplay="auto"
                                step={100}
                                marks
                                required
                                min={100}
                                max={1000}
                                value={programHours}
                                onChange={(e, newValue) => setProgramHours(newValue)}
                                sx={{
                                    ".MuiSlider-thumb":{
                                        transform: "translate(50%, -50%)"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                clearIcon={false}
                                options={[]}
                                freeSolo
                                multiple
                                value={prerequisite}
                                onChange={(event, newValue) => {
                                    setPrerequisite(newValue);
                                }}
                                renderTags={(value, props) => value.map((option, index) => (
                                    <Chip label={option} {...props({ index })} sx={{
                                        ".MuiSvgIcon-root":{
                                            transform: "translateX(50%)"
                                        }
                                    }}  />
                                ))}
                                renderInput={(params) => <TextField label="المتطلبات" {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                clearIcon={false}
                                options={[]}
                                freeSolo
                                multiple
                                required
                                value={outcomes}
                                onChange={(event, newValue) => {
                                    setOutcomes(newValue);
                                }}
                                renderTags={(value, props) => value.map((option, index) => (
                                    <Chip label={option} {...props({ index })} sx={{
                                        ".MuiSvgIcon-root":{
                                            transform: "translateX(50%)"
                                        }
                                    }}  />
                                ))}
                                renderInput={(params) => <TextField label="المخرجات" {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="date"
                                name="expiryDate"
                                id="expiryDate"
                                label="تاريخ انتهاء التقديم"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" onClick={handleCreateProgram}>اضافة البرنامج</Button>
                </Box>
            </Modal>
        </Container>
    );
}
