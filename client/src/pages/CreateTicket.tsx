import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../api/ticketAPI";
import { TicketData } from "../interfaces/TicketData";
import { UserData } from "../interfaces/UserData";
import { retrieveUsers } from "../api/userAPI";
import Auth from "../utils/auth";

const CreateTicket = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: "",
    description: "",
    status: "Todo",
    assignedUserId: 1,
    assignedUser: null,
  });

  const [users, setUsers] = useState<UserData[]>([]);

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve user info", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await createTicket(newTicket);
      console.log(data);
      navigate("/");
    } catch (err) {
      console.error("Could not create ticket", err);
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({
      ...prev,
      [name]: name === "assignedUserId" ? parseInt(value) : value,
    }));
  };

  const assignedUserIdValue: string =
    newTicket.assignedUserId != null ? String(newTicket.assignedUserId) : "";

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
        <label htmlFor="tName">Ticket Name</label>
        <textarea
          id="tName"
          name="name"
          value={newTicket.name ?? ""}
          onChange={handleTextAreaChange}
        />
        <label htmlFor="tStatus">Ticket Status</label>
        <select
          name="status"
          id="tStatus"
          value={newTicket.status ?? ""}
          onChange={handleTextChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <label htmlFor="tDescription">Ticket Description</label>
        <textarea
          id="tDescription"
          name="description"
          value={newTicket.description ?? ""}
          onChange={handleTextAreaChange}
        />
        <label htmlFor="tUserId">Assign User</label>
        <select
          name="assignedUserId"
          id="tUserId"
          value={assignedUserIdValue}
          onChange={handleTextChange}
        >
          {users.map((user) => (
            <option key={user.id} value={String(user.id)}>
              {user.username}
            </option>
          ))}
        </select>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default CreateTicket;
