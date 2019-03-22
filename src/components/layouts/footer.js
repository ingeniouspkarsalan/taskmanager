import React,{Component} from 'react';

class Footer extends Component{

render(){
    return(
        <div>
        <footer class="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Arsalan@Dev
        </footer>
        </div>
    );
}

}

export default Footer;