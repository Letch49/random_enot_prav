import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import {Button, Col, Dropdown, Form} from "react-bootstrap";
import {createAppeal} from "../api/appeals";
import {useAlert} from 'react-alert';
import {useHistory} from 'react-router-dom'
const useStyles = createUseStyles({
    anything: {},
})

interface Props {
    anything?: unknown
}

const CreateAppeal: React.FC<Props> = props => {
    const s = useStyles(props);
    const [reason, setReason] = useState('');
    const [fio, setFio] = useState('');
    const [text, setText] = useState('');
    const alert = useAlert();
    const history = useHistory();

    const handlerCreateAppeal = async (e) => {
        e.preventDefault();
        const {success, id, error} = await  createAppeal(reason, fio, text);
        if (!success) {
            alert.show(error)
        } else {
            alert.show(`Ваша заявка создана, номер заявки ${id}`)
            return history.push(`/appeals/${id}`)
        }
    };

    return (
        <Col lg={12}>
            <Form.Group>
                <Form.Label>Причина обращения</Form.Label>
                <Form.Control as={'select'} defaultValue={'Выберите причину обращения...'} onChange={e => setReason(e.target.value)}>
                    <option style={{display: 'none'}}>Выберите причину обращения...</option>
                    <option value={'Убили животные'}>Убили животные</option>
                    <option value={'Ранили животное'}>Ранили животное</option>
                    <option value={'Замечен факт истязания животного'}>Замечен факт истязания животного</option>
                    <option value={'Животное было украдено'}>Животное было украдено</option>
                    <option value={'Отлов животных в моём городе проходит с нарушениями'}>Отлов животных в моём городе проходит с нарушениями</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>ФИО</Form.Label>
                <Form.Control placeholder={'Введите ваше ФИО'} value={fio} onChange={e => setFio(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Что случилось?</Form.Label>
                <Form.Control as={'textarea'}
                              placeholder={'Расскажите, что случилось. Например: Я шёл на улице, увидел как человек с ружьем стреляет в пса.'}
                              value={text}
                              onChange={e => setText(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label className={'text-muted'}>Загрузите доказательства вашего обращения (при наличии) в виде .zip архива</Form.Label>
                <Form.File
                    className="position-relative"
                    required
                    name="file"
                    // label="File"
                    // onChange={handleChange}
                    // isInvalid={!!errors.file}
                    // feedback={errors.file}
                    id="validationFormik107"
                    feedbackTooltip
                    accept={'.zip'}
                />
            </Form.Group>
            <Form.Group>
                <Button type={'submit'} children={'Отправить обращение'} onClick={handlerCreateAppeal}/>
            </Form.Group>
        </Col>
    )
}

export default CreateAppeal