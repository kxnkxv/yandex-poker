import { RootState } from 'Core/store'

export const userSelector = (state: RootState) => state.auth.user
