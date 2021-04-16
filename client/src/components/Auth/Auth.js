//rafce
import React,{ useState } from 'react'
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory} from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Icon from './icon'
import Input from './input'
import useStyles from './styles'

const initialState ={ firstName: '', lastName: '', email: '', password: '', comfirmPassword: ''}
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setshowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false)
    const [formData, setformData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setformData({ ...formData, [e.target.name]: e.target.value})
    };
    const handleShowPassword = () => setshowPassword((prevshowPassword) => !prevshowPassword);
    const switchMode = () =>  {
        setisSignup((previsSignup) => !previsSignup)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId
        try {
            // send the data
            dispatch({ type: 'AUTH', data: {result, token} })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log('Google Sign In was unsuccessful. Try Again Later')
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{ isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange}  half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        {/* {isSignup ? (): ()} same as {isSignup && ()} */}
                        { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                        {/* mostyle start with <Capittal> </Capittal> are a component */}
                    <GoogleLogin
                        clientId ='190956629784-7kr3svkhdf1sele85v1l5jc9chconkeo.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} 
                            color='primary' fullWidth onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}  
                            variant='contained'>  
                            Google Sign In                              
                            </Button>
                        )}
                        onSuccess = {googleSuccess}
                        onFailure = {googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
