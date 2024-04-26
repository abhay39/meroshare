'use client'
import store from '@/store'

import { Provider } from 'react-redux'

const MainPage = ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default MainPage