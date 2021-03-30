/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 * @description Function to add filter and sort
 */

import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import getUniqValuesBy from './getUniqValuesBy';
import getFilterDropDown from './FilterDropDown';
import { ColumnProps } from 'antd/lib/table';
import HtmlRenderer from 'components/HtmlRenderer';

/**
 * Callback
 * function to handle on click hyperlink
 */
type Callback = (dataIndex: any, rowData: any) => void;

// function Callback<T, M>(dataIndex: T, rowData: M) {}
/**
 * make value clickable
 * @interface IClickable
 */
interface IClickable {
	/**
	 * formatter
	 * value formatter to render
	 * @type {any}
	 */
	formatter?: (value: any) => any;
	/**
	 * callback
	 * @type {Callback}
	 */
	callback: Callback;
}

/**
 * type for custom filter
 * @interface IColumn
 * @extends ColumnProps
 */
export interface IColumn<T> extends ColumnProps<T> {
	/**
	 * filter
	 * adds filter for column
	 * @type {boolean}
	 */
	filter?: boolean;
	/**
	 * sortable
	 * @type {boolean}
	 */
	sortable?: boolean | 'date' | 'string';
	/**
	 * clickable
	 * @type {IClickable}
	 */
	clickable?: IClickable;
	/**
	 * renderHtml
	 * renders inner html
	 * @type {boolean}
	 */
	renderHtml?: boolean;
}

/**
 * function to get columns with filter drop down and sorter
 * @param columns
 * @param dataSource
 */
const getColumnsWithFilterAndSort = (columns: any, dataSource: any, metadata: any = {}) => {
	_.forEach(columns, (column) => {
		const {
			filter = false,
			dataIndex: a,
			customDataIndex,
			clickable,
			defaultFilteredValue = [],
			renderHtml = false,
		} = column;
		const dataIndex = customDataIndex ? customDataIndex : a;
		if (_.isEmpty(column.title)) {
			column.title = _.get(metadata, [_.isArray(dataIndex) ? _.first(dataIndex) : dataIndex, 'label'], '');
		}

		// TODO Remove this
		// Depricated
		if (renderHtml) {
			column.render = (stringifiedHtml: string) => {
				return <HtmlRenderer stringifiedHtml={stringifiedHtml} />;
			};
		}

		/**
		 * add hyperlink
		 */
		if (clickable && clickable.callback) {
			column.render = (rowValue: any, record: any) => {
				const valueToDisplay =
					typeof clickable.formatter === 'function' ? clickable.formatter(rowValue) : rowValue;
				return rowValue ? (
					<a onClick={() => clickable.callback(dataIndex, record)}> {valueToDisplay} </a>
				) : (
					valueToDisplay
				);
			};
		}

		/**
		 * add filter drop down
		 */
		if (column && filter && dataIndex && column.title) {
			const uniqValues = getUniqValuesBy(dataSource, dataIndex);
			const filters = getFilterDropDown(
				_.compact(uniqValues),
				dataIndex,
				`${column.title}`,
				defaultFilteredValue,
			);
			column.filterDropdown = filters.filterDropdown;
			column.onFilter = filters.onFilter;
		}

		/**
		 * add sorter
		 */
		if (column.sortable) {
			switch (column.sortable) {
				case 'date':
					column.sorter = (current: any, next: any) => {
						const nextMoment = moment(_.get(next, dataIndex));
						return nextMoment.isValid() ? moment(_.get(current, dataIndex)).unix() - nextMoment.unix() : -1;
					};
					break;
				case 'string':
					column.sorter = (current: any, next: any) => {
						const firstValue = _.toUpper(_.get(current, dataIndex));
						const secondValue = _.toUpper(_.get(next, dataIndex));
						if (firstValue < secondValue) {
							return -1;
						}
						if (firstValue > secondValue) {
							return 1;
						}
						return 0;
					};
					break;
				default:
					column.sorter = (current: any, next: any) => _.get(current, dataIndex) - _.get(next, dataIndex);
					break;
			}
		}
	});

	return columns;
};

export default getColumnsWithFilterAndSort;
