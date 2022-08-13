import * as yup from 'yup';

export const schema = yup
	.object()
	.shape({
		userName: yup.string().required('Trường này bắt buộc, vui lòng nhập'),
		name: yup
			.string()
			.required('Trường này bắt buộc, vui lòng nhập')
			.min(5, 'Tên phải dài hơn 5 ký tự'),
		phone: yup.string().required('Trường này bắt buộc, vui lòng nhập'),
		email: yup
			.string()
			.email()
			.required('Trường này bắt buộc, vui lòng nhập'),
		// role: yup.string().required("Trường này bắt buộc, vui lòng nhập"),
	})
	.required();
