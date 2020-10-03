import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    anything: {},
})

interface Props {
    anything?: unknown
}
const Appeal: React.FC<Props> = props => {
    // const s = useStyles(props);
    return (
        <h1>Appeal</h1>
    )
}

export default Appeal