export const LocalApiUsers = {
  production: false,
  ApiCreateUser: 'http://54.166.75.139:5020/users/',

  ApiDeleteUser: 'http://54.166.75.139:5021/users/',

  ApiUpdateUser: 'http://54.166.75.139:5023/users/',

  ApiListUser: 'http://54.166.75.139:5022/users/',

  ApiFindUser: 'http://54.166.75.139:5022/users/',
};

export const LocalApiProducts = {
  production: false,
  ApiCreateProduct: 'http://44.221.230.43:5000/api/products/create',

  ApiDeleteProduct: 'http://44.221.230.43:5001/api/products/delete/',

  ApiUpdateProduct: 'http://44.221.230.43:5003/api/products/update/',

  ApiListProduct: 'http://44.221.230.43:5002/api/products/list',

  ApiFindProduct: 'http://44.221.230.43:5002/api/products/',
};

export const LocalApiCategory = {
  production: false,
  ApiCreateCategory: 'http://localhost:5010/api/category/create',

  ApiDeleteCategory: 'http://127.0.0.1:5021/users/',

  ApiUpdateCategory: 'http://127.0.0.1:5023/users/',

  ApiListCategory: 'http://127.0.0.1:5022/users/',

  ApiFindCategory: 'http://127.0.0.1:5022/users/',
};

export const LocalApiAuthService = {
  production: false,
  ApiLocalLogin: 'http://34.234.127.78:5030/login',

  ApiLocalHash: 'http://34.234.127.78:5031/hash-password',

  ApiLocalRol: 'http://34.234.127.78:5032/check-role',

  ApiLocalToken: 'http://34.234.127.78:5032/me',

};