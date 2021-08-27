import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";

function HomePage() {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h1>Hola {user.firstName}</h1>
      <p>¡Ingresaste usando React Hooks!</p>
      <h3>Todos los usuarios registrados:</h3>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items && (
        <ul>
          {users.items.map((user, index) => (
            <li key={user.id}>
              {user.firstName + " " + user.lastName}
              {user.deleting ? (
                <em> - Deleting...</em>
              ) : user.deleteError ? (
                <span className="text-danger">
                  {" "}
                  - ERROR: {user.deleteError}
                </span>
              ) : (
                <span>
                  {" "}
                  -{" "}
                  <div
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-primary"
                  >
                    Eliminar
                  </div>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <p>
        <Link to="/ingresar">Salir</Link>
      </p>
    </div>
  );
}

export { HomePage };
