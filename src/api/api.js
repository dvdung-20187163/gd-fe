import axios from "axios"

/**
 * @description: API phân trang và tìm kiếm
 * @param {Number} pageNumber - Trang hiện tại
 * @param {String} keyWord - Từ khóa để tìm kiếm
 * @author: DVDUNG (5/11/2022)
 */
export const getPagingFilter = (where) => 
    
    axios
        .get(
            `https://localhost:7200/api/v1/Employees/PagingFilter?${where}&limit=50`
        );

/**
 * @description: API lấy ra thông tin nhân viên bằng EmployeeCode
 * @param {Object} employeeCode - EmployeeCode của nhân viên
 * @author: DVDUNG (5/11/2022)
 */
export const getByEmployeeCode = (employeeCode) => axios
    .get(
        `https://localhost:7200/api/v1/Employees/GetByEmployeeCode?employeeCode=${employeeCode}`
    )

/**
 * @description: API thêm mới một nhân viên
 * @param {Object} employee - Thông tin nhân viên
 * @author: DVDUNG (5/11/2022)
 */
export const addEmployee = (employee) => axios
    .post("https://localhost:7200/api/v1/Employees/", employee);

/**
 * @description: API chỉnh sửa một nhân viên
 * @param {String} employeeID - ID của nhân viên cần chỉnh sửa
 * @param {Object} employee - Thông tin chỉnh sửa
 * @author: DVDUNG (5/11/2022)
 */
export const updateEmployee = (employeeID, employee) => axios
    .put(
        `https://localhost:7200/api/v1/Employees/${employeeID}`,
        employee
    );

/**
 * @description: API xóa một nhân viên
 * @param {Object} id - ID của nhân viên cần xóa
 * @author: DVDUNG (5/11/2022)
 */
export const deleteEmployee = (id) => axios
    .delete(`https://localhost:7200/api/v1/Employees/${id}`);

/**
* @description: API lấy thông tin mã nhân viên mới
* @author: DVDUNG (5/11/2022)
*/
export const getEmployeeCode = () => axios
    .get("https://localhost:7200/api/v1/Employees/NewEmployeeCode");

/**
* @description: API lấy danh sách tổ hợp môn
* @author: DVDUNG (5/11/2022)
*/
export const getDepartments = () => axios
    .get("https://localhost:7200/api/v1/Departments")


/**
* @description: API lấy danh sách môn học
* @author: DVDUNG (5/11/2022)
*/
export const getSubjects = () => axios
    .get(`https://localhost:7200/api/v1/Subjects`)


/**
* @description: API lấy danh sách phòng kho
* @author: DVDUNG (5/11/2022)
*/
export const getRooms = () => axios
    .get(`https://localhost:7200/api/v1/Rooms`)

/**
* @description: API xóa nhiều nhân viên
 * @param {array} arrayDeleteMultiple - mảng chứa các ID nhân viên
* @author: DVDUNG (5/11/2022)
*/
export const deleteMultipleEmployee = (arrayDeleteMultiple) => axios
    .post(
        'https://localhost:7200/api/v1/Employees/DeleteMultiple', arrayDeleteMultiple
    )
