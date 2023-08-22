import { DeleteUser, GetAllUsers, UpdateUserRole } from "../../API/Api";
import { UserForTable } from "../../API/Interfaces/Interfaces";
import "./adminUsersTable.css";
import { useEffect, useState } from "react";

interface AdminUserTableProps {
  users: UserForTable[];
}

const AdminUsersTable = () => {
  const [editingUserId, setEditingUserId] = useState("");
  const [allUsers, setAllUsers] = useState<UserForTable[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await GetAllUsers();
      setAllUsers(fetchedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    console.log(selectedRole);
  }, []);

  const handleEdit = (userId: string) => {
    setEditingUserId(userId);
  };

  const handleApplyEdit = (userId: string) => {
    UpdateUserRole(userId, selectedRole);
    setEditingUserId("");
    setInterval(() => {
      fetchUsers();
    }, 600);
  };

  const handleCancelEdit = () => {
    setEditingUserId("");
  };

  const handleDelete = (id: string) => {
    DeleteUser(id);
    fetchUsers();
  };

  return (
    <div className="users-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>

            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                {user._id !== editingUserId ? (
                  user.role
                ) : (
                  <div>
                    <label className="role-radio">
                      <input
                        type="radio"
                        id={`admin-${user._id}`}
                        name={`role-${user._id}`}
                        value="admin"
                        checked={selectedRole === "admin"}
                        onChange={() => setSelectedRole("admin")}
                      />
                      admin
                    </label>

                    <label className="role-radio">
                      <input
                        type="radio"
                        id={`user-${user._id}`}
                        name={`role-${user._id}`}
                        value="user"
                        checked={selectedRole === "user"}
                        onChange={() => setSelectedRole("user")}
                      />
                      user
                    </label>
                  </div>
                )}
              </td>
              <td>
                {editingUserId === user._id ? (
                  <div className="table-buttons-container">
                    <button
                      className="apply-button"
                      onClick={() => handleApplyEdit(user._id)}
                    >
                      Apply
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => {
                        handleCancelEdit();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="table-buttons-container">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        handleDelete(user._id.toString());
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
