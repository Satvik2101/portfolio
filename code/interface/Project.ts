import Link from "./Link";


interface Project {
    name: string;
    product: string | null;
    role: string;
    techstack: string[];
    links: Link[];
    points: string[];
    image: string;
    alt: string;
}

export default Project;