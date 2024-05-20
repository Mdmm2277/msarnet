import { Alert, Box, Button, Container, Grid, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../shared";

const Forms = {
    Register: 'Register',
    Login: 'Login',
    Forget_Password: 'Forget_Password',
    RegisteredBusiness: "Registered_Business",
    RegisteredStuSup: "Registered_Student_Supervisor"
}

function Login({ setCurrentForm, }) {
    var theme = useTheme()
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState(null)

    const Auth = useAuth();

    const classes = {
        tertiaryAction: {
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left'
            }
        },
    };
    return (
        <Box pt={8} pb={10} sx={{ width: "100%" }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h5" component="h2">تسجيل الدخول</Typography>
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
                <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" required fullWidth name="username" id="username" label="اسم المستخدم" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" required fullWidth name="password" id="password" label="كلمة المرور" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                </Grid>
                <Box my={2}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => Auth.login(Username,Password,setError)}>
                        تسجيل الدخول
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button onClick={() => setCurrentForm(Forms.Register)} variant="text">ليس لديك حساب؟</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={classes.tertiaryAction}>
                        <Button onClick={() => setCurrentForm(Forms.Forget_Password)} variant="text">نسيت كلمة المرور؟</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

const userTypes = [
    { value: 'supervisor', label: 'مشرف' },
    { value: 'student', label: 'طالب' },
    { value: 'business', label: 'أعمال' },
];

const universities = [
    { value: 'UJ', label: 'جامعة جدة' },
];

const StudentForm = ({ formData, handleChange }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.university}
                    required
                    fullWidth
                    select
                    name="university"
                    id="university"
                    label="الجامعة"
                    onChange={handleChange}
                    sx={{
                        ".MuiSvgIcon-root": {
                            right: "90%"
                        }
                    }}
                >
                    {universities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.universityID}
                    required
                    fullWidth
                    name="universityID"
                    id="universityID"
                    label="الرقم الجامعي"
                    onChange={handleChange}
                    inputProps={{ maxLength: 7, pattern: "\\d{7}" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.interests}
                    fullWidth
                    name="interests"
                    id="interests"
                    label="الاهتمامات"
                    required
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.graduationDate}
                    fullWidth
                    name="graduationDate"
                    id="graduationDate"
                    label="تاريخ التخرج المتوقع"
                    type="date"
                    required
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                />
            </Grid>
        </>
    );
};

const SupervisorForm = ({ formData, handleChange }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.name}
                    required
                    fullWidth
                    name="name"
                    id="name"
                    label="الاسم"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.universityID}
                    required
                    fullWidth
                    name="universityID"
                    id="universityID"
                    label="الرقم الوظيفي"
                    onChange={handleChange}
                    inputProps={{ maxLength: 7, pattern: "\\d{7}" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.position}
                    required
                    fullWidth
                    name="position"
                    id="position"
                    label="المنصب"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.department}
                    required
                    fullWidth
                    name="department"
                    id="department"
                    label="القسم"
                    onChange={handleChange}
                />
            </Grid>
        </>
    );
};

const BusinessForm = ({ formData, industry, setIndustry, industries, handleChange }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.businessName}
                    required
                    fullWidth
                    name="businessName"
                    id="businessName"
                    label="اسم الشركة"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.email}
                    required
                    fullWidth
                    name="email"
                    id="email"
                    label="البريد الإلكتروني"
                    onChange={handleChange}
                    inputProps={{ type: "email" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    select
                    name="industry"
                    id="industry"
                    label="الصناعة"
                    value={industry == null ? null : !industries.some(el => el.value == industry) ? "other" : industry}
                    onChange={(e) => {
                        setIndustry(e.target.value);
                        handleChange(e);
                    }}
                    sx={{
                        ".MuiSvgIcon-root": {
                            right: "90%"
                        }
                    }}
                >
                    {industries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                    <MenuItem value="other">أخرى</MenuItem>
                </TextField>
            </Grid>
            {(industry == null ? null : !industries.some(el => el.value == industry) ? "other" : industry) === "other" && (
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="industry"
                        id="customIndustry"
                        label="الصناعة الأخرى"
                        onChange={handleChange}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.numEmployees}
                    required
                    fullWidth
                    name="numEmployees"
                    id="numEmployees"
                    label="عدد الموظفين"
                    onChange={handleChange}
                    inputProps={{ type: "number" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.partnershipReason}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    name="partnershipReason"
                    id="partnershipReason"
                    label="السبب في الشراكة"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    value={formData.businessDescription}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    name="businessDescription"
                    id="businessDescription"
                    label="وصف الشركة"
                    onChange={handleChange}
                />
            </Grid>
        </>
    );
};

const RegisteredStuSup = ({setCurrentForm}) => {
    return (
        <Box pt={8} pb={10} sx={{ width: "100%" }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h5" component="h2">تم التسجيل</Typography>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                    <Typography variant="body1" component="div">تم ارسال رسالة تأكيد الحساب على بريدك الألكتروني الجامعي</Typography>
                    <Typography variant="body1" component="div">يرجى الذهاب اليه و اكمال الاجرائات</Typography>
                </Grid>
                <Box my={2} sx={{textAlign: "center"}}>
                    <Button onClick={() => setCurrentForm(Forms.Login)} variant="text">العودة لتسجيل الدخول</Button>
                </Box>
            </Box>
        </Box>
    )
}

const RegisteredBusiness = ({setCurrentForm}) => {
    return (
        <Box pt={8} pb={10} sx={{ width: "100%" }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h5" component="h2">تم التسجيل</Typography>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } ,justifyContent: "center"}}>
                    <Typography variant="body1" component="div">تم استلام طلب الشراكة و سيتم ارسال رسالة لكم </Typography>
                    <Typography variant="body1" component="div">عن طريق البريد الالكتروني عند القبول</Typography>
                </Grid>
                <Box my={2} sx={{textAlign: "center"}}>
                    <Button onClick={() => setCurrentForm(Forms.Login)} variant="text">العودة لتسجيل الدخول</Button>
                </Box>
            </Box>
        </Box>
    )
}

function Register({ setCurrentForm }) {
    const [userType, setUserType] = useState(userTypes[0].value);
    const [industry, setIndustry] = useState(null);
    const [industries, setIndustries] = useState([
        {'value': 'Accounting', 'label': 'محاسبة'}, {'value': 'Airlines / Aviation', 'label': 'الخطوط الجوية / الطيران'}, {'value': 'Alternative Dispute Resolution', 'label': 'الحلول البديلة لفض المنازعات'}, {'value': 'Alternative Medicine', 'label': 'الطب البديل'}, {'value': 'Animation', 'label': 'الرسوم المتحركة'}, {'value': 'Apparel / Fashion', 'label': 'الملابس / الموضة'}, {'value': 'Architecture / Planning', 'label': 'الهندسة المعمارية / التخطيط'}, {'value': 'Arts / Crafts', 'label': 'الفنون / الحرف'}, {'value': 'Automotive', 'label': 'السيارات'}, {'value': 'Aviation / Aerospace', 'label': 'الطيران / الفضاء'}, {'value': 'Banking', 'label': 'الخدمات المصرفية'}, {'value': 'Biotechnology / Greentech', 'label': 'التكنولوجيا الحيوية / التكنولوجيا الخضراء'}, {'value': 'Broadcast Media', 'label': 'بث وسائل الإعلام'}, {'value': 'Building Materials', 'label': 'مواد بناء'}, {'value': 'Business Supplies / Equipment', 'label': 'لوازم / معدات الأعمال'}, {'value': 'Capital Markets / Hedge Fund / Private Equity', 'label': 'أسواق رأس المال / الأسهم الخاصة'}, {'value': 'Chemicals', 'label': 'مواد كيميائية'}, {'value': 'Civic / Social Organization', 'label': 'منظمة مدنية / اجتماعية'}, {'value': 'Civil Engineering', 'label': 'هندسة مدنية'}, {'value': 'Commercial Real Estate', 'label': 'العقارات التجارية'}, {'value': 'Computer Games', 'label': 'العاب الحاسب'}, {'value': 'Computer Hardware', 'label': 'قطع الحاسب'}, {'value': 'Computer Networking', 'label': 'شبكات الحاسب'}, {'value': 'Computer Software / Engineering', 'label': 'هندسة حاسب / هندسة برمجيات'}, {'value': 'Network Security', 'label': 'امن الشبكات'}, {'value': 'Construction', 'label': 'بناء'}, {'value': 'Consumer Electronics', 'label': 'بضائع المستهلكين'}, {'value': 'Consumer Services', 'label': 'خدمات المستهلك'}, {'value': 'Cosmetics', 'label': 'مستحضرات التجميل'}, {'value': 'Dairy', 'label': 'ألبان'}, {'value': 'Defense / Space', 'label': 'الدفاع / الفضاء'}, {'value': 'Design', 'label': 'تصميم'}, {'value': 'E - Learning', 'label': 'التعلم الإلكتروني'}, {'value': 'Education Management', 'label': 'إدارة التعليم'}, {'value': 'Electrical / Electronic Manufacturing', 'label': 'التصنيع الكهربائي / الإلكتروني'}, {'value': 'Entertainment / Movie Production', 'label': 'الترفيه / إنتاج الأفلام'}, {'value': 'Environmental Services', 'label': 'الخدمات البيئية'}, {'value': 'Events Services', 'label': 'خدمات الفعاليات'}, {'value': 'Executive Office', 'label': 'المكتب التنفيذي'}, {'value': 'Facilities Services', 'label': 'خدمات التسهيلات'}, {'value': 'Farming', 'label': 'الزراعة'}, {'value': 'Financial Services', 'label': 'الخدمات المالية'}, {'value': 'Fishery', 'label': 'مصايد الأسماك'}, {'value': 'Food Production', 'label': 'إنتاج الغذاء'}, {'value': 'Food / Beverages', 'label': 'الأغذية / المشروبات'}, {'value': 'Fundraising', 'label': 'جمع التبرعات'}, {'value': 'Furniture', 'label': 'أثاث'}, {'value': 'Glass / Ceramics / Concrete', 'label': 'زجاج / سيراميك / خرسانة'}, {'value': 'Government Administration', 'label': 'الإدارة الحكومية'}, {'value': 'Government Relations', 'label': 'علاقات حكومية'}, {'value': 'Graphic Design / Web Design', 'label': 'التصميم الجرافيكي / تصميم المواقع الإلكترونية'}, {'value': 'Health / Fitness', 'label': 'الصحة / اللياقة البدنية'}, {'value': 'Higher Education / Acadamia', 'label': 'التعليم العالي / الأكاديمي'}, {'value': 'Hospital / Health Care', 'label': 'المستشفى / الرعاية الصحية'}, {'value': 'Hospitality', 'label': 'ضيافة'}, {'value': 'Human Resources / HR', 'label': 'الموارد البشرية'}, {'value': 'Import / Export', 'label': 'استيراد و تصدير'}, {'value': 'Individual / Family Services', 'label': 'الخدمات الفردية / العائلية'}, {'value': 'Industrial Automation', 'label': 'الأتمتة الصناعية'}, {'value': 'Information Services', 'label': 'خدمات المعلومات'}, {'value': 'Information Technology / IT', 'label': 'تكنولوجيا المعلومات'}, {'value': 'Insurance', 'label': 'تأمين'}, {'value': 'International Affairs', 'label': 'الشؤون الدولية'}, {'value': 'International Trade / Development', 'label': 'التجارة الدولية / التنمية'}, {'value': 'Internet', 'label': 'إنترنت'}, {'value': 'Investment Banking / Venture', 'label': 'الخدمات المصرفية الاستثمارية'}, {'value': 'Judiciary', 'label': 'القضاء'}, {'value': 'Law Enforcement', 'label': 'تطبيق القانون'}, {'value': 'Law Practice / Law Firms', 'label': 'ممارسة القانون / مكاتب المحاماة'}, {'value': 'Legal Services', 'label': 'خدمات قانونية'}, {'value': 'Legislative Office', 'label': 'المكتب التشريعي'}, {'value': 'Leisure / Travel', 'label': 'السفر'}, {'value': 'Library', 'label': 'مكتبة'}, {'value': 'Logistics / Procurement', 'label': 'الخدمات اللوجستية / المشتريات'}, {'value': 'Luxury Goods / Jewelry', 'label': 'السلع الفاخرة / المجوهرات'}, {'value': 'Machinery', 'label': 'الألات'}, {'value': 'Management Consulting', 'label': 'الاستشارات الإدارية'}, {'value': 'Maritime', 'label': 'البحرية'}, {'value': 'Market Research', 'label': 'البحث التجاري'}, {'value': 'Marketing / Advertising / Sales', 'label': 'التسويق / الإعلان / المبيعات'}, {'value': 'Mechanical or Industrial Engineering', 'label': 'الهندسة الميكانيكية أو الصناعية'}, {'value': 'Media Production', 'label': 'الإنتاج الإعلامي'}, {'value': 'Medical Equipment', 'label': 'معدات طبية'}, {'value': 'Medical Practice', 'label': 'الممارسة الطبية'}, {'value': 'Mental Health Care', 'label': 'الرعاية الصحية النفسية'}, {'value': 'Military Industry', 'label': 'الصناعة العسكرية'}, {'value': 'Mining / Metals', 'label': 'التعدين / المعادن'}, {'value': 'Motion Pictures / Film', 'label': 'الصور المتحركة / الفيلم'}, {'value': 'Museums / Institutions', 'label': 'المتاحف / المؤسسات'}, {'value': 'Music', 'label': 'موسيقى'}, {'value': 'Nanotechnology', 'label': 'تكنولوجيا النانو'}, {'value': 'Newspapers / Journalism', 'label': 'الصحف / الصحافة'}, {'value': 'Non - Profit / Volunteering', 'label': 'غير ربحية / تطوعية'}, {'value': 'Oil / Energy / Solar / Greentech', 'label': 'النفط / الطاقة / الطاقة الشمسية / التكنولوجيا الخضراء'}, {'value': 'Outsourcing / Offshoring', 'label': 'الاستعانة بمصادر خارجية / الاستعانة بمصادر خارجية'}, {'value': 'Package / Freight Delivery', 'label': 'تسليم الحزم / الشحن'}, {'value': 'Packaging / Containers', 'label': 'التعبئة والتغليف / الحاويات'}, {'value': 'Paper / Forest Products', 'label': 'منتجات الورق / الغابات'}, {'value': 'Performing Arts', 'label': 'الفنون التمثيلية'}, {'value': 'Pharmaceuticals', 'label': 'المستحضرات الصيدلانية'}, {'value': 'Photography', 'label': 'التصوير'}, {'value': 'Plastics', 'label': 'البلاستيك'}, {'value': 'Primary / Middle / Secondary Education', 'label': 'التعليم الابتدائي / المتوسط / الثانوي'}, {'value': 'Printing', 'label': 'الطباعة'}, {'value': 'Professional Training', 'label': 'تدريب احترافي'}, {'value': 'Public Relations / PR', 'label': 'العلاقات العامة'}, {'value': 'Public Safety', 'label': 'السلامة العامة'}, {'value': 'Railroad Manufacture', 'label': 'تصنيع السكك الحديدية'}, {'value': 'Ranching', 'label': 'تربية الماشية'}, {'value': 'Real Estate / Mortgage', 'label': 'العقارات'}, {'value': 'Recreational Facilities / Services', 'label': 'المرافق / الخدمات الترفيهية'}, {'value': 'Religious Institutions', 'label': 'المؤسسات الدينية'}, {'value': 'Renewables / Environment', 'label': 'المتجددة / البيئة'}, {'value': 'Research Industry', 'label': 'البحث والتطوير'}, {'value': 'Restaurants', 'label': 'مطاعم'}, {'value': 'Retail Industry', 'label': 'قطاع التجزئة'}, {'value': 'Security / Investigations', 'label': 'الأمن / التحقيقات'}, {'value': 'Semiconductors', 'label': 'أشباه الموصلات'}, {'value': 'Shipbuilding', 'label': 'بناء السفن'}, {'value': 'Sporting Goods', 'label': 'بضائع رياضيه'}, {'value': 'Sports', 'label': 'الرياضة'}, {'value': 'Staffing / Recruiting', 'label': 'التوظيف'}, {'value': 'Supermarkets', 'label': 'السوبر ماركت'}, {'value': 'Telecommunications', 'label': 'الاتصالات السلكية واللاسلكية'}, {'value': 'Textiles', 'label': 'المنسوجات'}, {'value': 'Tobacco', 'label': 'التبغ'}, {'value': 'Translation / Localization', 'label': 'الترجمة / التعريب'}, {'value': 'Transportation', 'label': 'مواصلات'}, {'value': 'Utilities', 'label': 'خدمات'}, {'value': 'Venture Capital / VC', 'label': 'رأس المال الاستثماري'}, {'value': 'Veterinary', 'label': 'بيطري'}, {'value': 'Warehousing', 'label': 'التخزين'}, {'value': 'Wholesale', 'label': 'بالجملة'}, {'value': 'Wireless', 'label': 'لاسلكي'}, {'value': 'Writing / Editing', 'label': 'الكتابة / التحرير'}
    ]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        university: '',
        universityID: '',
        position: '',
        department: '',
        businessName: '',
        industry: '',
        numEmployees: '',
        partnershipReason: '',
        businessDescription: '',
        interests: '',
        graduationDate: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const isValid = userType === 'supervisor' ? formData.name && formData.universityID && formData.position && formData.department :
            userType === 'student' ? formData.university && formData.universityID && formData.interests && formData.graduationDate :
                userType === 'business' ? formData.businessName && formData.email && industry && formData.numEmployees && formData.partnershipReason && formData.businessDescription : false;

        setIsFormValid(isValid);
    }, [formData, userType, industry]);

    const handleChange = (e) => {
        if (e.target.name == "universityID") {
            setFormData({ ...formData, ["email"]: e.target.value + "@uj.edu.sa", [e.target.name]: e.target.value });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        if (!isFormValid) return;

        if ((userType === 'student' || userType === 'supervisor') && formData.universityID.length !== 7) {
            setError('الرقم الجامعي / الوظيفي يجب أن يكون مكونًا من 7 أرقام.');
            return;
        }

        try {
            const response = await fetch('http://masarnetbe.tazerdev.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: userType,
                    ...formData,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                if (userType == "business") {
                    setCurrentForm(Forms.RegisteredBusiness);
                } else {
                    setCurrentForm(Forms.RegisteredStuSup);
                }
            } else {
                setError('فشل تسجيل الحساب: ' + data.message);
            }
        } catch (error) {
            setError('حدث خطأ في تسجيل الحساب');
        }
    };

    const renderForm = () => {
        switch (userType) {
            case 'supervisor':
                return <SupervisorForm formData={formData} handleChange={handleChange} />;
            case 'student':
                return <StudentForm formData={formData} handleChange={handleChange} />;
            case 'business':
                return <BusinessForm formData={formData} handleChange={handleChange} industry={industry} setIndustry={setIndustry} industries={industries} />;
            default:
                return null;
        }
    };
    return (
        <Box pt={8} pb={10} sx={{ width: "100%" }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h5" component="h2">تسجيل حساب</Typography>
            </Box>
            {
                error ?
                    <Box mb={3}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                    :
                    <></>
            }
            <Box>
                <Grid container spacing={2} sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            select
                            name="userType"
                            id="userType"
                            label="نوع المستخدم"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            style={{ width: '100%' }}
                            sx={{
                                ".MuiSvgIcon-root": {
                                    right: "90%"
                                }
                            }}
                        >
                            {userTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {renderForm()}
                </Grid>
                <Box my={2}>
                    <Button fullWidth variant="contained" color="primary" disabled={!isFormValid} onClick={handleSubmit}>
                        تسجيل حساب
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button onClick={() => setCurrentForm(Forms.Login)} variant="text">لديك حساب من قبل؟</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

function Forget_Password({ setCurrentForm }) {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://masarnetbe.tazerdev.com/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess(result.message);
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error requesting password reset:', error);
            setError('خطأ في طلب إعادة تعيين كلمة المرور.');
        }
    };

    const classes = {
        tertiaryAction: {
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left'
            }
        },
    };

    return (
        <Box pt={8} pb={10} sx={{ width: "100%" }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h5" component="h2">نسيت كلمة المرور</Typography>
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
                <Grid container sx={{ '& label': { transformOrigin: "right", left: "inherit", right: "1.75rem" } }}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" required fullWidth name="email" id="email" label="البريد الإلكتروني" onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                </Grid>
                <Box my={2}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        ارسال
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button onClick={() => setCurrentForm(Forms.Login)} variant="text">تسجيل الدخول</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={classes.tertiaryAction}>
                        <Button onClick={() => setCurrentForm(Forms.Register)} variant="text">ليس لديك حساب؟</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}


export default function Form() {
    const [CurrentForm, setCurrentForm] = useState(Forms.Login)

    return (
        <section style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Container maxWidth="xs" sx={{ position: "relative", display: "flex" }}>
                {
                    ![Forms.RegisteredBusiness,Forms.RegisteredStuSup].includes(CurrentForm)?
                    <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                        <Button component={NavLink} to={"/"}>
                            <ArrowForwardIos />
                            العودة
                        </Button>
                    </Box>
                    :
                    <></>
                }
                {
                    CurrentForm === Forms.Login ?
                        <Login setCurrentForm={setCurrentForm} />
                        :
                        <>
                            {
                                CurrentForm == Forms.Register ?
                                    <Register setCurrentForm={setCurrentForm} />
                                    :
                                    <>
                                        {
                                            CurrentForm == Forms.RegisteredBusiness ?
                                            <RegisteredBusiness setCurrentForm={setCurrentForm} />
                                            :
                                            <>
                                                {
                                                    CurrentForm == Forms.RegisteredStuSup ?
                                                    <RegisteredStuSup setCurrentForm={setCurrentForm} />
                                                    :
                                                    <>
                                                        {
                                                            CurrentForm == Forms.Forget_Password ?
                                                            <Forget_Password setCurrentForm={setCurrentForm} />
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
    );
}
