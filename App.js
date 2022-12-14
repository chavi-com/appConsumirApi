import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios'; // consumidor de api's

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idsearch, setIdsearch] = useState('');
  // const [name, setName] = useState('');
  // const [email,setEmail] = useState('')
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [totalComicion, setTotalComicion] = useState('');

  // const getUsers = async () => {
  //   try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const getUserById = async (id) => {
  //   try {
  //     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  //     const json = await response.json();
  //     setData(json);
  //     if (json.name != null){
  //       setName(json.name);
  //       setEmail(json.email)
  //     }
  //     else{
  //       alert("El id del usuario NO existe. Inténtelo con otro...")
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const saveCliente = async () => {
    if (!nombre.trim() || !correo.trim() || !totalComicion.trim()) {
      alert("Nombre y apellidos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://172.16.58.81:3000/api/clientes`, {
        nombre,
        apellidos,
      });
      alert("Vendedor agregado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id) => {
    if (!nombre.trim() || !correo.trim() || !totalComicion.trim()) {
      alert("Nombre y apellidos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`http://172.16.58.81:3000/api/clientes/${id}`, {
        nombre,
        correo,
        totalComicion
      });
      alert("Vendedor actualizado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id) => {
    setLoading(true);
    try {
      if (confirm("Está seguro de eliminar el Vendedor?")){
        const response = await axios.delete(`http://172.16.58.81:3000/api/clientes/${id}`);
        alert("Vendedor eliminado correctamente ...")
      }
      
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const getClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://172.16.58.81:3000/api/clientes`);
      setData(response.data);
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const getClientePorId = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://172.16.58.81:3000/api/clientes/${id}`);
      setData(response.data);
      if (response.data.nombre != null) {
        // Actualizar los estados de nombre y apellidos
        setNombre(response.data.nombre);
        setCorreo(response.data.correo);
        setTotalComicion(response.data.totalComicion)
      }
      else {
        alert("Id del Vendedor NO existe. Inténtelo con otro.")
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    //getUsers(); // Se ejecutará este método al iniciar, por primera vez, el componente
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#c71852' }]}
        onPress={() => getClientes()}
      >
        <Text style={{ color: 'yellow'}}>Listar Vendedores </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'aquamarine' }]}
        onPress={() => getClientePorId(idsearch)}
      >
        <Text style={{ color: 'red' }}>Buscar por Id</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.inputs}
        placeholder="Ingrese el id del Vendedor a buscar"
        onChangeText={idsearch => setIdsearch(idsearch)}
        value={idsearch}
      />
      <TextInput
        style={styles.inputs}
        placeholder="nombre del Vendedor"
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
      />
      <TextInput
        style={styles.inputs}
        placeholder="correo del vendedor"
        onChangeText={correo => setCorreo(correo)}
        value={correo}
      />
      
      <TextInput
        style={[styles.inputs, { marginBottom:'30px'}]}
        placeholder="cual es la comicion?"
        onChangeText={totalComicion => setTotalComicion(totalComicion)}
        value={totalComicion}
      />

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#18c733' }]}
        onPress={() => saveCliente()}
      >
        <Text style={{ color: 'yellow' }}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#0cc6ec' }]}
        onPress={() => updateCliente(idsearch)}
      >
        <Text style={{ color: 'yellow' }}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'red' }]}
        onPress={() => deleteCliente(idsearch)}
      >
        <Text style={{ color: 'yellow' }}>Eliminar</Text>
      </TouchableOpacity>
      <Text>Listado de Vendedores</Text>
      {isLoading ? <ActivityIndicator size="large" color="red" /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.touchables, { backgroundColor: 'orange' }]}
              onPress={() => {
                if (confirm(`Está seguro de borrar el Vendedor: ${item._id}?`)) {
                  alert("El Vendedor se ha borrado exitosamente...");
                }
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.nombre} {item.correo} {item.totalComicion}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchables: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10
  },
  inputs: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    textAlign: 'center',
    padding: 5
  }
});