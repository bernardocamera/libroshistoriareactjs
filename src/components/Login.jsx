import { logearG } from "../auth/firebase"

export default function Login({setLogeadoUser, setLogeadoAdmin, user, admin}) {

    function disparadora() {
        logearG()
    }

    return(
        <div>
            <button onClick={setLogeadoUser}>{user ? "Cerrar sesion" : "Iniciar sesion"}</button>
            <button onClick={setLogeadoAdmin}>{admin ? "Cerrar sesion Admin" : "Iniciar sesion Admin"}</button>
            <button onClick={disparadora}> Test G </button>
        </div>
    )
}