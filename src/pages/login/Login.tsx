import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../features/ui/button/Button';
import Input from '../../features/ui/input/Input';
import '../../styles/Style.css';

type FormValues = {
  username: string;
  password: string;
  clicked: () => {}
};

export interface ILoginPageProps {

}

function onSubmitHandler() {
    alert("Submitted")
  }


const Login: React.FunctionComponent<ILoginPageProps> = (props) => {

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    return (
      <div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className='form-title'>Login</h1>
          <Input {...register("username", { required: true, maxLength: 20 })} placeholder="User name" />
          <Input {...register("password", { required: true, minLength: 8 })} type="password"
          placeholder="Password" />
          <Button clicked={onSubmitHandler} >LOGIN</Button>
          <Link to='/register' className='form-link'>SIGN UP</Link>
        </form>
        <div className="gradient-div"></div>
      </div>
    )
}

export default Login;
