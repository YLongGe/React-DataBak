import React, { Component } from 'react';
// 上面这一句和下面两句是等效的
// import React from 'react';
// const Component = React.Component;
import './style.css';
import CompItem1 from "./CompItem1";
import axios from 'axios';

class Comp extends Component{
    
    // 构造函数。生命周期中的initialization阶段
    constructor(props){
        super(props);
        this.state={
            inputValue : 'C++',
            list : ["Java", "C++"]
        };
    }

    // 虚拟DOM渲染前执行。生命周期mount阶段
    UNSAFE_componentWillMount(){
        console.log("组件虚拟DOM渲染前执行 UNSAFE_componentWillMount");
    }
    // componentWillMount(){
    //     console.log("组件虚拟DOM渲染前执行");
    // }


    // 组件更新前执行
    shouldComponentUpdate(){
        console.log("组件更新前执行1 shouldComponentUpdate");
        return true;
    }

    UNSAFE_componentWillUpdate(){
        console.log("组件更新前执行2 UNSAFE_componentWillUpdate");
    }

    // props/state改变时进行自动渲染。生命周期mount阶段
    render(){
        console.log("组件虚拟DOM渲染 render");
        return(
            <div>
                <div>
                    <input
                         className="input" 
                         value={this.state.inputValue} 
                         onChange={this.inputChange.bind(this)}
                         ref = {(input) => {this.input = input}}
                    >
                          
                    </input>
                    <button onClick={this.addList.bind(this)}>增行</button>
                </div>
                <ul className="my-list"
                    ref = {(ul) => {this.ul = ul}}
                >
                   {
                       this.state.list.map((item, index) =>{
                       return(
                            // <li onClick={this.deleteItem.bind(this, index)} 
                            //     key={index + item}
                            //     // 解析HTML标签
                            //     dangerouslySetInnerHTML={{__html : item}}
                            // >
                            //     {/* {item} */}
                            // </li>
                         
                            // 子组件，单向数据流
                            // 父组件向子组件传值时，只能传递，不能修改，可以向子组件传递方法过去间接改变
                            <CompItem1
                                // bookname = {"书"}
                                content={item}
                                index = {index}
                                key={item+index}
                                deleteItem={this.deleteItem.bind(this)}
                            />
                       )
                       })
                   }
                </ul>
            </div>
        )
    }


    componentDidUpdate(){
        console.log("组件更新完后执行 componentDidUpdate");
    }


    // 组件虚拟DOM渲染后执行。生命周期mount阶段
    componentDidMount(){
        console.log("组件虚拟DOM渲染后执行 componentDidMount");
        axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda12222')
        .then((res) => {
            console.log('axios 获取数据成功' + JSON.stringify(res));
            // res.data.data;
        })
        .catch((error)=>{console.log('获取数据失败' + error)})    
    }




    // 值改变
    inputChange(e){
        console.log(e.target.value);
        // 改变state里面的值
        this.setState({
            // inputValue : e.target.value
            // 使用ref进行绑定后，可以这样赋值
            inputValue : this.input.value
        });
    }

    // 增加列表
    // 异步执行，第二个参数是回调函数，执行完成后，会执行该函数，这里在回调函数中打印一句话
    addList(){
        this.setState({
            list : [...this.state.list, this.state.inputValue]
        }, () => {
            console.log(this.ul.querySelectorAll("li").length);
        })
    }

    // 删除列表
    deleteItem(index){
        console.log(index);
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list : list
        });

        // 错误写法，有坑，有性能问题，不能直接操作
        // this.state.list.splice(index, 1);
        // this.setState({
        //     list : this.state.list
        // })
    }
}

export default Comp;