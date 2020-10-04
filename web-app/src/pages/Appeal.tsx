import React, {useEffect, useState} from 'react';
import {appeal, getAppealById} from "../api/appeals";
import {useHistory} from 'react-router-dom'
import {Col, Form} from 'react-bootstrap';

// Страница обращения
const Appeal: React.FC = props => {
    const [appeal, setAppeal] = useState({} as appeal)
    const history = useHistory();

    useEffect(() => {
        const parsedHistoryUri = history.location.pathname.split('/');
        const appealId = parsedHistoryUri[parsedHistoryUri.length - 1];
        // запрос обращения
        getAppealById(appealId).then().then(data => {
            setAppeal(data as appeal)
        })
    }, [])

    return (
        <Col lg={12}>
            <h4>Обращение №{appeal?.id}</h4>
            <Form.Group>
                <Form.Label>Заявитель</Form.Label>
                <Form.Control defaultValue={appeal?.fio} size={'sm'}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Исходный текст заявления
                </Form.Label>
                <Form.Control as={'textarea'} defaultValue={appeal?.text}/>
            </Form.Group>
            {Boolean(appeal.description) && <Form.Group>
                <Form.Label>Ваше заявление</Form.Label>
                <Form.Control as={'textarea'}
                              value={appeal.description}
                              // onChange={e => setDescription(e.target.value)}
                              rows={15}
                />
            </Form.Group>}
        </Col>

    )
}

export default Appeal