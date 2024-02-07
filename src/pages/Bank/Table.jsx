import { Table, Tag } from 'antd';

export default function TransactionsTable(props) {
    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            render: type => (
                <Tag 
                    color={type === 'deposit' ? 'blue' : 'yellow'}
                    key={type}
                >
                    {type}
                </Tag>
            )
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: amount => (
                <span>${amount}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => (
                <Tag 
                    color={
                        status === 'executed' ? 'green' : status === 'pending' ? 'yellow' : 'red'
                    } 
                    key={status}
                >
                    {status}
                </Tag>
            )
        },
        {
            title: 'Transaction Date',
            dataIndex: 'transaction_date'
        }
    ];

    return (
        <Table columns={columns} dataSource={props.data} />
    );
}