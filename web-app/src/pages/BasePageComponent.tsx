import React from 'react';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Header from "../elements/Header/Header";

interface Props {
    isShowHeader?: boolean
}

const defaultProps = {
    isShowHeader: true
}


// Базовая обёртка
const BasePageComponent: React.FC<Props> = props => {
    return (
        <>
            {
                props.isShowHeader &&
                (<Container fluid={true}>
                    <Row>
                        <Header/>
                    </Row>
                </Container>)
            }
            <Container>
                <Row>
                    {props.children}
                </Row>
            </Container>
        </>
    )
};

BasePageComponent.defaultProps = defaultProps

export default BasePageComponent