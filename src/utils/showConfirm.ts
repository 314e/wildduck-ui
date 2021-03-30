import Modal from 'antd/lib/modal';

const { confirm } = Modal;

function showConfirm(actionCall: () => void, title = 'Are you sure ?'): void {
	confirm({
		title: title,
		onOk() {
			actionCall();
		},
	});
}

export default showConfirm;
