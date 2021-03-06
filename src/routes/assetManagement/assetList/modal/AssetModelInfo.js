import React, { Component } from 'react';
import {Layout} from 'antd';
import SideLayout from 'components/SideLayout';
import styles from './AssetModelInfo.less';
// import 'bootstrap/dist/css/bootstrap.css';
const { Content} = Layout;

class AssetModelInfo extends Component{

    state = {
        src:'http://192.168.200.29:9998/index_layout.html'
    }

    constructor(props){
        super(props);
        console.log('record:',props.record);
    }

    render(){
        const {src} = this.state;
        return (
        <Layout style={{'borderBottom': '1px solid #EDF1F2'}}>
            <header className="panel_header" style={{background: '#fff',float:'left'}}>
                <h2 className="title pull-left">
                    智能照明设备
                    <small>({"NV-TB9716"})</small>
                </h2>
            </header>
            <Layout className={styles.modelInfo}  style={{background: '#fff',float:'left',padding:'10px'}}>
                <SideLayout
                    title="组织机构"
                    width={480}
                    handleSearch={this.handleSearch}
                    sideContent={
                        <iframe id='webgl_iframe' src={src} width='100%' height='400' style={{'borderWidth':'0px',border:'1px solid #E9E9E9'}}></iframe>
                    }
                >
                </SideLayout>
                <Content width={380} style={{margin:'10px', padding: '20px'}}>
                    <div className="">
                        <div className="col-md-12">
                            <h4>基本信息</h4>
                        </div>
                        <div className="line line-lg b-b b-light"></div>
                        <div className="col-md-6">
                            <p>编号：NV-TB9716</p>
                        </div>
                        <div className="col-md-6">
                            <p>名称：智能照明设备</p>
                        </div>
                        <div className="col-md-6">
                            <p>类型：照明系统</p>
                        </div>
                        <div className="col-md-6">
                            <p>使用日期：2018-10-12</p>
                        </div>
                        <div className="col-md-6">
                            <p>使用年限：1年</p>
                        </div>
                        <div className="col-md-6">
                            <p>安装地点：上海市青浦区诸光路</p>
                        </div>
                        <div className="col-md-6">
                            <p>供应日期：2018-10-12</p>
                        </div>
                        <div className="col-md-6">
                            <p>出厂日期：2018-10-12</p>
                        </div>
                        <div className="line line-lg b-b b-light"></div>
                        <div className="col-md-12">
                            <p>供应商：/</p>
                        </div>
                        <div className="col-md-12">
                            <p>生产商：/</p>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>


        )
    }

}

export default AssetModelInfo