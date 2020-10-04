import React, {useReducer, useState} from 'react';
import {createUseStyles} from "react-jss";
import {Row, Col} from "react-bootstrap";
import AuthForm from "../components/Auth/components/AuthForm";
import {getToken, register} from "../api/users";
import {useAlert} from 'react-alert'
import {useHistory} from 'react-router-dom'

// стили страницы
const useStyles = createUseStyles({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toggle_authType: {
        cursor: "pointer"
    }
})

// тип дейсвтия
const initAuthType = 'login'

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return 'login'
        case 'register':
            return 'register'
        default:
            throw new Error('undefined auth action')
    }
};

const FORM_SUBMIT = true;
const FORM_DONE_SUBMIT = false;

const Auth: React.FC = props => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, dispatch] = useReducer(reducer, initAuthType as 'login' | 'register');

    const alert = useAlert();
    const history = useHistory();

    const handlerLogin = async (e) => {
        e.preventDefault()
        setIsDisabled(true);

        const {success, error} = await getToken(email, password)
        if (!success) {
            alert.show(error)
        }
        if (success) {
            return history.push('/')
        }
        setIsDisabled(FORM_DONE_SUBMIT);
    }

    const handlerRegister = async (e) => {
        e.preventDefault()
        setIsDisabled(FORM_SUBMIT);
        const {success, error} = await register(email, password);
        if (!success) {
            alert.show(error)
        }
        if (success) {
            dispatch({type: 'login'})
            alert.show('Вы успешно зарегистрированы, теперь можно авторизоваться')
        }
        setIsDisabled(FORM_DONE_SUBMIT);
    }

    const s = useStyles(props);

    return (
        <div className={s.root}>
            <Row>
                <Col lg={12} className={'mb-4'}>
                    <Row>
                        <Col lg={6}>
                            <div className={`${s.toggle_authType} ${state === 'login' ? '' : 'text-muted'}`} onClick={e => dispatch({type: 'login'})}>Войти</div>
                        </Col>

                        <Col lg={6} className={'text-right'}>
                            <div className={`${s.toggle_authType} ${state === 'register' ? '' : 'text-muted'}`} onClick={e => dispatch({type: 'register'})}>Регистрация</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <AuthForm isDisabled={isDisabled} email={email} setEmail={setEmail} password={password}
                              setPassword={setPassword}
                              handlerSubmitForm={state === 'login' ? handlerLogin : handlerRegister}/>
                </Col>
            </Row>
        </div>
    )
}

export default Auth