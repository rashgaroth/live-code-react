import axios from 'axios';
import { useEffect, useState } from 'react';
import { 
  Form,
  Table,
  Layout,
  Button,
  PageHeader,
  Modal,
  Input,
  Row
} from 'antd';

import { Gap } from '../components/atoms/Gap'
import moment from 'moment';
import { MHeader } from '../components/molecules/Header';

const apiBaseUrl = 'https://61b964df38f69a0017ce5ffe.mockapi.io/products'

export const App = () => {  
  const [form] = Form.useForm()
  const [state, setState] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, obj) => {
        const x = price / Math.pow(10, obj?.decimal)
        return <p>{x}</p>
      }
    },
    {
      title: 'Decimal',
      dataIndex: 'decimal',
      key: 'decimal',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date, obj) => moment(date).format('LL') 
    },
  ]

  useEffect(() => {
    axios.get(apiBaseUrl)
      .then(({ status, data }) => setState(data.reverse()))
      .catch(err => err.message)
  }, [])

  const onHandleSubmit = () => {
    form.validateFields()
      .then(data =>
        axios.post(apiBaseUrl, data)
        .then(response => console.log(response))
    )
  }

  return (
    <Layout className='container-home'>
      <Layout.Content>
      <MHeader
        title='Create Product'
        buttonText='Create Product'
        onClick={() => setIsVisible(!isVisible)}
      />
      <Gap height='1rem' />
        <Table
          rowKey='id'
          dataSource={state ?? []}
          columns={columns}
          pagination={false}
        />
      </Layout.Content>
    
      <Modal
        title="Basic Modal"
        visible={isVisible}
        footer={false}
        onCancel={() => setIsVisible(false)}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={onHandleSubmit}
        >
          <Form.Item
            rules={[{ required: true }]} 
            name='name'
            label='Name'
          >
            <Input size='large' placeholder='input name product' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]} 
            name='price'
            label='Price'
          >
            <Input size='large' placeholder='input your price' />
          </Form.Item>
          <Row justify='end'>
            <Button htmlType='submit' type='primary'>
              Submit
            </Button>
          </Row>
        </Form>
      </Modal>
    </Layout>
  );
}

export default App;
