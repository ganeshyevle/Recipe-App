import React from 'react';
import { Grid, Card, CardContent, Skeleton, Box } from '@mui/material';

const RecipeSkeleton = () => (
  <Card sx={{ height: '100%', borderRadius: 2 }}>
    <Skeleton
      animation="wave"
      variant="rectangular"
      height={200}
      sx={{ borderRadius: '16px 16px 0 0' }}
    />
    <CardContent>
      <Skeleton animation="wave" height={32} width="80%" sx={{ mb: 1 }} />
      <Skeleton animation="wave" height={20} width="60%" />
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Skeleton animation="wave" height={32} width={80} />
        <Skeleton animation="wave" height={32} width={80} />
        <Skeleton animation="wave" height={32} width={80} />
      </Box>
    </CardContent>
  </Card>
);

const LoadingSkeletons = () => {
  return (
    <Grid container spacing={3}>
      {[...Array(9)].map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <RecipeSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeletons;
