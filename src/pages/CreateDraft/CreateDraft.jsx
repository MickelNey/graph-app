import styles from './CreateDraft.module.css'
import {useDropzone} from 'react-dropzone'
import { useDraft } from '../../entities/Draft/useDraft'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {Button, Input} from '../../shared'
import { Header } from '../../widgets'


export const FileItem = ({ data, removeFile }) => {
    return <div className={styles.fileItem}>
        <div>{data.name.length > 10 ? data.name.substring(0, 10) + '..' : data.name}</div>
        <div onClick={() => removeFile(data.id)} className={styles.deleteIcon}>✖</div>
    </div>
}

export const FilesUpload = ({ files, setFiles }) => {
    const onDrop =  async acceptedFiles => {
        setFiles(prev => prev.concat([...acceptedFiles].map(file => ({ 
            id: new Date().toLocaleString() + file.size,
            name: file.name,
            file: file})
            )
        ))
        console.log(files)
    }

    const removeFile = (id) => {
        const copy = [...files].filter(item => {
            return item.id !== id
        })
        setFiles(copy)
    } 

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div>
            <div className={styles.uploadBlock} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive
                        ? <div className={styles.text}>Перетащите файлы сюда</div> 
                        : <div className={styles.text}>Перетащите файлы сюда или нажмите, чтобы загрузить</div>
                }
            </div> 
            {files.length > 0 && <div className={styles.list}>
                {files.map((file, index)=> 
                    <FileItem 
                        key={index}
                        data={file}
                        removeFile={removeFile}
                    />)}
            </div>}
    </div>
    )
}

export const FilesOptions = ({ children}) => {
    return <div className={styles.optionsBlock}>
                <h4>Обработка данных из файлов</h4>
                <div className={styles.divider}></div>
                <div className={styles.inputs}>
                    <h4>Основные поля документа</h4>
                    <div className={styles.input}>
                        <span>authors</span>
                        <Input placeholder='Authors' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>title</span>
                        <Input placeholder='Title' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>year</span>
                        <Input placeholder='Year' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>doi</span>
                        <Input placeholder='DOI' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>keywords</span>
                        <Input placeholder='Author(s) Keywords' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>references</span>
                        <Input placeholder='References' isTitle={false} />
                    </div>
                </div>
                {children}
            </div>  
}


export const CreateDraft = () => {
    const {uploadFilesAsync, isLoading}= useDraft()
    const [files, setFiles] = useState([])
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i].file)
        }
        formData.append('name', 'информационная безопасность 2014-2018')
        const res = await uploadFilesAsync(formData)
        if (res.data && res.status === 200) {
            navigate(`/draft/${res.data.id}`)
        }
    }

    return <div className={styles.container}>
        <Header title='Информационная безопасность 2014-2018'/>  

        {!isLoading ? <main className={styles.main}>

            <FilesUpload files={files} setFiles={setFiles}/>

            <div className={styles.optionsBlock}>
                <h4>Обработка данных из файлов</h4>
                <div className={styles.divider}></div>
                <div className={styles.inputs}>
                    <h4>Основные поля документа</h4>
                    <div className={styles.input}>
                        <span>authors</span>
                        <Input placeholder='Authors' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>title</span>
                        <Input placeholder='Title' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>year</span>
                        <Input placeholder='Year' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>doi</span>
                        <Input placeholder='DOI' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>keywords</span>
                        <Input placeholder='Author(s) Keywords' isTitle={false} />
                    </div>
                    <div className={styles.input}>
                        <span>references</span>
                        <Input placeholder='References' isTitle={false} />
                    </div>
                </div>
                <Button onClick={e => handleClick(e)}>загрузить</Button>
            </div>  
   
        </main> : <div>loading...</div>}

    </div>
}

