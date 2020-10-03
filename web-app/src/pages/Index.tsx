import React from 'react';
import {createUseStyles} from "react-jss";

interface Props {
    anything?: unknown
}
const Index: React.FC<Props> = props => {
    return (
        <h1>Главная страница</h1>
    )
}

export default Index