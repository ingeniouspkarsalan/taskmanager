import React,{Component} from 'react';

class Footer extends Component{

render(){
    return(
        <div className="fixed-bottom">
        <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Arsalan@Dev
        </footer>
        </div>
    );
}

}

export default Footer;