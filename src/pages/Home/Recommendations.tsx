import "assets/recommendation.scss";

export default function Recommendations() {
    const data = [
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" }
    ];

    return (
        <div>
            <h2 className="recommendation_title">Recommendations</h2>
            {data.map((item) => {
                return (
                    <div className="recommendation">
                        <img src={item.url} alt={item.title}></img>
                        <button>
                            <b>{item.title}</b>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
