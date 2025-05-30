import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

interface ChartSkeletonProps {
  title: string;
  color: string;
}

const ChartSkeleton = ({ title, color }: ChartSkeletonProps) => {
  return (
    <Card
      sx={{
        opacity: 0.7,
        animation: 'pulse 2s ease-in-out infinite',
        '@keyframes pulse': {
          '0%': { opacity: 0.7 },
          '50%': { opacity: 0.4 },
          '100%': { opacity: 0.7 },
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: '#718096' }}>
          {title}
        </Typography>
        <Box sx={{ height: 200, position: 'relative', overflow: 'hidden' }}>
          {/* Simulação do grid do gráfico */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(to right, #f1f5f9 1px, transparent 1px),
                linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
              `,
              backgroundSize: '40px 30px',
              opacity: 0.5,
            }}
          />

          {/* Linha animada simulando dados */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '30%',
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
              animation: 'wave 3s ease-in-out infinite',
              '@keyframes wave': {
                '0%': { transform: 'translateX(-100%)' },
                '50%': { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(100%)' },
              },
            }}
          />

          {/* Eixos Y */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              py: 2,
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                variant="text"
                width={30}
                height={12}
                sx={{ backgroundColor: `${color}20` }}
              />
            ))}
          </Box>

          {/* Eixos X */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 60,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              px: 2,
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                variant="text"
                width={40}
                height={12}
                sx={{ backgroundColor: `${color}20` }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartSkeleton;
