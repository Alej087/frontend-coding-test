import React from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";

function EditTaskPage(dataTask) {
    const [statusTask, setStatusTask] = React.useState(dataTask.completed);
    const [startDate, setStartDate] = React.useState(dataTask.startDate);
    const [endDate, setEndDate] = React.useState(dataTask.endDate);

    function handleClick() {
        statusTask ? setStatusTask(false) : setStatusTask(true);
    }

    return (
        <div>
            <div class="header-edit-task">
                <Link href={"/"}>
                    <button class="button-primary">
                        <AiTwotoneHome />
                    </button>
                </Link>
                <h4>{`Now you are editing the ${dataTask.title}`}</h4>
            </div>
            <div class="edit-task">
                <form class="edit-task--form">
                    <label for="taskTitle">Title</label>
                    <input
                        class="input-width"
                        type="text"
                        placeholder={dataTask.title}
                        id="nameTask"
                        required
                    />
                    <label for="description">Description</label>
                    <input
                        class="input-width"
                        type="text"
                        placeholder={dataTask.description}
                        id="descriptionTask"
                        required
                    />
                    <label for="startDate">Start Date</label>
                    <input
                        class="input-width"
                        type="date"
                        value={startDate}
                        id="startDateTask"
                        required
                        onChange={(e) => {
                            setStartDate(e.target.value);
                        }}
                    />
                    <label for="endDate">End Date</label>
                    <input
                        class="input-width"
                        type="date"
                        value={endDate}
                        id="endDateTask"
                        onChange={(e) => {
                            setEndDate(e.target.value);
                        }}
                    />
                    <label for="statusTask">Status</label>
                    <label>
                        <input
                            type="checkbox"
                            checked={statusTask}
                            onClick={() => {
                                handleClick();
                            }}
                        />
                        <span class="label-body">
                            {statusTask ? "Completed" : "Not Completed"}
                        </span>
                    </label>
                    <div class="buttons">
                        <input
                            class="button-primary"
                            type="submit"
                            value="Update"
                        />
                        <Link href={`/profile/${dataTask.personId}`}>
                            <button class="cancel-button button">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3001/tasks");
    const dataTask = await res.json();
    const paths = dataTask.map((task) => ({
        params: { id: task.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3001/tasks/${params.id}`);
    const dataTask = await res.json();
    return { props: dataTask };
}

export default EditTaskPage;
