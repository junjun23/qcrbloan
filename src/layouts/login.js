import React, { Component } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core';
import {
  Avatar, Button, Checkbox, Paper, CssBaseline, TextField, FormControlLabel,
  Link, Box, Grid, Typography
} from '@material-ui/core/';
import logo from '../assets/img/qcrb-front.png';
import { connect } from 'react-redux';
import { userSignIn, userProfile } from '../controller/actions/user_actions';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url( ${logo} )`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Quezon Capital Rural Bank, Inc.yfhf
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  };

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state;

    const signInData = {
      email,
      password
    };

    //// SUBMIT CONTACT ////
    this.props.userSignIn(signInData).then(() => {

      const { usertoken } = this.props;

      const headers = {
        headers: {
          'Authorization': usertoken
        }
      };

      this.props.userProfile(headers).then(() => {
        const sad = sessionStorage.getItem('userProfile')
        console.log(sad)
        window.location.reload();
      });
    });

    // Clear form state
    this.setState({
      email: '',
      password: ''
    });

  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.onChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  userSignIn: PropTypes.func.isRequired,
  userProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  usertoken: state.user_state.usertoken
});

// export default withStyles(styles)(SignIn);  no redux connection
export default withStyles(styles)(connect(mapStateToProps, { userSignIn, userProfile })(SignIn));
