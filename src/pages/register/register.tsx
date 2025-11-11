import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { registerUser, selectUserError } from '@state';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const regData: TRegisterData = {
      name: userName,
      password,
      email
    };
    dispatch(registerUser(regData));
  };

  return (
    <RegisterUI
      errorText={error}
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
