import React from 'react';
import {Button, Form} from "react-bootstrap";

interface Props {
    isDisabled: boolean,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    handlerSubmitForm: (e) => Promise<void>
}

const AuthForm: React.FC<Props> = props => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Адрес электронной почты</Form.Label>
                <Form.Control placeholder={'Адрес электронной почты'} type={'email'} value={props.email} onChange={e => props.setEmail(e.target.value)} disabled={props.isDisabled}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control placeholder={'Пароль'} type={'password'} onChange={e => props.setPassword(e.target.value)} disabled={props.isDisabled}/>
            </Form.Group>
            <Form.Group>
                <Button variant={'primary'} type={'submit'} children={'Войти'} onClick={props.handlerSubmitForm} disabled={props.isDisabled}/>
            </Form.Group>
        </Form>
    )
}

export default AuthForm