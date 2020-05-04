import React, { Component } from 'react';
import PropTypes from "prop-types"

class Comp extends Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.content !== this.props.content){
            return true;
        }
        return false;
    }


    // 组件第一次存在于DOM中，函数是不会被执行得
    // 如果已经存在于DOM中，函数才会被执行
    // 在update前执行
    UNSAFE_componentWillReceiveProps(){
        console.log("child 属性接受 UNSAFE_componentWillReceiveProps");
    }

    render(){
        return(
        <li 
            onClick={this.handleClick}   
        >
           {this.props.bookname} -- {this.props.content}
        </li>
        );
    }

    // 组件被删除前
    componentWillUnmount(){
        console.log("child 组件被删除前 componentWillUnmount");
    }


    handleClick(){
        console.log("子组件Click" + this.props.index);
        this.props.deleteItem(this.props.index);
    }
}

// // 传值校验
Comp.propTypes={
    content : PropTypes.string,
    bookname : PropTypes.string.isRequired,
    index : PropTypes.number,
    deleteItem : PropTypes.func
}
Comp.defaultProps={
    bookname : "技术书"
}

export default Comp;