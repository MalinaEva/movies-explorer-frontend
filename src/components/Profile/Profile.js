import './Profile.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import FormComponent from '../FormComponent/FormComponent';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { updateProfile } from '../../utils/MainApi';
import { useMovies } from '../../contexts/MoviesContext';

function Profile () {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ 'text': '', 'type': '' });
    const [isChanged, setIsChanged] = useState(false);
    const { setMovies, setSavedMovies } = useMovies();

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(errors).length > 0 && message.text) {
            setMessage({ 'text': '', 'type': '' });
        }
    }, [errors]);

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    useEffect(() => {
        if (currentUser) {
            const changed = Object.keys(values).some(key => values[key] !== currentUser[key]);
            setIsChanged(changed);
        }
    }, [currentUser, values]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage({ 'text': '', 'type': '' });
        setIsLoading(true);
        try {
            const updateData = await updateProfile(values.name, values.email, localStorage.getItem('token'));
            setCurrentUser(updateData);
            setIsChanged(false);
            setMessage({ 'text': 'Данные успешно обновлены', 'type': 'success' });
            setTimeout(() => {
                setMessage({ 'text': '', 'type': '' });
            }, 5000);
        } catch (err) {
            setMessage({ 'text': err.message, 'type': 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('searchKeyword');
        localStorage.removeItem('isShort');
        localStorage.removeItem('moviesData');
        setCurrentUser(null);
        setMovies([]);
        setSavedMovies([]);
        navigate('/');
    };

    return (
        <SectionComponent type="profile">
            <h1 className="section__header section__header_type_profile">Привет, {currentUser.name}!</h1>
            <FormComponent onSubmit={handleSubmit} formType="edit-profile">
                <div className="form__row form__row_layout_between form__divider">
                    <div className="form__col">
                        <FormLabel>Имя</FormLabel>
                        <FormInput
                            additionalClass="form__input_type_right"
                            placeholder="Введите имя"
                            name="name"
                            rules={{
                                minLength: 2,
                                maxLength: 30,
                                required: true,
                                pattern: '^[a-zA-Zа-яА-ЯёЁ\\s\\-]+$'
                            }}
                            onChange={handleChange}
                            value={values.name || ''}
                        />
                    </div>
                    {errors.name && <p className="form__error">{errors.name}</p>}
                </div>
                <div className="form__row form__row_layout_between">
                    <div className="form__col">
                        <FormLabel>E-mail</FormLabel>
                        <FormInput
                            additionalClass="form__input_type_right"
                            placeholder="Введите e-mail"
                            name="email"
                            rules={{
                                type: 'email',
                                required: true,
                                pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,4}$'
                            }}
                            onChange={handleChange}
                            value={values.email || ''}
                        />
                    </div>
                    {errors.email && <p className="form__error">{errors.email}</p>}
                </div>
                <div className="form__row form__row_type_center">
                    {message.text && <p className={`form__${message.type}`}>{message.text}</p>}
                    <FormButton disabled={!isValid || isLoading || !isChanged} buttonType="submit"
                                type="edit">Редактировать</FormButton>
                </div>
            </FormComponent>
            <FormComponent onSubmit={handleLogout} formType="logout">
                <div className="form__row form__row_type_center">
                    <FormButton buttonType="submit" type="logout">Выйти из
                        аккаунта</FormButton>
                </div>
            </FormComponent>
        </SectionComponent>
    );
}

export default Profile;
