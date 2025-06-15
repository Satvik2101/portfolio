interface Workexp {
    company: string;
    shortName: string;
    location: string;
    role: string;
    start: string;
    end: string;
    points: string[];
    techstack: string[];
    excluded: boolean;
    "hue-degree": number;

}

export default Workexp;