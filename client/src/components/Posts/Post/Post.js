//rfce
import React from 'react'
import useStyles from './styles'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import moment from 'moment'

const Post = ({post, setcurrentId}) => {
    //console.log(setCurrentId)
    const classes = useStyles(); 
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.creator}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{color:'white'}} size='small' onClick={() => setcurrentId(post._id)}>
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </div>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <CardContent>
                    <Typography variant='h5' className={classes.title} gutterBottom>{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary' onClick={() => {}}>
                        <ThumbUpAltIcon fontSize='small' />
                        Like
                        {post.likeCount}
                    </Button>
                    <Button size='small' color='primary' onClick={() => {}}>
                        <DleteIcon fontSize='small' />
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Post
