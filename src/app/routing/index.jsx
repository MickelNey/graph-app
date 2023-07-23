import React from "react"
import {AuthRoutes} from "./AuthRoutes"
import {useIsAuth} from "../../entities"
import { Start } from "../../pages"
// import {LoadingSpinner} from "../../shared/ui/LoadingSpinner/LoadingSpinner"

export const Routing = () => {
  const { isAuth, isLoading } = useIsAuth()

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      {isAuth ? <AuthRoutes /> : <Start />}
    </>
  )
}