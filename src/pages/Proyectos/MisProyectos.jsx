import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MIS_PROYECTOS } from "graphql/proyectos/queries";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PrivateComponent from "components/PrivateComponent";
import { useUser } from "context/userContext";
// import { ACCESO_ESTUDIANTE } from "graphql/inscripciones/queries";

const MisProyectos = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_MIS_PROYECTOS, {
    fetchPolicy: "no-cache",
  });

  // const [getAccess, { called, queryLoading, queryData }] = useLazyQuery(ACCESO_ESTUDIANTE, {
  // });

  const { userData } = useUser();

  useEffect(() => {
    console.log("Data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) toast.error("Error consultado proyectos");
  }, [error]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <h2 className="font-bold text-2xl mb-4 text-gray-700 flex mt-10">
        Mis Proyectos
      </h2>
      <input
        className="bg-gray-200 text-gray-700 border rounded py-2 px-2 mb-3 focus:outline-none focus:bg-white"
        placeholder="Buscar"
      />
      <table className="border-b border-blue-300 shadow">
        <thead className="bg-maximunBlue">
          <tr>
            <th className="px-6 py-2 text-md text-gray-700">Proyecto</th>
            <th className="px-6 py-2 text-md text-gray-700">Presupuesto</th>
            <th className="px-6 py-2 text-md text-gray-700">Estado </th>
            <th className="px-6 py-2 text-md text-gray-700">Fase </th>
            {userData.rol === "LIDER" ? (
              <th className="px-6 py-2 text-md text-gray-700">Editar</th>
            ) : (
              <th className="px-6 py-2 text-md text-gray-700">Ver Avances</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-columbiaBlue">
          {data &&
            data.MisProyectos.map((p) => {
              return (
                <tr key={p._id} className="whitespace-nowrap">
                  <td className="px-6 py-4 text-md text-gray-600">
                    {p.nombre}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {" "}
                    $ {p.presupuesto}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {p.estado}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">{p.fase}</td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    <PrivateComponent roleList={["LIDER", "AUTORIZADO"]}>
                      {p.estado !== "INACTIVO" ? (
                        <button
                          className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-pen"
                          onClick={() => {
                            navigate(
                              `/GestionProyectos/EditarProyecto/${p._id}`
                            );
                          }}
                        ></button>
                      ) :(
                        <button
                          className="px-4 py-1 text-md mr-2 text-white bg-green-900 rounded fas fa-pen"
                          disabled
                        ></button>
                      )}
                      <button
                        className="px-4 py-1 text-md ml-2 text-white bg-blue-400 rounded fas fa-book"
                        onClick={() => {
                          navigate(`/GestionInscripcion/${p._id}`);
                        }}
                      ></button>
                    </PrivateComponent>
                    <button
                      className="px-4 py-1 text-md ml-2 text-white bg-blue-400 rounded fas fa-eye"
                      onClick={() => {
                        navigate(`/GestionAvances/${p._id}`);
                      }}
                    ></button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MisProyectos;
