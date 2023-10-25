import './Login.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import FormComponent from '../FormComponent/FormComponent';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login () {
    const [email, setEmail] = useState('pochta@yandex.ru');
    const [password, setPassword] = useState('12345678');

    return (
        <SectionComponent type="login">
            <h1 className="section__header section__header_type_login">Рады видеть!</h1>
            <FormComponent formType="login">
                <div className="form__row form__row_layout_column">
                    <FormLabel>E-mail</FormLabel>
                    <FormInput additionalClass="form__input_type_auth" placeholder="Введите e-mail"
                               inputType="email"
                               validationProps={{ type: 'email', required: true }}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form__row form__row_layout_column">
                    <FormLabel>Пароль</FormLabel>
                    <FormInput additionalClass="form__input_type_auth" inputType="password" placeholder="Введите пароль"
                               validationProps={{ required: true, minLength: 6 }}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form__row form__row_type_center">
                    <FormButton buttonType="submit" type="signin">Войти</FormButton>
                </div>
            </FormComponent>
            <p className="form__helptext">Ещё не зарегистрированы? <Link className="form__link"
                                                                         to="/signup">Регистрация</Link></p>
        </SectionComponent>
    );
}

export default Login;
