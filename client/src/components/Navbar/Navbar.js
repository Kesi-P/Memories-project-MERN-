//rafce
import React, { useState, useEffect} from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import momories from '../../images/persian.jpg'
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        history.push('/')
        setuser(null)
    }

    useEffect(() => {
        const token = user?.token;
        setuser(JSON.parse(localStorage.getItem('profile')))
       //when location changed,set user
    }, [location])
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>
                {/* <img className={classes.image} src={momories} alt='momories' height='60' /> */}
            </div> 
            <Toolbar className={classes.toolbar}> 
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Log out</Button>
                    </div>
                ):(
                    <Button variant='contained' component={Link} to='/auth' color='primary'>Log in</Button>
                )}
            </Toolbar>               
        </AppBar>
    )
}

export default Navbar