import React,{useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrivateRoute from "components/PrivateRoute";

const IndexUsuarios = () => {

    const navigate = useNavigate ();
    const {data,error,loading} = useQuery(GET_USUARIOS);

    useEffect(() => {
        console.log("Data servidor", data);
    }, [data]);

    useEffect(() => {
        if(error)
        toast.error('Error consultado usuarios')
    }, [error]);

    if (loading) { return <div>Cargando...</div>; }
    return (
        <PrivateRoute roleList={['ADMINISTRADOR',"LIDER",'AUTORIZADO']}>
            <div className="flex flex-col items-center w-9/12 m-auto">
                <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Todos los usuarios</h2>
                <input  className="bg-gray-200 text-gray-700 border rounded py-2 px-2 mb-3 focus:outline-none focus:bg-white"
                placeholder="Buscar" />
                <table className="border-b border-blue-300 shadow">
                    <thead className="bg-maximunBlue">
                        <tr>
                        <th className="px-6 py-2 text-md text-gray-700">Nombre</th>
                        <th className="px-6 py-2 text-md text-gray-700">Apellido</th>
                        <th className="px-6 py-2 text-md text-gray-700">Correo</th>
                        <th className="px-6 py-2 text-md text-gray-700">Estado </th>
                        <th className="px-6 py-2 text-md text-gray-700">Rol</th>
                        <th className="px-6 py-2 text-md text-gray-700">Editar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-columbiaBlue">
                        {data.Usuarios &&
                            data.Usuarios.map((u)=>{
                                return(
                                    <tr key={u._id} className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-md text-gray-600">{u.nombre}</td>
                                        <td className="px-6 py-4 text-md text-gray-600">{u.apellido}</td>
                                        <td className="px-6 py-4 text-md text-gray-600">{u.correo}</td>
                                        <td className="px-6 py-4 text-md text-gray-600">{u.estado}</td>
                                        <td className="px-6 py-4 text-md text-gray-600">{u.rol}</td>
                                        <td className="px-6 py-4 text-md text-gray-600">
                                            <button className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-pen" onClick={() => {navigate(`/Usuarios/EditarUsuario/${u._id}`)}}></button>
                                            {/* <button className="px-4 py-1 text-md ml-2 text-white bg-blue-400 rounded fas fa-plus"></button> */}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </PrivateRoute>
    )
}

export default IndexUsuarios
