import {instance} from '../../shared/api'

export class DraftService {
    static async uploadFiles(data) {
        return instance.post('clusterboards/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    static async getByUser() {
        return instance.get('clusterboards/')
    }  

    static async getClusterGraph(data) {
        return instance.post(`clusterboards/cluster?id=${data.id}`, { 
            minClusterValue: data.minClusterValue, 
            minLinksValue: data.minLinksValue,
            minNodeValue: data.minNodeValue
        }, 
        {
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

