import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../utils/constant.ts';

/**
 * This interface defines the props that the MobileDrawer component expects.
 */
interface MobileDrawerProps {
  handleDrawerToggle: () => void;
  navItems: Array<{ title: string; path: string }>;
}

/**
 * This functional component renders a mobile navigation drawer.
 * It includes a title and a list of navigation items.
 * @param {MobileDrawerProps} props - The props for the component.
 * @returns JSX.Element - The rendered component.
 */
const MobileDrawer: FC<MobileDrawerProps> = ({ handleDrawerToggle, navItems }: MobileDrawerProps) => {
  return (
    <DrawerContainer onClick={handleDrawerToggle}>
      <Typography component="h6" variant="subtitle1" m="10px">
        {content.title}
      </Typography>
      <Divider />
      <NavList>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton component={Link} to={item.path} sx={textAlign}>
              <ListItemText primary={item.title} sx={textAlign} />
            </ListItemButton>
          </ListItem>
        ))}
      </NavList>
    </DrawerContainer>
  );
};

export default MobileDrawer;

const content = {
  title: 'PLUS QUE FRONT',
};

const DrawerContainer = styled(Box)`
  text-align: center;
  height: 100vh;
  background-color: ${colors.primary};
  color: ${colors.white};
`;

const NavList = styled(List)`
  padding: 0;
`;

const textAlign = { textAlign: 'center' };
