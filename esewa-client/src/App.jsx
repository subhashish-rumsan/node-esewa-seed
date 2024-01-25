import "./App.css";
import BasicTable from "./components/Table";
import BasicButtons from "./components/button";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <BasicButtons />
      <BasicTable />
    </Box>
  );
}

export default App;
