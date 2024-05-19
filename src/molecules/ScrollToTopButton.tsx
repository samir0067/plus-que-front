import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import React, { FC, useEffect, useState } from 'react';
import { colors } from '../utils/constant';
import { styled } from '@mui/material/styles';

/**
 * This interface defines the props that the ScrollToTopButton component expects.
 */
interface ScrollToTopButtonProps extends IconButtonProps {
  icon?: React.ReactElement;
  iconColors?: string;
  border?: string;
}

/**
 * This functional component displays a button that, when clicked, scrolls the window to the top.
 * The button appears only when the user scrolls down beyond the height of the window.
 * @param {ScrollToTopButtonProps} props - The props for the component.
 * @returns JSX.Element - The rendered component.
 */
const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
  icon = <ArrowUpwardIcon />,
  ...rest
}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return isVisible ? (
    <StyledBox>
      <StyledIconButton
        {...rest}
        aria-label="scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {icon}
      </StyledIconButton>
    </StyledBox>
  ) : null;
};

export default ScrollToTopButton;

const StyledBox = styled(Box)`
  position: fixed;
  z-index: 10;
  bottom: 24px;
  right: 24px;
`;

const StyledIconButton = styled(IconButton)`
  color: ${colors.white};
  border: 1px solid ${colors.white};
  z-index: 20;
  background-color: ${colors.primary};
  position: fixed;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: ${colors.secondary};
  }
`;
