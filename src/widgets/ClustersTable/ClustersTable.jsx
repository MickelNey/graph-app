import cl from './ClustersTable.module.css'

export const ClusterTable = ({data}) => {
    console.log(data)
    return <>
        {data.map((cluster, index) => <SingleCluster {...cluster}/>)}
    </>
}

const SingleCluster = ({cluster, keywords, count, titles}) => {
    const colorScale = ['pink', 'lightblue', '#B19CD9', 'orange', 'green', '#6366F1', '#8B5CF6'];
    
    return <div className={cl.cluster} >
        <div className={cl.container}>
            <div>
                <div style={{
                        height: '40px',
                        width: '40px',
                        backgroundColor: colorScale[cluster],
                        borderRadius: '50%',
                        margin: '0 20px 0 10px'
                }}/> 
            </div>
            <div className={cl.count}>{count}</div>
            <div className={cl.keys}>
                {keywords.map(keyword => 
                <div className={cl.keys_one}key={keyword[0]}>
                    {keyword[0]}
                </div>
                )}
            </div>
        </div>
        <div className={cl.titles_container}>
            <h3>Топ 5 статей</h3>
            <div className={cl.title_header}>
                <h4>Название статьи</h4>
                <h4>Год</h4>
                <h4>Ссылки</h4>
            </div>
            {titles.map(doc => 
            <div key={doc.title} className={cl.title}>
                <div>{doc.title}</div>
                <div>{doc.year}</div>
                <div>{doc.value}</div>
            </div>)}
        </div>
    </div>
}