import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Container, Grid, Card, CardContent, CardActions, Typography, Button, TextField, MenuItem, Alert, Snackbar, ListItemButton, ListItemIcon, Checkbox, Paper, List, ListItemText } from "@mui/material";
import { useAuth } from "../shared";

async function approveBusiness(ID, Auth, callback) {
    var response = await fetch("http://masarnetbe.tazerdev.com/admin/accept-business", {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ businessId: ID })
    });
    if (response.status == 403) {
        Auth.logout();
    } else {
        if (response.ok) {
            callback();
        } else {
            alert(response.statusText);
        }
    }
}

async function rejectBusiness(ID, Auth, callback) {
    var response = await fetch("http://masarnetbe.tazerdev.com/admin/reject-business", {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ businessId: ID })
    });
    if (response.status == 403) {
        Auth.logout();
    } else {
        if (response.ok) {
            callback();
        } else {
            alert(response.statusText);
        }
    }
}

function AdminApplication({ ID, Status, Email, BusineessName, Industry, NumEmployees, PartnershipReason, BusinessDescription, Auth }) {
    var status = { "pending_approval": "في انتظار القبول", "accepted": "تم القبول", "rejected": "تم الرفض" };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {BusineessName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    نوع الشركة: {Industry}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    وصف الشركة: {BusinessDescription}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    عدد الموظفين: {NumEmployees}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    سبب التعاقد: {PartnershipReason}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    الحالة: {status[Status]}
                </Typography>
            </CardContent>
            <CardActions sx={{ gap: 1 }}>
                <Button size="small" variant="contained" target="_top" rel="noopener noreferrer" href={`mailto:` + Email}>
                    التواصل
                </Button>
                {
                    Status == "pending_approval" ?
                        <>
                            <Button
                                size="small"
                                color={"success"}
                                onClick={() => {
                                    approveBusiness(ID, Auth, () => { window.location.reload() })
                                }}
                                variant="contained">
                                قبول
                            </Button>
                            <Button
                                size="small"
                                color={"error"}
                                onClick={() => {
                                    rejectBusiness(ID, Auth, () => { window.location.reload() })
                                }}
                                variant="contained">
                                رفض
                            </Button>
                        </>
                        :
                        <></>
                }
            </CardActions>
        </Card>
    );
}

function AdminApplications() {
    const [Applications, setApplications] = useState([]);
    const Auth = useAuth();
    useEffect(() => {
        async function getData() {
            var response = await fetch("http://masarnetbe.tazerdev.com/admin/businesses", { method: 'GET', credentials: 'include' });
            if (response.status == 401) {
                Auth.logout();
            } else {
                var responsejson = await response.json();
                setApplications(responsejson);
            }
        }
        getData();
        const interval = setInterval(() => {
            getData();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ p: 3, boxSizing: "border-box", width: "100%" }}>
            <Container>
                <Grid container spacing={1} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                    {
                        Applications.map((V, I) => (
                            <Grid item xs={4} key={"BApp" + I}>
                                <AdminApplication Auth={Auth} ID={V.id} Status={V.status} Email={V.email} BusineessName={V.businessName} Industry={V.industry} NumEmployees={V.numEmployees} PartnershipReason={V.partnershipReason} BusinessDescription={V.businessDescription} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Box>
    );
}

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function AssignStudents() {
    const [students, setStudents] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        async function fetchSupervisors() {
            const supervisorResponse = await fetch("http://masarnetbe.tazerdev.com/admin/supervisors", { method: 'GET', credentials: 'include' });
            const supervisorData = await supervisorResponse.json();
            setSupervisors(supervisorData);
        }
        fetchSupervisors();
    }, []);

    useEffect(() => {
        if (selectedSupervisor) {
            async function fetchStudents() {
                const studentResponse = await fetch("http://masarnetbe.tazerdev.com/admin/students", { method: 'GET', credentials: 'include' });
                const studentData = await studentResponse.json();
                const relationResponse = await fetch(`http://masarnetbe.tazerdev.com/supervisor/${selectedSupervisor.id}/students`, { method: 'GET', credentials: 'include' });
                const relationData = await relationResponse.json();

                const supervisedStudents = relationData.map(rel => rel.studentId);
                setStudents(studentData);
                setLeft(studentData.filter(student => !supervisedStudents.includes(student.id)));
                setRight(studentData.filter(student => supervisedStudents.includes(student.id)));
            }
            fetchStudents();
        } else {
            setStudents([]);
            setLeft([]);
            setRight([]);
        }
    }, [selectedSupervisor]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
        setChecked([]);
    };

    const handleCheckedRight = () => {
        const leftChecked = intersection(checked, left);
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        const rightChecked = intersection(checked, right);
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        setChecked([]);
    };

    const customList = (items, type) => (
        <Paper sx={{ width: 300, height: 300, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${type}-${value.id}-label`;

                    return (
                        <ListItemButton
                            key={value.id}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.name}`} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    const handleAssign = async () => {
        if (selectedSupervisor) {
            console.log(right,left)
            const assignments = right.map(student => ({
                studentId: student.id,
                supervisorId: selectedSupervisor.id
            }));
    
            const response = await fetch("http://masarnetbe.tazerdev.com/admin/assign-students", {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ supervisorId: selectedSupervisor.id, assignments: assignments })
            });
    
            if (response.ok) {
                setAlert({ open: true, message: "تم تعيين الطلاب للمشرف بنجاح", severity: 'success' });
                setStudents([]);
                setRight([]);
                setLeft([]);
                setChecked([]);
                setSelectedSupervisor(null);
            } else {
                setAlert({ open: true, message: "حدث خطأ أثناء تعيين الطلاب للمشرف", severity: 'error' });
            }
        }
    };
    

    return (
        <Box sx={{ p: 3, boxSizing: "border-box", width: "100%" }}>
            <Container>
                <Typography variant="h4" gutterBottom mb={3}>تعيين الطلاب للمشرفين</Typography>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                    <Grid item xs={6} mb={3}>
                        <TextField
                            select
                            label="اختر مشرف"
                            fullWidth
                            value={selectedSupervisor}
                            onChange={(e) => setSelectedSupervisor(e.target.value)}
                            sx={{
                                ".MuiSvgIcon-root": {
                                    right: "90%"
                                }
                            }}
                        >
                            {supervisors.map((supervisor) => (
                                <MenuItem key={supervisor.id} value={supervisor}>
                                    {supervisor.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                {selectedSupervisor && (
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h6" gutterBottom>ليسوا تحت الاشراف</Typography>
                            {customList(left, 'student')}
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllRight}
                                    disabled={left.length === 0}
                                    aria-label="move all right"
                                >
                                    ≫
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedRight}
                                    disabled={intersection(checked, left).length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedLeft}
                                    disabled={intersection(checked, right).length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllLeft}
                                    disabled={right.length === 0}
                                    aria-label="move all left"
                                >
                                    ≪
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom>تحت الاشراف</Typography>
                            {customList(right, 'supervisor')}
                        </Grid>
                    </Grid>
                )}

                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleAssign} disabled={!selectedSupervisor}>
                        تعيين
                    </Button>
                </Box>
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
                    <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}


export default function AdminDashboard() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleChange} centered>
                <Tab label="إدارة التطبيقات" />
                <Tab label="تعيين الطلاب" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <AdminApplications />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <AssignStudents />
            </TabPanel>
        </Box>
    );
}

const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};
