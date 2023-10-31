import './Login.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import FormComponent from '../FormComponent/FormComponent';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { getUserInfo, signIn } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Login () {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setCurrentUser } = useContext(CurrentUserContext);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            setErrorMessage('');
            setIsLoading(true);

            try {
                const authData = await signIn(values.email, values.password);
                localStorage.setItem('token', authData.token);

                const userData = await getUserInfo(authData.token);
                setCurrentUser(userData);
                resetForm();
                navigate('/movies');
            } catch (err) {
                setCurrentUser(null);
                setErrorMessage(`${err.message || err}`);
            } finally {
                setIsLoading(false);
            }
        },
        [resetForm, values, navigate, setCurrentUser]
    );

    return (
        <SectionComponent type="login">
            <h1 className="section__header section__header_type_login">Рады видеть!</h1>
            <FormComponent onSubmit={handleSubmit} formType="login">
                <div className="form__row form__row_layout_column">
                    <FormLabel>E-mail</FormLabel>
                    <FormInput additionalClass="form__input_type_auth" placeholder="Введите e-mail"
                               inputType="email"
                               name="email"
                               value={values.email || ''}
                               onChange={handleChange}
                               rules={{
                                   type: 'email',
                                   required: true,
                                   pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,4}$'
                               }}
                               error={errors.email}
                    />
                </div>
                <div className="form__row form__row_layout_column">
                    <FormLabel>Пароль</FormLabel>
                    <FormInput additionalClass="form__input_type_auth" inputType="password" placeholder="Введите пароль"
                               name="password"
                               value={values.password || ''}
                               onChange={handleChange}
                               rules={{ minLength: 6, maxLength: 40, required: true }}
                               error={errors.password}
                    />
                </div>
                <div className="form__row form__row_type_center">
                    <FormButton disabled={!isValid || isLoading} buttonType="submit" type="signin">Войти</FormButton>
                    {errorMessage && <p className="form__error">{errorMessage}</p>}
                </div>
            </FormComponent>
            <p className="helptext">Ещё не зарегистрированы? <Link className="section__link"
                                                                         to="/signup">Регистрация</Link></p>
        </SectionComponent>
    );
}

export default Login;
