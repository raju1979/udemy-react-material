import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../assets/logo.svg";
// import { IconButton } from '@material-ui/core';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  // toolbarMargin: {
  //   ...theme.mixins.toolbar,
  //   marginBottom: "3rem",
  //   minHeight: "32px",
  //   [theme.breakpoints.down("md")]: {
  //     marginBottom: "1em",
  //     minHeight: "48px",
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     marginBottom: ".5em",
  //     minHeight: "32px",
  //   },
  // },
  logo: {
    height: "100%"
  },
  logoContainer: {
    padding: 0,
    "&h:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIconStyle: {
    width: "50px",
    height: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "#fff",
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    opacity: 1
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    { name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1 },
    { name: "Mobile App Development", link: "/mobileApps", activeIndex: 1, selectedIndex: 2 },
    { name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3 },
  ];

  const routes = [
    {name: "Home", link: "/", activeIndex: 0},
    {name: "Services", link: "/services", activeIndex: 1},
    {name: "The Reolution", link: "/revolution", activeIndex: 2},
    {name: "About Us", link: "/about", activeIndex: 3},
    {name: "Contact", link: "/contact", activeIndex: 4}
  ]

  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex)
            if(route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default: 
          break;  
      }
    })
    
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab className={classes.tab} label="Home" component={Link} to="/" />
        <Tab
          className={classes.tab}
          label="Services"
          component={Link}
          aria-controls={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          onMouseOver={handleClick}
          to="/services"
        />
        <Tab
          className={classes.tab}
          label="The Revolution"
          component={Link}
          to="/revolution"
        />
        <Tab
          className={classes.tab}
          label="About Us"
          component={Link}
          to="/about"
        />
        <Tab
          className={classes.tab}
          label="Contact Us"
          component={Link}
          to="/contact"
        />
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        component={Link}
        to="/estimate"
      >
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <ListItem
            onClick={() =>{ setOpenDrawer(false); setValue(0)}}
            divider
            button
            component={Link}
            to="/"
            selected={value === 0}
          >
            <ListItemText disableTypography className={value === 0 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>Home</ListItemText>
          </ListItem>
          <ListItem
            onClick={() =>{ setOpenDrawer(false); setValue(1)}}
            divider
            button
            component={Link}
            to="/services"
            selected={value === 1}
          >
            <ListItemText disableTypography className={value === 1 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
              Services
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() =>{ setOpenDrawer(false); setValue(2)}}
            divider
            button
            component={Link}
            to="/revolution"
            selected={value === 2}
          >
            <ListItemText disableTypography className={value === 2 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
              The Revolution
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() =>{ setOpenDrawer(false); setValue(3)}}
            divider
            button
            component={Link}
            to="/about"
            selected={value === 3}
          >
            <ListItemText disableTypography className={value === 3 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
              About Us
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() =>{ setOpenDrawer(false); setValue(4)}}
            divider
            button
            component={Link}
            to="/contact"
            selected={value === 4}
          >
            <ListItemText disableTypography className={value === 4 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
              Contact Us
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() =>{ setOpenDrawer(false); setValue(5)}}
            divider
            button
            component={Link}
            to="/estimate"
            selected={value === 5}
            className={classes.drawerItemEstimate}
          >
            <ListItemText disableTypography className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
              Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        disablePadding 
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIconStyle}></MenuIcon>
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="static" color="primary">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img className={classes.logo} src={logo} alt="logo" />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
