import "assets/pages/Home/searchform.scss";
import RadioButtonHorizontal from "components/input/RadioButton";

function NamedComponent({ type, children }: { type: string; children: JSX.Element }) {
    return (
        <div className="name">
            <span>{type}</span>
            {children}
        </div>
    );
}

export default function SearchForm() {
    const date = new Date();
    const defaultDate = date.toLocaleDateString("en-CA");

    return (
        <form
            className="searchform"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <input id="search" type="text" placeholder="Search" />
            <NamedComponent type="score">
                <input type="range" min="1" max="100" className="slider" id="myRange" onChange={() => {}}></input>
            </NamedComponent>
            <NamedComponent type="type">
                <RadioButtonHorizontal
                    type="type"
                    className="form_radio_button"
                    options={["tv", "movie", "ova", "special", "ona", "music"]}
                    checked="tv"
                    setChosenCallback={function (value: string): void {
                        console.log(value);
                        return;
                    }}
                />
            </NamedComponent>
            <NamedComponent type="status">
                <RadioButtonHorizontal
                    type="status"
                    className="form_radio_button"
                    options={["airing", "complete", "upcoming"]}
                    checked="airing"
                    setChosenCallback={function (value: string): void {
                        console.log(value);
                        return;
                    }}
                />
            </NamedComponent>
            <NamedComponent type="Order By">
                <RadioButtonHorizontal
                    type="orderby"
                    className="form_radio_button"
                    options={[
                        "mal_id",
                        "title",
                        "start_date",
                        "end_date",
                        "episodes",
                        "score",
                        "scored_by",
                        "rank",
                        "popularity",
                        "members",
                        "favorites"
                    ]}
                    checked="mal_id"
                    setChosenCallback={function (value: string): void {
                        console.log(value);
                        return;
                    }}
                />
            </NamedComponent>
            <NamedComponent type="sort">
                <RadioButtonHorizontal
                    type="sort"
                    className="form_radio_button"
                    options={["descending", "ascending"]}
                    checked="descending"
                    setChosenCallback={function (value: string): void {
                        console.log(value);
                        return;
                    }}
                />
            </NamedComponent>
            <NamedComponent type="Max Date">
                <input type="date" id="startdate" defaultValue={defaultDate}></input>
            </NamedComponent>
        </form>
    );
}
