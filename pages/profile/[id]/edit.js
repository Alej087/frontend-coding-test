import React from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";

function EditProfilePage(dataPerson) {
    return (
        <div>
            <div class="header-edit-profile">
                <Link href={"/"}>
                    <button class="button-primary">
                        <AiTwotoneHome />
                    </button>
                </Link>
                <h4>{`Now you are editing the ${dataPerson.fullName}`}</h4>
            </div>
            <div class="edit-profile">
                <form class="edit-profile--form">
                    <label for="fullName">Fullname</label>
                    <input
                        class="input-width"
                        type="text"
                        placeholder={dataPerson.fullName}
                        id="fullName"
                        required
                    />
                    <label for="nickname">Nickname</label>
                    <input
                        class="input-width"
                        type="text"
                        placeholder={dataPerson.nickname}
                        id="nickname"
                        required
                    />
                    <label for="gender">Gender</label>
                    <input
                        class="input-width"
                        type="text"
                        placeholder={dataPerson.gender}
                        id="gender"
                        required
                    />
                    <label for="age">Age</label>
                    <input
                        class="input-width"
                        type="number"
                        placeholder={dataPerson.age}
                        id="age"
                        required
                    />
                    <label for="occupation ">Occupation</label>
                    <input
                        class="input-width"
                        type="text"
                        placeholder={dataPerson.occupation}
                        id="occupation"
                        required
                    />
                    <label for="profilePicture">Profile Picture(URL)</label>
                    <input
                        class="input-width"
                        type="text"
                        placeholder={dataPerson.picture}
                        id="profilePicture"
                        required
                    />
                    <div>
                        <input
                            class="button-primary"
                            type="submit"
                            value="Update"
                        />
                        <Link href={`/profile/${dataPerson.id}`}>
                            <button class="cancel-button button">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3001/people");
    const dataPerson = await res.json();
    const paths = dataPerson.map((person) => ({
        params: { id: person.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3001/people/${params.id}`);
    const dataPerson = await res.json();
    return { props: dataPerson };
}

export default EditProfilePage;
