import { Divider } from '@mui/joy'
import Box from '@mui/joy/Box'
import Skeleton from '@mui/joy/Skeleton'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

export default function SkeletonPage() {
  return (
    <Box sx={{ padding: '5vw 10vw 5vw 10vw' }}>
      <Typography level="h2" mb={4}>
        Product List
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="space-between" mb={4}>
        <Box sx={{ width: '15%' }}>
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Box>
        <Box sx={{ width: '15%' }}>
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Skeleton variant="text" width={60} height={30} />
        <Skeleton variant="text" width={60} height={30} />
        <Skeleton variant="text" width={60} height={30} />
        <Skeleton variant="text" width={60} height={30} />
      </Box>

      <Divider
        sx={{
          margin: '16px 0 8px 0',
        }}
      />

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
              backgroundColor:
                index === 1 ? 'background.level1' : 'transparent',
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
              <Skeleton variant="text" width={60} height={20} />
            </Box>
          </Box>
        ))}
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Skeleton variant="text" width={60} height={20} />
      </Box>
    </Box>
  )
}
