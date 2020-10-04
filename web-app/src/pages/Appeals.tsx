import React, {useEffect} from 'react';
import {Table} from "react-bootstrap";
import {appeal, getAppealsList} from "../api/appeals";
import {Link} from "react-router-dom";
import moment from 'moment-timezone';


// траница обращений
const Appeals: React.FC = props => {
    const [appeals, setAppeals] = React.useState([] as appeal[]); // Список обращений
    useEffect(() => {
        // загружаем обращения через Promise при монтировании компонента
        getAppealsList().then().then((data) => {
            // установка обращений
            setAppeals(data)
        });
    }, [])
    return (
        <div className={'w-100'}>
            <Table size={'sm'} bordered={true}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Статус заявки</th>
                    <th>Дата создания</th>
                    <th>Текст заявки</th>
                </tr>
                </thead>
                <tbody>
                {appeals.map(appeal => (
                    <tr key={appeal.id}>
                        <td><Link to={`/appeals/${appeal.id}`}>{appeal.id} </Link></td>
                        <td>{appeal.status}</td>
                        <td>{moment(appeal.created).format('d-MM-YYYY')}</td>
                        <td>{appeal.text.slice(0, 65)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Appeals