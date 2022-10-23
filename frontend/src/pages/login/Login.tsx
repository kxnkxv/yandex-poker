import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form'
import { loginValidation, passwordValidation } from 'utils/validation/validation'
import { login } from 'pages/login/LoginSlice'
import { Link } from 'react-router-dom'
import { AppDispatch } from 'core/store'
import useDocumentTitle from 'hooks/useDocumentTitle'

// Components
import Input from 'components/ui/input/Input'
import Button from 'components/ui/button/Button'

// Types
import { TSignInForm } from './types'

//Images
import YandexLogo from 'images/yandexLogo.svg'

const clientID = process.env.YANDEX_CLIENT_ID

const Login: FC = () => {
  useDocumentTitle('Login')

  const dispatch = useDispatch<AppDispatch>()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  })

  //OAuth

  let hash = window.location.hash.substr(1)

  if (hash) {
    let hashData = hash.split('&').reduce(function (res: any, item) {
      let parts = item.split('=')
      res[parts[0]] = parts[1]
      return res
    }, {})

    fetch('https://login.yandex.ru/info', {
      method: 'get',
      headers: new Headers({
        Authorization: 'OAuth ' + hashData.access_token,
      }),
    })
      .then((response) => {
        console.log(response.json())
      })
      .catch(() => {
        console.log('Ошибка авторизации. Необходим SSL сертификат')
      })
  }

  const { errors, isSubmitting } = useFormState({
    control,
  })

  const onSubmit: SubmitHandler<TSignInForm> = (data) => {
    dispatch(login(data))
  }

  return (
    <div className='main-wrapper items-center gradient-bottom'>
      <div className='container mx-auto max-w-md'>
        <h1 className='mb-5 text-center'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} data-testid='form-login'>
          {/* Login */}
          <div className='grid gap-6 mb-5'>
            <div>
              <Controller
                control={control}
                name='login'
                rules={loginValidation}
                render={({ field }) => (
                  <Input {...field} className='form-control' label='Login' error={errors.login} />
                )}
              />
            </div>
            {/* Password */}
            <div className='mb-5'>
              <Controller
                control={control}
                name='password'
                rules={passwordValidation}
                render={({ field }) => (
                  <Input
                    {...field}
                    className='form-control'
                    label='Password'
                    error={errors.password}
                    type='password'
                  />
                )}
              />
            </div>
          </div>
          <div className='mb-5'>
            <Button pending={isSubmitting}>Login</Button>
          </div>
          <div className='text-center'>
            Login with
            <a href={`https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientID}`}>
              <img src={YandexLogo} className='m-auto mb-5' />
            </a>
          </div>
          <div className='text-center mb-5'>
            <Link to='/register' className='text-white underline'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
