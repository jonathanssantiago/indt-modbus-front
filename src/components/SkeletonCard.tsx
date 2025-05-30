import { Box, Card, CardContent, Skeleton } from '@mui/material';

interface SkeletonCardProps {
  color: string;
  icon?: React.ReactNode;
}

const SkeletonCard = ({ color, icon }: SkeletonCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderLeft: `3px solid ${color}`,
        backgroundColor: '#ffffff',
        opacity: 0.7,
        animation: 'pulse 2s ease-in-out infinite',
        '@keyframes pulse': {
          '0%': {
            opacity: 0.7,
          },
          '50%': {
            opacity: 0.4,
          },
          '100%': {
            opacity: 0.7,
          },
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
          }}
        >
          {icon && <Box sx={{ color: color, opacity: 0.5 }}>{icon}</Box>}
          <Skeleton
            variant="text"
            width={80}
            height={20}
            sx={{
              backgroundColor: `${color}20`,
              borderRadius: 1,
            }}
          />
        </Box>
        <Skeleton
          variant="text"
          width={120}
          height={48}
          sx={{
            backgroundColor: `${color}30`,
            borderRadius: 1,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
