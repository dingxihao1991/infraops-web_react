import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './jobPlan.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../services/api';
import Authorized from '../../utils/Authorized';
import FormSub from './Form';
import{tableData} from './data';

const { ButtonAuthorize } = Authorized;
const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;

const columns = [
  {
    title: '管廊名称',
    dataIndex: 'gallery_name',
    id: 'gallery_name',
    align: 'center',
    key:'gallery_name'
  },
  {
    title: '计划类型',
    dataIndex: 'work_type',
    id: 'work_type',
    align: 'center',
    key:'work_type'
  }, {
    title: '计划名称',
    dataIndex: 'work_name',
    id: 'work_name',
    align: 'center',
    key:'work_name'
  } ,{
    title: '计划详细',
    dataIndex: 'work_detailed',
    id: 'work_detailed',
    align: 'center',
    key:'work_detailed'
  },{
    title: '计划状态',
    dataIndex: 'work_status',
    id: 'work_status',
    align: 'center',
    key:'work_status'
  },{
    title: '预定路线',
    dataIndex: 'work_line',
    id: 'work_line',
    align: 'center',
    key:'work_line'
  }, {
    title: '计划周期',
    dataIndex: 'work_time',
    id: 'work_time',
    align: 'center',
  },
  {
    title: '执行时间',
    dataIndex: 'startDate',
    id: 'startDate',
    align: 'center',
  },{//增加操作栏
  title: '操作',
    dataIndex: '9',
    id: '9',
    align: 'center',
    width: 150,
    render: () => (
      <Dropdown overlay={
        <Menu>
            <Menu.Item key="1"><Button style={{ marginRight: 5 }} icon="form" onClick={this.edit}>修改</Button></Menu.Item>
            <Menu.Item key="2"><Button style={{ marginRight: 5 }} icon="form" onClick={this.change}>删除</Button></Menu.Item>
        </Menu>
          }>
        <Button >
          操作 <Icon type="down" />
        </Button>
      </Dropdown>

  ),
}
];

const Paging = ({dataItems, onChange, ...otherProps}) => {
  const { total, pageSize, pageNum } = dataItems;
  const paging = {
    total: total,
    pageSize: pageSize,
    current: pageNum,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    onShowSizeChange: (pageNum, pageSize) => onChange({pageNum, pageSize}),
    onChange: (pageNum) => onChange({pageNum}),
    ...otherProps
  };
  return <Pagination {...paging} />;
};

export default class JobPlan extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
    loading:true
  };

  constructor(props,context) {
    super(props,context)

  }

  componentDidMount(){
    this.init();
  }

  init= () =>{
   const thiz = this;
   thiz.setState({
     dataSource:tableData,
     loading:false,
   })
  /*  GET('/roles',function(result){
      if(result.success){
        thiz.setState({
          dataSource:result.result,
          loading:false,
        })
      }
    },function(error){
      console.log(error)
    })*/
  }

  //编辑
  edit =()=>{
    console.log(this.state.record)
    const {rows,record} = this.state
    if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }
    this.openModal(record);
  }

  //新增事件
  onAdd = () => {
    this.openModal(null);
  };

  openModal =(record)=>{
    const modalFormProps = {
      loading: true,
      record:record,
      isShow:true,
      Contents:FormSub,
      modalOpts: {
        width: 700,
      },
      onSubmit: (values) => this.onSubmit(values)
    }
    this.context.openModal(modalFormProps);
  }

  delete =()=> {/*
    const {rows,record} = this.state;
    const dataSource = [...this.state.dataSource];
    let thiz = this;
    confirm({
      title: '提示信息',
      content: '确定删除【'+rows.length+'】行数据吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        let params = []
        rows.map(value=>{
          params.push(value.id);
        });
        DELETE('/role/delete', params , function(result){
          if(result.success){
            message.success("删除成功");
            thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});
          }else{
            Modal.error({
              title: '错误信息',
              content: '删除失败',
            });
          }

        },function(error){
          console.log(error)
        })
      },
      onCancel() {

      },

    })*/

  }

  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({rows:selectedRows,record:selectedRows[0]});
  }

  closeModal = () =>{
    this.setState({
      visible: false
    });
  }

  onSubmit= (values ) =>{
    let i = 2
    console.log("submit:" + JSON.stringify(values))
    tableData.push({
      "id":++i,
      "sys_Date":null,
      "lastModifiedDate":null,
      "markAsDeleted":false,
      "gallery_name_id":"2",
      "gallery_name":values.gallery_name,
      "work_name":values.work_name,
      "work_detailed":values.work_detailed,
      "work_line":values.work_line,
      "work_line_id":null,
      "work_status":"启动",
      "work_user":"王强",
      "work_time":values.work_time,
      "work_type":'养护',
      "startDate":"2018-11-03 12:45:00",
      "endDate":"2018-11-03 23:30:00",
    })
    /*
    const thiz = this;
    if(thiz.state.record!=null){
      values['id'] = thiz.state.record.id;
      PUT('/role/update',values,function(data){
        console.log(data);
        if(data.success){
          message.success('修改成功');
          thiz.closeModal();
          thiz.init();
        }else{
          Modal.error({
            title: '错误信息',
            content: '修改失败',
          });
        }
      },function(error){
        console.log(error);
      })
    }else {
      POST('/role/add',values,function(data){
        console.log(data);
        if(data.success){
          message.success('新增成功');
          thiz.closeModal();
          thiz.init();
        }else{
          Modal.error({
            title: '错误信息',
            content: '新增失败',
          });
        }
      },function(error){
        console.log(error);
      })

    }*/
  }

  render() {
    let { visible,record,rows,dataSource,loading} = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const from = FormSub;
    const modalFormProps = {
      loading: true,
      record,
      visible,
      Contents:from,
      modalOpts: {
        width: 700,
      },
      onCancel: () => this.closeModal(),
      onSubmit: (values) => this.onSubmit(values)
    }

    return(
      <Layout className={styles.application}>
        <div>
          <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add"/>
          <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>
          <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.delete} name="删除" authority="role:delete"/>
        </div>
        <Content>
          <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange} rowSelection={rowSelection}
                  loading={loading}
                  pagination={{
                    showSizeChanger:true,
                    showQuickJumper:true,
                    total:dataSource.length,
                    onChange:this.onChange
                  }}
          />
        </Content>
        <ModalForm {...modalFormProps}/>
      </Layout>
    )

  }
}