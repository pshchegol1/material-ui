import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {format} from 'date-fns';
import Avatar from '@material-ui/core/Avatar'

const drawerWidth = 240;

const useStyles = makeStyles( (theme) => {
    return{
            page: {
        backgroundColor: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3)
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    active: {
        background: '#f4f4f4'
    },
    title: {
        padding: theme.spacing(2)
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: theme.spacing(2)
    }

    }

})

export default function Layout({children})
{
    const classes = useStyles();
    // will redirect you to the clicked link (page)
    const history = useHistory();
    // will hover active link, the clicked one
    const location = useLocation();
    
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary"/>,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlined color="secondary"/>,
            path: '/create'
        }
    ]
    return(
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}>
                      Today is the: {format(new Date(), 'do MMMM Y') }
                    </Typography>

                    <Typography>
                        Pavs
                    </Typography>

                    <Avatar className={classes.avatar} variant="square" src="/post.png" />

                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant="permanent" anchor="left" 
            classes={{paper: classes.drawerPaper}}>
                <div>
                    <Typography variant="h5" className={classes.title}>
                        My Notes
                    </Typography>
                </div>

                <List>
                    {menuItems.map(item => (
                        <ListItem button key={item.text} onClick={() => history.push(item.path)}
                        className={location.pathname == item.path ? classes.active : null}>

                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
      

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
         
        </div>
    )
}
