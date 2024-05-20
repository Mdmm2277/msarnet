import { Box, Button, Card, CardActions, CardContent, Container, Typography, List, ListItem, ListItemText, Chip, Modal, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Snackbar, Alert, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useLoading } from "../shared";
import { ArrowForwardIos, Close } from "@mui/icons-material";
import CreatePrograms from '../components/CreatePrograms';

const programtype = {"ST": "تدريب صيفي", "TT": "تدريب تعاوني", "V": "برنامج تطوعي"};
const status = {"applied": "تم التقديم","accepted": "تم القبول","rejected":"تم الرفض"}

function ProgramList({ programs, onSelect, onDelete }) {
    return (
        <Grid container spacing={1} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
            {programs.map((program) => (
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="body1" component="div">
                                {program.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                نوع البرنامج: {programtype[program.programType]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                عدد الساعات: {program.programHours}
                            </Typography>
                            {program.prerequisite && (
                                <Typography sx={{ mt: 2 }} variant="body2" component={"div"} color="text.primary">
                                    المتطلبات:
                                    <Box mt={1}>
                                        {program.prerequisite.map((item, index) => (
                                            <Chip key={program.id + "req" + index} label={item} />
                                        ))}
                                    </Box>
                                </Typography>
                            )}
                            {program.outcomes && (
                                <Typography sx={{ mt: 2 }} variant="body2" component={"div"} color="text.primary">
                                    المخرجات:
                                    <Box mt={1}>
                                        {program.outcomes.map((outcome, index) => (
                                            <Chip key={program.id + "out" + index} label={outcome} />
                                        ))}
                                    </Box>
                                </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary">
                                تاريخ انتهاء التقديم: {program.expiryDate}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => { onSelect(program.id) }}>
                                التقديمات
                            </Button>
                            <Button size="small" color="error" variant="contained" onClick={() => { onDelete(program.id) }}>
                                حذف البرنامج
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

function GradesModal({ grades, open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="grades-modal-title"
            aria-describedby="grades-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxHeight: '90vh',
                overflowY: 'auto',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>الترم</TableCell>
                                <TableCell align="right">رقم المقرر</TableCell>
                                <TableCell align="right">اسم المقرر</TableCell>
                                <TableCell align="right">الدرجة</TableCell>
                                <TableCell align="right">الدرجة بالأخرف</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {grades.map((row) => (
                                <TableRow
                                    key={row.course}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.TERM_desc}
                                    </TableCell>
                                    <TableCell align="right">{row.course}</TableCell>
                                    <TableCell align="right">{row.TITLE}</TableCell>
                                    <TableCell align="right">{row.n_GRD}</TableCell>
                                    <TableCell align="right">{row.s_GRD}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );
}

function ProgramDetails({ programId,studentId,setStudentId,setSelectedProgramId,programs, onAccept, onReject ,setStudents , students, Loading}) {

    useEffect(() => {
        async function fetchProgramDetails() {
            Loading.startLoading()
            try {
                const response = await fetch(`http://masarnetbe.tazerdev.com/business/programs/${programId}/students`, { credentials: 'include' });
                const data = await response.json();
                if (response.ok) {
                    setStudents(data);
                }
            } catch (error) {
                console.error("Failed to fetch program details:", error);
            }
            Loading.endLoading()
        }
        fetchProgramDetails();
    }, []);

    return (
        <Box sx={{position: "relative"}}>
            <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
                <Button sx={{position: "absolute", right: 0}} onClick={() => setSelectedProgramId(null)}>
                    <ArrowForwardIos />
                    العودة
                </Button>
                تقديمات : {programs.filter(program => program.id === programId)[0].name}
            </Typography>
            {students.map(student => (
                <>
                    <Card key={student.studentId} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                {student.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                البريد الألكتروني: {student.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                الحالة: {status[student.relation]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Button color="info" onClick={() => setStudentId(programs.filter(program => program.id === programId)[0].id+"gradesmodal"+student.studentId)}>اظهار الدرجات</Button>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {
                                student.relation == "applied"?
                                <>
                                    <Button color="success" onClick={() => onAccept(student.studentId)}>قبول</Button>
                                    <Button color="error" onClick={() => onReject(student.studentId)}>رفض</Button>
                                </>
                                :
                                <></>
                            }
                        </CardActions>
                    </Card>
                    <GradesModal key={programs.filter(program => program.id === programId)[0].id+"gradesmodal"+student.studentId} grades={student.studentGrades} open={studentId === programs.filter(program => program.id === programId)[0].id+"gradesmodal"+student.studentId} handleClose={() => setStudentId(null)} />
                </>
            ))}
        </Box>
    );
}

export default function BusinessPrograms() {
    const [programs, setPrograms] = useState([]);
    const [selectedProgramId, setSelectedProgramId] = useState(null);
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState(null);
    const [error, setError] = useState(null);
    const [opensb, setOpensb] = useState(false);
    const Loading = useLoading();

    useEffect(() => {
        async function fetchPrograms() {
            Loading.startLoading();
            try {
                const response = await fetch('http://masarnetbe.tazerdev.com/business/programs', { credentials: 'include' });
                const data = await response.json();
                if (response.ok) {
                    setPrograms(data);
                }
            } catch (error) {
                console.error("Failed to fetch programs:", error);
            }
            Loading.endLoading();
        }
        fetchPrograms();
    }, []);

    const handleClosesb = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpensb(false);
    };

    const handleSelectProgram = (programId) => {
        setSelectedProgramId(programId);
    };

    const handleDeleteProgram = async (programId) => {
        Loading.startLoading();
        try {
            const response = await fetch(`http://masarnetbe.tazerdev.com/business/delete-program/${programId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                Loading.endLoading();
                setPrograms(programs.filter(program => program.id !== programId));
            } else {
                Loading.endLoading();
                setError('فشل حذف البرنامج: ' + data.message);
                setOpensb(true);
            }
        } catch (error) {
            Loading.endLoading();
            setError('حدث خظأ في حذف البرنامج');
            setOpensb(true);
        }
    };

    const handleAccept = async (studentId) => {
        Loading.startLoading();
        try {
            const response = await fetch('http://masarnetbe.tazerdev.com/business/accept-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId: studentId, programId: selectedProgramId }),
            });
            const data = await response.json();
            if (response.ok) {
                Loading.endLoading();
                window.location.reload();
            } else {
                Loading.endLoading();
                setError('فشل قبول الطالب: ' + data.message);
                setOpensb(true);
            }
        } catch (error) {
            Loading.endLoading();
            setError('حدث خظأ في قبول الطالب');
            setOpensb(true);
        }
        Loading.endLoading();
    };

    const handleReject = async (studentId) => {
        Loading.startLoading();
        try {
            const response = await fetch('http://masarnetbe.tazerdev.com/business/reject-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId: studentId, programId: selectedProgramId }),
            });
            const data = await response.json();
            if (response.ok) {
                Loading.endLoading();
                window.location.reload();
            } else {
                Loading.endLoading();
                setError('فشل رفض الطالب: ' + data.message);
                setOpensb(true);
            }
        } catch (error) {
            Loading.endLoading();
            setError('حدث خظأ في رفض الطالب');
            setOpensb(true);
        }
    };

    return (
        <Container sx={{
            p: 3, boxSizing: "border-box", flexGrow: 1, position: "relative"
        }}>
            <Box>
                {!selectedProgramId ? (
                    <ProgramList programs={programs} onSelect={handleSelectProgram} onDelete={handleDeleteProgram} />
                ) : (
                    <ProgramDetails programId={selectedProgramId} studentId={studentId} setStudentId={setStudentId} setSelectedProgramId={setSelectedProgramId} programs={programs} onAccept={handleAccept} onReject={handleReject} students={students} setStudents={setStudents} Loading={Loading} />
                )}
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
            </Box>
            {
                !selectedProgramId ? (
                    <CreatePrograms />
                ) : (
                    <></>
                )
            }
        </Container>
    );
}