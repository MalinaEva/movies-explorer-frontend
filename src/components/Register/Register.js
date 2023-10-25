import './Register.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import FormComponent from '../FormComponent/FormComponent';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register () {
    const [email, setEmail] = useState('pochta@yandex.ru');
    const [password, setPassword] = useState('12345678');
    const [name, setName] = useState('Виталий');

    return (
        <SectionComponent type="register">
            <h1 className="section__header section__header_type_register">Добро пожаловать!</h1>
            <FormComponent formType="register">
                <div className="form__row form__row_layout_column">
                    <FormLabel additionalClass="form_label_size_small">Имя</FormLabel>
                    <FormInput additionalClass="form__input_type_auth" placeholder="Введите имя"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               validationProps={{ minLength: 2, maxLength: 40, required: true }}
                    />
                </div>
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
                    <FormInput additionalClass="form__input_type_auth form__input_invalid" inputType="password"
                               placeholder="Введите пароль"
                               validationProps={{ required: true, minLength: 6 }}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="form__error">Что-то пошло не так...</p>
                </div>
                <div className="form__row form__row_type_center">
                    <FormButton buttonType="submit" type="signup">Зарегистрироваться</FormButton>
                </div>
            </FormComponent>
            <p className="form__helptext">Уже зарегистрированы? <Link className="form__link" to="/signin">Войти</Link>
            </p>
        </SectionComponent>
    );
}

export default Register;
