import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const links = [
  {
    title: "Productos",
    path: "/",
  },
  {
    title: "Mis Compras",
    path: "/venta/:id",
  },
];

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4a148c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Vientos Patagonicos
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {links.map((link) => (
              <Button
                key={link.title}
                component={NavLink}
                to={link.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {link.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
