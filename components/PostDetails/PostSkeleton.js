import { Card, CardHeader, Skeleton, Divider, Typography, CardMedia } from '@mui/material';

export default function PostSkeleton() {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
        title={<Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" width="40%" height={10} />}
      />
      <CardMedia style={{ height: 400 }}>
        <Skeleton variant="rect" height="100%" />
      </CardMedia>
      <Divider />
      <Typography style={{ padding: '8px 12px 4px' }}>
        <Skeleton />
      </Typography>
      <Typography style={{ padding: '4px 12px 8px' }}>
        <Skeleton />
      </Typography>
    </Card>
  );
}
