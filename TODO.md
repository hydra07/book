# TODO

## NOTE FOR HYDRA7

- [x] init dự án
- [x] cấu hình Security + jwt `Tạm thời`
- [x] phân quyền cho user
- [x] `TODO` entity

  - [x] `TODO` User `Tạm thời`
  - [ ] `TODO` Book
  - [ ] `TODO` Comment
  - [ ] `TODO` Reaction
  - [ ] `TODO` Rate
  - [ ] `TODO` Images
  - [ ] `TODO` Note
  - [ ] `TODO` Notification
  - [ ] `TODO` BookMark
  - [ ] `TODO` Author
  - [ ] `TODO` Payment

- [ ] `TODO` Controller

  - [ ] `TODO` authController (`\auth`)

    - [x] `/auth/authenticate` -> `POST` -> `đăng nhập`
    - [x] `/auth/register` -> `POST` -> `đăng ký`
    - [x] `/auth/google` -> `POST` -> `đăng nhập bằng google`
      - [ ] `ERROR` đăng nhập bằng google sẽ cho phone bằng null -> do đó không thể đăng nhập bằng google nữa
    - [ ] `/auth/refresh` -> `POST` -> `lấy token mới`

  - [ ] `TODO` adminController (`\admin`) role ['ADMIN']

  - [ ] `TODO` userController (`\user`) role ['USER','ADMIN','PREMIUM']

  - [ ] `TODO` testController

    - [x] `/test/token/claims` -> `POST` -> `lấy subject user từ token`
    - [x] `/test/token/user` -> `POST` -> `lấy thông tin user từ id` : `UserDTO`
    - [x] `/test/token/user` -> `GET` -> `lấy thông tin user từ token` : `User` : `cần đăng nhập`
    - [x] `/test/token/profile` -> `POST` -> `gửi lên 1 userDTO để cập nhật thông tin user` : `cần đăng nhập`
      - [x] `ERROR` catch lỗi edit user -> chưa xử lý được các trường hợp nếu phone != 10,null,phone đã tồn tại `Đã fix` :`bỏ check unique trong database -> người dùng có thể đăng ký tài khoản không cần phone, tuy nhiên khi update profile thì sẽ sử dụng code để check phone là duy nhất`
    - [x] `/test/token/addFollow` -> `POST` -> `thêm người theo dõi` : `cần đăng nhập`
    - [x] `/test/token/unFollow` -> `POST` -> `xóa người theo dõi` : `cần đăng nhập`
