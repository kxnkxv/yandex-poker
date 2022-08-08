import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../../features/ui/button/Button'
import Input from '../../features/ui/input/Input'
import '../../styles/style.css'

type RegValues = {
  username: string
  email: string
  password: string
  clicked: () => { void: any }
}

export interface IRegistrationPageProps {}

const Registration: React.FunctionComponent<IRegistrationPageProps> = (props) => {
  const { register, handleSubmit } = useForm<RegValues>()
  const onSubmit: SubmitHandler<RegValues> = (data) => console.log(data)
  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-center items-center flex-col'>
          <h1>Registration</h1>
          <Input
            {...register('username', { required: true, maxLength: 20 })}
            placeholder='User name'
          />
          <Input
            {...register('email', {
              required: 'required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            placeholder='Email'
            type='email'
          />
          <Input
            {...register('password', { required: true, minLength: 8 })}
            type='password'
            placeholder='Password'
          />
          <Button clicked={undefined}>REGISTER</Button>
          <Link to='/' className='form-link'>
            I HAVE AN ACCOUNT
          </Link>
        </div>
      </form>
      <div className='gradient-div'></div>
    </div>
  )
}

export default Registration
