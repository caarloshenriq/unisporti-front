import { Training } from "./Training";
import { User } from "./User";

export interface Presence{
    training: Training;
    user: User;
    dateTimeTraining: Date;
    present: boolean;
}