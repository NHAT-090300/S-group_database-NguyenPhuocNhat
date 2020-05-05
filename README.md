# S-group_database-NguyenPhuocNhat
#### Nodejs and Expressjs
- **Khái niệm `NODEJS`** : https://bit.ly/2I8KgHt.
- **Khái niệm `NPM`** :  https://bit.ly/3cjhz8C.
- **Khái niệm `HTTP METHOD`** :  https://bit.ly/3csgZpl.
- **Khái niệm `MVC`** : https://bit.ly/3cp0lXh.
- **`ExpressJS and EXPRESSJS GENERATOR`** :   https://bit.ly/2Ic4XT2 ,  https://bit.ly/2IcI5Ts.
#### DATABASE, SESSION and AUTHENTICATION (*Buoi 2*)
- **tài liệu tham khảo `MYSQL`** : http://bit.ly/2TFBYO1.
- **tài liệu tham khảo `Knex` và `Config Knex`** :  http://bit.ly/2wEYXzJ , http://bit.ly/2vSpOrU.
- **Khái niệm `session` và cài đặt** :  http://bit.ly/3azemjE,  (http://bit.ly/2IAZQMl,  http://bit.ly/2U5cEjx).
#### CRUD
- **Tổng quan `CRUD`** :  http://bit.ly/38Vls0v
- **`PUT` VÀ `DELETE REQUESTS`** :  http://bit.ly/2xKNmQ3
- **`Bcrupt`** : https://bit.ly/2J8JJpv Mình sẽ sử dụng package này để mã hóa mật khẩu của mình trước khi gửi lên trên database, sau đó sử dụng để check.
- **`Moment`** : https://bit.ly/2xj0VGg Mình sẽ sử dụng package này để format lại ngày ở bên trong 2 trường created_at và updated_at.
- **`EXPRESS-VALIDATOR`** : (https://bit.ly/33NxYOU) Mình sẽ sử dụng package này để thực hiện check các điều kiện ở input của form ( Ví dụ : mật khẩu không được ít hơn 6 ký tự , v.v ).
- **`CONNECT-FLASH-PLUS`** : https://bit.ly/2QHAWPt Kết hợp với express-validator , ta sẽ sử dụng gói connect-flash-plus để lưu những message lên trên session và được truyền ra ngoài view.
#### SQL RELATIONSHIP
- có 3 loại `relationship` : one-to-one [https://bit.ly/3dGlc9l] , one-to-many [ https://bit.ly/2vZwzrS], many-to-many [https://bit.ly/3bAVbX8].
- `KEY`:
  + `primary Key` :  https://bit.ly/2Js9lOc.
  + `Foregin Key` :  https://bit.ly/3avDKXX.
- `Join`
  + các loại :  https://bit.ly/2JroDTn
- `Uplaod images` and `slug` : https://bit.ly/2XfGaGr ,  https://bit.ly/2V7MjSf.
#### TINYMCE , POST VÀ CATEGORY
- `timyMCE` : https://bit.ly/2zdv6iU 
- `upload images trên tinymce` : https://bit.ly/3eYaawT Mọi người chỉ sẽ thêm trên thanh công cụ plugin để có thể upload hình ảnh và sau đó sử dụng ajax có sẵn của tinyMCE để nhận lại dữ liệu hình ảnh 
````
    <script>
      tinymce.init({
        selector: '#mytextarea',
        // thêm plugin vào để có phần insert image trên navbar
        plugins: [ 'image' ],
        // Thêm hàm xử lí upload hình ảnh
         images_upload_handler: function (blobInfo, success, failure) {
    var xhr, formData;
		// Tạo một XML Http request 
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    // Xử lí upload
    xhr.open('POST', '/admin/image-upload');
		// Xử lí response nhận về từ server
    xhr.onload = function() {
      var json;

      if (xhr.status != 200) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }
			// response từ server
      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }
			// Append hình ảnh vào tinyMCE
      success(json.location);
    };
		// Định nghĩa formdata object gửi lên server
    formData = new FormData();
    // Append vào thông tin của hình ảnh 
    formData.append('images', blobInfo.blob(), blobInfo.filename());
 		// Gửi formdata này lên server
    xhr.send(formData);
  }
      });
    </script>
````

