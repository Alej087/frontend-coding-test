import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { AiTwotoneHome } from "react-icons/ai";

function ProfilePage({ dataPeople, dataTask }) {
    const dataPerson = dataTask.filter(
        (task) => task.personId === dataPeople.id
    );
    const [tasksPerson, setTasksPerson] = React.useState(dataPerson);

    function handleClick(taskSelected) {
        const newDataPerson = tasksPerson.map((task) => {
            if (task.id === taskSelected.id) {
                task.completed = !task.completed;
            }
            return task;
        });
        console.log("inicial", newDataPerson);
        setTasksPerson(newDataPerson);
    }

    return (
        <div>
            <div class="header-profile">
                <Link href={"/"}>
                    <button class="button-primary">
                        <AiTwotoneHome />
                    </button>
                </Link>
                <h4>Profile Page Of {dataPeople.fullName}</h4>
                <Link
                    href={`/profile/${encodeURIComponent(dataPeople.id)}/edit`}
                >
                    <button class="button-edit button-primary">
                        <FaUserEdit /> Edit Profile
                    </button>
                </Link>
            </div>
            <div class="data-person ten columns">
                <div>
                    <img src={dataPeople.picture} />
                </div>
                <div class="eight columns">
                    <p>
                        <span>Nickname:</span> {dataPeople.nickname}
                    </p>
                    <p>
                        <span>Occupation:</span> {dataPeople.occupation}
                    </p>
                    <p>
                        <span>Gender:</span> {dataPeople.gender}
                    </p>
                    <p>
                        <span>Age:</span> {dataPeople.age}
                    </p>
                </div>
            </div>
            <div class="task-table">
                <table class="u-full-width">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title Task</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPerson.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    <Link
                                        href={`/tasks/${encodeURIComponent(
                                            task.id
                                        )}/edit`}
                                    >
                                        <button class="button-edit button-primary">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                </td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    {task.completed
                                        ? "Completed"
                                        : "Not Completed"}
                                </td>
                                <td>
                                    <button
                                        class="button-primary"
                                        onClick={() => {
                                            handleClick(task);
                                        }}
                                    >
                                        {task.completed
                                            ? "Mark as Not Completed"
                                            : "Mark as Completed"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3001/people");
    const dataPeople = await res.json();
    const paths = dataPeople.map((people) => ({
        params: { id: people.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3001/people/${params.id}`);
    const res2 = await fetch("http://localhost:3001/tasks");
    const dataPeople = await res.json();
    const dataTask = await res2.json();
    return { props: { dataPeople, dataTask } };
}

export default ProfilePage;
