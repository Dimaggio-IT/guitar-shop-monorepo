import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus, TRegData, validateRegForm } from '../../common';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postAsyncReg, selectAuthStatus } from '../../store';
import { useNavigate } from 'react-router-dom';

function Registration(): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);

  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);

  const [formData, setFormData] = useState<TRegData>({
    email: '',
    login: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
    if (validateRegForm({ ...formData, [name]: value })) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      postAsyncReg({
        email: formData.email,
        login: formData.login,
        password: formData.password,
      })
    );
  };

  return (
    <main className="page-content">
      <div className="container">
        <Helmet>
          <title>Регистрация — GuitarShop</title>
        </Helmet>
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleFormSubmit}>
            <div className="input-login">
              <label htmlFor="login">Введите имя</label>
              <input
                type="text"
                id="login"
                name="login"
                autoComplete="off"
                onChange={handleInputChange}
                required
              />
              {!isValid && <p className="input-login__error">Заполните правильно все поля</p>}
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
              {!isValid && <p className="input-login__error">Заполните правильно все поля</p>}
            </div>
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label>
              <span>
                <input
                  type="password"
                  placeholder="• • • • • • • • • • • •"
                  id="password"
                  name="password"
                  autoComplete="off"
                  required
                  onChange={handleInputChange}
                />
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              {!isValid && <p className="input-login__error">Заполните правильно все поля</p>}
            </div>
            <button
              className="button login__button button--medium"
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export { Registration };
