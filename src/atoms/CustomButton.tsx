import styled from '@emotion/styled';
import { Button, Theme, useTheme } from '@mui/material';
import { FC, JSX, ReactNode } from 'react';
import { colors } from '../utils/constant.ts';

/**
 * This interface defines the props that the CustomButton component expects.
 */
interface CustomButtonProps {
  label: string;
  onClick: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
}

/**
 * This functional component renders a customizable button using Material-UI.
 * It supports various button variants, start and end icons, and custom click handling.
 * @param {CustomButtonProps} props - The props for the component.
 * @returns JSX.Element - The rendered component.
 */
const CustomButton: FC<CustomButtonProps> = ({
  label,
  onClick,
  startIcon,
  endIcon,
  variant = 'contained',
}: CustomButtonProps): JSX.Element => {
  const theme = useTheme();

  return (
    <StyledButton
      type="button"
      theme={theme}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {label}
    </StyledButton>
  );
};

export default CustomButton;

const StyledButton = styled(Button)(
  ({ theme }: { theme: Theme }) => `
  min-width: 170px;
  font-weight: 600;
  border-radius: 20px;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    box-shadow: none;
    color: ${colors.white};
  }
  ${theme.breakpoints.down('sm')} {
    font-size: 12px;
    min-width: 150px;
  }
`,
);
