// import AuthPage from '../../pages/AuthPage';
import { Link } from 'react-router-dom';
const Register = () => {
  return (
    <div className='flex flex-col justify-center align-middle'>
      <div className='bg-bright rounded-md p-5 font-cnn w-[100%] flex flex-col gap-9'>
        <div className='flex gap-2 flex-col'>
          <img
            src='../../../public/logo.png'
            alt='logo WGT'
            className='w-14 h-14 self-center'
          />
          <h1 className='text-center font-bold text-2xl font-heading'>
            Sign Up for your WGT account
          </h1>
          <p className='text-center'>
            Already have an account?{' '}
            <Link to={'/login'} className='underline'>
              Sign in
            </Link>
          </p>
        </div>
        <div></div>
        <div>dddd</div>
      </div>
    </div>
  );
};

export default Register;
