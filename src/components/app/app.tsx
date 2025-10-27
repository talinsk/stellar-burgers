import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  ProtectedRoute
} from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllIngredients, getIngredients } from '@slices';
import { Preloader } from '@ui';

const App: FC = () => {
  const { isIngredientsLoading } = useSelector(getIngredients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const closeModal = () => {
    navigate('/');
  };

  const backgroundLocation = location.state?.background;
  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route path='/profile'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='orders'
                element={
                  <ProtectedRoute>
                    <ProfileOrders />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='*' element={<NotFound404 />} />
          </Routes>
          {backgroundLocation && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
