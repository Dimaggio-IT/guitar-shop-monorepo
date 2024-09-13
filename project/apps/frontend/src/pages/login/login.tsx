import { Helmet } from 'react-helmet-async';
import {
  AppRoute,
  AuthorizationStatus,
  TAuthData,
  validateLoginForm,
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postAsyncAuth, selectAuthStatus } from '../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);

  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);

  const [formData, setFormData] = useState<TAuthData>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
    if (validateLoginForm({ ...formData, [name]: value })) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      postAsyncAuth({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (
    <main className="page-content">
      <div className="container">
        <Helmet>
          <title>Войти — GuitarShop</title>
        </Helmet>
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">
            Hовый пользователь?{' '}
            <Link className="login__link" to={AppRoute.Register}>
              Зарегистрируйтесь
            </Link>{' '}
            прямо сейчас
          </p>
          <form onSubmit={handleFormSubmit} method="post" action="/">
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                onChange={handleTextChange}
                value={formData.email}
                required
              />
              {!isValid && (
                <p className="input-login__error">Заполните правильно все поля</p>
              )}
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label>
              <span>
                <input
                  type="password"
                  placeholder="• • • • • • • • • • • •"
                  id="passwordLogin"
                  name="password"
                  autoComplete="off"
                  onChange={handleTextChange}
                  value={formData.password}
                  required
                />
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              {!isValid && (
                <p className="input-login__error">Заполните правильно все поля</p>
              )}
            </div>
            <button
              className="button login__button button--medium"
              type="submit"
              disabled={!isValid}
            >
              Войти
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export { Login };
