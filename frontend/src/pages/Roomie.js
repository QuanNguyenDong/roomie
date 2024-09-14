import React, { useEffect, useRef, useState } from "react";
import getHome from "../services/Home/getHome";
import createHome from "../services/Home/createHome";
import joinHome from "../services/Home/joinHome";
import leaveHome from "../services/Home/leaveHome";

function JoinOrCreate() {
    const code = useRef("");
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            var str = code.current.value;
            if (str.length != 5) throw Error("Code must be 5 characters");

            var body = { code: str };
            const res = await createHome(body);

            if (res.status != 200) throw Error(res.message);
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            var str = code.current.value;
            if (str.length != 5) throw Error("Code must be 5 characters");

            var body = { code: str };
            const res = await joinHome(body);

            if (res.status != 200) throw Error(res.message);
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="max-w-[520px] mx-auto py-10 py-auto h-full text-black font-poppins">
            <div className="my-10 text-center">
                <text className="text-4xl font-bold font-lexend">Roomie</text>
            </div>
            <div class="flex flex-col items-center">
                <form>
                    <label className="mx-auto text-sm font-medium leading-6 text-gray-900 flex flex-row items-center gap-1">
                        Enter code to join Roomie
                    </label>
                    <input
                        className="w-[280px] my-2 rounded-3xl py-1.5 px-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        id="code"
                        name="code"
                        ref={code}
                        autoComplete="off"
                        placeholder="abc12"
                        required
                    />
                    <div class="flex flex-col items-center my-10">
                        <button
                            onClick={handleJoin}
                            className="h-10 w-[180px] bg-black text-s text-white w-28 rounded-3xl shadow"
                        >
                            Join
                        </button>
                        <text className="my-4">OR</text>
                        <button
                            onClick={handleCreate}
                            className="h-10 w-[180px] bg-black text-s text-white w-28 rounded-3xl shadow"
                        >
                            Create a Roomie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Roomie() {
    const [house, setHouse] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getHome()
            .then((res) => {
                setHouse(res.house);
                setUsers(Array.from(res.users));
            })
            .catch((error) => {});
    }, []);

    const handleLeave = async () => {
        try {
            const res = await leaveHome();
            window.location.reload();
        } catch (err) {}
    };

    if (!(house && users)) return <JoinOrCreate />;

    return (
        <div className="max-w-[520px] mx-auto py-10 py-auto h-full text-black font-poppins">
            <h1>Code: {house.code}</h1>
            <h1>Users: </h1>
            <ul className="mx-5">
                {users.map((user, i) => (
                    <li key={i} className="list-disc">
                        {user.fullname}
                    </li>
                ))}
            </ul>
            <button
                onClick={handleLeave}
                className="h-10 my-5 bg-black text-s text-white w-28 rounded-3xl shadow"
            >
                Leave
            </button>
        </div>
    );
}

export default Roomie;
