import React, {useEffect} from 'react';
import {createUseStyles} from "react-jss";
import {Table} from "react-bootstrap";
import {getAppealsList} from "../api/appeals";
import {Link} from "react-router-dom";

const useStyles = createUseStyles({
    anything: {},
})

interface Props {
    anything?: unknown
}

const Appeals: React.FC<Props> = props => {
    // const s = useStyles(props);
    const [appeals, setAppeals] = React.useState([] as {created: Date, file: string, fio: string, id: number | string, reason: string, status: string, text: string}[]);
    useEffect(() => {
        getAppealsList().then().then((data) => {
            setAppeals(data)
        });
    }, [])
    return (
        <div>
            <Table size={'sm'} bordered={true}>
                <thead>
                <tr>
                    <th>#</th>
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
                        <td>{appeal.created}</td>
                        <td>{appeal.text}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Appeals