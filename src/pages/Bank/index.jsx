// Libraries
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Row, Col, Button, Card } from 'antd';
import { IoMdRefresh } from "react-icons/io";

// Native Imports
import Table from './Table';
import Operation from './Operation';
import { ACCOUNT_ID, API_KEY, BASE_URL } from '../../defs';

export const Bank = (props) => {
	// Refresh table on page load
	useEffect(() => { onGetTransactions() }, []);

	const [messageApi, contextHolder] = message.useMessage();

	let [balance, setBalance] = useState(0);
	let [accountNickname, setAccountNickname] = useState('');
	let [recordListData, setRecordListData] = useState([]);

	// URLs for HTTP requests
	const accountUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '?key=' + API_KEY;
	const depositsUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '/deposits?key=' + API_KEY;
	const withdrawalsUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '/withdrawals?key=' + API_KEY;

	// Called when the deposit button is clicked (POST deposit HTTP request)
	function onPostDeposit(amount) {
		httpPostTransaction(depositsUrl, amount);
	}

	// Called when the withdrawal button is clicked (POST withdrawal HTTP request)
	function onPostWithdrawal(amount) {
		if (balance >= amount) {
			httpPostTransaction(withdrawalsUrl, amount);
        }
		else {
            operationFailed("Insufficient funds");
        }
	}

	// Called when refresh button is clicked and after a new deposit or withdrawal is added
	async function onGetTransactions() {
		// GET account data to retrieve name + balance
		let accountData = await httpGetTransaction(accountUrl);

		// GET deposits for account
		let deposits = await httpGetTransaction(depositsUrl);

		// GET withdrawals for account
		let withdrawals = await httpGetTransaction(withdrawalsUrl);

		if (accountData === undefined || deposits === undefined || withdrawals === undefined) {
			operationFailed("Couldn't GET data from API");
			return;
		}

		// Combine deposits + withdrawals into one array and sort by date
		let transactions = deposits.concat(...withdrawals);
		transactions.sort((a, b) => compareDates(a, b));

		// Create nickname for account (example of nickname format: 'Checking ****9877')
		const nickname = accountData.type + ' ****' + accountData.account_number.substring(accountData.account_number.length - 4);

		// Update the information displayed in our table
		setBalance(accountData.balance);
		setAccountNickname(nickname);
		setRecordListData(transactions);
	}

	// Helper function: Sort transactions by date
	function compareDates(a, b) {
		return a.transaction_date < b.transaction_date ? 1 : a.transaction_date < b.transaction_date ? -1 : 0;
	}

	// Helper function: Display success popup
	function operationSuccessful(message) {
		messageApi.open({
			type: 'success',
			content: 'Success: ' + message.toString(),
		});
	}

	// Helper function: Display error popup
	function operationFailed(message) {
		messageApi.open({
			type: 'error',
			content: 'Error: ' + message.toString(),
		});
	}

	// Sends POST request to Nessie API with the given URL and amount
	// Supports both withdrawals and deposits since the request body is the same format for both
	function httpPostTransaction(url, amount) {
		axios.post(url, {})
			.then(function(response) {
				//// TODO ////
			})
			.catch(function(err) {
				//// TODO ////
			});
	}

	// Sends GET request to Nessie API with the given URL
	// Returns the response body
	async function httpGetTransaction(url) {
		return await axios.get(url)
			.then(function(response) {
				//// TODO ////
			})
			.catch(function(err) {
				//// TODO ////
			});
	}

	return (
		<>
			{contextHolder}
            <Row gutter={32} align="middle">
                <Col span={1} />
                <Col span={12}>
                    <h1>Account Transaction Simulator</h1>
                </Col>
                <Col span={5}>
                    <Button onClick={onGetTransactions} icon={<IoMdRefresh />} />
                </Col>
            </Row>
            <Row gutter={32}>
                <Col span={1} />
                <Col span={12}>
				<Card title={accountNickname} extra={"Balance: $" + balance}>
					<Table data={recordListData} />
				</Card>
                </Col>
                <Col span={3}>
					<Operation
						onDeposit={onPostDeposit}
						onWithdrawal={onPostWithdrawal}
						onGetTransactions={onGetTransactions}
					/>
                </Col>
            </Row>
		</>
	);
};