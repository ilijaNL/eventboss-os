import { LoadingOverlay, LoadingOverlayProps } from '@mantine/core';

const Loading = (props?: Partial<LoadingOverlayProps>) => {
  return <LoadingOverlay loaderProps={{ size: 'lg' }} overlayOpacity={0.3} overlayBlur={3} visible {...props} />;
};

export default Loading;
