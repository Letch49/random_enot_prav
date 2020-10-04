import React from 'react';
import {createUseStyles} from "react-jss";
import {Col, Row} from "react-bootstrap";
import logo from '../../assets/logo.svg'
import {Link} from "react-router-dom";
import {PRIMARY_BACKGROUND_COLOR} from "../../assets/ui/colors";
import CitySelect from "../../components/CitySelect/CitySelect";


// Стили элементов компонента
const useStyles = createUseStyles({
    root: {
        width: '100%',
        background: PRIMARY_BACKGROUND_COLOR
    },
    fix_bg_design: {
        position: "relative",
        top: '5px',
        filter: 'invert(1)'
    }
})

// шапка
const Header: React.FC = props => {
    const s = useStyles(props);
    return (
        <Row className={`mb-3 shadow ${s.root}`}>
            <div className={'container p-0'}>
                <Row className={'mx-0 align-items-center'}>
                    <Col lg={2}>
                        <img src={logo} height={90} alt="" className={s.fix_bg_design}/>
                    </Col>
                    <Col lg={5}>
                        <Link to={'/'} className={'text-white mr-2'}>Справочная информация</Link>
                        <Link to={'/appeals'} className={'text-white mr-2'}>Заявки</Link>
                        <Link to={'/appeals/create'} className={'text-white mr-2'}>Создать заявку</Link>
                    </Col>
                    <Col lg={4}>
                        <CitySelect />
                    </Col>
                </Row>
            </div>
        </Row>
    )
}

export default Header