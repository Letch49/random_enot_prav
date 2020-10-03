import React from 'react';
import {createUseStyles} from "react-jss";
import {useDropzone} from "react-dropzone";

const useStyles = createUseStyles({
    anything: {},
})

interface Props {
    anything?: unknown
}

const DropZone: React.FC<Props> = props => {
    const s = useStyles(props);
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({noKeyboard: true, maxFiles: 5});
    //@ts-ignore
    const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone border'})}>
                <input {...getInputProps()} />
                {!Boolean(files.length) && <p className={'text-center pt-2'}>Загрузить файлы</p>}
                {
                    Boolean(files.length) && (
                        <>
                            <h6>Загруженные файлы</h6>
                            <ul>{files}</ul>
                        </>
                    )
                }
            </div>
            <aside>

            </aside>
        </section>
    );
}

export default DropZone