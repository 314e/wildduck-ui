/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ListTargets Component
 */

import React from 'react';
import { List } from 'antd';
import _ from 'lodash';

const ListTarget: React.FC<{ data: any }> = ({ data }: any) => {
	return _.isUndefined(_.get(data, 'address')) ? null : (
		<List
			size='large'
			bordered
			dataSource={_.get(data, 'targets', [])}
			renderItem={(item) => <List.Item>{item}</List.Item>}
		/>
	);
};

export default ListTarget;
