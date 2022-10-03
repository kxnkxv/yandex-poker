import { RootState } from 'core/store'

export const userSelector = (state: RootState) => state.auth.user
