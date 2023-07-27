import "assets/recommendation.scss";

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
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" }
    ];

    return (
        <div>
            <h2 className="recommendation_title">Recommendations</h2>
            {data.map((item) => {
                return <Recommendation key={item.title} {...item} width="10%" />;
            })}
        </div>
    );
}
