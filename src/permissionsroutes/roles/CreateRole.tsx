import axios from "axios";
import React, { ChangeEvent } from "react";
import { URL } from "../../Base";
import { PermissionData } from "../permissions/CreatePermission";
import Select from "react-select";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { toastSuccess } from "../../App";

export type RoleData = {
  _id: string;
  name: string;
  description: string;
  role_permissions: [
    {
      _id: string;
      name: string;
      value: string;
    }
  ];
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    borderColor: "#cccccc",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#007bff",
    },
    borderRadius: "8px",
    padding: "5px",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "10px",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 16px",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    minWidth: "24px",
    width: "24px",
    minHeight: "24px",
    height: "24px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    color: "#000",
    ":hover": {
      backgroundColor: "#ff1a1a",
    },
  }),
};

const CreateRole: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [roleName, setRoleName] = React.useState<string>("");
  const [permissions, setPermissions] = React.useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<any>([]);

  const handleSelectChange = (selected: any) => {
    setSelectedOptions(selected);
    const selectedPermissionKeys = selected.map((option: any) => option.label);
    setPermissions(selectedPermissionKeys);
  };

  // Select all permissions
  const handleSelectAll = () => {
    const allOptions = permissionData.map((perm: any) => ({
      value: perm._id,
      label: perm.name,
    }));

    setSelectedOptions(allOptions);

    const allPermissionIds = allOptions.map((option) => option.value);
    setPermissions(allPermissionIds);
  };

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

  const [permissionData, setPermissionData] = React.useState<PermissionData[]>([]);
  const getPermissions = async () => {
    try {
      const res = await axios.get(`${URL}/create_permission`);
      if (res.data) {
        console.log(res.data);
        setPermissionData(res.data);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/create_role`, {
        role_name: roleName,
        permissions: permissions,
      });

      if (res.data) {
        setRoleName("");
        getRoles();
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getRoles();
    getPermissions();
  }, []);

  const [roleModal, setRoleModal] = React.useState<string | null>(null);
  const openModal = (id: string | null) => {
    setRoleModal(id);
  };

  const findedRoleModel: any =
    roleData && roleData?.length > 0
      ? roleData?.find((role: RoleData) => {
          return roleModal === role?._id;
        })
      : [];

  //UPDATE - Role Permission
  const handleUpdateRole = async (id: string) => {
    try {
      const res = await axios.put(`${URL}/create_role/${id}`, {
        role_name: findedRoleModel?.name,
        permissions: selectedOptions.map((option: any) => option.label),
      });

      if (res.data) {
        console.log(res.data);
        getRoles();
        setRoleModal(null);
        toastSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE - Role Permission
  const deletePermissionById = async (role_id: string, deleted_perm_id: string) => {
    try {
      const res = await axios.delete(`${URL}/create_role/${role_id}/${deleted_perm_id}`);
      if (res.data) {
        toastSuccess();
        getPermissions();
        getRoles();
      }
    } catch (error) {
      console.error("Error while deleting permission:", error);
    }
  };

  return (
    <div className="create-user-table">
      <div className={`role-modal ${roleModal ? "active" : ""}`}>
        <div className="modal">
          <IoIosClose className="close-icon" onClick={() => setRoleModal(null)} />
          <h2>{findedRoleModel ? findedRoleModel.name : ""} roluna əlavə icazələr ver</h2>
          <div className="multi-select-container-rolemodal">
            <button
              type="button"
              style={{
                padding: "6px 24px",
                borderRadius: "4px",
                backgroundColor: "transparent",
                color: "black",
                fontWeight: "500",
                fontSize: "16px",
                outline: "none",
                border: "1px solid #707070",
                cursor: "pointer",
              }}
              onClick={handleSelectAll}>
              Bütün icazələri təyin et
            </button>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "12px",
                margin: "21px 0",
              }}>
              <BsFillInfoCircleFill color="orange" fontSize={21} />
              <span>
                Bütün icazələri təyin ettikdə, seçdiyiniz rol admin panel üzərində hər cür səlahiyyətə sahib olacaqdır.
              </span>
            </p>
            <Select
              required
              isMulti
              options={
                permissionData && permissionData?.length > 0
                  ? permissionData?.map((perms: PermissionData) => ({
                      value: perms?._id,
                      label: perms?.name,
                    }))
                  : []
              }
              value={selectedOptions}
              onChange={handleSelectChange}
              placeholder="Rola təyin olunacaq icazələri vəya icazəni seçin..."
              styles={customStyles}
            />
            <div className="select-values">
              <h4>Seçilmiş icazələr:</h4>
              <ul>
                {selectedOptions.map((option: any) => (
                  <li key={option.value} className="selected-option">
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="existing-perms">
            <h3>Roldakı mövcud icazələr</h3>
            <div className="list-existing">
              {findedRoleModel && findedRoleModel?.role_permissions?.length > 0
                ? findedRoleModel?.role_permissions?.map((exRole: RoleData) => (
                    <div className="list" key={exRole._id}>
                      <p>{exRole.name}</p>
                      <MdDeleteOutline
                        className="delete-icon"
                        onClick={() => deletePermissionById(findedRoleModel._id, exRole._id)}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleUpdateRole(findedRoleModel?._id)}
            style={{
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
            İcazələri yenilə
          </button>
        </div>
      </div>
      <h1>Rol yarat</h1>
      <form onSubmit={handleSubmit} acceptCharset="UTF-8">
        <div className="inputs" style={{ gridTemplateColumns: "repeat(1, 1fr)" }}>
          <div className="input-field">
            <label htmlFor="role_name">Rol adı</label>
            <input
              value={roleName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRoleName(e.target.value)}
              placeholder="ex: Moderator, HR, Admin"
              type="text"
              name="role_name"
              id="role_name"
              required
            />
          </div>
          <div className="multi-select-container">
            <button
              type="button"
              style={{
                padding: "6px 24px",
                borderRadius: "4px",
                backgroundColor: "transparent",
                color: "black",
                fontWeight: "500",
                fontSize: "16px",
                outline: "none",
                border: "1px solid #707070",
                cursor: "pointer",
              }}
              onClick={handleSelectAll}>
              Bütün icazələri təyin et
            </button>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "12px",
                margin: "21px 0",
              }}>
              <BsFillInfoCircleFill color="orange" fontSize={21} />
              <span>
                Bütün icazələri təyin ettikdə, seçdiyiniz rol admin panel üzərində hər cür səlahiyyətə sahib olacaqdır.
              </span>
            </p>
            <Select
              required
              isMulti
              options={
                permissionData && permissionData?.length > 0
                  ? permissionData?.map((perms: PermissionData) => ({
                      value: perms?._id,
                      label: perms?.name,
                    }))
                  : []
              }
              value={selectedOptions}
              onChange={handleSelectChange}
              placeholder="Rola təyin olunacaq icazələri vəya icazəni seçin..."
              styles={customStyles}
            />
            <div className="select-values">
              <h4>Seçilmiş icazələr:</h4>
              <ul>
                {selectedOptions.map((option: any) => (
                  <li key={option.value} className="selected-option">
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button type="submit" className="create-btn">
          {loading ? "Gözləyin..." : "Yarat"}
        </button>
      </form>

      <div className="existing-users" style={{ display: roleData && roleData?.length > 0 ? "flex" : "none" }}>
        <h2>Yaradılan Rollar</h2>

        <table>
          <thead>
            <tr>
              <th>Sıra</th>
              <th>Rol adı</th>
              <th>Rola daxil olan icazələr</th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {roleData && roleData?.length > 0
              ? roleData?.map((roles: RoleData, i: number) => {
                if(roles.name === "Admin") {
                  return (
                    <tr style={{ cursor: "no-drop" }} key={roles?._id}>
                    <td>0{i + 1}</td>
                    <td>{roles?.name}</td>
                    <td
                      style={{
                        backgroundColor: "#cecece90",
                        color: "black",
                        fontWeight: "600",
                        overflowX: "auto",
                        maxWidth: "100px",
                      }}>
                      {roles?.role_permissions?.length > 0
                        ? roles.role_permissions?.map((role) => role.name).join(", ")
                        : ""}
                    </td>
                    <td>Adminə düzəliş edə bilməzsiniz</td>
                  </tr>
                  )
                } else {
                  return (
                    <tr key={roles?._id}>
                    <td>0{i + 1}</td>
                    <td>{roles?.name}</td>
                    <td
                      style={{
                        backgroundColor: "greenyellow",
                        color: "black",
                        fontWeight: "600",
                        overflowX: "auto",
                        maxWidth: "100px",
                      }}>
                      {roles?.role_permissions?.length > 0
                        ? roles.role_permissions?.map((role) => role.name).join(", ")
                        : ""}
                    </td>
                    <td className="editing">
                      <button onClick={() => openModal(roles._id)}>Rola icazələr əlavə et vəya Sil</button>
                    </td>
                  </tr>
                  )
                }
              })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateRole;
