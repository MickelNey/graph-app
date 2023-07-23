import { useMutation, useQuery } from "react-query"
import { DraftService } from "./DraftService"

export const useDraft = () => {
    const { mutateAsync, isLoading } = useMutation(
        (data) => DraftService.uploadFiles(data),
        {
            onError: (error) => {
                console.log(error.message)
                alert('ошибка загрузки')
            },
        }
    )
    return { uploadFilesAsync: mutateAsync, isLoading}
}

export const useDraftsByUser = () => {
    const { data, isLoading } = useQuery(
        'drafts',
        () => {
            return DraftService.getByUser()
        },
        {
            onSuccess: (res) => {
                console.log(res)
                return res.data
            },
            onError: (error) => {
                console.log(error.message)
            }
        }
    )

    return { drafts: data, isLoading}
}

export const useClusterGraphById = (id) => {
    const {data, isLoading, mutateAsync} = useMutation(
        ['drafts', id],
        (data) => DraftService.getClusterGraph(data),
        {
            onSuccess: (res) => {
                return res.data
            },
            onError: (error) => {
                console.log(error.message)
            }
        }
    )

    return {graph: data, isLoading, mutateAsync}
}