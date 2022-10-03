import React from 'react'
import Login from './Login'
import { testRender } from 'utils/testRender/testRender'

describe('Login Form', () => {
  it('Render Login Page', () => {
    const { getByRole, getByTestId } = testRender(<Login />, {
      preloadedState: {
        auth: {
          isPending: false,
          user: null,
        },
      },
    })
    // Проверка что элемент есть на странице
    getByTestId('form-login')
    // Проверка на то что элемент есть на странице с данной ролью
    getByRole('button', { name: /login/i })
  })
})
