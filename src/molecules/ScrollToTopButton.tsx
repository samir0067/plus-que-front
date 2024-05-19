import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import React, { FC, useEffect, useState } from 'react';
import { colors } from '../utils/constant';
import { styled } from '@mui/material/styles';

/**
 * Scrolls the window to the top with a smooth behavior.
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
  iconColors = colors.white,
  border = `1px solid ${colors.white}`,
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
        iconColors={iconColors}
        border={border}
        aria-label="scroll to top"
        onClick={scrollToTop}
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

const StyledIconButton = styled(IconButton)<{ iconColors: string; border: string }>(({
  iconColors,
  border,
}) => `
  color: ${iconColors};
  border: ${border};
  z-index: 20;
  background-color: ${colors.primary};
  position: fixed;
  bottom: 20px;
  right: 20px;
  &:hover {
    background-color: ${colors.secondary};
  }
`);
