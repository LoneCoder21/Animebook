import "assets/pages/Home/recommendation.scss";

// TODO - Fix jitter issue on card hover

export function Recommendation({ url, title, width }: { url: string; title: string; width: string }) {
    return (
        <div className="recommendation">
            <img src={url} alt={title} style={{ width: width }}></img>
            <button>
                <b>{title}</b>
            </button>
        </div>
    );
}

export default function Recommendations() {
    const data = [
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" }
    ];

    return (
        <div>
            <h2 className="recommendation_title">Recommendations</h2>
            <div className="recommendations">
                {data.map((item) => {
                    return <Recommendation key={item.title} {...item} width="90%" />;
                })}
            </div>
        </div>
    );
}
