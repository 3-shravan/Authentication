import React from 'react'
import { useApi } from './useApi'
import { removeTokenAndAuthenticated } from '../utils/LocalStorage'

export const useLogout = () => {

   const { execute } = useApi('/logout', "GET", "/login")

   const logout = React.useCallback(async () => {
      const response = await execute();
      if (response.status === 200) removeTokenAndAuthenticated()
   })
   return logout
}

export default useLogout
