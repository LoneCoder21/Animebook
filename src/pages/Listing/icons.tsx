import { AiFillStar } from "react-icons/ai";
import { BiSolidCameraMovie, BiSolidMusic } from "react-icons/bi";
import { BsDiscFill, BsFillSunFill, BsGlobe } from "react-icons/bs";
import { FaCanadianMapleLeaf, FaSnowflake } from "react-icons/fa";
import { PiFlowerFill, PiTelevisionSimpleFill } from "react-icons/pi";

export function PremiereIcon({ season }: { season: string }) {
    let icon = <></>;
    switch (season) {
        case "spring":
            icon = <PiFlowerFill />;
            break;
        case "summer":
            icon = <BsFillSunFill />;
            break;
        case "fall":
            icon = <FaCanadianMapleLeaf />;
            break;
        case "winter":
            icon = <FaSnowflake />;
            break;
    }
    return icon;
}

export function TypeIcon({ type }: { type: string }) {
    let icon = <></>;

    switch (type) {
        case "TV":
            icon = <PiTelevisionSimpleFill />;
            break;
        case "Movie":
            icon = <BiSolidCameraMovie />;
            break;
        case "OVA":
            icon = <BsDiscFill />;
            break;
        case "ONA":
            icon = <BsGlobe />;
            break;
        case "Special":
            icon = <AiFillStar />;
            break;
        case "Music":
            icon = <BiSolidMusic />;
            break;
    }
    return icon;
}
