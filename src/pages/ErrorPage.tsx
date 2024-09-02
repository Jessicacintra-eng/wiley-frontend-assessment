import { Box, Button, Container, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/`)
  }
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography level="h1" sx={{ fontSize: '6rem', fontWeight: 'bold'}}>
          Ooops!
        </Typography>
        <Typography level="h4" sx={{ mb: 3 }}>
          Sorry, something went wrong.
        </Typography>
        <Button variant="solid" color="primary"onClick={handleClick}>
          Go Back to Home Page
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
