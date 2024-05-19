import { useNavigate } from 'react-router-dom';
import { Box, Theme, Typography } from '@mui/material';
import CustomButton from '../atoms/CustomButton';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { colors } from '../utils/constant.ts';


/**
 * This functional component displays a "404 - Page not found" message. It provides two buttons
 * for navigation: one to go back to the previous page and another to go to the home page.
 * @returns JSX.Element - The rendered component.
 */
const NotFound: FC = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goToHome = () => navigate('/');

  return (
    <ContainerBox>
      <TitleTypography variant="h2" textAlign="center">
        {content.title}
      </TitleTypography>
      <MessageTypography variant="h6">{content.message}</MessageTypography>
      <CustomButton label={content.back} onClick={goBack} />
      <CustomButton label={content.home} onClick={goToHome} />
    </ContainerBox>
  );
};

export default NotFound;

const content = {
  title: '404 - Page non trouvée',
  message: 'Oups! La page que vous recherchez semble introuvable.',
  back: 'Revenir en arrière',
  home: `Aller à la page d'accueil`,
};

const ContainerBox = styled(Box)(
  ({ theme }: { theme: Theme }) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  min-height: 70vh;
  margin-top: 60px;
  ${theme.breakpoints.down('sm')} {
    align-items: stretch;
  }
`,
);

const TitleTypography = styled(Typography)(
  ({ theme }: { theme: Theme }) => `
  font-family: 'Mulish', sans-serif;
  font-size: 45px;
  font-weight: bold;
  color: ${colors.black};
  margin-bottom: 20px;
  ${theme.breakpoints.down('sm')} {
    font-size: 30px;
  }
`,
);

const MessageTypography = styled(Typography)(
  ({ theme }: { theme: Theme }) => `
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
  ${theme.breakpoints.down('sm')} {
    font-size: 15px;
  }
`,
);
