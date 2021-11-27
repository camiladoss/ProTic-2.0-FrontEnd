import React,{useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USUARIO } from 'graphql/usuarios/queries'
import { toast } from 'react-toastify';
// import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import { useForm } from "react-hook-form";
import PrivateRoute from 'components/PrivateRoute';

const EditarUsuario = () => {

    const navigate = useNavigate ();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { _id } = useParams();

    const {data:queryData,error:queryError,loading:queryLoading} = useQuery(GET_USUARIO,{
        variables:{_id}
    });
    const [editarUsuario, {error: mutationError}] = useMutation(EDITAR_USUARIO);

    useEffect(() => {
        console.log("Data servidor", queryData);
    }, [queryData]);

    useEffect(() => {
        if(queryError){
            toast.error('Error consultado usuarios')
        }
        if(mutationError){
            toast.error('Error modificado el usuario')
        }
    }, [queryError, mutationError]);

    const onSubmit = data =>{
        console.log(data);
        editarUsuario({
              variables:{_id, ...data}
        });
        toast.success('Usuario modificado con exito');
        navigate("/Usuarios");
    }

    if (queryLoading) { return <div>Cargando...</div>; }

    return (
        <div className="flex flex-col items-center w-9/12 m-auto">
            <div className="flex self-start">
                <Link to="/Usuarios"> <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i></Link>
            </div>
            <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Editar Usuario</h2>
            <PrivateRoute roleList={['ADMINISTRADOR', 'AUTORIZADO']}>
                <form
                className="w-full items-center"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
                        <div className="w-full md:mb-0 flex flex-col ">
                            <label
                                className="text-gray-700 text-md font-bold"
                                htmlFor="grid-user-name">
                                Nombre:
                            </label>
                            <input
                                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-user-name"
                                defaultValue={queryData.Usuario.nombre}
                                type="text"
                                name="nombre"
                                {...register("nombre",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i ,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                            />
                            {errors.nombre?.type === 'required' && <span className="text-red-600">"El nombre es requerido!"</span>}
                            {errors.nombre?.type === 'pattern' && <span className="text-red-600">"El nombre solo puede llevar letras!"</span>}
                        </div>
                        <div className="w-full md:mb-0 flex flex-col ">
                            <label
                                className="text-gray-700 text-md font-bold"
                                htmlFor="grid-user-lastname">
                                Apellido:
                            </label>
                            <input
                                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-user-lastname"
                                defaultValue={queryData.Usuario.apellido}
                                type="text"
                                name="apellido"
                                {...register("apellido",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i ,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                            />
                            {errors.apellido?.type === 'required' && <span className="text-red-600">"El apellido es requerido!"</span>}
                            {errors.apellido?.type === 'pattern' && <span className="text-red-600">"El apellido solo puede llevar letras!"</span>}
                        </div>
                        <div className="w-full md:mb-0 flex flex-col">
                            <label
                                className="text-gray-700 text-md font-bold"
                                htmlFor="grid-IdProyect">
                                ID Usuario:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-IdProyect"
                                value={queryData.Usuario._id}
                                type="text"
                                name="_id"
                                disabled
                            />
                        </div>
                        <div className="w-full md:mb-0 flex flex-col ">
                            <label
                                className="text-gray-700 text-md font-bold"
                                htmlFor="grid-user-email">
                                Correo:
                            </label>
                            <input
                                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-user-email"
                                defaultValue={queryData.Usuario.correo}
                                type="text"
                                name="correo"
                                {...register("correo",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i ,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                            />
                            {errors.correo?.type === 'required' && <span className="text-red-600">"El correo es requerido!"</span>}
                            {errors.correo?.type === 'pattern' && <span className="text-red-600">"El correo tiene un formato erroneo!"</span>}
                        </div>
                        <div className="w-full md:mb-0 flex flex-col ">
                            <label
                                className="text-gray-700 text-md font-bold"
                                htmlFor="grid-user-Id">
                                Identificación:
                            </label>
                            <input
                                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-user-Id"
                                defaultValue={queryData.Usuario.identificacion}
                                type="text"
                                name="identificacion"
                                {...register("identificacion",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^\d{4,10}$/i ,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                            />
                            {errors.identificacion?.type === 'required' && <span className="text-red-600">"La identificación es requerida!"</span>}
                            {errors.identificacion?.type === 'pattern' && <span className="text-red-600">"La identificación solo puede llevar numeros!"</span>}
                        </div>
                        <div className="w-full mb-6 md:mb-0" >
                            <label className="text-gray-700 text-md font-bold" htmlFor="grid-rol">Rol:</label>
                            <div className="relative">
                                <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-rol"
                                defaultValue={queryData.Usuario.rol}
                                name="rol"
                                {...register("rol",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                                >
                                    <option>ESTUDIANTE</option>
                                    <option>LIDER</option>
                                    <option>ADMINISTRADOR</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.rol?.type === 'required' && <span className="text-red-600">"El rol es requerido!"</span>}
                            {errors.rol?.type === 'pattern' && <span className="text-red-600">"El rol no esta disponible!"</span>}
                        </div>
                        <div className="w-full mb-6 md:mb-0" >
                            <label className="text-gray-700 text-md font-bold" htmlFor="grid-estado">Estado:</label>
                            <div className="relative">
                                <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-estado"
                                defaultValue={queryData.Usuario.estado}
                                name="estado"
                                {...register("estado",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                                >
                                    <option>AUTORIZADO</option>
                                    <option>PENDIENTE</option>
                                    <option>NO_AUTORIZADO</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.estado?.type === 'required' && <span className="text-red-600">"La estado es requerido!"</span>}
                            {errors.estado?.type === 'pattern' && <span className="text-red-600">"El estado no esta disponible!"</span>}
                        </div>
                        <div className="md:col-start-1 md:col-end-3 flex justify-center">
                            <button
                                className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
                                type="submit">
                                Editar
                            </button>
                        </div>
                    </div>
                </form>
            </PrivateRoute>
        </div>
    )
}

export default EditarUsuario