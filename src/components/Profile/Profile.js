import './Profile.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import FormComponent from '../FormComponent/FormComponent';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import FormDivider from '../FormDivider/FormDivider';
import { useState } from 'react';

function Profile () {
    const [name, setName] = useState('Виталий');
    const [email, setEmail] = useState('pochta@yandex.ru');

    return (
        <SectionComponent type="profile">
            <h1 className="section__header section__header_type_profile">Привет, Виталий!</h1>
            <FormComponent formType="edit-profile">
                <div className="form__row form__row_layout_between">
                    <FormLabel>Имя</FormLabel>
                    <FormInput additionalClass="form__input_type_right" placeholder="Введите имя"
                               validationProps={{ minLength: 2, maxLength: 40, required: true }}
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                </div>
                <FormDivider/>
                <div className="form__row form__row_layout_between">
                    <FormLabel>E-mail</FormLabel>
                    <FormInput additionalClass="form__input_type_right" placeholder="Введите e-mail"
                               validationProps={{ type: 'email', required: true }}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form__row form__row_type_center">
                    <FormButton buttonType="submit" type="edit">Редактировать</FormButton>
                </div>
            </FormComponent>
            <FormComponent formType="logout">
                <div className="form__row form__row_type_center">
                    <FormButton type="logout">Выйти из аккаунта</FormButton>
                </div>
            </FormComponent>
        </SectionComponent>
    );
}

export default Profile;
