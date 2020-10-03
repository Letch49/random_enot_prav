import React from 'react';
import {createUseStyles} from "react-jss";
import {Dropdown, Form} from "react-bootstrap";

const useStyles = createUseStyles({
    root: {
        fontSize: '15px',
        outline: "none"
    }
});

interface Props {
    anything?: unknown
}

const CitySelect: React.FC<Props> = props => {
    const s = useStyles(props);
    return (
        <Dropdown className={`${s.root} p-1`}>
            <Dropdown.Toggle variant={'outline-light'}>
                Выберите город
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Form.Group>
                    <Form.Control placeholder={'Введите название города'} size={'sm'} className={'mx-1'}
                                  style={{width: '96%'}}/>
                </Form.Group>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CitySelect