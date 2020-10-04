import React, {useEffect, useState} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {createAppeal, saveAppealFile} from "../api/appeals";
import {useAlert} from 'react-alert';
import {useHistory} from 'react-router-dom'

const CreateAppeal: React.FC = props => {
    const [reason, setReason] = useState('');
    const [fio, setFio] = useState('');
    const [text, setText] = useState('');
    const [file, setFile] = useState();
    const [description, setDescription] = useState('');
    const alert = useAlert();
    const history = useHistory();
    const ref = React.useRef()
    const handlerCreateAppeal = async (e) => {
        console.log(ref)
        e?.preventDefault();
        const {success, id, error, data} = await createAppeal(reason, fio, text, description);
        if (!success) {
            alert.show(error)
        } else {
            // alert.show(`Ваша заявка создана, номер заявки ${id}`)
            // //@ts-ignore
            // const formData = new FormData();
            //
            // if (file) {
            //     //@ts-ignore
            //     formData.append('file', ref.current.files[0], ref.current.files[0].name)
            // }
            // saveAppealFile(id, formData)
            // return history.push(`/appeals/${id}`)
            setDescription(data.description)
        }
    };

    const handleChangeFile = (e) => {
        // const formData = new FormData();
        // setFile(e.target.files[0]);
    }

    useEffect(() => {
        // setFio('Туртыгин Олег Вячеславович')
        // setText('Я вчера проснулся с хорошим настроением, но! Я увидел как моя бабушка мучает кошку, а потом зарезала корову.')
        // setInterval(() => handlerCreateAppeal({}))
    })

    return (
        <Col lg={12}>
            <Form.Group>
                <Form.Label>Причина обращения</Form.Label>
                <Form.Control as={'select'} defaultValue={'Выберите причину обращения...'}
                              onChange={e => setReason(e.target.value)}>
                    <option style={{display: 'none'}}>Выберите причину обращения...</option>
                    <option value={'Убили животные'}>Убили животные</option>
                    <option value={'Ранили животное'}>Ранили животное</option>
                    <option value={'Замечен факт истязания животного'}>Замечен факт истязания животного</option>
                    <option value={'Животное было украдено'}>Животное было украдено</option>
                    <option value={'Отлов животных в моём городе проходит с нарушениями'}>Отлов животных в моём городе
                        проходит с нарушениями
                    </option>
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

            {Boolean(description) && <Form.Group>
                <Form.Label>Ваше заявление</Form.Label>
                <Form.Control as={'textarea'}
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              rows={15}
                />
            </Form.Group>}

            <Form.Group>
                <Form.Label className={'text-muted'}>Загрузите доказательства вашего обращения (при наличии) в виде .zip
                    архива</Form.Label>
                <Form.File
                    className="position-relative"
                    required
                    name="file"
                    onChange={handleChangeFile}
                    id="validationFormik107"
                    feedbackTooltip
                    accept={'.jpg'}
                    ref={ref}
                />
            </Form.Group>
            <Form.Group>
                <Button type={'submit'} children={'Отправить обращение'} onClick={handlerCreateAppeal}/>
            </Form.Group>
        </Col>
    )
}

export default CreateAppeal