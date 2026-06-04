import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@selectors';
import { userNameSelector } from '@slices';

export const AppHeader: FC = () => {
  const userName = useSelector(userNameSelector);
  return <AppHeaderUI userName={userName} />;
};
