import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";


export default function LoadingScreen(){
    return(
        <Box sx={{height: "100vh", width: "100vw", zIndex: 99999, position: "absolute", top: 0, left: 0, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", display: "flex"}}>
            <CircularProgress />
        </Box>
    )
}