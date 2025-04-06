import { useState, useEffect } from 'react';

export function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    id: '',
    nombre: '',
    correo: ''
  });

  const cargarUsuarios = async () => {
    const res = await fetch('/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormulario(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Number(formulario.id),
        nombre: formulario.nombre,
        correo: formulario.correo
      })
    });

    setFormulario({ id: '', nombre: '', correo: '' });
    cargarUsuarios();
  };

  const eliminarUsuario = async (id) => {
    await fetch(`/usuarios/${id}`, { method: 'DELETE' });
    cargarUsuarios();
  };

  return (
    <section>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="id"
          placeholder="ID"
          value={formulario.id}
          onChange={handleChange}
          required
        /><br />
        <input
          id="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        /><br />
        <input
          id="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={handleChange}
          required
        /><br />
        <button className="crear" type="submit">Crear</button>
      </form>
  
      <h3>Usuarios Registrados</h3>
      <ul className="usuarios-lista">
        {usuarios.map(user => (
          <li key={user.id} className="usuario-item">
          <div className="usuario-contenido">
            <span>{user.id} - {user.nombre} ({user.correo})</span>
            <button className="eliminar" type="submit" onClick={() => eliminarUsuario(user.id)}>Eliminar</button>
          </div>
        </li>
        ))}
      </ul>
    </section>
  );  
}