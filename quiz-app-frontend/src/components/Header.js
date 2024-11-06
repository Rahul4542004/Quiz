import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { getUser, isUserLoggedIn, logout } from "../services/AuthService";
import { useEffect, useState } from "react";
import { isTakingTest } from "../services/QuizService";

const settings = ["Home", "Account", "Dashboard", "Logout"];
const generateAvatars = () => {
  const avatars = [];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < letters.length; i++) {
    avatars.push({
      letter: letters[i],
      src: "",
      color: "orange",
    });
  }
  return avatars;
};
const avatars = generateAvatars();

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    console.log("Opening user menu");
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    console.log("Closing user menu");
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    if (!isTakingTest()) logout();
    navigate("/");
  };

  const handleMenuItemClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Account") {
      navigate("/account");
    } else if (setting === "Home") {
      navigate("/");
    } else if (setting === "Dashboard") {
      navigate("/dashboard");
    } else {
      handleCloseUserMenu();
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
        width: "100%", // Ensures the AppBar spans the full width of the viewport
        margin: 0, // Remove any margin
        padding: 0, // Remove any padding
      }}
    >
      <Container maxWidth={false} sx={{ padding: 0 }}> {/* Container full width */}
        <Toolbar disableGutters sx={{ width: "100%" }}> {/* Ensure Toolbar spans full width */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            INTELLIQUEST
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isUserLoggedIn() ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
                    <Avatar
                      alt="User Avatar"
                      sx={{
                        background:
                          "linear-gradient(98.3deg, rgb(255, 220, 0) 10.6%, rgb(255, 180, 0) 97.7%)",
                      }}
                    >
                      {JSON.parse(getUser()).username.toUpperCase().charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                sx={{
                  background:
                    "linear-gradient(98.3deg, rgb(255, 220, 0) 10.6%, rgb(255, 180, 0) 97.7%)",
                  color: "#000",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                  '&:hover': {
                    background:
                      "linear-gradient(98.3deg, rgb(255, 240, 100) 10.6%, rgb(255, 210, 100) 97.7%)",
                    transform: "scale(1.10)",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                LOGIN/REGISTER
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
