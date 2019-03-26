import React,{ Component } from "react";
import { alltasks,deletetask,updatetask } from "../../actions/taskAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';






// const styles = {
//     greenAvatar: {
//       margin: 10,
//       color: '#fff',
//       backgroundColor: green[500],
//       height:300,
//       width:300
//     },
//     icon: {
//         fontSize: 200,
//       },
//   };

  const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
        height:300,
        width:300
      },
      icon: {
          fontSize: 200,
        },
        fab: {
            margin: theme.spacing.unit,
          },
          extendedIcon: {
            marginRight: theme.spacing.unit,
          },
          button: {
            margin: theme.spacing.unit,
          },
  });



class Dashboard extends Component{

    constructor(){
        super();
        this.state={
            taskpack:[],
            errors:''
        }
        this.updatetask.bind(this);
        this.deletetask.bind(this);
    }

    



    componentDidMount(){
        this.props.alltasks();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.task.having){
            // nextProps.task.tasks.map(res=>{
            //     console.log(`abcd`,res._id +" " + res.description);
            //     this.setState({
            //         taskid:res.description
            //     })
            // })
            this.setState({
                taskpack:nextProps.task.tasks
            })
        }
    }

    updatetask(id){
        this.props.updatetask(id,this.props.history);
    }

    deletetask(id){
        this.props.deletetask(id,this.props.history);
    }


    
    render(){

        const {having} = this.props.task;
        const { classes } = this.props;
        const no = (
            <div className="container">
        <Grid container justify="center" alignItems="center">
        <Avatar className={classes.greenAvatar}>
        <AssignmentIcon className={classes.icon} />
      </Avatar>
    </Grid>
    <p className="text-center alert-secondary inherit">No Task Available.</p>
            </div>
        );

        const yesrender = this.state.taskpack.map(res => (
            
            <TableRow className={classes.row} key={res._id}>
            <CustomTableCell component="th" scope="row">
              {res.description}
            </CustomTableCell>
            <CustomTableCell align="right">{res.completed?'true':'false'}</CustomTableCell>
            <CustomTableCell align="right">
            {res.completed?
            <Button variant="outlined" color="primary" className={classes.button}>
            true
          </Button>
        :
        <Button variant="outlined" color="secondary" type="submit" onClick={this.updatetask.bind(this,res._id)} className={classes.button}>
        false
      </Button>
            }
            </CustomTableCell>
            <CustomTableCell align="right">
            <Fab  aria-label="Delete" type="submit" className={classes.fab} onClick={this.deletetask.bind(this,res._id)}>
        <DeleteIcon />
      </Fab>
            </CustomTableCell>
          </TableRow>
          
        ));


        const yes =  (
            <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Description</CustomTableCell>
            <CustomTableCell align="right">Completed</CustomTableCell>
            <CustomTableCell align="right">Update (true)</CustomTableCell>
            <CustomTableCell align="right" >Delete</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
           {yesrender}
         
        </TableBody>
      </Table>
    </Paper>
        )

        
        



            
        

        return(
            <div className="container landing-inner vh-100">
                {having?yes:no}
            </div>

        );
    }
}


Dashboard.propTypes = {
    alltasks:PropTypes.func.isRequired,
    deletetask:PropTypes.func.isRequired,
    updatetask:PropTypes.func.isRequired,
    auth  : PropTypes.object.isRequired,
    task  : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    task:state.task,
    errors:state.errors
});

export default connect(mapStateToProps,{alltasks,updatetask,deletetask})(withStyles(styles)(Dashboard));