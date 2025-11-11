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
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { checkUserAuth, getAllIngredients, getIngredients } from '@slices';
import { Preloader } from '@ui';

const App: FC = () => {
  const { isIngredientsLoading } = useSelector(getIngredients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const matchOrder = useMatch('/feed/:number');
  const matchProfileOrder = useMatch('/profile/orders/:number');
  //console.log('matches:', matchOrder, matchProfileOrder);

  useEffect(() => {
    dispatch(getAllIngredients());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const backgroundLocation = location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

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
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
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
              <Route
                path='/feed/:number'
                element={
                  <Modal
                    title={'#' + matchOrder?.params?.number}
                    onClose={closeModal}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal
                      title={'#' + matchProfileOrder?.params?.number}
                      onClose={closeModal}
                    >
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
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
