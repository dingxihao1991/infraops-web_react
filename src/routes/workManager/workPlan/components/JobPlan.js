import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../../workManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon,Row,Col} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import Authorized from '../../../../utils/Authorized';
import FormSub from './Form';
import WorkPlanDetail from "../../public/WorkDetail";
import AdvancedSearchForm from './SearchForm';
import { connect } from 'dva';
const { ButtonAuthorize } = Authorized;
const { Content,} = Layout;

const Modal = ModalForm.Modal;
const confirm = Modal.confirm;

@connect(({loading, jobPlan}) => ({
  loading:loading.effects['jobPlan/fetch'],
  jobPlan
}))
export default class JobPlan extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:'新增工作计划',
    form:FormSub,
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
    loading:true,
    isFooter:false,
    current:1,
    pageSize:10,
  };

  constructor(props,context) {
    super(props,context)

  }

  componentDidMount(){
    const {dispatch } = this.props;
    this.initColums();
    this.init();
    dispatch({
      type: 'jobPlan/fetch',
      payload: {
      },
    });
  }

  initColums = ()=>{
    const columns = [
      {
        title: '隧道名称',
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
      },{ //增加操作栏
        title: '操作',
        dataIndex: '9',
        id: '9',
        align: 'center',
        width: 150,
        render: (text, record) => (
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="1"><Button style={{ marginRight: 5 }} icon="form" onClick={() => this.edit(record)}>修改</Button></Menu.Item>
              <Menu.Item key="2"><Button style={{ marginRight: 5 }} icon="form" onClick={() => this.delete(record)}>删除</Button></Menu.Item>
            </Menu>
          }>
            <Button >
              操作 <Icon type="down" />
            </Button>
          </Dropdown>

        ),
      }
    ];
    this.setState({columns:columns})
  }

  init= () =>{
    const thiz = this;
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
  edit =(record)=>{
    console.log(record)
    this.setState({
      title:'修改工作计划',
      record:record,
      visible: true,
      form:FormSub,
      isFooter:false
    });
  }

  //新增事件
  onAdd = () => {
    this.setState({
      title:'新增工作计划',
      visible: true,
      form:FormSub,
      record:null,
      isFooter:false
    });
    /*  const modalFormProps = {
          title:"新增工作计划",
          Contents:FormSub,
          maskClosable:true,
          isShow:true,
          isFooter:false,
          onSubmit: (values) => this.onSubmit(values)
      }
      this.context.openModal(modalFormProps);*/
  };

  delete =(record)=> {
    confirm({
      title: '提示信息',
      content: '确定删除吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success("删除成功");
      },
      onCancel() {

      },
    })
  }

  batchDelete=() => {
    const {rows } = this.state
    confirm({
      title: '提示信息',
      content: '确定删除【'+rows.length+'】行数据吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success("删除成功");
      },
      onCancel() {

      },
    })
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

  }

  handlerDoubleClick = (record, index, event) => {
      const modalFormProps = {
          title:"详细信息",
          record,
          Contents:WorkPlanDetail,
          maskClosable:true,
          isShow:true,
          modalOpts: {
              width: 1200,
              height:700
          },
          isFooter:true,
          full:true,
      }
      this.context.openModal(modalFormProps);

  };

    openModal =(record)=>{
        const modalFormProps = {
            title:"详细信息",
            loading: true,
            record,
            visible,
            Contents:WorkPlanDetail,
            maskClosable:true,
            modalOpts: {
                style:{ top: 20 ,height:'600px'},
                width: 1200,
            },
            isFooter:true,
            onCancel: () => this.props.closeModal(),
        }
        this.context.openModal(modalFormProps);
    }


    render() {
        const {
            jobPlan :{list},
            loading,
        } = this.props;
        let { columns,rows,pageSize,current} = this.state;

      const dataTableProps ={
        total: list?list.length:null,
        pageSize: pageSize,
        current:current,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${list.length} 条`,
      }


      const rowSelection = {
        onChange: this.onSelectChange,
      };

    return(
      <Layout className={styles.application}>
        <div style={{ background: 'white' , float:'right'}} id="jobPlanId">
          <AdvancedSearchForm/>
          <div style={{float: 'left'}}>
            <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add"/>
            {/* <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>*/}
            <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.batchDelete} name="批量删除" authority="role:delete"/>
          </div>
        </div>
        <Content className='ant_table_ui' >
          <Table size="middle"  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={list}  onChange={this.handleChange} rowSelection={rowSelection}
                  loading={loading}
                  pagination={dataTableProps}
                  scroll={{y: '73vh'  }}
                  onRowDoubleClick={this.handlerDoubleClick}
          />
        </Content>
      </Layout>
    )

  }
}