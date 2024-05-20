import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Grid, Paper, Avatar, Snackbar, Alert, Button, Modal, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Main Supervisor Page
const SupervisorDashboard = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleChange} centered>
                <Tab label="لوحة القيادة" />
                <Tab label="الطلاب" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <Dashboard />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <Students />
            </TabPanel>
        </Box>
    );
};

// Helper component to render the content of each tab
const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

// Dashboard Component
const Dashboard = () => {
    const [stats, setStats] = useState({ accepted: 0, noAccepted: 0, rejected: 0, total: 0 });

    useEffect(() => {
        // Fetch statistics for the dashboard
        fetch('http://masarnetbe.tazerdev.com/supervisor/stats', { credentials: 'include' })
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error fetching statistics:', error));
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={3}>لوحة القيادة</Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">طلاب مع قبول واحد على الأقل</Typography>
                        <Typography variant="h4">{stats.accepted}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">طلاب بدون أي قبول</Typography>
                        <Typography variant="h4">{stats.noAccepted}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">طلاب مرفوضين من جميع البرامج</Typography>
                        <Typography variant="h4">{stats.rejected}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">إجمالي عدد الطلاب</Typography>
                        <Typography variant="h4">{stats.total}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

// Grades Modal Component
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
                    <CloseIcon />
                </IconButton>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>الترم</TableCell>
                                <TableCell align="right">رقم المقرر</TableCell>
                                <TableCell align="right">اسم المقرر</TableCell>
                                <TableCell align="right">الدرجة</TableCell>
                                <TableCell align="right">الدرجة بالأحرف</TableCell>
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

// Students Component
const Students = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [grades, setGrades] = useState([]);
    const [gradesOpen, setGradesOpen] = useState(false);
    const [programsOpen, setProgramsOpen] = useState(false);
    const status = { "no": "تقديم", "applied": "تم التقديم", "accepted": "تم القبول", "rejected": "تم الرفض" };
    const program_types = { "ST": "تدريب صيفي", "TT": "تدريب تعاوني", "VT": "تطوع" };

    useEffect(() => {
        // Fetch students supervised by the logged-in supervisor
        fetch('http://masarnetbe.tazerdev.com/supervisor/students', { credentials: 'include' })
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };

    const handleBack = () => {
        setSelectedStudent(null);
        setPrograms([]);
        setGrades([]);
    };

    const fetchGrades = (studentId) => {
        fetch(`http://masarnetbe.tazerdev.com/supervisor/students/${studentId}/grades`, { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setGrades(data);
                setGradesOpen(true);
            })
            .catch(error => console.error('Error fetching grades:', error));
    };

    const fetchPrograms = (studentId) => {
        fetch(`http://masarnetbe.tazerdev.com/supervisor/students/${studentId}/programs`, { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setPrograms(data);
                setProgramsOpen(true);
            })
            .catch(error => console.error('Error fetching programs:', error));
    };

    return (
        <Box>
            <Typography variant="h4" mb={3}>الطلاب</Typography>
            <Grid container spacing={2}>
                {students.map(student => (
                    <Grid item xs={6} key={student.id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Avatar src={student.image} alt={student.name} sx={{ width: 56, height: 56 }} />
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h6">{student.name}</Typography>
                                    <Typography variant="body1">الرقم الجامعي: {student.universityID}</Typography>
                                    <Typography variant="body1">التخصص: {student.major}</Typography>
                                    <Typography variant="body1">الاهتمامات: {student.interests}</Typography>
                                    <Typography variant="body1">تاريخ التخرج: {student.graduationDate}</Typography>
                                    <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => fetchGrades(student.id)}>عرض الدرجات</Button>
                                    <Button variant="contained" color="secondary" sx={{ mt: 1 }} onClick={() => fetchPrograms(student.id)}>عرض البرامج</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <GradesModal grades={grades} open={gradesOpen} handleClose={() => setGradesOpen(false)} />

            <Modal
                open={programsOpen}
                onClose={() => setProgramsOpen(false)}
                aria-labelledby="programs-modal-title"
                aria-describedby="programs-modal-description"
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
                        onClick={() => setProgramsOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>اسم البرنامج</TableCell>
                                    <TableCell align="right">النوع</TableCell>
                                    <TableCell align="right">الساعات</TableCell>
                                    <TableCell align="right">المتطلبات</TableCell>
                                    <TableCell align="right">المخرجات</TableCell>
                                    <TableCell align="right">تاريخ الانتهاء</TableCell>
                                    <TableCell align="right">الحالة</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {programs.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{program_types[row.programType]}</TableCell>
                                        <TableCell align="right">{row.programHours}</TableCell>
                                        <TableCell align="right">{row.prerequisite.join(" , ")}</TableCell>
                                        <TableCell align="right">{row.outcomes.join(" , ")}</TableCell>
                                        <TableCell align="right">{row.expiryDate}</TableCell>
                                        <TableCell align="right">{status[row.relation]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </Box>
    );
};

export default SupervisorDashboard;
