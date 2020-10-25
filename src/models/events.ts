export type Result = {
    id: number;
    description: string;
    event_date: Date;
}

export type Events = {
    results: Result[];
}