import { Box, Drawer, Theme, useTheme } from '@mui/material';
import React, { useState } from 'react';
import CustomAppBar from '../molecules/CustomAppBar.tsx';
import MobileDrawer from '../molecules/MobileDrawer.tsx';
import styled from '@emotion/styled';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { title: 'Home', path: '/' },
];

const DrawerAppBar: React.FC = (props: Props) => {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box display="flex">
      <CustomAppBar handleDrawerToggle={handleDrawerToggle} navItems={navItems} />
      <nav>
        <StyledDrawer
          theme={theme}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {<MobileDrawer handleDrawerToggle={handleDrawerToggle} navItems={navItems} />}
        </StyledDrawer>
      </nav>
    </Box>
  );
};

export default DrawerAppBar;

const StyledDrawer = styled(Drawer)(({ theme }: { theme: Theme }) => `
  display: block;
  & .MuiDrawer-paper { boxSizing: 'border-box', width: ${drawerWidth} }
  ${theme.breakpoints.up('sm')} {
    display: none;
  }
`,
);
