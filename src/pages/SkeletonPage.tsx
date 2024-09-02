import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function ProductListSkeleton() {
  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography level="h2" mb={2}>
        Product List
      </Typography>
      
      <Stack direction="row" spacing={2} justifyContent="space-between" mb={2}>
        <Box sx={{ width: '48%' }}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
        <Box sx={{ width: '48%' }}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      </Stack>
      
      <Stack spacing={2}>
        {Array.from(new Array(8)).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              padding: '1rem',
              border: '1px solid',
              borderRadius: '8px',
              borderColor: 'neutral.outlinedBorder',
              backgroundColor: index % 2 === 0 ? 'background.level1' : 'transparent', 
            }}
          >
            <Skeleton variant="rectangular" width={60} height={60} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Box>
            <Box>
              <Skeleton variant="text" width={100} height={20} />
            </Box>
            <Box>
              <Skeleton variant="rectangular" width={60} height={30} sx={{ borderRadius: '4px' }} />
            </Box>
          </Box>
        ))}
      </Stack>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: '4px' }} />
      </Box>
    </Box>
  );
}
