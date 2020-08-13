import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SpeedDial from './my-speed-dial';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{width:'100%'}}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `.1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        props.onValueChange(newValue);
        setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Bài tập" {...a11yProps(0)} />
        {/* <Tab label="Bài thi/kiểm tra" {...a11yProps(1)} /> */}
        <Tab label="Sinh viên" {...a11yProps(1)} />
        <Tab label="Điểm" {...a11yProps(2)} />
        <Tab label="Chấm điểm" {...a11yProps(3)}/>
        {/* <SpeedDial/> */}
      </Tabs>
      <TabPanel value={value} index={0}>{props.exams}</TabPanel>
      {/* <TabPanel value={value} index={1}>{props.tests}</TabPanel> */}
      <TabPanel value={value} index={1}>{props.students}</TabPanel>
      <TabPanel value={value} index={2}>{props.marks_list}</TabPanel>
      <TabPanel value={value} index={3}>{props.marks}</TabPanel>
      
    </div>
  );
}
