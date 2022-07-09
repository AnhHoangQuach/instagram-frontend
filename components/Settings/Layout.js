import { Grid, Hidden, Box, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import Header from '../../components/Header';
import Seo from '../../components/Seo';
import ChangePassword from '../../components/Settings/ChangePassword';
import EditProfile from '../../components/Settings/EditProfile';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box>
          <Typography component="span" variant="body2">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Layout({ url, children }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Seo title="Edit Profile" description="Edit Profile" />
      <Header />

      <Grid container className="max-w-5xl mx-auto mt-8 border">
        <Hidden smDown>
          <Box sx={{ flexGrow: 1, display: 'flex', width: '100%' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}
            >
              <Tab label="Edit Profile" {...a11yProps(0)} />
              <Tab label="Change Password" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <EditProfile />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ChangePassword />
            </TabPanel>
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Edit Profile" {...a11yProps(0)} />
              <Tab label="Change Password" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <EditProfile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ChangePassword />
          </TabPanel>
        </Hidden>
      </Grid>
      {children}
    </>
  );
}
