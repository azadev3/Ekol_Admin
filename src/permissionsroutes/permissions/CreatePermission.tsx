import axios from "axios";
import React, { ChangeEvent } from "react";
import { URL } from "../../Base";
import { BsFillInfoCircleFill } from "react-icons/bs";

export type PermissionData = {
  _id: string;
  name: string;
};

const CreatePermission: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [permissionName, setPermissionName] = React.useState<string>("");

  const [permissionData, setPermissionData] = React.useState<PermissionData[]>([]);
  const getPerms = async () => {
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
      const res = await axios.post(`${URL}/create_permission`, {
        permission_name: permissionName,
      });

      if (res.data) {
        setPermissionName("");
        getPerms();
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
    getPerms();
  }, []);

  return (
    <div className="create-user-table">
      <h1>İcazə yarat</h1>
      <form onSubmit={handleSubmit} acceptCharset="UTF-8">
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="permission_name">Nə üçün icazə vermək istəyirsiniz?</label>
            <input
              type="text"
              placeholder="ex: edit, create, update, delete"
              name="permission_name"
              id="permission_name"
              value={permissionName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPermissionName(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="create-btn">
          {loading ? "Gözləyin..." : "Yarat"}
        </button>
      </form>

      <div
        className="existing-users"
        style={{ display: permissionData && permissionData?.length > 0 ? "flex" : "none" }}>
        <h2>Yaradılan İcazələr</h2>
        <div className="description-for-info">
          <p>
            <BsFillInfoCircleFill className="info" />
            <span>Create, Update, Delete və List nədir?</span>
          </p>
          <div className="list">
            <div className="list-item">
              <li>create - </li>
              <p>
                bu icazə altında olan rollara sahib istifadəçilər admin panelinizdə mövcud datalarda
                <strong>məlumat əlavə edə, yarada</strong> bilər
              </p>
            </div>
            <div className="list-item">
              <li>update - </li>
              <p>
                bu icazə altında olan rollara sahib istifadəçilər admin panelinizdə mövcud dataları
                <strong>yeniləyə, dəyişdirə</strong> bilər
              </p>
            </div>
            <div className="list-item">
              <li>delete - </li>
              <p>
                bu icazə altında olan rollara sahib istifadəçilər admin panelinizdən mövcud dataları
                <strong>silə</strong> bilər
              </p>
            </div>
            <div className="list-item">
              <li>list (GET) - </li>
              <p>
                bu icazə altında olan rollara sahib istifadəçilər admin panelinizdə mövcud dataları
                <strong>görüntüləyə</strong> bilər
              </p>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sıra</th>
              <th>İcazə adı</th>
            </tr>
          </thead>
          <tbody className="perm-body">
            {permissionData && permissionData?.length > 0
              ? permissionData?.map((perms: PermissionData, i: number) => (
                  <tr key={perms?._id}>
                    <td>0{i + 1}</td>
                    <td>{perms?.name}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatePermission;
