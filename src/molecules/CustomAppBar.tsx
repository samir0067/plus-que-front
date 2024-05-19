import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { FC, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@mui/material/styles/styled';
import { colors } from '../utils/constant.ts';

/**
 * Interface for AppBarProps
 * This interface defines the props that the CustomAppBar component expects.
 */
interface AppBarProps {
  handleDrawerToggle: () => void;
  navItems: Array<{ title: string; path: string }>;
}

/**
 * CustomAppBar Component
 * This functional component renders a custom AppBar with navigation items.
 * It includes a logo, a menu button for mobile view, and navigation links.
 * @param {AppBarProps} props - The props for the component.
 * @returns JSX.Element - The rendered component.
 */
const CustomAppBar: FC<AppBarProps> = ({ handleDrawerToggle, navItems }: AppBarProps) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <AppBar component="nav" sx={styledAppBar}>
        <StyledToolbar sx={{ opacity }}>
          <TitleLink to="/" variant="body1">
            PLUS QUE FRONT
          </TitleLink>
          <Box flexGrow={1} display="block" />
          <NavBox>
            {navItems.map((item) => (
              <NavButton key={item.title} to={item.path}>
                {item.title}
              </NavButton>
            ))}
          </NavBox>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: colors.white }} />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Fragment>
  );
};

export default CustomAppBar;

const styledAppBar = { paddingY: 0, display: 'flex' };

const StyledToolbar = styled(Toolbar)`
  opacity: 1;
  transition: opacity 1s;
`;

const TitleLink = styled(Typography)`
  flex-grow: 1;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${colors.white};
  text-decoration: none;
  display: block;
}`.withComponent(Link);

const NavBox = styled(Box)(
  ({ theme }) => `
  display: flex;
  ${theme.breakpoints.down('sm')} {
    display: none;
  }`,
);

const NavButton = styled(Button)`
  color: ${colors.white};
  font-weight: bold;
  padding-bottom: 5px;
  margin-left: 10px;
  border-bottom: 3px solid transparent;
  text-decoration: none;

  &:hover {
    color: ${colors.secondary};
    transform: scale(1.2);
    transition: color transform 0.4s ease-in-out;
  }
`.withComponent(Link);
