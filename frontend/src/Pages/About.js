import Card from "../components/UI/Card";
import classes from "./About.module.css";

const About = () => {
  return (
    <Card>
      <div className={classes.wrapper}>
        <h2>Restaurant Referral Web App</h2>
        <h2>Feature:</h2>
        <ul className={classes["feature-list"]}>
          <li className={classes["feature-item"]}>
            Thêm, xóa, sửa, xem chi tiết nhà hàng
          </li>
          <li className={classes["feature-item"]}>
            Login, signup, logout user
          </li>
          <li className={classes["feature-item"]}>Phân trang</li>
          <li className={classes["feature-item"]}>Phân quyền</li>
        </ul>
        <h2>Công nghệ sử dụng:</h2>
        <h3>Frontend</h3>
        <ul className={classes["feature-list"]}>
          <li className={classes["feature-item"]}>Library: React</li>
          <li className={classes["feature-item"]}>Hook</li>
          <li className={classes["feature-item"]}>Axios - HTTP Client</li>
          <li className={classes["feature-item"]}>React-router-dom</li>
        </ul>
        <h3>Backend</h3>
        <ul className={classes["feature-list"]}>
          <li className={classes["feature-item"]}>Framework: Laravel 8</li>
          <li className={classes["feature-item"]}>Database: MySQL</li>
          <li className={classes["feature-item"]}>
            Endpoint design:
            <ul>
              <li>GET /api/restaurants: Lấy toàn bộ nhà hàng</li>
              <li>
                GET /api/restaurants/{`{id}`}: lấy thông tin 1 nhà hàng theo id
              </li>
              <li>POST /api/restaurants: Thêm nhà hàng mới</li>
              <li>
                POST /api/restaurants/{`{id}`}: Update thông tin nhà hàng theo
                id
              </li>
              <li>DELETE /api/restaurants/{`{id}`}: Xóa nhà hàng theo id</li>
              <li>POST /api/auth/login: Đặng nhập</li>
              <li>POST /api/auth/register: Đăng ký</li>
            </ul>
          </li>
        </ul>
        <h5>Nguyễn Văn Thịnh - k65J - UET-VNU</h5>
      </div>
    </Card>
  );
};

export default About;
