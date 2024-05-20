import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import { createContext, useContext, useEffect, useState } from 'react';
import Portal from './pages/Portal';
import Verify from './pages/Verify';
import LoadingScreen from './components/LoadingScreen';
import { Box } from '@mui/material';
import ResetPassword from './pages/ResetPassword';

var routes = [
    {
      name: "الرئيسية",
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      name: "portal",
      path: "/portal",
      element: <Portal />
    },
    {
      name: "verify",
      path: "/verify/:token",
      element: <Verify />
    },
    {
      name: "resetPassword",
      path: "/reset-password/:token",
      element: <ResetPassword />
    }
]

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [LoggedIn, setLoggedIn] = useState(() => {
    const storedAuth = localStorage.getItem('LoggedIn');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [UserType, setUserType] = useState(() => {
    const storedAuth = localStorage.getItem('UserType');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const Loading = useLoading()

  useEffect(() => {
    localStorage.setItem('LoggedIn', JSON.stringify(LoggedIn));
    localStorage.setItem('UserType', JSON.stringify(UserType));
  }, [LoggedIn,UserType]);

  const login = async (username,password, setError) => {
    Loading.startLoading();
    try {
      const response = await fetch('http://masarnetbe.tazerdev.com/login', {
          method: 'POST',
          credentials:'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username,
              password: password
          }),
      });
      const data = await response.json();
      if (response.ok) {
          setLoggedIn(true)
          var response1 = await fetch("http://masarnetbe.tazerdev.com/get-user-type", {method: 'GET',credentials:'include'})
          var responsejson = await response1.json()
          setUserType(responsejson.userType)
          Loading.endLoading()
      } else {
          setError('فشل تسجيل الدخول: ' + data.message);
          Loading.endLoading()
      }
  } catch (error) {
      setError('حدث خظأ في تسجيل الدخول');
      Loading.endLoading()
  }
  };

  const getUserImage = async () => {
    Loading.startLoading();

    var response = await fetch("http://masarnetbe.tazerdev.com/get-user-image", {method: 'GET',credentials:'include'})
    if(response.status == 401) {
      setLoggedIn(false)
      Loading.endLoading()
      return;
    }
    if(response.status == 404) {
      return false;
    }
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    Loading.endLoading()
    return imageUrl
  }

  const getUserData = async () => {
    var response = await fetch("http://masarnetbe.tazerdev.com/get-user-details", {method: 'GET',credentials:'include'})
    if(response.status == 401) {
      setLoggedIn(false)
      Loading.endLoading()
      return;
    }
    var responsejson = await response.json()
    Loading.endLoading()
    return responsejson
  }

  const logout = async () => {
    Loading.startLoading();
    const response = await fetch('http://masarnetbe.tazerdev.com/logout', {
          method: 'POST',
    });
    setUserType("")
    setLoggedIn(false);
    Loading.endLoading()
  };

  return (
    <AuthContext.Provider value={{ LoggedIn,UserType, login, logout,getUserImage,getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const LoadingContext = createContext();
const LoadingProvider = ({children}) => {
  const [isLoading,setisLoading] = useState(false)
  const startLoading = () => {
    setisLoading(true)
  }
  const endLoading = () => {
    setisLoading(false)
  }
  return (
    <LoadingContext.Provider value={{ isLoading,startLoading, endLoading }}>
      <AuthProvider>
      {
        isLoading ? <LoadingScreen /> : <></>
      }
      <Box sx={{display:"flex",flexDirection: "column",minHeight: "100vh", maxHeight: (isLoading ? "100vh": ""), overflow: "hidden"}}>
        {children}
      </Box>
      </AuthProvider>
    </LoadingContext.Provider>
  );
}
const useLoading = () => {
  return useContext(LoadingContext)

}

const theme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#526774',
    },
    secondary: {
      main: '#bfc9ce',
    },
  },
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Cairo',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
};

export { routes, AuthProvider, LoadingProvider, useLoading, useAuth,theme}