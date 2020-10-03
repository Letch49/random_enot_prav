import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    anything: {},
})

interface Props {
    anything?: unknown
}
const Register: React.FC<Props> = props => {
    const s = useStyles(props);
    return (<div>1</div>)
}

export default Register