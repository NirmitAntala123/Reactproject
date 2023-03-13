import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {PieChart} from './PieChart';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';

// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

const TabsEx = () => {
  const [tabIndex, setTabIndex] = useState(0);
  // const [value, setValue] = React.useState('2');

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <>
      <Tabs defaultIndex={0} onSelect={index => setTabIndex(index)}>
        <TabList selectedTabClassName="custom-selected-tab">
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>

      {/* <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        // fill
      >
        <Tab eventKey="home" title="Home">
        <h2>Any content 1</h2>
        </Tab>
        <Tab eventKey="profile" title="Profile">
        <h2>Any content 2</h2>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
        <h2>Any content 3</h2>
        </Tab>
      </Tabs> */}

      {/* <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box> */}
     
         <PieChart/>
     
    </>
  )
}

export default TabsEx
