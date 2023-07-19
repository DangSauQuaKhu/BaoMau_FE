import * as yup from 'yup'

export const schemaLogin = yup.object({
  phone: yup.string().required('Yêu cầu số điện thoại').min(8, 'Là chuỗi có 10 chữ số'),
  password: yup
    .string()
    .required('Yêu cầu mật khẩu')
    .min(6, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự')
})

export const schema = yup.object({
  name: yup.string().required('Yêu cầu tên').min(4, 'ít nhất 4 kí tự'),
  phone: yup.string().required('Yêu cầu số điện thoại').min(8, 'Là chuỗi có 10 chữ số '),
  password: yup
    .string()
    .required('Yêu cầu mật khẩu')
    .min(6, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự'),
  confirm_password: yup
    .string()
    .required(' Nhập lại mật khẩu bắt buộc')
    .min(6, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự')
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp')
})

export const employeeSchema = yup.object({
  name: yup.string().required('Yêu cầu tên').min(4, 'Ít nhất 4 kí tự'),
  email: yup
    .string()
    .email('')
    .min(5, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự'),
  salary: yup.number().typeError('Salary must be a number')
})

export const userSchema = yup.object({
  name: yup.string().required('Yêu cầu tên').min(4, 'ít nhất 4 kí tự'),
  email: yup
    .string()
    .email('')
    .min(5, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự')
})

export const schemaChangePass = yup.object({
  password: yup
    .string()
    .required('Yêu cầu mật khẩu')
    .min(6, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự'),
  newPassword: yup
    .string()
    .required('Yêu cầu mật khẩu')
    .min(6, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu bắt buộc')
    .min(6, 'dài từ 6-160 kí tự')
    .max(160, 'dài từ 6-160 kí tự')
    .oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại không khớp')
})
