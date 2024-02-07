import React, { useState } from 'react';
import { Flex, InputNumber, Button } from 'antd';

export default function Operation(props) {
    let [depositAmount, onDepositAmountChange] = useState(100);
    let [withdrawalAmount, onWithdrawalAmountChange] = useState(100);

    function onSubmitDeposit() {
        props.onDeposit(depositAmount);
    }

    function onSubmitWithdrawal() {
        props.onWithdrawal(withdrawalAmount);
    }

    function onGetTransactions() {
        props.onGetTransactions();
    }

    return (
        <Flex vertical gap={35}>
            <Flex vertical gap={10}>
                <span>Deposit</span>
                <InputNumber
                    addonBefore="$"
                    defaultValue={depositAmount}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onDepositAmountChange}
                    style={{ width: 'inherit' }}
                />
                <Button type="primary" onClick={onSubmitDeposit}>Submit</Button>
            </Flex>
            <Flex vertical gap={10}>
                <span>Withdraw</span>
                <InputNumber
                    addonBefore="$"
                    defaultValue={withdrawalAmount}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onWithdrawalAmountChange}
                    style={{ width: 'inherit' }}
                />
                <Button type="primary" onClick={onSubmitWithdrawal}>Submit</Button>
            </Flex>
        </Flex>
    );
}