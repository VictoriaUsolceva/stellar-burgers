import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  registerUser,
  registerUserErrorSelector,
  registerUserRequestSelector
} from '@slices';
import { useDispatch, useSelector } from '@selectors';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const registerUserError = useSelector(registerUserErrorSelector);
  const registerUserRequest = useSelector(registerUserRequestSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password || !userName) return;
    dispatch(registerUser({ name: userName, email, password }));
  };

  if (registerUserRequest) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={registerUserError ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
