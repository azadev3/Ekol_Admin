import React, { ChangeEvent } from "react";
import { RoleData } from "../roles/CreateRole";
import axios from "axios";
import { URL } from "../../Base";
import { toastError, toastSuccess } from "../../App";
import { IoIosClose } from "react-icons/io";

export type UserType = {
  _id: string;
  name_surname: string;
  email: string;
  user_role: string;
};

const CreateUser: React.FC = () => {
  const [roleData, setRoleData] = React.useState<RoleData[]>([]);
  const getRoles = async () => {
    try {
      const res = await axios.get(`${URL}/create_role`);

      if (res.data) {
        console.log(res.data);
        setRoleData(res.data);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [users, setUsers] = React.useState<UserType[]>([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(`${URL}/create_new_user`);
      if (res.data) {
        console.log(res.data);
        setUsers(res.data);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getRoles();
    getUsers();
  }, []);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [nameSurname, setNameSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [selectedRole, setSelectedRole] = React.useState<string>("");

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedRole(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/create_new_user`, {
        name_surname: nameSurname,
        email: email,
        password: password,
        user_role: selectedRole,
      });

      if (res.data) {
        console.log(res.data);
        getUsers();
        setNameSurname("");
        setEmail("");
        setPassword("");
        setSelectedRole("");
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [userStatus, setUserStatus] = React.useState<{ [key: string]: boolean }>({});

  const toggleStatus = async (id: string) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));

    try {
      const newStatus = !userStatus[id];

      const res = await axios.post(`${URL}/login_new_user/status_update/${id}`, { status: newStatus });

      if (res.data) {
        console.log(res.data);
        toastSuccess();
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const [userModal, setUserModal] = React.useState<string | null>(null);
  const openModal = (id: string | null) => {
    setUserModal(id);
  };

  const findedUser: any =
    users && users?.length > 0
      ? users?.find((user: UserType) => {
          return userModal === user?._id;
        })
      : [];

  const deleteUser = async (id: string) => {
    try {
      const res = await axios.delete(`${URL}/delete_user/${id}`);
      if (res.data) {
        console.log(res.data);
        getUsers();
        toastSuccess();
        setUserModal(null);
      } else {
        toastError();
        console.log(res.status);
      }
    } catch (error) {
      toastError();
      console.log(error);
    }
  };

  const [updatedRole, setUpdatedRole] = React.useState<string>("");
  const handleUpdatedRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setUpdatedRole(value);
  };

  const updateUserRole = async (id: string) => {
    try {
      const res = await axios.put(`${URL}/create_new_user/update_role/${id}`, {
        user_role: updatedRole,
      });

      if (res.data) {
        toastSuccess();
        console.log(res.data);
        getRoles();
        getUsers();
      } else {
        toastError();
        console.log(res.status);
      }
    } catch (error) {
      toastError();
      console.log(error);
    }
  };

  return (
    <div className="create-user-table">
      <div className={`role-modal ${userModal ? "active" : ""}`}>
        <div className="modal">
          <IoIosClose className="close-icon" onClick={() => setUserModal(null)} />
          <h2>İstifadəçilərə aid düzəlişlər</h2>

          <div className="users">
            {findedUser ? (
              <div className="user-item" key={findedUser?._id}>
                <div className="name">
                  <p>İstifadəçi:</p>
                  <li>{findedUser.name_surname}</li>
                </div>
                <div className="name">
                  <p>Email:</p>
                  <li>{findedUser.email || ""}</li>
                </div>
                <div className="edit-user">
                  <button onClick={() => deleteUser(findedUser?._id)}>User'i sil</button>
                  <p
                    style={{
                      color: "#505050",
                      fontSize: "13px",
                      padding: "3px 0",
                    }}>
                    Rolunu dəyiş
                  </p>
                  <select
                    onChange={handleUpdatedRoleChange}
                    required
                    id="selected_role_new"
                    name="selected_role_new"
                    value={selectedRole || findedUser.role}>
                    <option value="" disabled>
                      Mövcud rol:
                      {findedUser ? roleData.find((role) => role._id === findedUser.user_role)?.name : "Rol tapılmadı"}
                    </option>

                    {roleData && roleData.length > 0 ? (
                      roleData.map((role: RoleData) => (
                        <option
                          style={{
                            display: role?.name?.includes(
                              roleData?.find((role) => role._id === findedUser.user_role)?.name || ""
                            )
                              ? "none"
                              : "",
                          }}
                          key={role._id}
                          value={role._id}>
                          {role.name}
                        </option>
                      ))
                    ) : (
                      <option value="">Rol təyin et...</option>
                    )}
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="button"
            onClick={() => updateUserRole(findedUser?._id)}
            style={{
              marginTop: "24px",
              padding: "6px 24px",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "500",
              fontSize: "16px",
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}>
            Tətbiq et
          </button>
        </div>
      </div>
      <h1>İstifadəçi yarat</h1>
      <form onSubmit={handleSubmit} acceptCharset="UTF-8">
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="name_surname">Ad & Soyad</label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSurname(e.target.value)}
              type="text"
              name="name_surname"
              id="name_surname"
              value={nameSurname}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="email"
              required
              name="email"
              value={email}
              autoComplete="off"
              id="email"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Şifrə</label>
            <input
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              name="password"
              autoComplete="off"
              required
              id="password"
              value={password}
            />
          </div>
          <div className="input-field">
            <label htmlFor="selected_role">Rol</label>
            <select value={selectedRole} onChange={handleChangeSelect} required id="selected_role" name="selected_role">
              <option value="">Bir rol seçin</option>
              {roleData && roleData?.length > 0 ? (
                roleData?.map((roles: RoleData) => (
                  <option key={roles?._id} value={roles?._id}>
                    {roles?.name}
                  </option>
                ))
              ) : (
                <option value="">Rol təyin et...</option>
              )}
            </select>
          </div>
        </div>
        <button type="submit" className="create-btn">
          {loading ? "Gözləyin..." : "Yarat"}
        </button>
      </form>

      <div className="existing-users">
        <h2>Yaradılan istifadəçilər</h2>
        <table>
          <thead>
            <tr>
              <th>Ad & Soyad</th>
              <th>Email</th>
              <th>Rol</th>
              <th>İstifadəçi statusu</th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {users && users?.length > 0
              ? users?.map((user: UserType) => {
                  const role = roleData.find((role: RoleData) => role._id === user.user_role);
                  if (role?.name === "Admin") {
                    return (
                      <tr key={user._id}>
                        <td>{user?.name_surname}</td>
                        <td>{user?.email}</td>
                        <td>{role?.name || "Bilinmir"}</td>
                        <td style={{ color: "green", fontSize: "16px", fontWeight: "600", letterSpacing: "1px", pointerEvents: "none" }}>
                          <span>{userStatus[user._id] ? "Aktiv" : "Deaktiv"}</span>
                          <button
                            onClick={() => toggleStatus(user._id)}
                            style={{
                              padding: "4px 8px",
                              marginLeft: "24px",
                              cursor: "pointer",
                            }}>
                            {userStatus[user._id] ? "Deaktiv et" : "Aktiv et"}
                          </button>
                        </td>
                        <td className="editing" style={{ pointerEvents: "none" }}>
                          <button type="button" onClick={() => openModal(user._id)}>
                            Adminə düzəliş oluna bilməz
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={user._id}>
                        <td>{user?.name_surname}</td>
                        <td>{user?.email}</td>
                        <td>{role?.name || "Bilinmir"}</td>
                        <td style={{ color: "green", fontSize: "16px", fontWeight: "600", letterSpacing: "1px" }}>
                          <span>{userStatus[user._id] ? "Aktiv" : "Deaktiv"}</span>
                          <button
                            onClick={() => toggleStatus(user._id)}
                            style={{
                              padding: "4px 8px",
                              marginLeft: "24px",
                              cursor: "pointer",
                            }}>
                            {userStatus[user._id] ? "Deaktiv et" : "Aktiv et"}
                          </button>
                        </td>
                        <td className="editing">
                          <button type="button" onClick={() => openModal(user._id)}>
                            İstifadəçini sil və ya rolunu dəyiş
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateUser;
