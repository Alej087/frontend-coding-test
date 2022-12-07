import { useRouter } from "next/router";

function ProfilePage({ dataPeople, dataTask }) {
    return (
        <div>
            <div>
                <h4>Profile Page Of {dataPeople.fullName}</h4>
                <button class="button-primary">Edit Profile</button>
            </div>
            <div>
                <div>
                    <img src={dataPeople.picture} />
                </div>
                <div>
                    <p>Nickname: {dataPeople.nickname}</p>
                    <p>Occupation: {dataPeople.occupation}</p>
                    <p>Gender: {dataPeople.gender}</p>
                    <p>Age: {dataPeople.age}</p>
                </div>
            </div>
            <div>
                <table class="u-full-width">
                    <thead>
                        <tr>
                            <th>Title Task</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTask
                            .filter((task) => task.personId === dataPeople.id)
                            .map((taskPeople) => (
                                <tr>
                                    <td>{taskPeople.title}</td>
                                    <td>{taskPeople.description}</td>
                                    <td>
                                        {taskPeople.completed
                                            ? "Completed"
                                            : "Not Completed"}
                                    </td>
                                    <td>
                                        <button class="button-primary">
                                            Tarea
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
