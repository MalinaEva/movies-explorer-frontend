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
import { useToast } from '../../contexts/ToastContext';
import { useMovies } from '../../contexts/MoviesContext';

function Profile () {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const { addToast } = useToast();
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const { setMovies, setSavedMovies } = useMovies();

    const navigate = useNavigate();

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
        setErrorMessage('');
        setIsLoading(true);
        try {
            const updateData = await updateProfile(values.name, values.email, localStorage.getItem('token'));
            setCurrentUser(updateData);
            setIsChanged(false);
            addToast('Данные успешно обновлены', 'success');
        } catch (err) {
            setErrorMessage(`${err.message || err}`);
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
            <h1 className="section__header section__header_type_profile">Привет, {values.name}!</h1>
            <FormComponent onSubmit={handleSubmit} formType="edit-profile">
                <div className="form__row form__row_layout_between form__divider">
                    <div className="form__col">
                    <FormLabel>Имя</FormLabel>
                    <FormInput additionalClass="form__input_type_right" placeholder="Введите имя"
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
                        <FormInput additionalClass="form__input_type_right" placeholder="Введите e-mail"
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
                    <FormButton disabled={!isValid || isLoading || !isChanged} buttonType="submit"
                                type="edit">Редактировать</FormButton>
                    {errorMessage && <p className="form__error">{errorMessage}</p>}
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
