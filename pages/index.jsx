function HomePage({ dataPeople }) {
    const sortData = (array, sortBy) => {
        return array.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return -1;
            } else if (a[sortBy] > b[sortBy]) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    const sortByAge = sortData(dataPeople, "age");

    return (
        <div class="page">
            <div>
                <div class="header">
                    <h1 class="eight columns">Frontend App Test</h1>
                    <p class="four columns">David González</p>
                </div>
            </div>
            <div class="sort-filter four columns">
                <select class="u-full-width" id="exampleRecipientInput">
                    <option value="Option 1">By Name</option>
                    <option selected value="Option 2">
                        By Age
                    </option>
                    <option value="Option 3">By Occupation</option>
                </select>
                <button class="button-primary">Order</button>
            </div>
            <div class="table-users eight columns">
                <table class="u-full-width">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Fullname</th>
                            <th>Age</th>
                            <th>Occupation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortByAge
                            .map((people) => (
                                <tr key={people.id}>
                                    <td class="table-user-avatar">
                                        <img
                                            src={people.picture}
                                            alt="avatarUser"
                                        />
                                    </td>
                                    <td>{people.fullName}</td>
                                    <td>{people.age}</td>
                                    <td>{people.occupation}</td>
                                </tr>
                            ))
                            .sort()}
                    </tbody>
                </table>
            </div>
            <div>
                <p>All rights reserved ®</p>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch("http://localhost:3001/people");
    const dataPeople = await res.json();

    return {
        props: {
            dataPeople,
        },
    };
}

export default HomePage;
