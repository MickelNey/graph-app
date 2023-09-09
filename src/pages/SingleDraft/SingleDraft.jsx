import { useState } from "react";
import {useParams} from "react-router-dom";
import { Button, Input } from "../../shared";
import { useClusterGraphById } from "../../entities";
import {Header, ClusterTable, ForceGraph}from "../../widgets";
import styles from './SingleDraft.module.css'

export const SingleDraft = () => {
    const { id } = useParams()

    const {graph, isLoading, mutateAsync}= useClusterGraphById(id)
    const [minLinksValue, setMinLinksValue] = useState(0)
    const [minClusterValue, setMinClusterCount] = useState(0)
    const [minNodeValue, setMinNodeValue] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ans = await mutateAsync({ 
            id: id, 
            minLinksValue: minLinksValue, 
            minClusterValue: minClusterValue,
            minNodeValue: minNodeValue
        })
        // console.log(ans)
    }


    return <div className={styles.container}>
        <Header/>
        <div className={styles.options}>
            <Input 
                title='Минимальное значение связи'
                onChange={(e) => setMinLinksValue(e.target.value)} value={minLinksValue} 
            />
            <Input 
                title='Минимальный значение вершины'
                onChange={(e) => setMinNodeValue(e.target.value)} value={minNodeValue} 
            />
            <Input 
                title='Минимальный размер кластера'
                onChange={(e) => setMinClusterCount(e.target.value)} value={minClusterValue} 
            />
            <Button onClick={(e) => handleSubmit(e)} >Визуализировать</Button>
        </div>
        {isLoading && <div>loading...</div>}
        {!isLoading && graph?.data && 
            <div>
                {graph.data.links.length > 0 
                    ? <ForceGraph 
                        width="1100"
                        height="790" 
                        nodess={graph.data.nodes} 
                        linkss={graph.data.links}
                        years={graph.data.years}
                        clusterLength={graph.data.clusterLength}
                    /> 
                    : <div>
                        измените параметры загрузки
                    </div>
                }
                <ClusterTable data={graph.data.clusterData}/>
            </div>
        }
    </div>
}

